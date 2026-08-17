/* 开源项目扫描站 · 前端渲染
   读取 data.json（由 GitHub Actions 每日生成），渲染雷达图与项目卡片。 */
(function () {
  'use strict';

  /* ---------- 工具 ---------- */
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function relTime(iso) {
    var diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 0) diff = 0;
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';
    if (diff < 86400 * 30) return Math.floor(diff / 86400) + ' 天前';
    if (diff < 86400 * 365) return Math.floor(diff / 86400 / 30) + ' 个月前';
    return Math.floor(diff / 86400 / 365) + ' 年前';
  }

  function fmtTime(iso) {
    var d = new Date(iso);
    var p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function homeUrl(h) {
    if (!h) return '';
    return /^https?:\/\//i.test(h) ? h : 'https://' + h;
  }

  function hash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0;
    return h;
  }

  /* GitHub linguist 常见语言色 */
  var LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
    SCSS: '#c6538c', Python: '#3572A5', Java: '#b07219', 'Kotlin': '#A97BFF',
    Shell: '#89e051', Dockerfile: '#384d54', Vue: '#41b883', Astro: '#ff5a03',
    Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', PHP: '#4F5D95',
    'C': '#9fb3d1', 'C++': '#f34b7d', 'C#': '#178600', Swift: '#F05138',
    Dart: '#00B4AB', Lua: '#7f7fdf', R: '#198CE7', Scala: '#c22d40',
    Elixir: '#6e4a7e', Haskell: '#5e5086', 'Jupyter Notebook': '#DA5B0B',
    Nix: '#7e7eff', Zig: '#ec915c', Makefile: '#427819', 'PowerShell': '#012456'
  };
  function langColor(name) { return LANG_COLORS[name] || '#9FB3D1'; }

  /* ---------- 状态 ---------- */
  var state = { q: '', lang: '', sort: 'pushed' };
  var DATA = null;

  /* ---------- 渲染：头部信息 ---------- */
  function renderHead(d) {
    document.title = d.owner.name + ' · 开源项目扫描站';
    var avatar = $('owner-avatar');
    avatar.src = d.owner.avatar_url;
    avatar.alt = d.owner.name;
    $('owner-name').textContent = d.owner.name;
    var link = $('owner-link');
    link.href = d.owner.html_url;
    link.textContent = '@' + d.owner.login + ' ↗';
    if (d.owner.bio) $('owner-bio').textContent = d.owner.bio;

    $('stat-repos').textContent = d.stats.repos;
    $('stat-stars').textContent = d.stats.stars;
    $('stat-forks').textContent = d.stats.forks;
    $('stat-langs').textContent = d.stats.languages.length;
    $('radar-count').textContent = d.stats.repos;
    $('scan-time').textContent = fmtTime(d.generated_at);
    $('footer-time').textContent = fmtTime(d.generated_at);
  }

  /* ---------- 渲染：语言筛选 chips ---------- */
  function renderChips(d) {
    var box = $('chips');
    box.innerHTML = '';
    d.stats.languages.forEach(function (l) {
      var b = document.createElement('button');
      b.className = 'chip';
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.dataset.lang = l.name;
      b.innerHTML =
        '<span class="dot" style="background:' + langColor(l.name) + '"></span>' +
        esc(l.name) + ' <span class="n">' + l.count + '</span>';
      b.addEventListener('click', function () {
        state.lang = state.lang === l.name ? '' : l.name;
        box.querySelectorAll('.chip').forEach(function (c) {
          c.setAttribute('aria-pressed', c.dataset.lang === state.lang ? 'true' : 'false');
        });
        apply();
      });
      box.appendChild(b);
    });
  }

  /* ---------- 筛选与排序 ---------- */
  function visibleRepos() {
    var q = state.q.trim().toLowerCase();
    var list = DATA.repos.filter(function (r) {
      if (state.lang && r.language !== state.lang) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().indexOf(q) !== -1 ||
        r.description.toLowerCase().indexOf(q) !== -1 ||
        r.topics.some(function (t) { return t.toLowerCase().indexOf(q) !== -1; })
      );
    });
    var key = { pushed: 'pushed_at', created: 'created_at' }[state.sort];
    list.sort(function (a, b) {
      if (state.sort === 'stars') return b.stars - a.stars;
      return (b[key] || '').localeCompare(a[key] || '');
    });
    return list;
  }

  /* ---------- 渲染：卡片 ---------- */
  function cardHtml(r) {
    var lang = r.language;
    var meta =
      '<div class="card-meta">' +
      (lang
        ? '<span class="lang"><span class="dot" style="background:' + langColor(lang) + '"></span>' + esc(lang) + '</span>'
        : '<span class="lang"><span class="dot" style="background:#5A6E8C"></span>未标记语言</span>') +
      '<span class="stars' + (r.stars ? '' : ' zero') + '">★ ' + r.stars + '</span>' +
      '<span class="forks">⑂ ' + r.forks + '</span>' +
      '<span class="when" title="' + esc(fmtTime(r.pushed_at)) + '">' + relTime(r.pushed_at) + '</span>' +
      '</div>';

    var bar = '';
    if (r.languages && r.languages.length > 1) {
      bar = '<div class="langbar" aria-hidden="true">' +
        r.languages.map(function (l) {
          return '<i style="width:' + l.pct + '%;background:' + langColor(l.name) + '" title="' + esc(l.name) + ' ' + l.pct + '%"></i>';
        }).join('') + '</div>';
    }

    var topics = '';
    if (r.topics.length) {
      topics = '<div class="card-topics">' +
        r.topics.slice(0, 6).map(function (t) { return '<span class="topic">' + esc(t) + '</span>'; }).join('') +
        '</div>';
    }

    var home = homeUrl(r.homepage);
    var archived = r.archived ? '<span class="badge-archived">已归档</span>' : '';

    return (
      '<article class="card" id="card-' + esc(r.name) + '" data-repo="' + esc(r.name) + '">' +
      '<div class="card-top">' +
      '<a class="card-name" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + '</a>' +
      (home ? '<a class="card-home" href="' + esc(home) + '" target="_blank" rel="noopener" title="项目主页">⌂ 主页</a>' : '') +
      archived +
      '</div>' +
      '<p class="card-desc' + (r.description ? '' : ' none') + '">' +
      (r.description ? esc(r.description) : '（暂无描述）') + '</p>' +
      topics + bar + meta +
      '</article>'
    );
  }

  /* ---------- 渲染：雷达 ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var BLIP_ELS = {};

  function blipPos(r) {
    var days = (Date.now() - new Date(r.pushed_at).getTime()) / 86400000;
    var t = Math.min(1, Math.max(0, days / 365));      // 越新越靠心
    var frac = 0.17 + 0.79 * t;
    var ang = (hash(r.name) % 360) * Math.PI / 180;
    var R = 184;                                         // viewBox 400，中心 200
    return { x: 200 + Math.cos(ang) * R * frac, y: 200 + Math.sin(ang) * R * frac };
  }

  function blipRadius(r) { return 3.5 + Math.min(6.5, Math.sqrt(r.stars) * 1.4); }

  function renderRadar(d) {
    var svg = $('radar-svg');
    svg.innerHTML = '';

    [62, 124, 184].forEach(function (r) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', 200); c.setAttribute('cy', 200); c.setAttribute('r', r);
      c.setAttribute('class', 'ring');
      svg.appendChild(c);
    });
    [[200, 8, 200, 392], [8, 200, 392, 200]].forEach(function (a) {
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]);
      l.setAttribute('x2', a[2]); l.setAttribute('y2', a[3]);
      l.setAttribute('class', 'axis');
      svg.appendChild(l);
    });
    var core = document.createElementNS(NS, 'circle');
    core.setAttribute('cx', 200); core.setAttribute('cy', 200); core.setAttribute('r', 2.4);
    core.setAttribute('fill', '#FFC24B');
    svg.appendChild(core);

    var tip = $('radar-tip');

    d.repos.forEach(function (r) {
      var pos = blipPos(r);
      var rad = blipRadius(r);
      var color = r.language ? langColor(r.language) : '#9FB3D1';

      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'blip');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.dataset.repo = r.name;
      g.setAttribute('aria-label', r.name + '，' + r.stars + ' Star，' + relTime(r.pushed_at) + '更新');

      var halo = document.createElementNS(NS, 'circle');
      halo.setAttribute('cx', pos.x); halo.setAttribute('cy', pos.y);
      halo.setAttribute('r', rad * 2.1);
      halo.setAttribute('fill', color);
      halo.setAttribute('class', 'halo');

      var dotEl = document.createElementNS(NS, 'circle');
      dotEl.setAttribute('cx', pos.x); dotEl.setAttribute('cy', pos.y);
      dotEl.setAttribute('r', rad);
      dotEl.setAttribute('fill', color);
      dotEl.setAttribute('class', 'core');

      g.appendChild(halo);
      g.appendChild(dotEl);

      function showTip(evt) {
        tip.hidden = false;
        tip.innerHTML = '<b>' + esc(r.name) + '</b>' +
          '<span class="tip-star">★ ' + r.stars + '</span> · ' + relTime(r.pushed_at) +
          (r.language ? ' · ' + esc(r.language) : '');
        var rect = tip.parentElement.getBoundingClientRect();
        var pt = evt.type === 'focus' ? g.getBoundingClientRect() : evt.target.getBoundingClientRect();
        tip.style.left = (pt.left + pt.width / 2 - rect.left) + 'px';
        tip.style.top = (pt.top - rect.top) + 'px';
      }
      g.addEventListener('mouseenter', showTip);
      g.addEventListener('focus', showTip);
      g.addEventListener('mouseleave', function () { tip.hidden = true; });
      g.addEventListener('blur', function () { tip.hidden = true; });

      function activate() {
        var card = document.getElementById('card-' + r.name);
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('flash');
        void card.offsetWidth;
        card.classList.add('flash');
      }
      g.addEventListener('click', activate);
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });

      svg.appendChild(g);
      BLIP_ELS[r.name] = g;
    });
  }

  /* 卡片悬浮时点亮对应雷达光点 */
  function bindCardHover() {
    document.querySelectorAll('.card').forEach(function (card) {
      var g = BLIP_ELS[card.dataset.repo];
      if (!g) return;
      card.addEventListener('mouseenter', function () { g.classList.add('lit'); });
      card.addEventListener('mouseleave', function () { g.classList.remove('lit'); });
    });
  }

  /* ---------- 应用筛选 ---------- */
  function apply() {
    var list = visibleRepos();
    var cards = $('cards');
    cards.innerHTML = list.map(cardHtml).join('');

    var names = {};
    list.forEach(function (r) { names[r.name] = true; });
    Object.keys(BLIP_ELS).forEach(function (n) {
      BLIP_ELS[n].classList.toggle('dim', !names[n]);
    });

    $('count-line').textContent =
      '显示 ' + list.length + ' / ' + DATA.stats.repos + ' 个项目' +
      (state.sort === 'stars' ? ' · 按 STAR 排序' : state.sort === 'created' ? ' · 按创建时间排序' : ' · 按最近推送排序');
    $('empty-state').hidden = list.length !== 0;
    bindCardHover();
  }

  /* ---------- 启动 ---------- */
  function boot(d) {
    DATA = d;
    renderHead(d);
    renderChips(d);
    renderRadar(d);
    apply();

    var timer = null;
    $('search').addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { state.q = $('search').value; apply(); }, 120);
    });
    $('sort').addEventListener('change', function () { state.sort = this.value; apply(); });
    $('reset-btn').addEventListener('click', function () {
      state.q = ''; state.lang = '';
      $('search').value = '';
      document.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', 'false');
      });
      apply();
    });
  }

  function load() {
    fetch('data.json', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(boot)
      .catch(function () {
        $('error-state').hidden = false;
        $('retry-btn').addEventListener('click', function () {
          $('error-state').hidden = true;
          load();
        });
      });
  }

  load();
})();
