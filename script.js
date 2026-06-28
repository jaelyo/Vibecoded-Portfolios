// ============================================================
// PORTFOLIO QUEST — script.js
// All rendering, cursor, animations.
// Students: edit data.js — not this file.
// ============================================================

/* ────────────────────────────────────────────────────────────
   CONSTANTS & HELPERS
──────────────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function starsHTML(n) {
  n = Math.max(0, Math.min(5, n || 0));
  return `<span class="stars" aria-label="${n} out of 5 stars">`
    + Array.from({length:5},(_,i)=>`<span class="star${i<n?' on':''}" aria-hidden="true">★</span>`).join('')
    + `</span>`;
}

function tagClass(cat) {
  const map = {
    robotics:'robotics', coding:'coding', leadership:'leadership',
    community:'community', innovation:'innovation', olympiad:'olympiad',
    sports:'sports', arts:'arts', app:'app',
  };
  return map[(cat||'').toLowerCase()] || '';
}

const ACH_ICONS = {
  robotics:'🤖', coding:'💻', leadership:'👑', community:'🌱',
  innovation:'💡', olympiad:'📐', sports:'🏆', arts:'🎨',
};
function achIcon(cat) { return ACH_ICONS[(cat||'').toLowerCase()] || '🏅'; }

const PROJ_ICONS = { innovation:'🔬', coding:'💻', app:'📱', robotics:'🤖', default:'🧪' };
function projIcon(cat) { return PROJ_ICONS[(cat||'').toLowerCase()] || PROJ_ICONS.default; }

/* ────────────────────────────────────────────────────────────
   LOADING SCREEN
──────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) { ls.classList.add('out'); setTimeout(()=>ls.remove(), 600); }
  }, 1700);
});

/* ────────────────────────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────────────────────────── */
(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;

  // Pixel-art sword cursor SVG
  dot.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
    <rect x="3"  y="2"  width="3" height="3" fill="#3c2415"/>
    <rect x="6"  y="5"  width="3" height="3" fill="#3c2415"/>
    <rect x="9"  y="8"  width="3" height="3" fill="#e8e8d0"/>
    <rect x="12" y="11" width="3" height="3" fill="#e8e8d0"/>
    <rect x="15" y="14" width="3" height="3" fill="#e8e8d0"/>
    <rect x="6"  y="2"  width="3" height="3" fill="#e8e8d0"/>
    <rect x="3"  y="5"  width="3" height="3" fill="#e8e8d0"/>
    <rect x="7"  y="8"  width="2" height="2" fill="#c8c8b0"/>
    <rect x="10" y="11" width="2" height="2" fill="#c8c8b0"/>
    <rect x="12" y="8"  width="3" height="3" fill="#c8a870"/>
    <rect x="9"  y="11" width="3" height="3" fill="#c8a870"/>
  </svg>`;

  const GLYPHS = ['✦','✧','⋆','·','✺','❋','✼'];
  const COLORS = ['#ffd878','#f8b8d0','#c8a8e0','#78c8c0','#a8d878','#f0b840'];
  let lastPx = Date.now();
  let mx = -100, my = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    const now = Date.now();
    if (now - lastPx < 70) return;
    lastPx = now;

    const sp = document.createElement('div');
    sp.className = 'cursor-particle';
    sp.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist  = 14 + Math.random() * 22;
    sp.style.cssText =
      `left:${mx}px;top:${my}px;`
      + `color:${COLORS[Math.floor(Math.random()*COLORS.length)]};`
      + `--vx:${(Math.cos(angle)*dist).toFixed(1)}px;`
      + `--vy:${(Math.sin(angle)*dist).toFixed(1)}px;`
      + `animation-duration:${0.5+Math.random()*0.3}s`;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 800);
  });
})();

/* ────────────────────────────────────────────────────────────
   PIXEL CLOUDS (spawned into .sky-wrap elements)
──────────────────────────────────────────────────────────── */
function spawnClouds(container) {
  // Two SVG cloud shapes
  const shapes = [
    `<svg width="88" height="44" viewBox="0 0 88 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="24" width="48" height="14" fill="white" opacity="0.9"/>
      <rect x="12" y="28" width="64" height="12" fill="white" opacity="0.9"/>
      <rect x="30" y="14" width="26" height="16" fill="white" opacity="0.9"/>
     </svg>`,
    `<svg width="68" height="36" viewBox="0 0 68 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="8"  y="18" width="52" height="12" fill="white" opacity="0.85"/>
      <rect x="4"  y="22" width="60" height="10" fill="white" opacity="0.85"/>
      <rect x="16" y="8"  width="22" height="16" fill="white" opacity="0.85"/>
      <rect x="34" y="10" width="18" height="14" fill="white" opacity="0.85"/>
     </svg>`,
  ];

  for (let i = 0; i < 5; i++) {
    const c = document.createElement('div');
    c.className = 'px-cloud';
    c.innerHTML = shapes[i % shapes.length];
    c.style.cssText =
      `top:${10+Math.random()*100}px;`
      + `animation-duration:${18+Math.random()*28}s;`
      + `animation-delay:-${Math.random()*30}s;`
      + `transform:scale(${0.6+Math.random()*0.9});`
      + `opacity:${0.6+Math.random()*0.35}`;
    container.appendChild(c);
  }
}

/* ────────────────────────────────────────────────────────────
   ANIMATED COUNTER
──────────────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER (reveal + counter trigger)
──────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target || 0, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

/* ────────────────────────────────────────────────────────────
   NAV ACTIVE LINK (scroll spy)
──────────────────────────────────────────────────────────── */
function initScrollSpy() {
  const sections = $$('[data-spy]');
  const links    = $$('.nav-link[data-target]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.spy;
        links.forEach(l => l.classList.toggle('active', l.dataset.target === id));
      }
    });
  }, { rootMargin: '-42% 0px -52% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ────────────────────────────────────────────────────────────
   MODAL SYSTEM
──────────────────────────────────────────────────────────── */
let activeModal = null;

function openModal(html) {
  const overlay = document.getElementById('modal-overlay');
  const box     = document.getElementById('modal-box');
  box.innerHTML = html;
  overlay.classList.add('open');
  activeModal = overlay;
  // trap focus — close button
  const closeBtn = box.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  activeModal = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activeModal) closeModal();
});
document.getElementById('modal-overlay')?.addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

/* ────────────────────────────────────────────────────────────
   RENDER: PROFILE / HERO
──────────────────────────────────────────────────────────── */
function renderProfile() {
  const p = PORTFOLIO.profile;

  // Page title + meta
  document.title = `${p.name || 'Portfolio'} — Portfolio Quest`;

  $('#hero-name')?.replaceWith((() => {
    const el = document.createElement('div');
    el.id = 'hero-name';
    el.className = 'char-name';
    el.textContent = p.name || '[Student Name Here]';
    return el;
  })());

  const nameEl  = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = p.name || '[Student Name Here]';

  setTxt('hero-aspiration', p.class  || '[Career Aspiration Here]');
  setTxt('hero-school',     p.school || '[School Name Here]');
  setTxt('hero-level-badge',`LEVEL ${p.level || '?'}`);

  // Avatar
  const avatarImg = document.getElementById('hero-avatar');
  if (avatarImg) {
    avatarImg.src   = p.profilePhoto || '';
    avatarImg.alt   = p.name || 'Student';
    avatarImg.onerror = function() {
      this.style.display = 'none';
      this.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:44px">🎮</div>';
    };
  }

  // Introduction dialogue
  const introEl = document.getElementById('hero-intro-text');
  if (introEl) introEl.textContent = p.introduction || '[Write your introduction in data.js]';

  // Skills
  const skillsWrap = document.getElementById('char-skills');
  if (skillsWrap && PORTFOLIO.skills?.length) {
    skillsWrap.innerHTML = PORTFOLIO.skills.map(s => `
      <div class="skill-row">
        <span class="skill-name">${esc(s.name)}</span>
        ${starsHTML(s.stars)}
      </div>`).join('');
  }

  // Interests tags
  const tagsWrap = document.getElementById('hero-interests');
  if (tagsWrap && PORTFOLIO.interests?.length) {
    tagsWrap.innerHTML = PORTFOLIO.interests.map(t =>
      `<span class="px-tag">${esc(t)}</span>`).join('');
  }

  // Social links
  const linksWrap = document.getElementById('hero-links');
  if (linksWrap) {
    let html = '';
    if (p.github)   html += `<a href="https://${p.github}" target="_blank" rel="noopener" class="px-btn blue">🐙 GitHub</a>`;
    if (p.linkedin) html += `<a href="https://${p.linkedin}" target="_blank" rel="noopener" class="px-btn teal">💼 LinkedIn</a>`;
    linksWrap.innerHTML = html;
  }

  // Ticker
  const ticker = document.getElementById('ticker-inner');
  if (ticker) {
    const items = [p.name, p.school, p.class, ...( PORTFOLIO.interests||[] )].filter(Boolean);
    ticker.textContent = '  ✦  ' + items.join('   ✦   ') + '   ✦   ';
  }
}

function setTxt(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ────────────────────────────────────────────────────────────
   RENDER: XP STATS
──────────────────────────────────────────────────────────── */
function renderXP() {
  const grid = document.getElementById('xp-grid');
  if (!grid) return;
  grid.innerHTML = '';
  (PORTFOLIO.xpStats || []).forEach(stat => {
    const card = document.createElement('div');
    card.className = 'xp-card reveal';
    card.innerHTML = `
      <span class="xp-icon">${stat.icon || '⭐'}</span>
      <span class="xp-num" data-target="${stat.value || 0}">0</span>
      <span class="xp-label">${esc(stat.label)}</span>`;
    grid.appendChild(card);
    revealObserver.observe(card);
    counterObserver.observe(card.querySelector('.xp-num'));
  });
}

/* ────────────────────────────────────────────────────────────
   RENDER: ACHIEVEMENTS
──────────────────────────────────────────────────────────── */
function renderAchievements() {
  const grid = document.getElementById('ach-grid');
  if (!grid) return;
  grid.className = 'ach-grid reveal-stagger';

  const items = PORTFOLIO.achievements || [];
  if (!items.length) { grid.innerHTML = emptyState('🏅','Add achievements to data.js to see them here!'); return; }

  grid.innerHTML = items.map((a, i) => `
    <div class="ach-card" style="animation-delay:${i*0.05}s" onclick="openAchievementModal(${i})" role="button" tabindex="0" aria-label="View ${esc(a.title)}">
      <span class="ach-icon">${achIcon(a.category)}</span>
      <span class="ach-title">${esc(a.title)}</span>
      <span class="px-tag ${tagClass(a.category)}">${esc(a.category || '')}</span>
    </div>`).join('');

  revealObserver.observe(grid);

  // keyboard support
  grid.querySelectorAll('.ach-card').forEach((card, i) => {
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openAchievementModal(i); });
  });
}

function openAchievementModal(idx) {
  const a = (PORTFOLIO.achievements || [])[idx];
  if (!a) return;

  const photoHTML = a.imagePath
    ? `<img src="${esc(a.imagePath)}" alt="${esc(a.title)}" class="modal-photo" onerror="this.parentElement.innerHTML='<div class=modal-photo-placeholder>📷<br>Photo not found<br><small>${esc(a.imagePath)}</small></div>'">`
    : `<div class="modal-photo-placeholder">📷<br>Add your photo here<br><small>Set imagePath in data.js</small></div>`;

  const certHTML = a.certificatePath
    ? `<a href="${esc(a.certificatePath)}" target="_blank" class="px-btn green">📜 View Certificate</a>`
    : `<button class="px-btn" onclick="void(0)">📜 Certificate placeholder</button>`;

  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <div style="text-align:center;margin-bottom:12px;font-size:48px">${achIcon(a.category)}</div>
    <h2 class="modal-title">${esc(a.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      <span class="px-tag ${tagClass(a.category)}">${esc(a.category||'')}</span>
      ${a.date         ? `<span class="px-tag">${esc(a.date)}</span>` : ''}
      ${a.organisation ? `<span class="px-tag">${esc(a.organisation)}</span>` : ''}
    </div>
    ${photoHTML}
    ${mSection('📋 Description',    a.description)}
    ${mSection('💭 Reflection',     a.reflection)}
    ${mSection('🌟 Learning Outcome',a.learningOutcome)}
    <div style="margin-top:16px">${certHTML}</div>
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: PROJECTS (Innovation Lab)
──────────────────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const items = PORTFOLIO.projects || [];
  if (!items.length) { grid.innerHTML = emptyState('🔬','Add projects to data.js'); return; }

  grid.innerHTML = items.map((p,i) => projCardHTML(p,i,'openProjectModal')).join('');
  grid.querySelectorAll('.proj-card').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openProjectModal(i); });
  });
}

function openProjectModal(idx) {
  const p = (PORTFOLIO.projects || [])[idx];
  if (!p) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    ${p.imagePath ? `<img src="${esc(p.imagePath)}" alt="${esc(p.title)}" class="modal-photo" onerror="this.style.display='none'">` : `<div class="modal-photo-placeholder">📷<br>Add your photo here</div>`}
    <h2 class="modal-title">${esc(p.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      <span class="px-tag ${tagClass(p.category)}">${esc(p.category||'')}</span>
      ${p.awards ? `<span class="px-tag">🏆 ${esc(p.awards)}</span>` : ''}
    </div>
    ${mSection('❓ Problem',           p.problem)}
    ${mSection('💡 Solution',          p.solution)}
    ${mSection('🎯 My Role',           p.myRole)}
    ${mSection('⚙️ Technologies',     p.technologiesUsed)}
    ${mSection('🗺️ Journey',          p.journey)}
    ${mSection('🏁 Outcome',          p.outcome)}
    ${mSection('📚 Lessons Learned',  p.lessonsLearned)}
    ${p.videoLink ? `<a href="${esc(p.videoLink)}" target="_blank" rel="noopener" class="px-btn blue" style="margin-top:12px">▶ Watch Video</a>` : ''}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: ROBOTICS
──────────────────────────────────────────────────────────── */
function renderRobotics() {
  const grid = document.getElementById('robotics-grid');
  if (!grid) return;
  const items = PORTFOLIO.robotics || [];
  if (!items.length) { grid.innerHTML = emptyState('🤖','Add robotics entries to data.js'); return; }

  grid.innerHTML = items.map((r,i) => `
    <div class="proj-card reveal" onclick="openRoboticsModal(${i})" role="button" tabindex="0" aria-label="View ${esc(r.title)}">
      <div class="proj-thumb">${thumbImg(r.imagePath,'🤖')}</div>
      <div class="proj-body">
        <div class="proj-title">${esc(r.title)}</div>
        <div class="proj-desc">${esc(r.competition||'')} ${r.year?'· '+esc(r.year):''}</div>
        <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
          <span class="px-tag robotics">Robotics</span>
          ${r.outcome ? `<span class="px-tag">🏆 ${esc(r.outcome)}</span>` : ''}
        </div>
      </div>
    </div>`).join('');

  grid.querySelectorAll('.proj-card').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openRoboticsModal(i); });
  });
}

function openRoboticsModal(idx) {
  const r = (PORTFOLIO.robotics || [])[idx];
  if (!r) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    ${r.imagePath ? `<img src="${esc(r.imagePath)}" alt="${esc(r.title)}" class="modal-photo" onerror="this.style.display='none'">` : `<div class="modal-photo-placeholder">📷<br>Add your robot photo here</div>`}
    <h2 class="modal-title">🤖 ${esc(r.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      <span class="px-tag robotics">${esc(r.competition||'Robotics')}</span>
      ${r.year?`<span class="px-tag">${esc(r.year)}</span>`:''}
      ${r.outcome?`<span class="px-tag">🏆 ${esc(r.outcome)}</span>`:''}
    </div>
    ${mSection('🎯 Team Role',              r.teamRole)}
    ${mSection('🔩 Robot Design',          r.robotDesign)}
    ${mSection('🗺️ Mission Strategy',     r.missionStrategy)}
    ${mSection('💻 Programming Approach', r.programmingApproach)}
    ${mSection('⚡ Challenges Faced',      r.challengesFaced)}
    ${mSection('💭 Reflection',            r.reflection)}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: CODING CAVE
──────────────────────────────────────────────────────────── */
function renderCoding() {
  const grid = document.getElementById('coding-grid');
  if (!grid) return;
  const items = PORTFOLIO.coding || [];
  if (!items.length) { grid.innerHTML = emptyState('💻','Add coding projects to data.js'); return; }

  grid.innerHTML = items.map((c,i) => `
    <div class="proj-card reveal" onclick="openCodingModal(${i})" role="button" tabindex="0" aria-label="View ${esc(c.title)}">
      <div class="proj-thumb">${thumbImg(c.imagePath,'💻')}</div>
      <div class="proj-body">
        <div class="proj-title">${esc(c.title)}</div>
        <div class="proj-desc">${esc(c.language||'')} ${c.category?'· '+esc(c.category):''}</div>
        <div style="margin-top:8px">
          <span class="px-tag coding">${esc(c.language||'Coding')}</span>
        </div>
      </div>
    </div>`).join('');

  grid.querySelectorAll('.proj-card').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openCodingModal(i); });
  });
}

function openCodingModal(idx) {
  const c = (PORTFOLIO.coding || [])[idx];
  if (!c) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    ${c.imagePath ? `<img src="${esc(c.imagePath)}" alt="${esc(c.title)}" class="modal-photo" onerror="this.style.display='none'">` : `<div class="modal-photo-placeholder">📷<br>Add a screenshot here</div>`}
    <h2 class="modal-title">💻 ${esc(c.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      <span class="px-tag coding">${esc(c.language||'')}</span>
      ${c.category?`<span class="px-tag">${esc(c.category)}</span>`:''}
    </div>
    ${mSection('📖 Story',      c.story)}
    ${mSection('✨ Features',   c.features)}
    ${mSection('🧗 Challenges', c.challenges)}
    ${mSection('💭 Reflection', c.reflection)}
    ${c.codeLink ? `<a href="https://${c.codeLink.replace(/^https?:\/\//,'')}" target="_blank" class="px-btn blue" style="margin-top:12px">🐙 View Code</a>` : ''}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: ADVENTURE LOG (Volunteer)
──────────────────────────────────────────────────────────── */
function renderVolunteer() {
  const list = document.getElementById('volunteer-list');
  if (!list) return;
  const items = PORTFOLIO.volunteer || [];
  if (!items.length) { list.innerHTML = emptyState('🌱','Add volunteer entries to data.js'); return; }

  list.innerHTML = items.map((v,i) => `
    <div class="adv-entry reveal" onclick="openVolunteerModal(${i})" role="button" tabindex="0">
      <div class="adv-date">${shortDate(v.date)}</div>
      <div>
        <div class="adv-title">${esc(v.title)}</div>
        <div class="adv-org">${esc(v.organisation||'')} ${v.role?'· '+esc(v.role):''}</div>
        <div class="adv-peek">${esc((v.description||'').substring(0,90))}${(v.description||'').length>90?'…':''}</div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.adv-entry').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openVolunteerModal(i); });
  });
}

function openVolunteerModal(idx) {
  const v = (PORTFOLIO.volunteer || [])[idx];
  if (!v) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <h2 class="modal-title">🌱 ${esc(v.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      ${v.role ? `<span class="px-tag community">${esc(v.role)}</span>` : ''}
      ${v.organisation ? `<span class="px-tag">${esc(v.organisation)}</span>` : ''}
      ${v.date ? `<span class="px-tag">${esc(v.date)}</span>` : ''}
      ${v.hours ? `<span class="px-tag">⏱ ${v.hours} hrs</span>` : ''}
    </div>
    ${mSection('📋 Description', v.description)}
    ${mSection('🌏 Impact',      v.impact)}
    ${mSection('💭 Reflection',  v.reflection)}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: LEADERSHIP HALL
──────────────────────────────────────────────────────────── */
function renderLeadership() {
  const list = document.getElementById('leadership-list');
  if (!list) return;
  const items = PORTFOLIO.leadership || [];
  if (!items.length) { list.innerHTML = emptyState('👑','Add leadership roles to data.js'); return; }

  list.innerHTML = items.map((l,i) => `
    <div class="adv-entry reveal" onclick="openLeadershipModal(${i})" role="button" tabindex="0">
      <div class="adv-date">${shortDate(l.duration)}</div>
      <div>
        <div class="adv-title">${esc(l.title)}</div>
        <div class="adv-org">${esc(l.organisation||'')}</div>
        <div class="adv-peek">${esc((l.responsibilities||'').substring(0,90))}${(l.responsibilities||'').length>90?'…':''}</div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.adv-entry').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openLeadershipModal(i); });
  });
}

function openLeadershipModal(idx) {
  const l = (PORTFOLIO.leadership || [])[idx];
  if (!l) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <h2 class="modal-title">👑 ${esc(l.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      ${l.organisation?`<span class="px-tag leadership">${esc(l.organisation)}</span>`:''}
      ${l.duration?`<span class="px-tag">${esc(l.duration)}</span>`:''}
    </div>
    ${mSection('📋 Responsibilities', l.responsibilities)}
    ${mSection('🌟 Impact',           l.impact)}
    ${mSection('💭 Reflection',       l.reflection)}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: BOSS BATTLES
──────────────────────────────────────────────────────────── */
function renderBossBattles() {
  const grid = document.getElementById('boss-grid');
  if (!grid) return;
  const items = PORTFOLIO.bossBattles || [];
  if (!items.length) { grid.innerHTML = emptyState('⚔️','Add boss battles to data.js'); return; }

  grid.innerHTML = items.map((b,i) => `
    <div class="boss-card reveal" onclick="openBossModal(${i})" role="button" tabindex="0">
      <span class="boss-card-icon">${esc(b.icon||'⚔️')}</span>
      <div class="boss-card-title">${esc(b.title)}</div>
      <div class="boss-card-peek">${esc((b.problem||'').substring(0,80))}${(b.problem||'').length>80?'…':''}</div>
    </div>`).join('');

  grid.querySelectorAll('.boss-card').forEach((c,i) => {
    revealObserver.observe(c);
    c.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openBossModal(i); });
  });
}

function openBossModal(idx) {
  const b = (PORTFOLIO.bossBattles || [])[idx];
  if (!b) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <div style="text-align:center;font-size:48px;margin-bottom:12px">${esc(b.icon||'⚔️')}</div>
    <h2 class="modal-title">${esc(b.title)}</h2>
    ${mSection('🐉 The Challenge',   b.problem)}
    ${mSection('📜 What Happened',  b.whatHappened)}
    ${mSection('🗡️ How I Solved It',b.howISolved)}
    ${mSection('🌟 What I Learnt',  b.whatILearnt)}
  `);
}

/* ────────────────────────────────────────────────────────────
   RENDER: FUTURE GOALS
──────────────────────────────────────────────────────────── */
function renderFutureGoals() {
  const g = PORTFOLIO.futureGoals || {};

  const statsWrap = document.getElementById('future-stats');
  if (statsWrap) {
    statsWrap.innerHTML = `
      <div class="future-stat reveal">
        <div class="fs-label">🎓 Desired Course</div>
        <div class="fs-value">${esc(g.desiredCourse || '[Desired Course Here]')}</div>
      </div>
      <div class="future-stat reveal">
        <div class="fs-label">🚀 Career Vision</div>
        <div class="fs-value">${esc(g.careerVision || '[Career Vision Here]')}</div>
      </div>
      <div class="future-stat reveal">
        <div class="fs-label">🌏 Long-term Dream</div>
        <div class="fs-value">${esc(g.longTermDream || '[Long-term Dream Here]')}</div>
      </div>
      <div class="future-stat reveal">
        <div class="fs-label">⚡ Skills to Gain</div>
        <div class="fs-value">${(g.skillsToGain||['[Skill 1]','[Skill 2]']).map(s=>`▶ ${esc(s)}`).join('<br>')}</div>
      </div>`;
    statsWrap.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  const questList = document.getElementById('quest-list');
  if (questList) {
    questList.innerHTML = (g.questItems || ['[Goal 1]','[Goal 2]','[Goal 3]'])
      .map(q => `<li class="quest-item">${esc(q)}</li>`).join('');
  }
}

/* ────────────────────────────────────────────────────────────
   SMALL HELPERS
──────────────────────────────────────────────────────────── */
function mSection(label, text) {
  if (!text) return '';
  return `<div class="modal-section">
    <span class="modal-section-label">${label}</span>
    <p class="modal-section-text">${esc(text)}</p>
  </div>`;
}

function thumbImg(path, fallbackEmoji) {
  if (path) {
    return `<img src="${esc(path)}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='${fallbackEmoji}'" />`;
  }
  return fallbackEmoji;
}

function projCardHTML(p, i, openFn) {
  return `<div class="proj-card reveal" style="animation-delay:${i*0.06}s" onclick="${openFn}(${i})" role="button" tabindex="0" aria-label="View ${esc(p.title)}">
    <div class="proj-thumb">${thumbImg(p.imagePath, projIcon(p.category))}</div>
    <div class="proj-body">
      <div class="proj-title">${esc(p.title)}</div>
      <div class="proj-desc">${esc((p.problem||'').substring(0,90))}${(p.problem||'').length>90?'…':''}</div>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px">
        <span class="px-tag ${tagClass(p.category)}">${esc(p.category||'')}</span>
        ${p.awards?`<span class="px-tag">🏆 ${esc(p.awards)}</span>`:''}
      </div>
    </div>
  </div>`;
}

function shortDate(date) {
  if (!date) return '—';
  // abbreviate long strings for the date block
  const d = String(date);
  if (d.length <= 10) return d;
  // "Jan 2024 – Mar 2024" → "Jan\n2024"
  const parts = d.split(/[\s\-–]/);
  return parts.slice(0, 2).join('\n');
}

function emptyState(icon, msg) {
  return `<div style="padding:40px;text-align:center;font-family:var(--font-retro);font-size:20px;color:var(--text-light)">
    <div style="font-size:48px;margin-bottom:12px">${icon}</div>
    ${esc(msg)}
  </div>`;
}

/* ────────────────────────────────────────────────────────────
   MAIN INIT
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Spawn clouds in sky sections
  document.querySelectorAll('.sky-wrap').forEach(spawnClouds);

  // Render all sections
  renderProfile();
  renderXP();
  renderAchievements();
  renderProjects();
  renderRobotics();
  renderCoding();
  renderVolunteer();
  renderLeadership();
  renderBossBattles();
  renderFutureGoals();

  // Observe plain .reveal elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.reveal-stagger').forEach(el => revealObserver.observe(el));

  // Scroll spy
  initScrollSpy();

  // Prevent body scroll when modal open
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    const observer = new MutationObserver(() => {
      document.body.style.overflow = modalOverlay.classList.contains('open') ? 'hidden' : '';
    });
    observer.observe(modalOverlay, { attributes: true, attributeFilter: ['class'] });
  }

});
