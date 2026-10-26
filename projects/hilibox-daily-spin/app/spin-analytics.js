// Shared client-only analytics. No reward decisions, credentials or persistent queue.
(() => {
  const g = globalThis;
  const events = new Set(('entry_exposure entry_click page_view rules_view login_prompt login_return draw_click draw_result_view operation_pending operation_reconciled history_view claim_click continue_shopping_click share_panel_view share_channel_click share_channel_result download_prompt_view download_click app_open_click gift_checkout_open client_error').split(' ').map(x => 'spin_' + x));
  const fields = new Set(('campaign_id language page_mode entry_source platform app_version build_id environment is_mock is_test campaign_status auth_state trigger auth_reason result operation request_id draw_id prize_id prize_type product_id sku_id display_source attempt_type record_count channel store target error_code retryable duration_ms page_view_id session_id bag_item_id coupon_instance_id').split(' '));
  const id = () => g.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const session = id();
  let context = { session_id: session, page_view_id: id(), environment: 'production', is_mock: false, is_test: false };
  let config = {}, queue = [], running = false;
  const seen = new Set(), businessSeen = new Set();
  function clean(raw) {
    const out = {};
    for (const [key, value] of Object.entries(raw || {})) {
      if (!fields.has(key)) continue;
      if (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))) out[key] = value;
      else if (typeof value === 'string' && value.length <= 160 && !/[\r\n]|:\/\/|[?&](?:token|shareToken)=/i.test(value)) out[key] = value;
    }
    return out;
  }
  function endpoint() {
    try { const u = new URL(config.endpoint); return u.protocol === 'https:' && !u.username && !u.password && !u.search && !u.hash ? u.href : ''; } catch { return ''; }
  }
  async function flush() {
    if (running || !queue.length || (!config.transport && !endpoint())) return;
    running = true;
    while (queue.length && (config.transport || endpoint())) {
      const item = queue[0];
      try {
        let timer;
        try {
          await Promise.race([
            Promise.resolve().then(() => config.transport ? config.transport(item.event) : fetch(endpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', body: JSON.stringify(item.event) }).then(r => { if (!r.ok) throw new Error('collector'); })),
            new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), 5000); })
          ]);
        } finally { clearTimeout(timer); }
        const index = queue.indexOf(item); if (index >= 0) queue.splice(index, 1);
      } catch {
        item.attempts++;
        if (item.attempts >= 3) { const index = queue.indexOf(item); if (index >= 0) queue.splice(index, 1); }
        running = false;
        setTimeout(flush, Math.min(8000, 1000 * 2 ** item.attempts));
        return;
      }
    }
    running = false;
  }
  function accept(raw) {
    if (!events.has(raw?.event_name) || typeof raw.event_id !== 'string' || !/^[a-zA-Z0-9-]{8,100}$/.test(raw.event_id) || !Number.isFinite(raw.occurred_at) || seen.has(raw.event_id)) return null;
    const event = { ...clean(raw), event_name: raw.event_name, event_id: raw.event_id, schema_version: 1, event_source: 'client', occurred_at: raw.occurred_at };
    let key = '';
    if (event.event_name === 'spin_page_view' && event.page_view_id) key = [event.event_name,event.page_view_id,event.campaign_id,event.page_mode].join(':');
    if (event.event_name === 'spin_draw_result_view' && event.page_view_id && event.draw_id) key = [event.event_name,event.page_view_id,event.draw_id,event.display_source].join(':');
    if (['spin_operation_pending','spin_operation_reconciled'].includes(event.event_name) && event.request_id) key = [event.event_name,event.request_id].join(':');
    if (key && businessSeen.has(key)) return null;
    if (key) { businessSeen.add(key); if (businessSeen.size > 1000) businessSeen.delete(businessSeen.values().next().value); }
    seen.add(event.event_id); if (seen.size > 1000) seen.delete(seen.values().next().value);
    try { config.onEvent?.(event); } catch {}
    let forwarded = false;
    try { forwarded = config.forward?.(event) === true; } catch {}
    if (!forwarded) {
      // No collector configured means local observation only; never replay stale events on enable.
      if (config.transport || endpoint()) { if (queue.length >= 100) queue.shift(); queue.push({ event, attempts: 0 }); flush(); }
    }
    return event;
  }
  g.HILIBOX_SPIN_ANALYTICS = {
    configure(options = {}) { config = { ...config, ...options }; flush(); },
    setContext(value) { context = { ...context, ...clean(value) }; },
    track(name, props = {}) { try { return accept({ ...context, ...clean(props), event_name: name, event_id: id(), occurred_at: Date.now() }); } catch { return null; } },
    accept,
    getContext() { return { ...context }; },
    newPage() { context.page_view_id = id(); return context.page_view_id; }
  };
  g.HILIBOX_SPIN_ANALYTICS.configure(g.HILIBOX_SPIN_ANALYTICS_CONFIG || {});
})();
