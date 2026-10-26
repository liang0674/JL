// Local preview ledger only. Production must deduplicate devices and credit accounts on the server.
(() => {
  function ledger(storage, campaignId, dayKey) {
    const key = `hilibox-spin-referrals-v1:${campaignId}`;
    const read = () => JSON.parse(storage.getItem(key) || '{"tokens":{},"devices":{},"credits":{}}');
    const save = value => storage.setItem(key, JSON.stringify(value));
    return {
      create(owner, device, token) {
        const state = read();
        state.tokens[token] = { owner, device };
        save(state);
        return token;
      },
      open(token, device) {
        const state = read(), invitation = state.tokens[token];
        if (!invitation) return { success: false, code: 'SHARE_INVALID' };
        if (device === invitation.device) return { success: true, credited: false, reason: 'self' };
        if (state.devices[device]) return { success: true, credited: false, reason: 'already_counted' };
        state.devices[device] = { token, at: Date.now() };
        const creditKey = `${invitation.owner}:${dayKey()}`;
        state.credits[creditKey] = (state.credits[creditKey] || 0) + 1;
        save(state);
        return { success: true, credited: true };
      },
      bonus(owner) { return read().credits[`${owner}:${dayKey()}`] || 0; }
    };
  }
  globalThis.HILIBOX_SPIN_REFERRAL = { ledger };
})();
