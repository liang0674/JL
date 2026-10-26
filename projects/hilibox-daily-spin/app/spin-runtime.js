// Shared by the standalone preview and the App web-view. No reward is decided here.
(() => {
  function dayKey(now = Date.now(), timeZone = 'Asia/Baghdad') {
    return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(now));
  }
  function couponExpiry(claimedAt, hours = 72) {
    return new Date(new Date(claimedAt).getTime() + hours * 60 * 60 * 1000).toISOString();
  }
  function createRequests({ storage, storageKey, timeoutMs = 12000 }) {
    let pending = null;
    try { pending = JSON.parse(storage?.getItem(storageKey) || 'null'); } catch {}
    if (!pending?.requestId || !['draw', 'claim'].includes(pending.kind)) pending = null;
    function save(value) {
      pending = value;
      try { value ? storage?.setItem(storageKey, JSON.stringify(value)) : storage?.removeItem(storageKey); } catch {}
    }
    async function bounded(run) {
      const controller = new AbortController();
      let timer;
      try {
        return await Promise.race([
          Promise.resolve().then(() => run(controller.signal)),
          new Promise((_, reject) => {
            timer = setTimeout(() => {
              const error = new Error('REQUEST_TIMEOUT'); error.code = 'REQUEST_TIMEOUT';
              reject(error); controller.abort();
            }, timeoutMs);
          })
        ]);
      } finally { clearTimeout(timer); }
    }
    return {
      get pending() { return pending; },
      settle() { save(null); },
      bounded,
      async mutate(kind, args, run) {
        // An uncertain operation must be reconciled before another write, including after reload.
        if (pending) { const error = new Error('REQUEST_PENDING'); error.code = 'REQUEST_PENDING'; throw error; }
        const requestId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        save({ kind, requestId, drawId: args.drawId || null });
        const response = await bounded(signal => run({ ...args, requestId, signal }));
        if (response?.success === false) save(null);
        return response;
      },
      reconcile(response) {
        if (!pending) return null;
        const all = [...(response.draws || []), ...(response.history || [])];
        const record = pending.kind === 'draw'
          ? all.find(item => item.requestId === pending.requestId)
          : all.find(item => String(item.drawId) === String(pending.drawId) && item.claimed === true);
        if (record || ['not_found', 'failed'].includes(response.requestStatus)) {
          save(null);
          return record || null;
        }
        return null;
      }
    };
  }
  window.HILIBOX_SPIN_RUNTIME = { dayKey, couponExpiry, createRequests };
})();
