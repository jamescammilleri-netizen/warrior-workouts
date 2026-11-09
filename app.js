(() => {
  const KEY = 'lift.v1';
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uid = () => Math.random().toString(36).slice(2, 10);

  let store;
  try { store = JSON.parse(window.LiftStorage.get(KEY)) || null; } catch { store = null; }
  if (!store) store = { workouts: structuredClone(window.STARTER_WORKOUTS), sessions: [], draft: null, unit: 'lb' };
  // Keep starter media/cues fresh if the bundled data changes
  for (const s of window.STARTER_WORKOUTS) {
    const w = store.workouts.find(x => x.id === s.id);
    if (w && !w.custom) Object.assign(w, structuredClone(s));
    else if (!w) store.workouts.push(structuredClone(s));
  }
  store.unit = store.unit === 'kg' ? 'kg' : 'lb';
  const save = () => { try { window.LiftStorage.set(KEY, JSON.stringify(store)); } catch {} };
  save();

  const view = $('#view'), back = $('#backBtn'), tabbar = $('#tabbar');
  let route = { name: 'library' };
  const stack = [];

  function go(r, push = true) { if (push) stack.push(route); route = r; render(); window.scrollTo(0, 0); }
  back.onclick = () => { route = stack.pop() || { name: 'library' }; render(); };
  tabbar.onclick = e => { const t = e.target.closest('button'); if (!t) return; stack.length = 0; route = { name: t.dataset.tab }; render(); };

  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => t.hidden = true, 1800); }

  // Media: looping silent video with still poster; falls back to the still if video is missing
  function media(path, poster) {
    if (!path) return poster ? `<img src="${esc(poster)}" alt="">` : '';
    return `<video src="${esc(path)}.mp4" poster="${esc(path.replace('/ex-', '/still-'))}.jpg" autoplay muted loop playsinline preload="auto"
      onerror="this.outerHTML='<img src=&quot;${esc(path.replace('/ex-', '/still-'))}.jpg&quot; alt=&quot;&quot; onerror=&quot;this.remove()&quot;>'"></video>`;
  }
  const setsLabel = e => `${e.sets} sets × ${e.reps} reps`;
  const topSets = e => parseInt(String(e.sets).split('-').pop()) || 3;
  const e1rm = (w, r) => (w > 0 && r > 0) ? w * (1 + r / 30) : 0;
  const lastFor = name => {
    for (let i = store.sessions.length - 1; i >= 0; i--) {
      const x = store.sessions[i].exercises.find(e => e.name === name);
      if (x && x.sets.some(s => s.done)) return { date: store.sessions[i].date, sets: x.sets.filter(s => s.done) };
    }
    return null;
  };
  const fmtDate = d => new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  function render() {
    const top = ['library', 'history', 'progress'].includes(route.name);
    back.hidden = top;
    tabbar.hidden = route.name === 'session';
    [...tabbar.children].forEach(b => b.classList.toggle('active', b.dataset.tab === route.name));
    ({ library, workout, session, history, progress })[route.name]();
    view.querySelectorAll('video').forEach(v => { v.muted = true; v.defaultMuted = true; v.playsInline = true; const p = v.play(); if (p) p.catch(() => {}); });
  }

  function coverCard(w, asButton = true) {
    const first = w.exercises[0];
    const vid = w.cover ? `<img src="${esc(w.cover)}" alt="">` : (first && first.media ? `<img src="${esc(first.media.replace('/ex-', '/still-'))}.jpg" alt="">` : '');
    const tag = asButton ? 'button' : 'div';
    return `<${tag} class="cover ${vid ? '' : 'plain'}" ${asButton ? `data-open="${esc(w.id)}"` : ''}>
      ${vid}
      <div class="cover-inner">
        <h1>${esc(w.title)}</h1>
        <div class="sub">${esc(w.subtitle || '')}</div>
        <ol>${w.exercises.map(e => `<li>${esc(e.name)}</li>`).join('')}</ol>
        <div class="meta"><span class="chip gold">${esc(w.tag || 'Workout')}</span><span class="chip">${w.exercises.length} moves</span>${w.source ? `<span class="chip">${esc(w.source)}</span>` : ''}</div>
      </div></${tag}>`;
  }

  function library() {
    const draft = store.draft && store.workouts.find(w => w.id === store.draft.workoutId);
    view.innerHTML = `
      <section class="hero">
        <img src="media/cover-warrior.jpg" alt="Culture Warrior">
      </section>
      <div class="hero-text">
        <h1>Warrior Workouts</h1>
        <p>${store.workouts.length} workouts. Pick today's session.</p>
      </div>
      <div class="eyebrow" style="margin:18px 0 12px">Your workouts</div>
      ${draft ? `<button class="btn primary block" id="resume" style="margin-bottom:14px">Resume ${esc(draft.title)}</button>` : ''}
      ${store.workouts.map(w => coverCard(w)).join('')}
      <button class="btn ghost block" id="newW">New workout</button>`;
    view.onclick = e => {
      const o = e.target.closest('[data-open]'); if (o) return go({ name: 'workout', id: o.dataset.open });
      if (e.target.closest('#newW')) return editWorkout();
      if (e.target.closest('#resume')) return go({ name: 'session' });
    };
  }

  function workout() {
    const w = store.workouts.find(x => x.id === route.id); if (!w) return go({ name: 'library' }, false);
    view.innerHTML = `
      ${coverCard(w, false)}
      ${w.tagline ? `<p class="muted" style="margin:-2px 2px 14px">${esc(w.tagline)}</p>` : ''}
      <button class="btn primary block" id="start">Start workout</button>
      <h2 class="section">The program</h2>
      ${w.exercises.map((e, i) => `<button class="ex" data-preview="${i}">
        ${e.media ? `<div class="thumb"><img src="${esc(e.media.replace('/ex-', '/still-'))}.jpg" alt="" loading="lazy"></div>` : `<div class="n">${i + 1}</div>`}
        <div><div class="t">${i + 1}. ${esc(e.name)}</div><div class="s">${esc(setsLabel(e))} · rest ${Math.round((e.rest || 90) / 60 * 10) / 10} min</div></div></button>`).join('')}
      ${w.science ? `<h2 class="section">The science</h2><div class="science">${esc(w.science)}
        ${(w.references || []).filter(r => /^https?:\/\//i.test(r.url || '')).map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`).join('')}</div>` : ''}
      ${w.note ? `<p class="muted small" style="margin-top:12px">${esc(w.note)}</p>` : ''}
      <div class="row" style="margin-top:18px"><button class="btn ghost" id="edit">Edit</button><button class="btn ghost" id="dup">Duplicate</button></div>`;
    view.onclick = e => {
      if (e.target.closest('#start')) {
        if (store.draft && store.draft.workoutId !== w.id && !confirmInline()) return;
        store.draft = { id: uid(), workoutId: w.id, title: w.title, date: Date.now(), idx: 0,
          exercises: w.exercises.map(ex => {
            const last = lastFor(ex.name);
            return { name: ex.name, sets: Array.from({ length: topSets(ex) }, (_, k) => ({ w: last?.sets[k]?.w ?? last?.sets.at(-1)?.w ?? '', r: '', done: false })) };
          }) };
        save(); return go({ name: 'session' });
      }
      const p = e.target.closest('[data-preview]');
      if (p) { if (!store.draft || store.draft.workoutId !== w.id) { $('#start').click(); } store.draft.idx = +p.dataset.preview; save(); render(); return; }
      if (e.target.closest('#edit')) return editWorkout(w);
      if (e.target.closest('#dup')) { const c = structuredClone(w); c.id = uid(); c.title += ' (copy)'; c.custom = true; store.workouts.push(c); save(); toast('Duplicated'); go({ name: 'workout', id: c.id }, false); }
    };
  }
  function confirmInline() { return true; }

  // Rest timer
  let tEnd = 0, tInt = null;
  const timerEl = $('#timer'), timerText = $('#timerText');
  function startTimer(sec) { tEnd = Date.now() + sec * 1000; timerEl.hidden = false; tick(); clearInterval(tInt); tInt = setInterval(tick, 250); }
  function tick() {
    const left = Math.max(0, Math.round((tEnd - Date.now()) / 1000));
    timerText.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    if (left <= 0) { clearInterval(tInt); timerEl.hidden = true; if (navigator.vibrate) navigator.vibrate([200, 100, 200]); toast('Rest done. Next set.'); }
  }
  $('#timerMinus').onclick = () => { tEnd -= 15000; tick(); };
  $('#timerPlus').onclick = () => { tEnd += 15000; tick(); };
  $('#timerSkip').onclick = () => { tEnd = 0; clearInterval(tInt); timerEl.hidden = true; };

  function session() {
    const d = store.draft; if (!d) return go({ name: 'library' }, false);
    const w = store.workouts.find(x => x.id === d.workoutId) || { exercises: [] };
    const i = Math.min(d.idx, d.exercises.length - 1);
    const ex = w.exercises[i] || { name: d.exercises[i].name, sets: '3', reps: '8-12' };
    const log = d.exercises[i];
    const last = lastFor(ex.name);
    view.innerHTML = `
      <div class="reel">
        ${media(ex.media)}
        <span class="chip badge">${esc(d.title)}</span><span class="chip count">${i + 1} / ${d.exercises.length}</span>
        <div class="cap"><h3>${i + 1}. ${esc(ex.name)}</h3>
          <ul><li>${esc(setsLabel(ex))}</li>${(ex.cues || []).map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
      </div>
      <div class="dots">${d.exercises.map((x, k) => `<i class="${k === i ? 'on' : x.sets.every(s => s.done) ? 'done' : ''}"></i>`).join('')}</div>
      <div class="set-head"><span>Set</span><span>${store.unit}</span><span>Reps</span><span></span></div>
      <div class="sets">${log.sets.map((s, k) => `
        <div class="set ${s.done ? 'ok' : ''}" data-k="${k}">
          <span class="lbl">${k + 1}</span>
          <input inputmode="decimal" data-f="w" value="${esc(s.w)}" placeholder="${ex.bodyweight ? 'BW' : (last?.sets[k]?.w ?? '—')}" aria-label="Weight set ${k + 1}">
          <input inputmode="numeric" data-f="r" value="${esc(s.r)}" placeholder="${esc(last?.sets[k]?.r ?? (/^\d/.test(ex.reps) ? String(ex.reps).split('-')[0] : 'Max'))}" aria-label="Reps set ${k + 1}">
          <button class="chk" data-done aria-label="Complete set ${k + 1}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg></button>
        </div>`).join('')}</div>
      <button class="addset" id="addSet">+ Add set</button>
      ${last ? `<div class="prev">Last time (${fmtDate(last.date)}): ${last.sets.map(s => `${esc(s.w || 'BW')}×${esc(s.r)}`).join(', ')}</div>` : ''}
      <div class="row" style="margin-top:18px">
        <button class="btn ghost" id="prev" ${i === 0 ? 'disabled style="opacity:.4"' : ''}>Back</button>
        ${i < d.exercises.length - 1 ? `<button class="btn primary" id="next">Next exercise</button>` : `<button class="btn primary" id="finish">Finish workout</button>`}
      </div>
      <button class="btn ghost block" id="discard" style="margin-top:10px;color:var(--muted)">Discard session</button><div style="height:90px"></div>`;

    view.oninput = e => { const inp = e.target.closest('input[data-f]'); if (!inp) return; const k = +inp.closest('.set').dataset.k; log.sets[k][inp.dataset.f] = inp.value; save(); };
    view.onclick = e => {
      const dn = e.target.closest('[data-done]');
      if (dn) {
        const row = dn.closest('.set'), k = +row.dataset.k, s = log.sets[k];
        if (!s.r) s.r = row.querySelector('[data-f=r]').placeholder.replace(/\D/g, '') || '';
        if (!s.w && !ex.bodyweight) { const ph = row.querySelector('[data-f=w]').placeholder; if (/^\d/.test(ph)) s.w = ph; }
        if (!s.done && !s.r) { row.querySelector('[data-f=r]').focus(); return toast('Enter your reps'); }
        s.done = !s.done; s.at = s.done ? Date.now() : undefined; save(); render();
        if (s.done) startTimer(ex.rest || 90);
        return;
      }
      if (e.target.closest('#addSet')) { const l = log.sets.at(-1) || {}; log.sets.push({ w: l.w || '', r: '', done: false }); save(); return render(); }
      if (e.target.closest('#next')) { d.idx = i + 1; save(); render(); return window.scrollTo(0, 0); }
      if (e.target.closest('#prev')) { d.idx = Math.max(0, i - 1); save(); render(); return window.scrollTo(0, 0); }
      if (e.target.closest('#finish')) {
        const done = d.exercises.reduce((n, x) => n + x.sets.filter(s => s.done).length, 0);
        if (!done) return toast('Log at least one set first');
        store.sessions.push({ ...d, end: Date.now(), duration: activeMs({ ...d, end: Date.now() }) }); store.draft = null; save();
        $('#timerSkip').click(); toast('Workout saved'); stack.length = 0; return go({ name: 'history' }, false);
      }
      if (e.target.closest('#discard')) {
        if (e.target.dataset.armed) { store.draft = null; save(); $('#timerSkip').click(); stack.length = 0; return go({ name: 'library' }, false); }
        e.target.dataset.armed = 1; e.target.textContent = 'Tap again to discard'; e.target.style.color = '#e07a6a';
      }
    };
  }

  // Workout time: start to finish, but if the session was left open, stop counting
  // 10 minutes after the last checked set. Never more than 3 hours.
  const CAP = 3 * 3600e3, TAIL = 10 * 60e3;
  function activeMs(s) {
    const start = s.date, end = s.end || (s.date + (s.duration || 0));
    const stamps = s.exercises.flatMap(x => x.sets.filter(y => y.done && y.at).map(y => y.at));
    let stop = end;
    if (stamps.length) stop = Math.min(end, Math.max(...stamps) + TAIL);
    return Math.max(0, Math.min(CAP, stop - start));
  }
  const mins = ms => Math.round(ms / 60000);
  const fmtDur = ms => { const m = mins(ms); return m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`; };
  const weekStart = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };
  function weekStreak(list) {
    if (!list.length) return 0;
    const weeks = new Set(list.map(s => weekStart(s.date)));
    let w = weekStart(Date.now()); if (!weeks.has(w)) w -= 7 * 864e5;
    let n = 0; while (weeks.has(w)) { n++; w = weekStart(w - 3 * 864e5); }
    return n;
  }
  function statsPanel() {
    const L = store.sessions, now = new Date();
    const durs = L.map(activeMs), total = durs.reduce((a, b) => a + b, 0);
    const wk = weekStart(Date.now()), mo = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const sum = f => L.reduce((a, s, i) => a + (f(s) ? durs[i] : 0), 0);
    const cnt = f => L.filter(f).length;
    const streak = weekStreak(L);
    return `<div class="card stats">
      <div class="top"><div><div class="eyebrow">Total training time</div><div class="big" style="font-size:38px;margin-top:4px">${fmtDur(total)}</div></div>
        <div style="text-align:right"><div class="big">${L.length}</div><div class="muted small">workouts</div></div></div>
      <div class="stat-grid">
        <div class="stat"><b>${fmtDur(sum(s => s.date >= wk))}</b><span>this week · ${cnt(s => s.date >= wk)}</span></div>
        <div class="stat"><b>${fmtDur(sum(s => s.date >= mo))}</b><span>this month · ${cnt(s => s.date >= mo)}</span></div>
        <div class="stat"><b>${L.length ? fmtDur(total / L.length) : '0m'}</b><span>avg workout</span></div>
      </div>
      <div class="muted small" style="margin-top:10px">${streak ? `${streak}-week streak. Keep it going.` : 'Log a workout this week to start a streak.'}</div>
    </div>`;
  }

  const volume = s => s.exercises.reduce((v, x) => v + x.sets.filter(y => y.done).reduce((a, y) => a + (+y.w || 0) * (+y.r || 0), 0), 0);

  function history() {
    const list = [...store.sessions].reverse();
    view.innerHTML = `<div class="eyebrow" style="margin:6px 0 12px">History</div>` + statsPanel() + (list.length ? list.map(s => {
      const sets = s.exercises.reduce((n, x) => n + x.sets.filter(y => y.done).length, 0);
      return `<div class="card"><div class="top"><div><b>${esc(s.title)}</b><div class="muted small">${fmtDate(s.date)}</div></div>
        <div class="big">${Math.round(volume(s)).toLocaleString()}<span class="muted small"> ${store.unit}</span></div></div>
        <div class="stat-grid"><div class="stat"><b>${sets}</b><span>sets</span></div><div class="stat"><b>${s.exercises.filter(x => x.sets.some(y => y.done)).length}</b><span>exercises</span></div><div class="stat"><b>${fmtDur(Math.max(60000, activeMs(s)))}</b><span>time</span></div></div>
        <div class="muted small" style="margin-top:10px;line-height:1.6">${s.exercises.filter(x => x.sets.some(y => y.done)).map(x => `${esc(x.name)}: ${x.sets.filter(y => y.done).map(y => `${esc(y.w || 'BW')}×${esc(y.r)}`).join(', ')}`).join('<br>')}</div></div>`;
    }).join('') : `<div class="empty">No workouts logged yet.<br>Start Chest Day to see it here.</div>`);
    view.onclick = null;
  }

  function progress() {
    const names = [...new Set(store.sessions.flatMap(s => s.exercises.filter(x => x.sets.some(y => y.done)).map(x => x.name)))];
    view.innerHTML = `<div class="eyebrow" style="margin:6px 0 12px">Progress · estimated 1-rep max</div>` + (names.length ? names.map(n => {
      const pts = store.sessions.map(s => { const x = s.exercises.find(e => e.name === n); if (!x) return null; const b = Math.max(0, ...x.sets.filter(y => y.done).map(y => e1rm(+y.w, +y.r))); return b ? { d: s.date, v: b } : null; }).filter(Boolean);
      const best = Math.max(0, ...pts.map(p => p.v));
      const reps = Math.max(0, ...store.sessions.flatMap(s => (s.exercises.find(e => e.name === n)?.sets || []).filter(y => y.done).map(y => +y.r || 0)));
      return `<div class="card"><div class="top"><b>${esc(n)}</b><div class="big">${best ? Math.round(best) : reps}<span class="muted small"> ${best ? store.unit : 'reps'}</span></div></div>${spark(pts)}</div>`;
    }).join('') : `<div class="empty">Log a workout to start tracking strength.</div>`);
    view.onclick = null;
  }
  function spark(pts) {
    if (pts.length < 2) return `<div class="muted small" style="margin-top:6px">${pts.length ? 'One session logged. Trend appears after the next one.' : 'Bodyweight movement'}</div>`;
    const vs = pts.map(p => p.v), mn = Math.min(...vs), mx = Math.max(...vs), W = 300, H = 44;
    const xy = pts.map((p, i) => [i / (pts.length - 1) * W, H - 4 - ((p.v - mn) / ((mx - mn) || 1)) * (H - 8)]);
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><polyline fill="none" stroke="#d9a441" stroke-width="2" points="${xy.map(p => p.join(',')).join(' ')}"/></svg>`;
  }

  // Sheet: workout editor + data menu
  const sheet = $('#sheet'), sb = $('#sheetBody');
  function editWorkout(w) {
    const isNew = !w;
    const draft = w ? structuredClone(w) : { id: uid(), custom: true, title: '', subtitle: '', tag: '', exercises: [{ name: '', sets: '3', reps: '8-12', rest: 90 }] };
    const draw = () => {
      sb.innerHTML = `<h2 class="section" style="margin-top:0">${isNew ? 'New workout' : 'Edit workout'}</h2>
        <div class="field"><label>Title</label><input id="fT" value="${esc(draft.title)}" placeholder="Leg Day"></div>
        <div class="field"><label>Subtitle</label><input id="fS" value="${esc(draft.subtitle)}" placeholder="Complete Lower-Body Workout"></div>
        <div class="field"><label>Tag</label><input id="fG" value="${esc(draft.tag)}" placeholder="Legs"></div>
        <div class="set-head" style="grid-template-columns:1fr 64px 64px 34px;text-align:left"><span>Exercise</span><span>Sets</span><span>Reps</span><span></span></div>
        ${draft.exercises.map((e, i) => `<div class="edit-ex" data-i="${i}"><input data-k="name" value="${esc(e.name)}" placeholder="Exercise"><input data-k="sets" value="${esc(e.sets)}"><input data-k="reps" value="${esc(e.reps)}"><button data-rm aria-label="Remove" class="muted">✕</button></div>`).join('')}
        <button class="addset" id="addEx">+ Add exercise</button>
        <div class="row" style="margin-top:14px"><button class="btn ghost" id="cancel">Cancel</button><button class="btn primary" id="saveW">Save</button></div>
        ${!isNew && w.custom ? `<button class="btn ghost block" id="delW" style="margin-top:10px;color:#e07a6a">Delete workout</button>` : ''}`;
    };
    draw();
    sb.oninput = e => {
      const r = e.target.closest('.edit-ex'); if (r) draft.exercises[+r.dataset.i][e.target.dataset.k] = e.target.value;
      if (e.target.id === 'fT') draft.title = e.target.value; if (e.target.id === 'fS') draft.subtitle = e.target.value; if (e.target.id === 'fG') draft.tag = e.target.value;
    };
    sb.onclick = e => {
      if (e.target.closest('#addEx')) { draft.exercises.push({ name: '', sets: '3', reps: '8-12', rest: 90 }); draw(); }
      const rm = e.target.closest('[data-rm]'); if (rm) { draft.exercises.splice(+rm.parentElement.dataset.i, 1); draw(); }
      if (e.target.closest('#cancel')) sheet.close();
      if (e.target.closest('#delW')) { store.workouts = store.workouts.filter(x => x.id !== w.id); save(); sheet.close(); stack.length = 0; go({ name: 'library' }, false); }
      if (e.target.closest('#saveW')) {
        draft.exercises = draft.exercises.filter(x => x.name.trim()); if (!draft.title.trim() || !draft.exercises.length) return toast('Add a title and one exercise');
        if (!isNew && !w.custom) draft.custom = true;
        const k = store.workouts.findIndex(x => x.id === draft.id); if (k >= 0) store.workouts[k] = draft; else store.workouts.push(draft);
        save(); sheet.close(); toast('Saved'); go({ name: 'workout', id: draft.id }, isNew);
      }
    };
    sheet.showModal();
  }

  $('#menuBtn').onclick = () => {
    sb.innerHTML = `<h2 class="section" style="margin-top:0">Data & settings</h2>
      <div class="row" style="margin-bottom:10px"><button class="btn ${store.unit === 'lb' ? 'primary' : 'ghost'}" data-unit="lb">lb</button><button class="btn ${store.unit === 'kg' ? 'primary' : 'ghost'}" data-unit="kg">kg</button></div>
      <button class="btn ghost block" id="exp" style="margin-bottom:8px">Export data (JSON)</button>
      <label class="btn ghost block" style="margin-bottom:8px">Import data<input type="file" id="imp" accept="application/json" hidden></label>
      <p class="muted small" style="margin:8px 2px 14px;line-height:1.5">Everything is saved on this device. On iPhone, tap Share → Add to Home Screen to use Warrior Workouts like an app.</p>
      <button class="btn ghost block" id="close">Close</button>`;
    sb.onclick = e => {
      const u = e.target.closest('[data-unit]'); if (u) { store.unit = u.dataset.unit; save(); $('#menuBtn').click(); render(); }
      if (e.target.closest('#close')) sheet.close();
      if (e.target.closest('#exp')) {
        const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' }));
        a.download = `warrior-workouts-${new Date().toISOString().slice(0, 10)}.json`; a.click(); toast('Exported');
      }
    };
    sb.onchange = e => {
      if (e.target.id !== 'imp') return; const f = e.target.files[0]; if (!f) return;
      f.text().then(t => { const d = JSON.parse(t); if (Array.isArray(d)) d.forEach(w => { w.id ||= uid(); w.custom = true; store.workouts.push(w); }); else if (d.workouts) store = d; store.unit = store.unit === 'kg' ? 'kg' : 'lb'; save(); sheet.close(); toast('Imported'); render(); }).catch(() => toast('Could not read that file'));
    };
    sheet.showModal();
  };
  sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });

  render();
})();
