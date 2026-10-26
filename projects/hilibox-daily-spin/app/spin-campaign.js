// Shared public campaign configuration for Shop and the standalone web-view.
(() => {
  const flag = value => {
    if ([true, 1, '1', 'true'].includes(value)) return true;
    if ([false, 0, '0', 'false'].includes(value)) return false;
    return undefined;
  };
  function timestamp(value) {
    if (value === null || value === undefined || value === '' || value === 0) return null;
    const number = Number(value);
    if (Number.isFinite(number)) return number < 1e11 ? number * 1000 : number;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : NaN;
  }
  function normalize(raw = {}) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) raw = {};
    const status = String(raw.status || 'active').toLowerCase();
    const enabled = flag(raw.enabled);
    const entryVisible = flag(raw.entry_visible ?? raw.entryVisible);
    const startsAt = timestamp(raw.starts_at ?? raw.startsAt);
    const endsAt = timestamp(raw.ends_at ?? raw.endsAt);
    const invalidStatus = !['active', 'open', 'closed', 'paused', 'ended', 'not_started'].includes(status);
    const result = {
      id: String(raw.activity_id ?? raw.id ?? 'daily-exclusive-preview'),
      enabled: enabled === true,
      entryVisible: entryVisible === true,
      status,
      startsAt, endsAt,
      configError: raw.configError === true || enabled === undefined || entryVisible === undefined || invalidStatus || Number.isNaN(startsAt) || Number.isNaN(endsAt) || (startsAt !== null && endsAt !== null && endsAt <= startsAt)
    };
    for (const key of ['prizes', 'rules', 'freeDrawsPerDay', 'couponValidityHours', 'timeZone']) {
      if (Object.prototype.hasOwnProperty.call(raw, key)) result[key] = raw[key];
    }
    if (result.timeZone !== undefined) {
      try { new Intl.DateTimeFormat('en', { timeZone: result.timeZone }); }
      catch { delete result.timeZone; result.configError = true; }
    }
    if (result.freeDrawsPerDay !== undefined && (!Number.isInteger(result.freeDrawsPerDay) || result.freeDrawsPerDay < 0)) { delete result.freeDrawsPerDay; result.configError = true; }
    if (result.couponValidityHours !== undefined && (!Number.isFinite(result.couponValidityHours) || result.couponValidityHours <= 0)) { delete result.couponValidityHours; result.configError = true; }
    return result;
  }
  function state(config, now = Date.now()) {
    if (config.configError) return 'config_error';
    if (config.status === 'ended') return 'ended';
    if (!config.enabled || ['closed', 'paused'].includes(config.status)) return 'closed';
    if (config.endsAt !== null && config.endsAt !== undefined && now >= config.endsAt) return 'ended';
    if (config.status === 'not_started' || (config.startsAt !== null && config.startsAt !== undefined && now < config.startsAt)) return 'not_started';
    if (Object.prototype.hasOwnProperty.call(config, 'prizes') && !validPrizes(config.prizes)) return 'invalid_prizes';
    return 'active';
  }
  function entryAllowed(config, now = Date.now()) {
    return config.entryVisible === true && ['active', 'not_started'].includes(state(config, now));
  }
  function validPrizes(prizes) {
    return Array.isArray(prizes) && prizes.length >= 3 && prizes.length <= 8 && new Set(prizes.map(item => item?.id)).size === prizes.length
      && prizes.filter(item => item?.type === 'gift').length <= 1
      && prizes.every(item => item && typeof item.id === 'string' && item.id.trim() && ['coupon', 'gift', 'points'].includes(item.type)
        && typeof item.value === 'string' && item.value.trim() && typeof item.label === 'string' && item.label.trim()
        && (item.type !== 'gift' || validGiftPool(item)));
  }
  function giftProducts(prize) {
    return Array.isArray(prize?.products) ? prize.products : prize?.product ? [prize.product] : [];
  }
  function validGiftPool(prize) {
    if (prize.stockRemaining !== undefined && (!Number.isInteger(prize.stockRemaining) || prize.stockRemaining < 0)) return false;
    if (prize.soldOut !== undefined && typeof prize.soldOut !== 'boolean') return false;
    if (!Object.prototype.hasOwnProperty.call(prize, 'products')) return true; // legacy single-product config
    return Array.isArray(prize.products) && prize.products.length > 0
      && new Set(prize.products.map(p => p?.id)).size === prize.products.length
      && prize.products.every(p => p && typeof p.id === 'string' && p.id.trim() && Number.isInteger(p.stockRemaining) && p.stockRemaining >= 0
        && typeof p.image === 'string' && p.image.trim() && (typeof p.name === 'string' ? p.name.trim() : p.name && (p.name.en || p.name.ar)));
  }
  function giftSoldOut(prize) {
    const products = giftProducts(prize);
    return prize?.soldOut === true || prize?.stockRemaining === 0 || (products.length > 0 && products.every(p => p.stockRemaining === 0));
  }
  function availableGiftProducts(prize) {
    return giftSoldOut(prize) ? [] : giftProducts(prize).filter(p => p.stockRemaining !== 0);
  }
  function recordPrize(prize, record) {
    if (!prize) return null;
    if (prize.type !== 'gift') return { ...prize };
    // A display sample must never decide the product that the account wins.
    const product = record?.product || (giftProducts(prize).length <= 1 ? giftProducts(prize)[0] : null);
    if (Array.isArray(prize.products) && (!record?.product || !product || typeof product.id !== 'string' || !product.id.trim() || !product.name)) return null;
    return { ...prize, product: product ? JSON.parse(JSON.stringify(product)) : undefined };
  }
  function scenario(name, now = Date.now()) {
    const config = { enabled: true, entryVisible: true, status: 'active', startsAt: null, endsAt: null };
    if (name === 'hidden') config.entryVisible = false;
    else if (name === 'closed') config.enabled = false;
    else if (name === 'not_started') config.startsAt = now + 3600000;
    else if (name === 'ended') config.endsAt = now - 1000;
    else if (name === 'invalid_prizes') config.prizes = [];
    else if (name === 'config_error') config.configError = true;
    return config;
  }
  globalThis.HILIBOX_SPIN_CAMPAIGN = { normalize, state, entryAllowed, validPrizes, giftProducts, giftSoldOut, availableGiftProducts, recordPrize, scenario };
})();
