/* Gujarati Shikho: prototype app logic. No build step, no dependencies. */
(function () {
  'use strict';

  const C = window.COURSE;
  const CFG = window.APP_CONFIG || {};
  const KEY = CFG.storageKey || 'gujarati-shikho-v1';
  const root = document.getElementById('app');

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const pad = (n) => String(n).padStart(2, '0');
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const dayDiff = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);

  /* ---------- course data ---------- */
  const lessons = C.lessons;
  const byId = {};
  const idx = {};
  const itemById = {};
  const pool = { letter: [], word: [] };
  lessons.forEach((l, i) => {
    byId[l.id] = l;
    idx[l.id] = i;
    (l.items || []).forEach((it, n) => {
      it.id = l.id + '-' + (n + 1);
      it.kind = l.kind;
      itemById[it.id] = it;
      pool[l.kind].push(it);
    });
  });

  function itemsFor(l) {
    if (!l.from) return l.items.slice();
    const seen = new Set();
    const src = [];
    l.from.forEach((id) => byId[id].items.forEach((it) => {
      if (!seen.has(it.gu)) { seen.add(it.gu); src.push(it); }
    }));
    return shuffle(src).slice(0, l.count || 10);
  }

  /* ---------- exercises ---------- */
  const FIELD = { 'hear-gu': 'gu', 'see-rom': 'rom', 'see-en': 'en', 'en-gu': 'gu' };
  const typesFor = (it) => (it.kind === 'letter' ? ['hear-gu', 'see-rom'] : ['see-en', 'en-gu', 'hear-gu']);

  function distractors(it, field, n) {
    const seen = new Set([it[field]]);
    const out = [];
    for (const c of shuffle(pool[it.kind])) {
      const v = c[field];
      if (!seen.has(v)) { seen.add(v); out.push(v); if (out.length === n) break; }
    }
    return out;
  }
  function makeExercise(type, it) {
    const f = FIELD[type];
    return { type, item: it, correct: it[f], options: shuffle([it[f]].concat(distractors(it, f, 3))), retry: false };
  }
  function makeExercises(items, cap) {
    const first = [];
    const rest = [];
    items.forEach((it) => {
      const t = shuffle(typesFor(it));
      first.push(makeExercise(t[0], it));
      t.slice(1).forEach((x) => rest.push(makeExercise(x, it)));
    });
    return shuffle(first.concat(shuffle(rest).slice(0, Math.max(0, cap - first.length))));
  }

  /* ---------- progress (saved in this browser only) ---------- */
  const DEFAULTS = () => ({ done: {}, xp: 0, streak: 0, lastDay: null, unlockAll: false, showRom: true });
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      return Object.assign(DEFAULTS(), raw, { done: Object.assign({}, raw.done) });
    } catch (e) { return DEFAULTS(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* private mode: ignore */ } }
  let P = load();
  const isDone = (id) => !!P.done[id];
  const liveStreak = () => (P.lastDay && dayDiff(P.lastDay, today()) <= 1 ? P.streak : 0);
  function bumpStreak() {
    const t = today();
    if (P.lastDay === t) return;
    P.streak = P.lastDay && dayDiff(P.lastDay, t) === 1 ? P.streak + 1 : 1;
    P.lastDay = t;
  }
  const unlocked = (l) => P.unlockAll || idx[l.id] === 0 || isDone(lessons[idx[l.id] - 1].id);

  /* ---------- audio ---------- */
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let voices = [];
  function refreshVoices() { if (synth) voices = synth.getVoices() || []; }
  const guVoice = () => voices.find((v) => String(v.lang || '').toLowerCase().replace('_', '-').indexOf(C.voiceLang) === 0);
  refreshVoices();
  if (synth) {
    const onVoices = () => { refreshVoices(); if (view === 'home') render(); };
    if (synth.addEventListener) synth.addEventListener('voiceschanged', onVoices); else synth.onvoiceschanged = onVoices;
  }
  let toastTimer = null;
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.remove(); }, 3200);
  }
  function speakTTS(text) {
    if (!synth) { toast('This browser cannot play audio.'); return; }
    refreshVoices();
    const v = guVoice();
    if (!v) { toast('No Gujarati voice found on this device. Try Chrome on Android, or add recorded audio.'); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v; u.lang = v.lang; u.rate = 0.85;
    synth.speak(u);
  }
  function play(it) {
    if (!it) return;
    const text = it.say || it.gu;
    if (CFG.useRecordedAudio) {
      let fell = false;
      const fallback = () => { if (!fell) { fell = true; speakTTS(text); } };
      const a = new Audio((CFG.audioDir || 'audio/') + it.id + '.mp3');
      a.addEventListener('error', fallback);
      const p = a.play();
      if (p && p.catch) p.catch(fallback);
      return;
    }
    speakTTS(text);
  }

  /* ---------- state ---------- */
  let view = 'home';          // home | lesson | review
  let session = null;
  let autoplay = null;
  let scrollTop = false;
  let toolsOpen = false;

  function startLesson(id) {
    const l = byId[id];
    const items = itemsFor(l);
    session = {
      lesson: l, items,
      phase: l.from ? 'quiz' : 'learn',
      card: 0, qi: 0, picked: null, ok: false,
      queue: makeExercises(items, l.from ? 14 : 12),
      right: 0, tried: 0
    };
    view = 'lesson';
    scrollTop = true;
    autoplay = session.phase === 'learn' ? items[0] : (session.queue[0].type === 'hear-gu' ? session.queue[0].item : null);
    render();
  }
  function goHome() { view = 'home'; session = null; scrollTop = true; render(); }

  function pick(i) {
    const s = session;
    const ex = s.queue[s.qi];
    if (s.picked !== null) return;
    s.picked = i;
    s.ok = ex.options[i] === ex.correct;
    if (!ex.retry) {
      s.tried++;
      if (s.ok) s.right++;
      else s.queue.push(Object.assign({}, ex, { retry: true, options: shuffle(ex.options) }));
    }
    render();
    if (ex.type !== 'hear-gu') play(ex.item);
  }

  function next() {
    const s = session;
    if (s.phase === 'learn') {
      if (s.card < s.items.length - 1) {
        s.card++;
        autoplay = s.items[s.card];
      } else {
        s.phase = 'quiz'; s.qi = 0; s.picked = null;
        autoplay = s.queue[0].type === 'hear-gu' ? s.queue[0].item : null;
      }
      render();
      return;
    }
    s.qi++; s.picked = null;
    if (s.qi >= s.queue.length) { finish(); return; }
    autoplay = s.queue[s.qi].type === 'hear-gu' ? s.queue[s.qi].item : null;
    render();
  }

  function finish() {
    const s = session;
    const acc = s.tried ? s.right / s.tried : 1;
    const xp = 10 + s.right * 2;
    const prev = P.done[s.lesson.id];
    P.done[s.lesson.id] = { best: Math.max(prev ? prev.best : 0, Math.round(acc * 100)) };
    P.xp += xp;
    bumpStreak();
    save();
    s.phase = 'result'; s.acc = acc; s.xp = xp;
    scrollTop = true;
    render();
  }

  /* ---------- views ---------- */
  const glyphSize = (it) => (it.kind === 'letter' ? 'big' : it.gu.length > 11 ? 'xs' : it.gu.length > 6 ? 'sm' : 'md');

  function homeView() {
    const nextL = lessons.find((l) => !isDone(l.id));
    const started = Object.keys(P.done).length > 0;
    const hasVoice = !!guVoice();
    let h = '<header class="hero">' +
      '<div class="stats"><span class="pill">' + liveStreak() + ' day streak</span><span class="pill">' + P.xp + ' XP</span></div>' +
      '<h1 class="wordmark gu" lang="gu">' + esc(C.nativeName) + '</h1>' +
      '<p class="hero-sub">Learn to read and speak ' + esc(C.name) + ', one short lesson at a time.</p></header>';
    h += '<main class="home-body">';
    if (nextL) {
      h += '<section class="resume"><div class="tile mini gu' + (nextL.icon.length > 2 ? ' long' : '') + '" lang="gu">' + esc(nextL.icon) + '</div>' +
        '<div class="resume-text"><h2>' + esc(nextL.title) + '</h2><p>' + (started ? 'Pick up where you left off' : 'Start with the letters') + '</p></div>' +
        '<button class="btn" data-a="open" data-id="' + nextL.id + '">' + (started ? 'Continue' : 'Start') + '</button></section>';
    } else {
      h += '<section class="resume finished"><h2>You finished the course</h2><p>Repeat any lesson to keep it fresh.</p></section>';
    }
    if (!CFG.useRecordedAudio && !hasVoice) {
      h += '<p class="note">' + (synth
        ? 'This device has no Gujarati voice, so the sound buttons stay silent. Chrome on Android usually has one.'
        : 'This browser cannot play audio, so the sound buttons will not work.') + '</p>';
    }
    C.levels.forEach((lv) => {
      const ls = lessons.filter((l) => l.level === lv.id);
      const doneN = ls.filter((l) => isDone(l.id)).length;
      h += '<section class="level"><h2>' + esc(lv.title) + '</h2><p class="level-sub">' + esc(lv.sub) + '. ' + doneN + ' of ' + ls.length + ' done.</p><ol class="trail">';
      ls.forEach((l) => {
        const done = isDone(l.id);
        const open = unlocked(l);
        const cur = nextL && nextL.id === l.id;
        const state = done ? 'done' : cur ? 'current' : open ? 'open' : 'locked';
        const sub = l.from ? 'Mixed review' : l.items.length + (l.kind === 'letter' ? ' letters and marks' : ' words and phrases');
        h += '<li><button class="stop ' + state + '" data-a="open" data-id="' + l.id + '"' + (open ? '' : ' disabled aria-label="' + esc(l.title) + ' (locked)"') + '>' +
          '<span class="badge gu' + (l.icon.length > 2 ? ' long' : '') + '" lang="gu">' + (open ? esc(l.icon) : '🔒') + '</span>' +
          '<span><span class="stop-title">' + esc(l.title) + '</span><span class="stop-sub">' + esc(sub) + '</span></span></button></li>';
      });
      h += '</ol></section>';
    });
    h += '<details class="tools"' + (toolsOpen ? ' open' : '') + '><summary>Testing tools</summary>' +
      '<label class="check"><input type="checkbox" data-a="toggle-unlock"' + (P.unlockAll ? ' checked' : '') + '> Unlock all lessons</label>' +
      '<label class="check"><input type="checkbox" data-a="toggle-rom"' + (P.showRom ? ' checked' : '') + '> Show transliteration in practice</label>' +
      '<button class="link" data-a="review">Open the content review list</button>' +
      (CFG.feedbackUrl ? '<a class="link" href="' + esc(CFG.feedbackUrl) + '" target="_blank" rel="noopener">Send feedback</a>' : '') +
      '<button class="link danger" data-a="reset">Reset my progress</button></details>';
    return h + '</main>';
  }

  function lessonView() {
    const s = session;
    const learnN = s.lesson.from ? 0 : s.items.length;
    const steps = learnN + s.queue.length;
    const doneSteps = s.phase === 'learn' ? s.card : s.phase === 'result' ? steps : learnN + s.qi + (s.picked !== null ? 1 : 0);
    const pct = Math.round((doneSteps / steps) * 100);
    let h = '<div class="lesson"><div class="top"><button class="x" data-a="quit" aria-label="Leave lesson">✕</button>' +
      '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div></div>';
    if (s.phase === 'learn') h += learnView(s);
    else if (s.phase === 'quiz') h += quizView(s);
    else h += resultView(s);
    return h + '</div>';
  }

  function learnView(s) {
    const it = s.items[s.card];
    const last = s.card === s.items.length - 1;
    return '<section class="stage">' +
      '<p class="count">' + (s.card + 1) + ' of ' + s.items.length + '</p>' +
      '<div class="tile stamp ' + glyphSize(it) + '" lang="gu">' + esc(it.gu) + '</div>' +
      '<p class="rom">' + esc(it.rom) + '</p>' +
      (it.extra ? '<p class="extra gu" lang="gu">' + esc(it.extra) + '</p>' : '') +
      '<p class="mean">' + esc(it.en) + '</p>' +
      '<button class="btn ghost listen" data-a="speak" data-id="' + it.id + '">Listen</button>' +
      (it.ex ? '<p class="ex">In a word: <span class="gu" lang="gu">' + esc(it.ex.gu) + '</span> (' + esc(it.ex.rom) + '), ' + esc(it.ex.en) + '</p>' : '') +
      (s.card === 0 && s.lesson.tip ? '<p class="tip">' + esc(s.lesson.tip) + '</p>' : '') +
      '</section><footer class="dock"><button class="btn wide" data-a="next">' + (last ? 'Start practice' : 'Continue') + '</button></footer>';
  }

  function quizView(s) {
    const ex = s.queue[s.qi];
    const it = ex.item;
    const answered = s.picked !== null;
    const guOpts = ex.type === 'hear-gu' || ex.type === 'en-gu';
    let prompt = '';
    let stim = '';
    if (ex.type === 'hear-gu') {
      prompt = it.kind === 'letter' ? 'Tap the letter you hear' : 'Tap the word you hear';
      stim = '<button class="btn ghost listen" data-a="speak" data-id="' + it.id + '">Play sound</button>';
    } else if (ex.type === 'see-rom') {
      prompt = 'How is this said?';
      stim = '<div class="tile ' + glyphSize(it) + '" lang="gu">' + esc(it.gu) + '</div>';
    } else if (ex.type === 'see-en') {
      prompt = 'What does this mean?';
      stim = '<div class="tile ' + glyphSize(it) + '" lang="gu">' + esc(it.gu) + '</div>' +
        (P.showRom || answered ? '<p class="hint-rom">' + esc(it.rom) + '</p>' : '');
    } else {
      prompt = 'Choose the Gujarati for';
      stim = '<p class="ask">' + esc(it.en) + '</p>';
    }
    const twoCol = ex.type === 'see-rom' || (guOpts && ex.options.every((o) => o.length <= 9));
    let h = '<section class="quiz"><h2 class="prompt">' + prompt + '</h2>' + stim + '<div class="opts' + (twoCol ? ' g2' : '') + '">';
    ex.options.forEach((o, i) => {
      let c = 'opt' + (guOpts ? ' gu' : '');
      if (answered) { if (o === ex.correct) c += ' right'; else if (i === s.picked) c += ' wrong'; }
      h += '<button class="' + c + '" data-a="pick" data-i="' + i + '"' + (answered ? ' disabled' : '') + (guOpts ? ' lang="gu"' : '') + '>' + esc(o) + '</button>';
    });
    h += '</div></section>';
    if (!answered) return h + '<footer class="dock"><button class="btn wide" disabled>Continue</button></footer>';
    const shown = guOpts ? '<span class="gu" lang="gu">' + esc(ex.correct) + '</span>' : esc(ex.correct);
    return h + '<footer class="dock ' + (s.ok ? 'good' : 'bad') + '"><div class="fb" role="status"><strong>' + (s.ok ? 'Correct' : 'Not quite') + '</strong>' +
      (s.ok ? '' : 'The answer is ' + shown + '.') + '</div><button class="btn wide" data-a="next">Continue</button></footer>';
  }

  function resultView(s) {
    const pct = Math.round(s.acc * 100);
    const msg = pct >= 90 ? 'Excellent work.' : pct >= 70 ? 'Good work.' : 'Repeating this lesson helps the sounds stick.';
    return '<section class="stage result"><div class="tile big stamp gu" lang="gu">✓</div>' +
      '<h1>' + (s.lesson.from ? 'Checkpoint complete' : 'Lesson complete') + '</h1>' +
      '<p class="mean">' + s.right + ' of ' + s.tried + ' right on the first try. ' + msg + '</p>' +
      '<p class="xp">+' + s.xp + ' XP</p></section>' +
      '<footer class="dock row"><button class="btn ghost" data-a="again">Practice again</button><button class="btn" data-a="home">Continue</button></footer>';
  }

  function reviewRows() {
    const rows = [];
    lessons.forEach((l) => (l.items || []).forEach((it) => rows.push({ l, it })));
    return rows;
  }
  function reviewView() {
    let h = '<div class="rv"><h1>Content review</h1>' +
      '<p>For a native speaker to check. Read each row, then note anything wrong: spelling, transliteration, meaning, or how it should sound. Highlighted rows are ones we are least sure about. The file name is what to call each recording.</p>' +
      '<div class="rv-actions"><button class="btn" data-a="copy-csv">Copy as CSV</button><button class="btn ghost" data-a="home">Back to the course</button></div>';
    lessons.forEach((l) => {
      if (!l.items) return;
      h += '<h2>' + esc(l.title) + '</h2><div class="rv-scroll"><table><thead><tr><th>Gujarati</th><th>Said as</th><th>Meaning or hint</th><th>Audio file</th></tr></thead><tbody>';
      l.items.forEach((it) => {
        h += '<tr' + (it.check ? ' class="flag"' : '') + '><td class="gu" lang="gu">' + esc(it.gu) + '</td><td>' + esc(it.rom) + '</td><td>' + esc(it.en) + (it.check ? ' <strong>(please check)</strong>' : '') + '</td><td><code>' + it.id + '.mp3</code></td></tr>';
      });
      h += '</tbody></table></div>';
    });
    return h + '</div>';
  }
  function copyCsv() {
    const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
    const lines = [['audio_file', 'lesson', 'gujarati', 'said_as', 'meaning_or_hint', 'needs_native_check'].map(q).join(',')];
    reviewRows().forEach((r) => lines.push([r.it.id + '.mp3', r.l.title, r.it.gu, r.it.rom, r.it.en, r.it.check ? 'yes' : ''].map(q).join(',')));
    const text = lines.join('\n');
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Copied. Paste it into a spreadsheet.'); } catch (e) { toast('Could not copy on this browser.'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('Copied. Paste it into a spreadsheet.'), fallback);
    } else fallback();
  }

  /* ---------- render and events ---------- */
  function render() {
    root.innerHTML = view === 'home' ? homeView() : view === 'review' ? reviewView() : lessonView();
    if (scrollTop) { window.scrollTo(0, 0); scrollTop = false; }
    if (autoplay) { const it = autoplay; autoplay = null; setTimeout(() => play(it), 150); }
  }

  root.addEventListener('click', (e) => {
    const el = e.target.closest('[data-a]');
    if (!el || el.disabled) return;
    switch (el.dataset.a) {
      case 'open': startLesson(el.dataset.id); break;
      case 'speak': play(itemById[el.dataset.id]); break;
      case 'next': next(); break;
      case 'pick': pick(Number(el.dataset.i)); break;
      case 'quit': if (window.confirm('Leave this lesson? Your answers in it will not be saved.')) goHome(); break;
      case 'home': goHome(); break;
      case 'again': startLesson(session.lesson.id); break;
      case 'review': view = 'review'; scrollTop = true; render(); break;
      case 'copy-csv': copyCsv(); break;
      case 'toggle-unlock': P.unlockAll = el.checked; save(); toolsOpen = true; render(); break;
      case 'toggle-rom': P.showRom = el.checked; save(); break;
      case 'reset':
        if (window.confirm('Reset all progress on this device?')) { P = DEFAULTS(); save(); toolsOpen = false; render(); }
        break;
      default: break;
    }
  });
  root.addEventListener('toggle', (e) => { if (e.target.classList && e.target.classList.contains('tools')) toolsOpen = e.target.open; }, true);

  render();
})();
