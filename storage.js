// Saves workouts and history on this device; falls back to memory if storage is unavailable.
(() => {
  const mem = {};
  let ls = null;
  try { ls = window.localStorage; ls.setItem('__ww', '1'); ls.removeItem('__ww'); } catch { ls = null; }
  window.LiftStorage = {
    get: k => ls ? ls.getItem(k) : (k in mem ? mem[k] : null),
    set: (k, v) => { if (ls) ls.setItem(k, v); else mem[k] = v; }
  };
})();
