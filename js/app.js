/* ==========================================================================
   Ascend — app logic (vanilla JS, no build step)
   ========================================================================== */

/* ---- small utilities ----------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtMoney = (n) => '$' + Math.round(n).toLocaleString('en-US');
const diffClass = (d) => ({ Easy: 'easy', Medium: 'medium', Hard: 'hard' }[d] || 'medium');
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysSince = (s) => (Date.now() - new Date(s).getTime()) / 86400000;
// Human-friendly "time ago" label from an ISO date string.
function timeAgo(s) {
  if (!s) return '';
  const days = Math.floor(daysSince(s));
  if (days <= 0) return 'today';
  if (days < 30) return days === 1 ? '1 day ago' : `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}
const fmtDate = (s) => (s ? new Date(s).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
// deterministic color from a string (for avatars)
const colorFor = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return `hsl(${Math.abs(h) % 360}, 55%, 45%)`;
};

// Company logo badge: real logo by domain, with graceful fallback to initials.
// Tries DuckDuckGo's icon service, then Google's favicon service, then finally
// falls back to the plain initials badge if neither resolves.
function companyLogo(c, extraCls = '') {
  const initials = escapeHtml(c.logo);
  const cls = `logo-badge ${extraCls}`.trim();
  if (c.domain) {
    const d = encodeURIComponent(c.domain);
    const ddg = `https://icons.duckduckgo.com/ip3/${d}.ico`;
    const google = `https://www.google.com/s2/favicons?domain=${d}&sz=128`;
    // Walk the fallback chain on each load error, ending at the initials badge.
    const onerr =
      "var s=this.dataset.step||'1';" +
      "if(s==='1'){this.dataset.step='2';this.src='" + google + "';}" +
      "else{var b=this.parentNode;b.classList.remove('logo-pic');b.textContent='" + initials + "';}";
    return `<div class="${cls} logo-pic">` +
      `<img src="${ddg}" alt="${escapeHtml(c.name)} logo" loading="lazy" onerror="${onerr}"></div>`;
  }
  return `<div class="${cls}">${initials}</div>`;
}

/* ==========================================================================
   HOME PAGE
   ========================================================================== */
function renderHome() {
  // fields
  const fieldsEl = $('#fields');
  DATA.fields.forEach((f) => {
    const card = el('div', 'card field-card link', `
      <div class="icon">${f.icon}</div>
      <h3 style="margin-top:8px">${f.name}</h3>
      <p class="sub">${f.blurb}</p>`);
    card.onclick = () => document.querySelector('#companies').scrollIntoView({ behavior: 'smooth' });
    fieldsEl.appendChild(card);
  });

  // companies
  const compEl = $('#companies');
  DATA.companies.forEach((c) => {
    const roleList = c.roles.map((r) => `<span class="pill tag">${escapeHtml(r.title)}</span>`).join(' ');
    const card = el('div', 'card link', `
      <div class="row">
        ${companyLogo(c)}
        <div>
          <h3>${escapeHtml(c.name)}</h3>
          <div class="sub">${escapeHtml(c.industry)} · ${escapeHtml(c.hq)}</div>
        </div>
      </div>
      <p class="sub" style="margin:10px 0 10px">${escapeHtml(c.blurb)}</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${roleList}</div>`);
    // go straight to the first role (companies have one role in the MVP)
    card.onclick = () => (location.href = `role.html?company=${c.id}&role=${c.roles[0].id}`);
    compEl.appendChild(card);
  });

  // search
  setupSearch();
}

function setupSearch() {
  const input = $('#search');
  const box = $('#searchResults');
  if (!input) return;

  // flatten companies + roles into searchable entries
  const index = [];
  DATA.companies.forEach((c) =>
    c.roles.forEach((r) =>
      index.push({
        company: c, role: r,
        haystack: `${c.name} ${c.industry} ${r.title} ${r.level}`.toLowerCase(),
      })
    )
  );

  const render = (q) => {
    const query = q.trim().toLowerCase();
    if (!query) { box.classList.add('hidden'); return; }
    const matches = index.filter((e) => e.haystack.includes(query)).slice(0, 6);
    box.innerHTML = '';
    if (!matches.length) {
      box.appendChild(el('div', 'empty', 'No matches yet — try “Morgan Stanley”, “Goldman”, or “risk”.'));
    } else {
      matches.forEach((m) => {
        const item = el('div', 'item', `
          ${companyLogo(m.company)}
          <div>
            <div style="font-weight:700">${escapeHtml(m.role.title)}</div>
            <div class="sub">${escapeHtml(m.company.name)} · ${escapeHtml(m.company.industry)}</div>
          </div>`);
        item.onclick = () => (location.href = `role.html?company=${m.company.id}&role=${m.role.id}`);
        box.appendChild(item);
      });
    }
    box.classList.remove('hidden');
  };

  input.addEventListener('input', (e) => render(e.target.value));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) box.classList.add('hidden');
  });
}

/* ==========================================================================
   ROLE PAGE
   ========================================================================== */
function getParams() {
  const p = new URLSearchParams(location.search);
  return { company: p.get('company'), role: p.get('role') };
}

function renderRole() {
  const { company, role } = getParams();
  const c = findCompany(company);
  const r = c && c.roles.find((x) => x.id === role);
  const root = $('#roleRoot');

  if (!c || !r) {
    root.innerHTML = `<div class="section center"><h2>Role not found</h2>
      <p class="muted">That company/role isn’t in our data yet.</p>
      <a class="btn" href="index.html">Back to search</a></div>`;
    return;
  }

  // ---- header ----
  const s = r.stats;
  const header = el('div');
  header.innerHTML = `
    <div class="role-head">
      ${companyLogo(c, 'lg')}
      <div class="meta">
        <div class="crumb"><a href="index.html">Home</a> › ${escapeHtml(c.name)}</div>
        <h1>${escapeHtml(r.title)}</h1>
        <div class="sub" style="color:var(--slate)">${escapeHtml(c.name)} · ${escapeHtml(r.level)}</div>
        <p>${escapeHtml(r.summary)}</p>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="n">${escapeHtml(s.difficulty)}</div><div class="l">Difficulty</div></div>
      <div class="stat"><div class="n">${escapeHtml(s.applicants)}</div><div class="l">Applicants / yr</div></div>
      <div class="stat"><div class="n">${escapeHtml(String(s.interviews))}</div><div class="l">Interview rounds</div></div>
      <div class="stat"><div class="n">${escapeHtml(s.offerRate)}</div><div class="l">Offer rate</div></div>
    </div>`;
  root.appendChild(header);

  // ---- tabs ----
  const tabs = [
    { id: 'roadmap', label: 'Roadmap', count: r.roadmap.reduce((a, s) => a + s.nodes.length, 0), render: () => renderRoadmap(c, r) },
    { id: 'questions', label: 'Interview Qs', count: r.questions.length, render: () => renderQuestions(c, r) },
    { id: 'networking', label: 'Networking', count: r.people.length, render: () => renderNetworking(c, r) },
    { id: 'comp', label: 'Compensation', count: null, render: () => renderComp(c, r) },
    { id: 'requirements', label: 'Skills & Reqs', count: null, render: () => renderRequirements(c, r) },
  ];

  const tabBar = el('div', 'tabs');
  const panel = el('div', 'panel');
  root.appendChild(tabBar);
  root.appendChild(panel);

  const activate = (t, btn) => {
    tabBar.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    panel.innerHTML = '';
    panel.appendChild(t.render());
    history.replaceState(null, '', `?company=${c.id}&role=${r.id}&tab=${t.id}`);
  };

  const startTab = new URLSearchParams(location.search).get('tab') || 'roadmap';
  tabs.forEach((t) => {
    const btn = el('button', 'tab',
      `${t.label}${t.count != null ? `<span class="count">${t.count}</span>` : ''}`);
    btn.onclick = () => activate(t, btn);
    tabBar.appendChild(btn);
    if (t.id === startTab) setTimeout(() => activate(t, btn), 0);
  });
}

/* ---- TAB: Roadmap -------------------------------------------------------- */
function progressKey(c, r) { return `ascend:done:${c.id}:${r.id}`; }
function getDone(c, r) {
  try { return new Set(JSON.parse(localStorage.getItem(progressKey(c, r)) || '[]')); }
  catch { return new Set(); }
}
function saveDone(c, r, set) {
  localStorage.setItem(progressKey(c, r), JSON.stringify([...set]));
}

// Wire up a lazy-loaded YouTube embed. The thumbnail loads first; clicking it
// swaps in the iframe (so we don't load 20 players at once). If the thumbnail
// 404s — i.e. the video id is invalid — we degrade to a plain YouTube link.
function setupVideo(videoEl) {
  const vid = videoEl.dataset.vid;
  const fallback = videoEl.dataset.fallback;
  const showLink = () => {
    videoEl.innerHTML = fallback
      ? `<a class="video-fallback" href="${fallback}" target="_blank" rel="noopener">▶ Watch on YouTube</a>`
      : '';
  };
  const img = $('img', videoEl);
  if (img) img.onerror = showLink;
  const thumb = $('.video-thumb', videoEl);
  if (thumb) thumb.onclick = () => {
    videoEl.innerHTML =
      `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(vid)}?autoplay=1&rel=0" ` +
      `title="Topic video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  };
}

function renderRoadmap(c, r) {
  const wrap = el('div');
  const done = getDone(c, r);
  const total = r.roadmap.reduce((a, s) => a + s.nodes.length, 0);

  const intro = el('div', 'callout',
    `🗺️ <strong>Work top to bottom.</strong> Each node links to a curated video or guide. Check items off — your progress is saved on this device.`);
  wrap.appendChild(intro);

  const bar = el('div', 'progress-bar', '<span></span>');
  wrap.appendChild(bar);
  const label = el('div', 'sub', '');
  label.style.marginBottom = '18px';
  wrap.appendChild(label);

  const updateProgress = () => {
    const pct = total ? Math.round((done.size / total) * 100) : 0;
    bar.firstChild.style.width = pct + '%';
    label.textContent = `${done.size} of ${total} topics complete (${pct}%)`;
  };

  const roadmap = el('div', 'roadmap');
  r.roadmap.forEach((section) => {
    const sec = el('div', 'road-section');
    sec.appendChild(el('div', 'sec-title', escapeHtml(section.section)));
    const nodes = el('div', 'road-nodes');
    section.nodes.forEach((node) => {
      const isDone = done.has(node.id);
      const nodeEl = el('div', 'node' + (isDone ? ' done' : ''));
      const links = node.resources.map((res) =>
        `<a href="${escapeHtml(res.url)}" target="_blank" rel="noopener">▶ ${escapeHtml(res.label)}</a>`).join('');
      // Embedded video for this topic, if one is mapped. Falls back to a
      // YouTube link (the first resource) if the id is missing or invalid.
      const vid = typeof TOPIC_VIDEOS !== 'undefined' ? TOPIC_VIDEOS[node.id] : null;
      const fallbackUrl = (node.resources[0] && node.resources[0].url) || '';
      const videoHtml = vid
        ? `<div class="video" data-vid="${escapeHtml(vid)}" data-fallback="${escapeHtml(fallbackUrl)}">
             <button class="video-thumb" type="button" aria-label="Play ${escapeHtml(node.title)} video">
               <img src="https://i.ytimg.com/vi/${escapeHtml(vid)}/hqdefault.jpg" alt="" loading="lazy" />
               <span class="play">▶</span>
             </button>
           </div>`
        : '';
      nodeEl.innerHTML = `
        <div class="node-card">
          <div class="check" role="checkbox" aria-checked="${isDone}">${isDone ? '✓' : ''}</div>
          <div class="body">
            <h4>${escapeHtml(node.title)} <span class="pill ${diffClass(node.difficulty)}">${escapeHtml(node.difficulty)}</span></h4>
            <div class="desc">${escapeHtml(node.desc)}</div>
            ${videoHtml}
            <div class="links">${links}</div>
          </div>
        </div>`;
      const videoEl = $('.video', nodeEl);
      if (videoEl) setupVideo(videoEl);
      const check = $('.check', nodeEl);
      check.onclick = () => {
        if (done.has(node.id)) { done.delete(node.id); nodeEl.classList.remove('done'); check.textContent = ''; }
        else { done.add(node.id); nodeEl.classList.add('done'); check.textContent = '✓'; }
        saveDone(c, r, done);
        updateProgress();
      };
      nodes.appendChild(nodeEl);
    });
    sec.appendChild(nodes);
    roadmap.appendChild(sec);
  });
  wrap.appendChild(roadmap);
  updateProgress();
  return wrap;
}

/* ---- TAB: Interview Questions -------------------------------------------- */
function votesKey(c, r) { return `ascend:votes:${c.id}:${r.id}`; }
function userQKey(c, r) { return `ascend:userq:${c.id}:${r.id}`; }

function renderQuestions(c, r) {
  const wrap = el('div');
  wrap.appendChild(el('div', 'callout',
    `💬 <strong>Crowd-sourced from candidates.</strong> Upvote what helped you and add a question you were asked. <strong>Tip:</strong> sort by <em>Most recent</em> (or filter the time window) so you’re not prepping for questions that are no longer used.`));

  // merge seed questions with any user-added ones, apply stored vote deltas
  const userQ = JSON.parse(localStorage.getItem(userQKey(c, r)) || '[]');
  const voteDeltas = JSON.parse(localStorage.getItem(votesKey(c, r)) || '{}');
  let questions = [...r.questions, ...userQ].map((q, i) => ({
    ...q, key: q.key || `seed-${i}`, votes: (q.votes || 0) + (voteDeltas[q.key || `seed-${i}`] || 0),
    date: q.date || todayISO(),
  }));

  // ---- controls: difficulty, recency window, and sort ----
  let activeFilter = 'All'; // difficulty
  let timeframe = 'all';    // recency window
  let sortMode = 'top';     // 'top' = most upvoted, 'recent' = newest first

  // group of pill-buttons that update a variable and redraw
  const makeGroup = (group, options, getActive, onPick) => {
    const bar = el('span', 'q-group');
    options.forEach(([val, label]) => {
      const b = el('button', 'filter' + (val === getActive() ? ' active' : ''), label);
      b.dataset.group = group;
      b.onclick = () => {
        onPick(val);
        bar.querySelectorAll('[data-group]').forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        draw();
      };
      bar.appendChild(b);
    });
    return bar;
  };

  const toolbar = el('div', 'q-toolbar');
  toolbar.appendChild(makeGroup('diff',
    [['All', 'All'], ['Easy', 'Easy'], ['Medium', 'Medium'], ['Hard', 'Hard']],
    () => activeFilter, (v) => (activeFilter = v)));

  const toolbar2 = el('div', 'q-toolbar');
  toolbar2.appendChild(el('span', 'q-label', 'Sort'));
  toolbar2.appendChild(makeGroup('sort',
    [['top', 'Top voted'], ['recent', 'Most recent']],
    () => sortMode, (v) => (sortMode = v)));
  toolbar2.appendChild(el('span', 'q-label', 'Asked'));
  toolbar2.appendChild(makeGroup('time',
    [['all', 'Any time'], ['year', 'Past year'], ['6mo', 'Past 6 mo']],
    () => timeframe, (v) => (timeframe = v)));

  const list = el('div');
  wrap.appendChild(toolbar);
  wrap.appendChild(toolbar2);
  wrap.appendChild(list);

  const withinTimeframe = (q) => {
    if (timeframe === 'all') return true;
    return daysSince(q.date) <= (timeframe === 'year' ? 365 : 183);
  };

  const draw = () => {
    list.innerHTML = '';
    const rows = questions
      .filter((q) => activeFilter === 'All' || q.difficulty === activeFilter)
      .filter(withinTimeframe)
      .sort((a, b) =>
        sortMode === 'recent'
          ? new Date(b.date) - new Date(a.date) || b.votes - a.votes
          : b.votes - a.votes || new Date(b.date) - new Date(a.date)
      );

    if (!rows.length) {
      list.appendChild(el('div', 'empty-note', 'No questions match these filters yet — try widening the time window.'));
      return;
    }

    rows.forEach((q) => {
      const tags = (q.tags || []).map((t) => `<span class="pill tag">${escapeHtml(t)}</span>`).join(' ');
      const stale = daysSince(q.date) > 730; // older than ~2 years
      const item = el('div', 'q-item', `
        <div class="vote">
          <button title="Upvote">▲</button>
          <span class="n">${q.votes}</span>
        </div>
        <div class="q-body">
          <div class="q-text">${escapeHtml(q.q)}</div>
          <div class="q-meta">
            <span class="pill ${diffClass(q.difficulty)}">${escapeHtml(q.difficulty)}</span>
            ${tags}
            ${q.round ? `<span class="round">· ${escapeHtml(q.round)}</span>` : ''}
            <span class="asked" title="Reported ${fmtDate(q.date)}">🕑 asked ${timeAgo(q.date)}</span>
            ${stale ? `<span class="stale" title="This question is over 2 years old and may no longer be used">may be dated</span>` : ''}
          </div>
        </div>`);
      $('.vote button', item).onclick = () => {
        const d = JSON.parse(localStorage.getItem(votesKey(c, r)) || '{}');
        d[q.key] = (d[q.key] || 0) + 1;
        localStorage.setItem(votesKey(c, r), JSON.stringify(d));
        q.votes += 1;
        draw();
      };
      list.appendChild(item);
    });
  };
  draw();

  // add-question form
  const form = el('div', 'add-q', `
    <strong>Were you asked something else? Add it 👇</strong>
    <textarea id="newQ" rows="2" placeholder="e.g. How would you value a company with negative earnings?"></textarea>
    <div class="controls">
      <select id="newQDiff"><option>Easy</option><option selected>Medium</option><option>Hard</option></select>
      <input id="newQRound" placeholder="Round (optional)" style="border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-family:inherit" />
      <button class="btn">Submit question</button>
    </div>`);
  $('button', form).onclick = () => {
    const text = $('#newQ', form).value.trim();
    if (!text) return;
    const entry = {
      key: 'user-' + Date.now(), q: text, difficulty: $('#newQDiff', form).value,
      round: $('#newQRound', form).value.trim() || 'Community', tags: ['Community'], votes: 1,
      date: todayISO(),
    };
    const stored = JSON.parse(localStorage.getItem(userQKey(c, r)) || '[]');
    stored.push(entry);
    localStorage.setItem(userQKey(c, r), JSON.stringify(stored));
    questions.push(entry);
    $('#newQ', form).value = '';
    draw();
  };
  wrap.appendChild(form);
  return wrap;
}

/* ---- TAB: Networking ----------------------------------------------------- */
function renderNetworking(c, r) {
  const wrap = el('div');
  wrap.appendChild(el('div', 'callout',
    `🤝 <strong>Warm outreach beats cold applications.</strong> These are people in this role you could reach out to. Use the message template, personalize it, and keep it short. (Sample profiles for the demo — real version would pull from LinkedIn.)`));

  const grid = el('div', 'grid cols-2');
  r.people.forEach((p) => {
    const initials = p.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
    const linkedinSearch = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(p.name + ' ' + c.name)}`;
    const card = el('div', 'card');
    card.innerHTML = `
      <div class="person">
        <div class="avatar" style="background:${colorFor(p.name)}">${escapeHtml(initials)}</div>
        <div style="flex:1">
          <div class="pname">${escapeHtml(p.name)}</div>
          <div class="ptitle">${escapeHtml(p.title)} · ${escapeHtml(p.team)}</div>
          <div class="ptags">
            <span>🏫 ${escapeHtml(p.school)}</span>
            <span>⏳ ${escapeHtml(p.tenure)}</span>
          </div>
          <div class="pnote">“${escapeHtml(p.note)}”</div>
          <div class="person-actions">
            <a class="btn" href="${linkedinSearch}" target="_blank" rel="noopener">Find on LinkedIn</a>
            <button class="btn ghost">Message template</button>
          </div>
        </div>
      </div>`;
    $('.btn.ghost', card).onclick = () => showTemplate(p, c, r);
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  return wrap;
}

function showTemplate(p, c, r) {
  const first = p.name.split(' ')[0];
  const msg =
`Hi ${first}, I’m a student/candidate preparing to apply for the ${r.title} role at ${c.name}. ` +
`I really admire the work your team does in ${p.team}, and your path from ${p.school} resonates with mine. ` +
`Would you be open to a quick 15-minute chat about your experience and any advice for applicants? ` +
`Totally understand if you’re busy — thank you either way!`;
  // lightweight modal
  const overlay = el('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,27,51,.45);display:grid;place-items:center;z-index:100;padding:20px';
  const box = el('div', 'card');
  box.style.cssText = 'max-width:520px;width:100%;background:#fff';
  box.innerHTML = `
    <h3 style="margin-top:0">Outreach template — ${escapeHtml(p.name)}</h3>
    <textarea rows="7" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:12px;font-family:inherit;font-size:14px">${escapeHtml(msg)}</textarea>
    <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end">
      <button class="btn ghost" data-close>Close</button>
      <button class="btn" data-copy>Copy message</button>
    </div>`;
  overlay.appendChild(box);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  $('[data-close]', box).onclick = () => overlay.remove();
  $('[data-copy]', box).onclick = () => {
    const ta = $('textarea', box);
    ta.select();
    navigator.clipboard?.writeText(ta.value);
    $('[data-copy]', box).textContent = 'Copied ✓';
  };
  document.body.appendChild(overlay);
}

/* ---- TAB: Compensation --------------------------------------------------- */
function renderComp(c, r) {
  const wrap = el('div');
  const comp = r.comp;
  wrap.appendChild(el('div', 'callout', `💰 <strong>${escapeHtml(comp.note)}</strong> Ranges in ${escapeHtml(comp.currency)}.`));

  const totalMid = comp.bands.reduce((a, b) => a + b.mid, 0);
  const totalLow = comp.bands.reduce((a, b) => a + b.low, 0);
  const totalHigh = comp.bands.reduce((a, b) => a + b.high, 0);

  wrap.appendChild(el('div', 'card', `
    <div class="sub">Estimated total first-year compensation (median)</div>
    <div class="comp-total">${fmtMoney(totalMid)}</div>
    <div class="sub">Range ${fmtMoney(totalLow)} – ${fmtMoney(totalHigh)}</div>`));

  const max = Math.max(...comp.bands.map((b) => b.high));
  const rows = el('div');
  rows.style.marginTop = '16px';
  comp.bands.forEach((b) => {
    const leftPct = (b.low / max) * 100;
    const widthPct = ((b.high - b.low) / max) * 100;
    const midPct = (b.mid / max) * 100;
    const row = el('div', 'comp-row', `
      <div class="clabel"><span>${escapeHtml(b.label)}</span><span>${fmtMoney(b.low)} – ${fmtMoney(b.high)}</span></div>
      <div class="comp-track">
        <div class="comp-fill" style="left:${leftPct}%;width:${Math.max(widthPct, 2)}%"></div>
        <div title="median ${fmtMoney(b.mid)}" style="position:absolute;top:-3px;left:${midPct}%;width:2px;height:18px;background:var(--ink)"></div>
      </div>`);
    rows.appendChild(row);
  });
  wrap.appendChild(rows);
  return wrap;
}

/* ---- TAB: Skills & Requirements ------------------------------------------ */
function renderRequirements(c, r) {
  const wrap = el('div');
  const req = r.requirements;
  wrap.appendChild(el('div', 'callout', `✅ <strong>What it actually takes.</strong> Cross-reference this with your resume before you apply.`));

  const cols = el('div', 'req-cols');
  const mk = (title, items, cls) => {
    const col = el('div', 'card');
    col.innerHTML = `<h3 class="mt-0">${title}</h3>
      <div class="chip-list">${items.map((i) => `<span class="chip ${cls}">${escapeHtml(i)}</span>`).join('')}</div>`;
    return col;
  };
  cols.appendChild(mk('Must-have skills', req.mustHave, 'have'));
  cols.appendChild(mk('Nice-to-have', req.niceToHave, 'nice'));
  wrap.appendChild(cols);

  const certBox = el('div', 'card');
  certBox.style.marginTop = '16px';
  certBox.innerHTML = `<h3 class="mt-0">Certifications & exams that help</h3>`;
  req.certs.forEach((cert) => {
    const c2 = el('div', 'cert');
    c2.style.cssText = 'padding:12px 0;border-top:1px solid var(--line)';
    c2.innerHTML = `
      <div class="logo-badge">🎓</div>
      <div>
        <div style="font-weight:700"><a href="${escapeHtml(cert.url)}" target="_blank" rel="noopener">${escapeHtml(cert.name)}</a></div>
        <div class="sub">${escapeHtml(cert.why)}</div>
      </div>`;
    certBox.appendChild(c2);
  });
  wrap.appendChild(certBox);
  return wrap;
}
