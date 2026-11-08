/**
 * DARK FRUITS — static page generator (v4).
 * Run: node build.mjs
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = ROOT;

const INVITE = 'https://discord.gg/jNrBh8EbQ';
const DISC = 'https://discadia.com/server/blox-fruits-trading-and-chat-h/';
const CH_SUPPORT = 'https://discord.com/channels/1005885886073942156/1489755208341786634';
const CH_GIVEAWAY = 'https://discord.com/channels/1005885886073942156/1490476952539365606';
const PROFILE = 'https://discord.com/users/867796123813019648';
const VER = 'v=6';

/* ---------------------------------------------------------------- icons */
const P = (d) => `<path d="${d}"/>`;
const ICONS = {
  arrow: P('M7 17 17 7M9 7h8v8'),
  chevron: P('M6 9.5 12 15.5 18 9.5'),
  menu: P('M4 7h16M4 12h16M4 17h16'),
  close: P('M6 6l12 12M18 6 6 18'),
  up: P('M12 19V5M5.5 11.5 12 5l6.5 6.5'),
};

const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

const DISCORD_PATH =
  'M20.3 4.4A16.5 16.5 0 0 0 16.1 3l-.3.6a12.4 12.4 0 0 0-3.6 0L11.9 3a16.5 16.5 0 0 0-4.2 1.4C4.9 8.6 4.2 12.7 4.4 16.7a16.7 16.7 0 0 0 5 2.5l.7-1.1a10.7 10.7 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 10.4 0l.4.3-1.7.8.7 1.1a16.7 16.7 0 0 0 5-2.5c.3-4.6-.6-8.6-2.3-12.3ZM9.7 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm4.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z';
const discordIcon = (cls = '') =>
  `<svg class="icon icon--brand ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${DISCORD_PATH}"/></svg>`;

/* animated emoji accent — decorative, so hidden from screen readers */
let emojiTick = 0;
const emoji = (char, cls = '') =>
  `<span class="emoji ${cls}" aria-hidden="true" style="animation-delay:-${((emojiTick++ % 7) * 0.55).toFixed(2)}s">${char}</span>`;

/* --------------------------------------------------------------- config */
const NAV = [
  ['index.html', 'Home'],
  ['trading.html', 'Trading'],
  ['values.html', 'Values'],
  ['events.html', 'Events'],
  ['giveaways.html', 'Giveaways'],
  ['clans.html', 'Clans'],
  ['shop.html', 'Shop'],
];

const MORE = [
  ['staff.html', 'Staff'],
  ['rules.html', 'Rules'],
];

const DRAWER = [
  ['index.html', 'Home', 'Start here'],
  ['trading.html', 'Trading', 'Partners & safety'],
  ['values.html', 'Values', 'Live values & stock'],
  ['events.html', 'Events', 'Tournaments & races'],
  ['giveaways.html', 'Giveaways', 'Entries & perks'],
  ['clans.html', 'Clans', '5 divisions'],
  ['shop.html', 'Shop & DC', 'The economy'],
  ['staff.html', 'Staff', 'Leadership'],
  ['rules.html', 'Rules', 'Standards'],
  [DISC, 'Like us on Discadia', 'Support the crew'],
];

const MARK_LOGO = `<img src="dark-fruits-logo.gif" width="28" height="25" alt="">`;

const BRAND = `<a href="index.html" class="brand" aria-label="Dark Fruits — home"><span class="mark">${MARK_LOGO}</span><span class="word">DARK <span>FRUITS</span></span></a>`;

const current = (href, active) => (href === active ? ' aria-current="page"' : '');

const TICKER = [
  ['⚔️', 'Trading hub'],
  ['📊', 'Live values'],
  ['🏴', '5 clan divisions'],
  ['🏆', 'Tournaments'],
  ['📜', 'Daily quests'],
  ['🎁', 'Giveaways'],
  ['🪙', 'DC economy'],
  ['📈', 'Ranked chat'],
  ['💜', 'Like us on Discadia'],
];

/* ---------------------------------------------------------------- chrome */
function head({ title, description, canonical, og = 'og.png' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#050309">
  <meta name="color-scheme" content="dark">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="https://dark-fruits.official10.workers.dev/${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dark Fruits">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${og}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
  <link rel="apple-touch-icon" href="logo-mark.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Sora:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?${VER}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<canvas id="bg-canvas" aria-hidden="true"></canvas>
<div class="aura" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>`;
}

function header(active) {
  const links = NAV.map(
    ([href, label]) => `<a href="${href}"${current(href, active)}>${label}</a>`
  ).join('');
  const moreLinks = MORE.map(
    ([href, label]) => `<a href="${href}"${current(href, active)}>${label}</a>`
  ).join('');

  return `
<header class="top" id="top">
  <div class="top-inner">
    ${BRAND}
    <nav class="nav" aria-label="Main">
      ${links}
      <div class="nav-more" id="nav-more">
        <button type="button" aria-expanded="false" aria-haspopup="true">More <span class="caret">${icon('chevron')}</span></button>
        <div class="over-panel">${moreLinks}<a href="${DISC}" target="_blank" rel="noopener">${emoji('💜')} Discadia</a></div>
      </div>
      <a class="btn btn-main btn-join" href="${INVITE}" target="_blank" rel="noopener">Join</a>
    </nav>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span class="b-icon b-icon--menu">${icon('menu')}</span><span class="b-icon b-icon--close">${icon('close')}</span></button>
  </div>
  <div class="nav-progress" aria-hidden="true"><i id="nprog"></i></div>
</header>
<nav class="drawer" id="drawer" aria-label="Mobile">
  <span class="d-label">Sections</span>
  ${DRAWER.map(
    ([href, label, sub]) =>
      `<a href="${href}"${current(href, active)}${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${label}<span>${sub}</span></a>`
  ).join('')}
  <a class="btn btn-main d-join" href="${INVITE}" target="_blank" rel="noopener">${discordIcon('icon--sm')} Join Discord</a>
</nav>`;
}

function footer() {
  return `
<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        ${BRAND}
        <p>A Blox Fruits crew for traders, clans and everyone who grinds. Trading, values, tournaments and giveaways in one place.</p>
        <a class="btn btn-main" href="${INVITE}" target="_blank" rel="noopener">${discordIcon('icon--sm')} Join Discord</a>
      </div>
      <div>
        <h4>Explore</h4>
        <nav class="foot-nav" aria-label="Explore">
          <a href="trading.html">Trading</a>
          <a href="values.html">Values &amp; stock</a>
          <a href="events.html">Events</a>
          <a href="giveaways.html">Giveaways</a>
        </nav>
      </div>
      <div>
        <h4>The crew</h4>
        <nav class="foot-nav" aria-label="The crew">
          <a href="clans.html">Clans</a>
          <a href="shop.html">Shop &amp; DC</a>
          <a href="staff.html">Staff</a>
          <a href="rules.html">Rules</a>
        </nav>
      </div>
    </div>
    <div class="foot-base">
      <p class="legal">Unofficial fan community. Not affiliated with Roblox or Blox Fruits developers.</p>
      <p>© <span id="year">2026</span> Dark Fruits</p>
      <a class="disc-link" href="${DISC}" target="_blank" rel="noopener">${emoji('💜')} Like us on Discadia ${icon('arrow', 'icon--sm')}</a>
      <a class="to-top" href="#top">Back to top ${icon('up')}</a>
    </div>
  </div>
</footer>
<script src="app.js?${VER}" defer></script>
</body>
</html>`;
}

const pageTop = (num, label, h1, lede, emojiChar = '⚡') => `
<header class="page-top">
  <div class="wrap page-inner">
    <span class="page-num" aria-hidden="true">${num}</span>
    <a class="crumb" href="index.html">${icon('up')} Back to home</a>
    <div class="eyebrow" style="margin-top:1.1rem">${emoji(emojiChar)} <b>${num}</b> ${label}</div>
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
  </div>
</header>`;

const card = (emojiChar, title, body, cls = '') =>
  `<div class="card reveal ${cls}"><div class="chip">${emoji(emojiChar)}</div><h3>${title}</h3><p>${body}</p></div>`;

const ctaBand = (
  h2,
  p,
  extra = '',
  deco = 'f18.png',
  primary = `<a href="${INVITE}" class="btn btn-main" target="_blank" rel="noopener">${discordIcon('icon--sm')} Join Discord</a>`
) => `
<div class="cta-band reveal">
  <img class="deco" src="${deco}" alt="" loading="lazy" decoding="async">
  <h2>${h2}</h2>
  <p>${p}</p>
  <div class="cta-row">${primary}${extra}</div>
</div>`;

/* Discadia support band */
const discadiaBand = () => `
<section class="section">
  <div class="disc-band reveal">
    <div class="disc-copy">
      <span class="tag tag--warm"><span class="dot"></span>Support the crew</span>
      <h2>Like us on Discadia ${emoji('💜', 'emoji--lg')}</h2>
      <p>Discadia is how new players find Dark Fruits. One tap on the heart pushes us up the listings and brings more traders, clans and giveaway hunters into the server — it costs you nothing.</p>
      <div class="cta-row">
        <a class="btn btn-main" href="${DISC}" target="_blank" rel="noopener">${emoji('⭐')} Like Dark Fruits</a>
        <a class="btn btn-ghost" href="${DISC}" target="_blank" rel="noopener">View our page ${icon('arrow', 'icon--sm')}</a>
      </div>
    </div>
    <div class="disc-art" aria-hidden="true">
      ${emoji('💜', 'emoji--xl')}${emoji('⭐', 'emoji--lg')}${emoji('🔥', 'emoji--lg')}
    </div>
  </div>
</section>`;

const countdown = (tag, title, sub, note = '', warm = false) => `
<div class="cd-wrap reveal">
  <div class="cd-top">
    <span class="tag ${warm ? 'tag--warm' : ''}"><span class="dot"></span>${tag}</span>
  </div>
  <h3>${title}</h3>
  <p class="cd-sub">${sub}</p>
  <div class="countdown" id="event-countdown"></div>
  <div class="cd-meter">
    <div class="cd-bar" aria-hidden="true"><i id="cd-progress"></i></div>
    <span class="cd-pct" id="cd-pct" aria-hidden="true">0%</span>
  </div>
  ${note ? `<p class="cd-sub" style="margin:1.1rem 0 0">${note}</p>` : ''}
</div>`;

const stats = `
  <div class="stats">
    <div class="stat"><strong id="member-count">261</strong><span>Members</span></div>
    <div class="stat"><strong id="online-count">68</strong><span>Online now</span></div>
    <div class="stat"><strong>24/7</strong><span>Trading</span></div>
  </div>`;

/* ----------------------------------------------------------------- home */
const heroArt = `
<div class="hero-art reveal" data-delay="150" aria-hidden="true">
  <div class="rings"></div>
  <div class="mark-tile">
    <img src="dark-fruits-logo.gif" alt="" width="280" height="255" fetchpriority="high" decoding="async">
  </div>
  ${['f05', 'f12', 'f18', 'f24', 'f31', 'f38']
    .map(
      (f, i) =>
        `<div class="orbit orbit--${i + 1}"><img src="${f}.png" alt="" loading="lazy" decoding="async"></div>`
    )
    .join('')}
</div>`;

const vaultRow = (start, count, rev = false) => `
  <div class="vault-row${rev ? ' vault-row--rev' : ''}">
    ${Array.from({ length: count }, (_, i) => {
      const n = String((start + i) % 41).padStart(2, '0');
      return `<span class="vault-tile"><img src="f${n}.png" alt="" loading="lazy" decoding="async"></span>`;
    }).join('')}
    ${Array.from({ length: count }, (_, i) => {
      const n = String((start + i) % 41).padStart(2, '0');
      return `<span class="vault-tile"><img src="f${n}.png" alt="" loading="lazy" decoding="async"></span>`;
    }).join('')}
  </div>`;

const homeBody = `
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy reveal">
        <span class="status-pill"><span class="dot"></span> Live on Discord — trading open 24/7</span>
        <h1><span class="l1">DARK</span><span class="l2">FRUITS</span></h1>
        <p class="hero-tag">Rule the fruits</p>
        <p class="hero-lede">A premium Blox Fruits crew for traders, clans, tournaments and giveaways — built for players who <b>actually grind</b>.</p>
        <div class="cta-row">
          <a href="${INVITE}" class="btn btn-main" target="_blank" rel="noopener">${discordIcon('icon--sm')} Join Discord</a>
          <a href="clans.html" class="btn btn-ghost">Explore clans ${icon('arrow', 'icon--sm')}</a>
        </div>
        ${stats}
      </div>
      ${heroArt}
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    ${[...TICKER, ...TICKER]
      .map(([char, label]) => `<span class="ticker-item">${emoji(char)}${label}</span>`)
      .join('')}
  </div>
</div>

<div class="wrap">
  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🔥')} <b>01</b> Why join</div>
      <div>
        <h2>Everything in one crew</h2>
        <p>Trading, voice, shop economy, daily quests, clans, tournaments and ranked chat — all built around Blox Fruits.</p>
      </div>
    </div>
    <div class="hub">
      <a href="trading.html"><span class="ico">${emoji('⚔️')}</span><span class="txt"><strong>Trading</strong><small>Partners &amp; safety</small></span><span class="go">${icon('arrow')}</span></a>
      <a href="values.html"><span class="ico">${emoji('📊')}</span><span class="txt"><strong>Values</strong><small>Live values &amp; stock</small></span><span class="go">${icon('arrow')}</span></a>
      <a href="events.html"><span class="ico">${emoji('🏆')}</span><span class="txt"><strong>Events</strong><small>Tournaments &amp; races</small></span><span class="go">${icon('arrow')}</span></a>
      <a href="giveaways.html"><span class="ico">${emoji('🎁')}</span><span class="txt"><strong>Giveaways</strong><small>Entries &amp; perks</small></span><span class="go">${icon('arrow')}</span></a>
      <a href="clans.html"><span class="ico">${emoji('🏴')}</span><span class="txt"><strong>Clans</strong><small>Five divisions</small></span><span class="go">${icon('arrow')}</span></a>
      <a href="shop.html"><span class="ico">${emoji('🛒')}</span><span class="txt"><strong>Shop &amp; DC</strong><small>Tickets &amp; roles</small></span><span class="go">${icon('arrow')}</span></a>
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🧺')} <b>02</b> The vault</div>
      <div>
        <h2>Every fruit, tracked</h2>
        <p>Values, stock windows and trade talk for the whole roster — from commons to mythicals, permanents and gamepasses.</p>
      </div>
    </div>
    <div class="vault reveal" aria-hidden="true">
      ${vaultRow(0, 14)}
      ${vaultRow(21, 14, true)}
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🎃')} <b>03</b> Live in game</div>
      <div>
        <h2>The Halloween window is closing</h2>
        <p>Trick-or-Treat is live in Blox Fruits right now. Here's how long is left.</p>
      </div>
    </div>
    ${countdown(
      'Ends 15 Nov',
      'Halloween / Trick-or-Treat',
      'Seasonal content with limited rewards — farm it before the window shuts.',
      `<a class="crumb" href="values.html" style="color:var(--pink)">Game news &amp; stock ${icon('arrow', 'icon--sm')}</a>`
    )}
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('⚡')} <b>04</b> Inside the crew</div>
      <div>
        <h2>What makes it different</h2>
        <p>An actual economy, real progression and rewards for the people who show up.</p>
      </div>
    </div>
    <div class="bento">
      <div class="card card--feature reveal">
        <div class="chip">${emoji('📜')}</div>
        <h3>Daily quests, real rewards</h3>
        <p>Complete daily quests to earn <strong>DC (Dark Coins)</strong> every day. Stack them up and spend them in the store on tournament tickets, giveaway entries, fruit rolls and roles that pay you back daily.</p>
      </div>
      ${card('📈', 'Chat leveling', 'Every 5 chat levels you rank up. Hit level 30 to unlock <strong>Diamond Chatter</strong> and its perks.')}
      ${card('🚀', 'Boost perks', 'Server boosters get extra giveaway entries, recognition and a faster climb through the ranks.')}
      ${card('🎯', 'The 300 members goal', 'At <strong>300 members</strong> the crew runs a <strong>Permanent Portal</strong> giveaway. We are close.', 'card--full')}
    </div>
  </section>

  ${discadiaBand()}

  ${ctaBand('The crew is waiting', 'Trade, quest, climb ranks and join a division. It takes one click to get in.')}
</div>`;

/* --------------------------------------------------------------- trading */
const tradingBody = `
${pageTop(
  '02',
  'Trading',
  'The Blox Fruits <em>trading hub</em>',
  'Find partners, post offers, check live values and stay safe. Voice trading is open around the clock.',
  '⚔️'
)}
<div class="wrap">
  <section class="section">
    <div class="bento bento--2">
      ${card('🔍', 'Find partners', 'Dedicated channels for looking, offering and value talk — so your offers actually get seen.')}
      ${card('📊', 'Use live values', 'Check the <a href="values.html">Values page</a>, then confirm on the live list before you commit to a deal.')}
      ${card('🛡️', 'Anti-scam first', 'Never trade outside trusted methods. Report scams to staff immediately and we handle it.')}
      ${card('🎙️', 'Voice trades', 'Jump into voice to negotiate and close deals live with the crew — no cold DMs required.')}
      ${card('💎', 'Booster &amp; Diamond Chatter perks', 'Boosters and members who reach Diamond Chatter (level 30) unlock extra trading privileges and giveaway entry bonuses.', 'card--full')}
    </div>
  </section>
  ${ctaBand('Start trading', 'Join Discord and open the trading channels.', '', 'f05.png')}
</div>`;

/* ------------------------------------------------------------------ shop */
const shopBody = `
${pageTop(
  '03',
  'Shop & DC',
  'Shop &amp; <em>Dark Coins</em>',
  'Earn DC from daily quests and activity, then spend it on tickets, roles and rolls. Prices are in DC.',
  '🪙'
)}
<div class="wrap">
  <section class="section">
    <div class="bento bento--2">
      ${card('📜', 'Daily quests', 'Complete daily quests to earn DC every day and keep your balance moving up.')}
      ${card('📈', 'Chat ranks', 'Every 5 chat levels you rank up. At level 30 you become <strong>Diamond Chatter</strong>.')}
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🛒')} What you can buy</div>
      <div>
        <h2>Open the store in Discord</h2>
        <p>Use the bot or <code>/buy</code>. Every item is delivered through a support ticket.</p>
      </div>
    </div>
    <div class="shop-grid reveal">
      <div class="shop-item"><span class="price">100 DC</span><div><h3>${emoji('🎫')} Tournament ticket</h3><p>PvP challenge ticket. Can earn 5,000 DC plus the tournament winner role (800 DC/day). Expires after a week.</p></div></div>
      <div class="shop-item"><span class="price">1,000 DC</span><div><h3>${emoji('🎁')} Giveaway entry</h3><p>One extra entry in future giveaways.</p></div></div>
      <div class="shop-item"><span class="price">5,000 DC</span><div><h3>${emoji('🎰')} Fruit roll</h3><p>Free fruit roll — open a support ticket to claim it.</p></div></div>
      <div class="shop-item"><span class="price">10,000 DC</span><div><h3>${emoji('😈')} Dark supporter role</h3><p>Member role that earns 250 DC per day.</p></div></div>
      <div class="shop-item"><span class="price">25,000 DC</span><div><h3>${emoji('👑')} Dark VIP role</h3><p>Royalty rank in the server.</p></div></div>
      <div class="shop-item"><span class="price">50,000 DC</span><div><h3>${emoji('🐉')} Random Mythical fruit</h3><p>One random mythical fruit — open a support ticket to claim.</p></div></div>
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('📈')} Chat leveling</div>
      <div><h2>The climb</h2></div>
    </div>
    <div class="ranks reveal">
      <div class="rank"><strong>Every 5 levels</strong><span>Rank up</span></div>
      <div class="rank"><strong>Level 30 — Diamond Chatter</strong><span>Unlocks Diamond Chatter plus booster-style trading perks</span></div>
      <div class="rank"><strong>Boosters &amp; Diamond Chatter</strong><span>Extra giveaway entries</span></div>
    </div>
  </section>

  ${ctaBand('Start earning DC', 'Join Discord, run your daily quests, then open the store.', '', 'f24.png')}
</div>`;

/* ---------------------------------------------------------------- values */
const valuesBody = `
${pageTop(
  '04',
  'Values & stock',
  'Trade values &amp; <em>live stock</em>',
  'Use the Discord trading channels for live offers. Value talk stays inside the crew so nobody gets finessed.',
  '📊'
)}
<div class="wrap">
  <section class="section">
    <div class="bento bento--2">
      ${card('🍇', 'Mythicals', 'Dragon, Kitsune, Control, Dough and the rest — ask in trading for current deals.')}
      ${card('🔒', 'Permanents', 'Perms trade higher. Confirm with experienced traders in the server before you lock a deal.')}
      ${card('✨', 'Mutations', 'Limited skins and mutations move fast. Check voice and trading channels first.')}
      ${card('🎟️', 'Gamepasses', 'Dark Blade, Notifier and more — talk it through in trading before buying or trading.')}
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🏪')} What's up right now</div>
      <div>
        <h2>Fruit stock rotations</h2>
        <p>Normal and Mirage stock rotate on separate timers. Rare fruits don't stay up long.</p>
      </div>
    </div>
    <div class="bento bento--2">
      ${card('🏪', 'Normal stock', 'The dealer restocks on a regular cycle. Mythicals are uncommon — jump when the crew pings.')}
      ${card('🏝️', 'Mirage stock', 'A separate pool with its own timing. Watch announcements and ask in chat when something rare is up.')}
      ${card('🔔', 'Never miss a window', 'Stock pings, value talk and live offers all happen in Discord so you see them the second they drop.', 'card--full')}
    </div>
  </section>

  <section class="section">
    ${countdown(
      'In-game event',
      'Halloween / Trick-or-Treat',
      'Seasonal content is live in Blox Fruits with limited rewards. Countdown to the end:',
      'Ends 15 Nov 2026.',
      true
    )}
  </section>

  ${ctaBand('Trade with the crew', 'Values and stock talk live in Discord — that is where the deals happen.', '', 'f31.png')}
</div>`;

/* ---------------------------------------------------------------- events */
const eventsBody = `
${pageTop(
  '05',
  'Events',
  'Tournaments &amp; <em>races</em>',
  'Enter PvP tournaments, races and limited events. Tickets come from the shop — the rest is up to you.',
  '🏆'
)}
<div class="wrap">
  <section class="section">
    <div class="bento bento--2">
      ${card('🎫', 'Tournament tickets', 'Buy a ticket in the shop for <strong>100 DC</strong>. Tickets last one week and can earn 5,000 DC plus the winner role (800 DC/day).')}
      ${card('⚔️', 'PvP challenges', 'Fair, moderated matches. Brackets and rules are posted in Discord before every event.')}
      ${card('🏁', 'Races', 'Speed and skill challenges — climb the board and earn recognition in the crew.')}
      ${card('✨', 'Special events', 'Seasonal and limited-time events with rewards you cannot get anywhere else.')}
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('⏳')} Next window</div>
      <div>
        <h2>Next event window</h2>
        <p>Tickets go fast when the window opens. Get yours before the bracket is set.</p>
      </div>
    </div>
    ${countdown('Registration soon', 'Next tournament window', 'The next tournament bracket opens when the current in-game event closes.')}
  </section>

  ${ctaBand(
    'Get your ticket',
    'Earn DC with daily quests, then buy your ticket in the shop.',
    `<a href="shop.html" class="btn btn-ghost">View shop ${icon('arrow', 'icon--sm')}</a>`,
    'f12.png'
  )}
</div>`;

/* ------------------------------------------------------------- giveaways */
const giveawaysBody = `
${pageTop(
  '06',
  'Giveaways',
  'Giveaways worth <em>the grind</em>',
  'Regular giveaways for active members. Boosters, Diamond Chatter and shop entries all stack in your favour.',
  '🎁'
)}
<div class="wrap">
  <section class="section">
    <div class="bento bento--2">
      ${card('🎁', 'How to enter', 'Join the server and follow the steps in the giveaway channel. That is the whole requirement.')}
      ${card('📢', 'Giveaway channel', `Everything drops in one place. <a href="${CH_GIVEAWAY}" target="_blank" rel="noopener">Open the giveaways channel →</a>`)}
      ${card('🎟️', 'Extra entries', 'Buy giveaway entries in the shop (1,000 DC). Boosters and Diamond Chatter members also get bonus entries.')}
      ${card('🔓', 'The 300 members goal', 'When we hit <strong>300 members</strong> the crew runs a <strong>Permanent Portal</strong> giveaway for everyone in the server.')}
    </div>
  </section>

  ${ctaBand("Don't miss the next one", 'Stay active in chat and keep an eye on the giveaway channel.', '', 'f38.png')}
</div>`;

/* ----------------------------------------------------------------- clans */
const CLANS = [
  ['🌑', 'Shadow Division', 'Silent strikes. Precision over noise.'],
  ['🌊', 'Abyssal Guard', 'Deep waters. An unbreakable line.'],
  ['🕳️', 'Void Born', 'Born from nothing. Fear the dark.'],
  ['🐉', 'Dragon Sovereign', 'Rule the skies. Claim the throne.'],
  ['🌆', 'Dusk Legion', 'When the sun falls, we rise.'],
];

const clansBody = `
${pageTop(
  '07',
  'Clans',
  'Choose your <em>division</em>',
  'Five divisions, five identities. Pick your side and get a home inside the crew.',
  '🏴'
)}
<div class="wrap">
  <section class="section">
    <div class="clan-grid reveal">
      ${CLANS.map(
        ([char, name, desc], i) => `
      <div class="clan">
        <div class="emblem">${emoji(char)}</div>
        <span class="div-num">DIVISION 0${i + 1}</span>
        <h3>${name}</h3>
        <p>${desc}</p>
      </div>`
      ).join('')}
    </div>
  </section>

  ${ctaBand('Join a clan', 'Pick your division after you join the Discord and introduce yourself.', '', 'f10.png')}
</div>`;

/* ----------------------------------------------------------------- staff */
const staffBody = `
${pageTop(
  '08',
  'Leadership',
  'The people <em>running it</em>',
  'The team behind Dark Fruits. Want to help? Applications go through a support ticket.',
  '👑'
)}
<div class="wrap">
  <section class="section">
    <div class="staff-grid reveal">
      <div class="staff-card is-owner">
        <div class="avatar">${emoji('👑', 'emoji--lg')}</div>
        <h3>dark_angel01</h3>
        <div class="role">Server owner</div>
        <p>Founder. Builds the vision and leads the crew.</p>
        <a href="${PROFILE}" class="btn btn-ghost" style="font-size:.8rem;padding:.55rem 1rem" target="_blank" rel="noopener">Profile ${icon('arrow', 'icon--sm')}</a>
      </div>
      <div class="staff-card">
        <div class="avatar">K</div>
        <h3>keepcalm_karl</h3>
        <div class="role">Co-owner</div>
        <p>Co-owner. Runs operations and keeps the community moving.</p>
      </div>
      <div class="staff-card">
        <div class="avatar">9</div>
        <h3>901rayan</h3>
        <div class="role">Head of staff</div>
        <p>Oversees moderation and the shape of the team.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="sec-head reveal">
      <div class="eyebrow">${emoji('🛠️')} Join the team</div>
      <div>
        <h2>Become staff</h2>
        <p>Open a ticket in the support channel and tell us why you want to help.</p>
      </div>
    </div>
    ${ctaBand(
      'Think you can run it?',
      'You need to be active, fair and ready to enforce the rules.',
      `<a class="btn btn-ghost" href="${CH_SUPPORT}" target="_blank" rel="noopener">Open support channel ${icon('arrow', 'icon--sm')}</a>`,
      'f27.png'
    )}
  </section>
</div>`;

/* ----------------------------------------------------------------- rules */
const RULES = [
  'Respect every member. No harassment, no toxicity.',
  'No scams or fraudulent trading. Report it immediately.',
  "Follow Discord's Terms of Service and Community Guidelines.",
  'Follow the trading, giveaway and event rules set by staff.',
  'Listen to authorised staff. Their decisions are final.',
  'Keep the community welcoming. Help new members.',
];

const rulesBody = `
${pageTop(
  '09',
  'Rules',
  'Community <em>standards</em>',
  'Keep the server safe and fun for everyone. The full rules are pinned in Discord.',
  '📜'
)}
<div class="wrap">
  <section class="section">
    <div class="rules reveal">
      ${RULES.map(
        (text, i) =>
          `<div class="rule"><span class="rule-num">0${i + 1}</span><span>${text}</span></div>`
      ).join('')}
    </div>
  </section>

  ${ctaBand('Join the crew', 'Read the full rules in Discord once you are in.', '', 'f02.png')}
</div>`;

/* ---------------------------------------------------------------- output */
const pages = [
  {
    file: 'index.html',
    active: null,
    title: 'Dark Fruits — Blox Fruits trading crew',
    desc: 'Premium Blox Fruits Discord crew: trading, live values, clans, tournaments, giveaways and a DC economy.',
    body: homeBody,
  },
  {
    file: 'trading.html',
    active: 'trading.html',
    title: 'Trading — Dark Fruits',
    desc: 'Blox Fruits trading hub: find partners, check live values and trade safely with the Dark Fruits crew.',
    body: tradingBody,
  },
  {
    file: 'shop.html',
    active: 'shop.html',
    title: 'Shop & DC — Dark Fruits',
    desc: 'Dark Fruits shop and DC economy: tournament tickets, giveaway entries, fruit rolls and roles.',
    body: shopBody,
  },
  {
    file: 'values.html',
    active: 'values.html',
    title: 'Values & stock — Dark Fruits',
    desc: 'Blox Fruits trade values, fruit stock rotations and in-game event countdowns.',
    body: valuesBody,
  },
  {
    file: 'events.html',
    active: 'events.html',
    title: 'Events — Dark Fruits',
    desc: 'Tournaments, PvP challenges and races in the Dark Fruits Blox Fruits crew.',
    body: eventsBody,
  },
  {
    file: 'giveaways.html',
    active: 'giveaways.html',
    title: 'Giveaways — Dark Fruits',
    desc: 'Community giveaways, extra entries and perks for boosters and Diamond Chatter members.',
    body: giveawaysBody,
  },
  {
    file: 'clans.html',
    active: 'clans.html',
    title: 'Clans — Dark Fruits',
    desc: 'Five clan divisions inside the Dark Fruits crew. Pick your side.',
    body: clansBody,
  },
  {
    file: 'staff.html',
    active: 'staff.html',
    title: 'Staff — Dark Fruits',
    desc: 'The Dark Fruits leadership team and how to apply for staff.',
    body: staffBody,
  },
  {
    file: 'rules.html',
    active: 'rules.html',
    title: 'Rules — Dark Fruits',
    desc: 'Dark Fruits community standards and trading rules.',
    body: rulesBody,
  },
];

for (const page of pages) {
  const html =
    head({ title: page.title, description: page.desc, canonical: page.file }) +
    header(page.active) +
    `<main id="main">${page.body}</main>` +
    footer();
  writeFileSync(join(OUT, page.file), html, 'utf8');
  console.log('wrote', page.file, (html.length / 1024).toFixed(1) + ' KB');
}
