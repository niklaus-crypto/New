/* =========================================================
   DARK FRUITS — interactions
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- sticky header + scroll progress ---------- */
  const top = document.getElementById('top');
  const prog = document.getElementById('nprog');
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (top) top.classList.toggle('stuck', y > 16);
      if (prog) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = max > 0 ? Math.min(100, (y / max) * 100) + '%' : '0%';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- overflow nav menu ---------- */
  const more = document.getElementById('nav-more');
  if (more) {
    const btn = more.querySelector('button');
    const setOpen = (open) => {
      more.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!more.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!more.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- mobile drawer ---------- */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    const setMenu = (open) => {
      drawer.classList.toggle('open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1040 && drawer.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- entrance stagger (pure enhancement, content is always visible) ---------- */
  if (!reduced) {
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.dataset.delay) {
        el.style.animationDelay = el.dataset.delay + 'ms';
        return;
      }
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'))
        : [];
      const i = siblings.indexOf(el);
      if (i > 0) el.style.animationDelay = Math.min(i * 55, 300) + 'ms';
    });
  }

  /* ---------- card spotlight ---------- */
  if (window.matchMedia('(hover: hover)').matches && !reduced) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ---------- live Discord counts ---------- */
  const members = document.getElementById('member-count');
  const online = document.getElementById('online-count');
  async function discordStats() {
    if (!members || !online) return;
    try {
      const res = await fetch('https://discord.com/api/v9/invites/jNrBh8EbQ?with_counts=true');
      if (!res.ok) throw new Error('bad response');
      const data = await res.json();
      if (typeof data.approximate_member_count === 'number') {
        members.textContent = data.approximate_member_count.toLocaleString();
      }
      if (typeof data.approximate_presence_count === 'number') {
        online.textContent = data.approximate_presence_count.toLocaleString();
      }
    } catch {
      members.textContent = '261+';
      online.textContent = '68';
    }
  }
  discordStats();
  setInterval(discordStats, 5 * 60 * 1000);

  /* ---------- event countdown ---------- */
  const cdEl = document.getElementById('event-countdown');
  if (cdEl) {
    const end = new Date('2026-11-15T01:00:00Z').getTime();
    const start = new Date('2026-11-01T00:00:00Z').getTime();
    const bar = document.getElementById('cd-progress');
    const pctEl = document.getElementById('cd-pct');
    const pad = (n) => String(n).padStart(2, '0');

    function tick() {
      let diff = Math.max(0, end - Date.now());
      const days = Math.floor(diff / 86400000);
      diff %= 86400000;
      const hours = Math.floor(diff / 3600000);
      diff %= 3600000;
      const mins = Math.floor(diff / 60000);
      diff %= 60000;
      const secs = Math.floor(diff / 1000);

      cdEl.innerHTML =
        `<div class="cd-box"><strong>${pad(days)}</strong><span>Days</span></div>` +
        `<div class="cd-box"><strong>${pad(hours)}</strong><span>Hours</span></div>` +
        `<div class="cd-box"><strong>${pad(mins)}</strong><span>Mins</span></div>` +
        `<div class="cd-box"><strong>${pad(secs)}</strong><span>Secs</span></div>`;

      if (bar) {
        const total = end - start;
        const done = Math.min(1, Math.max(0, (Date.now() - start) / total));
        bar.style.width = (done * 100).toFixed(1) + '%';
        if (pctEl) pctEl.textContent = Math.round(done * 100) + '%';
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- ambient canvas ---------- */
  (() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles = [];
    let orbs = [];
    let raf = 0;
    let running = true;

    const rand = (a, b) => a + Math.random() * (b - a);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      build();
    }

    function build() {
      const density = Math.min(72, Math.round((window.innerWidth / 1440) * 60) + 18);
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 2.1) * (window.devicePixelRatio || 1),
        vy: rand(-0.18, -0.05),
        vx: rand(-0.05, 0.05),
        a: rand(0.08, 0.36),
        t: Math.random() * Math.PI * 2,
      }));
      orbs = Array.from({ length: 3 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(w * 0.16, w * 0.32),
        vx: rand(-0.06, 0.06),
        vy: rand(-0.04, 0.04),
      }));
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, 'rgba(124,58,237,0.075)');
        g.addColorStop(0.55, 'rgba(168,85,247,0.03)');
        g.addColorStop(1, 'rgba(6,4,11,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.t += 0.015;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.t));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,196,255,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    window.addEventListener('resize', () => {
      clearTimeout(resize._t);
      resize._t = setTimeout(resize, 180);
    });
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });

    resize();
    start();
  })();

  /* ---------- drifting fruit art ---------- */
  (() => {
    if (reduced || window.innerWidth < 760) return;
    const files = Array.from({ length: 41 }, (_, i) => `f${String(i).padStart(2, '0')}.png`);

    const build = () => {
      const layer = document.createElement('div');
      layer.className = 'fruit-layer';
      layer.setAttribute('aria-hidden', 'true');
      document.body.prepend(layer);
      for (let i = 0; i < 12; i++) {
        const img = document.createElement('img');
        img.className = 'fruit-float';
        img.src = files[Math.floor(Math.random() * files.length)];
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        const size = 26 + Math.random() * 34;
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.left = Math.random() * 94 + 2 + '%';
        img.style.animationDuration = 24 + Math.random() * 30 + 's';
        img.style.animationDelay = -Math.random() * 40 + 's';
        img.style.opacity = String(0.1 + Math.random() * 0.12);
        layer.appendChild(img);
      }
    };
    if ('requestIdleCallback' in window) requestIdleCallback(build, { timeout: 2200 });
    else setTimeout(build, 1200);
  })();
})();

/* ---------- drifting emoji accents ---------- */
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = window.innerWidth < 760 ? 5 : 9;
  const glyphs = ['⚔️', '🏆', '🎁', '🍇', '💜', '⭐', '🔥', '🎟️'];

  const build = () => {
    const layer = document.createElement('div');
    layer.className = 'emoji-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.prepend(layer);
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'emoji-float';
      el.textContent = glyphs[i % glyphs.length];
      el.style.left = Math.random() * 92 + 3 + '%';
      el.style.fontSize = 15 + Math.random() * 15 + 'px';
      el.style.animationDuration = 22 + Math.random() * 26 + 's';
      el.style.animationDelay = -Math.random() * 34 + 's';
      layer.appendChild(el);
    }
  };

  if ('requestIdleCallback' in window) requestIdleCallback(build, { timeout: 2400 });
  else setTimeout(build, 1400);
})();
