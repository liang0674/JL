// Localhost-only API simulator for checking page states without issuing rewards.
(() => {
  const params = new URLSearchParams(location.search);
  if (params.get('mockApi') !== '1') return; // This extracted repository is a public static DEMO only.
  if (window.HILIBOX_SPIN_API) return; // Keep an explicitly installed real adapter.
  const config = window.HILIBOX_SPIN_CONFIG;
  const runtime = window.HILIBOX_SPIN_RUNTIME;
  window.HILIBOX_SPIN_MOCK_ACTIVE = true;
  const session = params.get('mockSession') || 'default';
  const shared = params.get('shared') === '1';
  let device = window.DEMO_STORAGE.getItem('hilibox-spin-preview-device');
  if (!device) { device = window.DEMO_UUID(); window.DEMO_STORAGE.setItem('hilibox-spin-preview-device', device); }
  // Explicit localhost fixture to simulate another browser/device; never a production device identifier.
  device = params.get('mockVisitor') || device;
  const context = params.get('spinContext') || 'standalone';
  const authenticated = params.get('auth') !== '0';
  const accountNamespace = params.has('spinContext') ? 'account' : session;
  const storageKey = `hilibox-spin-mock-v2:${config.id}:${accountNamespace}:${context}`;
  const today = () => runtime.dayKey(Date.now(), config.timeZone);
  const referrals = globalThis.HILIBOX_SPIN_REFERRAL.ledger(window.DEMO_STORAGE, config.id, today);
  const owner = `${accountNamespace}:${context}`;
  const wait = () => new Promise(resolve => setTimeout(resolve, 120));
  const empty = () => ({ draws: [], drawFailed: false, claimFailed: false });
  const read = () => {
    try { return { ...empty(), ...JSON.parse(window.DEMO_STORAGE.getItem(storageKey) || '{}') }; }
    catch { return empty(); }
  };
  const write = state => window.DEMO_STORAGE.setItem(storageKey, JSON.stringify(state));
  const failure = code => ({ success: false, code });
  const pending = new Set();
  const publicRecord = record => ({ ...record });
  const inventoryKey=`hilibox-spin-mock-inventory:${config.id}`;
  const reserved=()=>{try{return JSON.parse(window.DEMO_STORAGE.getItem(inventoryKey)||'{}');}catch{return {};}};
  const campaignConfig = () => {
    const scenario = params.get('mockActivity');
    const next = { ...config, ...(scenario ? globalThis.HILIBOX_SPIN_CAMPAIGN.scenario(scenario) : {}) };
    if (params.get('mockActivity') === 'missing_image') next.prizes = config.prizes.map(prize => prize.type === 'gift' ? { ...prize, product: { ...prize.product, image: 'images/missing-product.png' } } : prize);
    if (['multi_gift','gift_sold_out','gift_last_one'].includes(scenario)) {
      next.prizes=config.prizes.map(prize=>prize.type==='gift'?{...prize,products:prize.products.map((product,index)=>({...product,stockRemaining:scenario==='gift_sold_out'?0:scenario==='gift_last_one'?(index===0?1:0):20}))}:prize);
    }
    if (/^prizes_[3-8]$/.test(scenario)) {const count=Number(scenario.slice(-1));next.prizes=[...config.prizes.filter(p=>p.type!=='gift').slice(0,count-1),config.prizes.find(p=>p.type==='gift')];}
    const counts=reserved();
    next.prizes=next.prizes.map(prize=>prize.type==='gift'&&Array.isArray(prize.products)?{...prize,products:prize.products.map(product=>({...product,stockRemaining:Math.max(0,product.stockRemaining-(counts[product.id]||0))}))}:prize);
    return next;
  };
  window.HILIBOX_SPIN_API = {
    async createShare() {
      await wait();
      if (shared || params.get('auth') === '0') return failure('LOGIN_REQUIRED');
      if (globalThis.HILIBOX_SPIN_CAMPAIGN.state(globalThis.HILIBOX_SPIN_CAMPAIGN.normalize(campaignConfig())) !== 'active') return failure('ACTIVITY_CLOSED');
      const token = referrals.create(owner, device, window.DEMO_UUID());
      const link=new URL('mobile.html',location.href);link.search=new URLSearchParams({lang:params.get('lang')||'en',mockApi:'1',auth:'1',shared:'1',shareToken:token}).toString();return { success: true, shareToken: token, shareUrl:link.href, preview: true };
    },
    async openShare({ shareToken } = {}) {
      await wait();
      if (globalThis.HILIBOX_SPIN_CAMPAIGN.state(globalThis.HILIBOX_SPIN_CAMPAIGN.normalize(campaignConfig())) !== 'active') return failure('ACTIVITY_CLOSED');
      const result = referrals.open(shareToken, device);
      return result;
    },
    async getConfig() {
      await wait();
      return { success: true, campaign: campaignConfig() };
    },
    async getState({ pendingRequestId } = {}) {
      await wait();
      if (!authenticated) return failure('LOGIN_REQUIRED');
      const state = read(), day = today();
      const completed = state.draws.some(item => item.requestId === pendingRequestId || item.claimRequestId === pendingRequestId);
      return {
        success: true,
        draws: state.draws.filter(item => item.day === day).map(publicRecord),
        history: state.draws.filter(item => item.day !== day).map(publicRecord),
        points: config.startingPoints,
        bonusSpins: referrals.bonus(owner),
        campaign: campaignConfig(),
        requestStatus: pending.has(pendingRequestId) ? 'pending' : completed ? 'completed' : 'not_found'
      };
    },
    async draw({ requestId } = {}) {
      if (!authenticated) return failure('LOGIN_REQUIRED');
      const day = today();
      pending.add(requestId);
      try {
        await wait();
        const state = read();
        const existing = state.draws.find(item => item.requestId === requestId && requestId);
        if (existing) return { success: true, ...publicRecord(existing),campaign:campaignConfig() };
        const campaign = campaignConfig(), model = globalThis.HILIBOX_SPIN_CAMPAIGN;
        const status = model.state(model.normalize(campaign));
        if (status !== 'active') return failure({ closed: 'ACTIVITY_CLOSED', ended: 'ACTIVITY_ENDED', not_started: 'ACTIVITY_NOT_STARTED', invalid_prizes: 'PRIZES_UNAVAILABLE' }[status] || 'CONFIG_UNAVAILABLE');
        if (params.get('failDrawOnce') === '1' && !state.drawFailed) {
          state.drawFailed = true; write(state);
          return failure('DRAW_FAILED');
        }
        const used = state.draws.filter(item => item.day === day).length;
        if (used >= config.freeDrawsPerDay + referrals.bonus(owner)) return failure('NO_DRAWS');
        const slot = used + 1;
        // Fixture only: the server must check delivered orders and decide the real draw.
        const eligible = authenticated && params.get('mockDelivered') === '1';
        const giftIndex = campaign.prizes.findIndex(prize => prize.type === 'gift');
        const gift = eligible && giftIndex >= 0 && !model.giftSoldOut(campaign.prizes[giftIndex]) && (params.get('mockPrize') === 'gift' || Math.random() < 0.0001);
        const fallback = campaign.prizes.map((prize, index) => prize.type !== 'gift' ? index : -1).filter(index => index >= 0);
        const prize = campaign.prizes[gift && giftIndex >= 0 ? giftIndex : fallback[(slot - 1) % fallback.length]];
        const record = { drawId: `preview-${session}-${day}-${slot}`, requestId, prizeId: prize.id, day, slot, source: 'free', createdAt: new Date().toISOString(), claimed: false, preview: true };
        if(prize.type==='gift'){const options=model.availableGiftProducts(prize);const product=options[Math.floor(Math.random()*options.length)];if(product){record.product=JSON.parse(JSON.stringify(product));if(Number.isInteger(product.stockRemaining)&&product.id){const counts=reserved();counts[product.id]=(counts[product.id]||0)+1;window.DEMO_STORAGE.setItem(inventoryKey,JSON.stringify(counts));}}}
        state.draws.push(record); write(state);
        return { success: true, ...publicRecord(record),campaign:campaignConfig() };
      } finally { pending.delete(requestId); }
    },
    async claim({ drawId, requestId } = {}) {
      pending.add(requestId);
      try {
        await wait();
        if (!authenticated) return failure('LOGIN_REQUIRED');
        if (shared) return failure('APP_REQUIRED');
        const state = read();
        if (params.get('failClaimOnce') === '1' && !state.claimFailed) {
          state.claimFailed = true; write(state);
          return failure('CLAIM_FAILED');
        }
        const record = state.draws.find(item => item.drawId === drawId);
        if (!record) return failure('DRAW_NOT_FOUND');
        if (!record.claimed) {
          record.claimed = true;
          record.claimRequestId = requestId;
          record.claimedAt = new Date().toISOString();
          record.code = record.prizeId === 'gift' ? '' : `PREVIEW-${session}-${record.day}-${record.slot}`;
          if (record.prizeId !== 'gift') record.validThrough = runtime.couponExpiry(record.claimedAt, config.couponValidityHours);
          write(state);
        }
        // Idempotent: retries return the original reward and expiration, never a fresh 72 hours.
        return { success: true, ...publicRecord(record), freeShipping: record.prizeId === 'gift' };
      } finally { pending.delete(requestId); }
    }
  };
})();
