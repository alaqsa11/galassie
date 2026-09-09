# Aura — Generatore grafiche a gradienti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Costruire il sito Aura (HTML/CSS/JS statico) con hub a tre categorie, studio con controlli ampi, testo Social, export PNG, copia palette e link condividibile.

**Architecture:** Single-page app statica in `superpower/`: home vivace → hub categorie → studio condiviso. Stato grafica in un oggetto `AuraState` serializzato nell'hash URL (`#s=...`). Anteprima e export su `<canvas>`. Script classici globali (niente moduli ES, niente Node/npm), allineati al resto del repo.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla (Canvas 2D API, Clipboard API, URL hash), Font Awesome 6.5 CDN, font display da Google Fonts (es. Syne + DM Sans).

## Global Constraints

- Lingua UI: italiano (niente accenti nei dati JS: usare `e` / `c'` dove serve)
- Niente Node.js / npm / build step; verifica solo manuale nel browser
- Path git: `& "C:\Program Files\Git\cmd\git.exe"`; commit solo dopo conferma utente
- File del prodotto sotto `superpower/` (non mescolare con tarot/galassie)
- Brand: **Aura**; atmosfera creativa e animata
- Testo layer solo in categoria `social`
- Max lato lungo export/custom: **4096px**; min lato: **64px**; stop colore: **2–5**
- Link condiviso: hash `#s=<base64url(JSON)>`; hash corrotto → default categoria + toast soft

---

## File structure

| File | Responsabilita |
|---|---|
| `superpower/index.html` | Shell SPA: home, hub categorie, galleria ispirazione, studio |
| `superpower/aura.css` | Atmosfera, layout home/studio, controlli, motion, responsive |
| `superpower/js/presets.js` | Preset formato per categoria + dati galleria Ispirazione |
| `superpower/js/state.js` | `AuraState`, default, clamp, serialize/deserialize hash |
| `superpower/js/gradient-engine.js` | Generazione random, CSS string, paint su canvas |
| `superpower/js/export.js` | Download PNG, copia palette HEX+CSS, copia link |
| `superpower/js/ui.js` | Binding controlli ↔ stato, toast, navigazione view |
| `superpower/js/app.js` | Bootstrap, routing view, wire eventi |

---

### Task 1: Scaffold home Aura + navigazione view

**Files:**
- Create: `superpower/index.html`
- Create: `superpower/aura.css`
- Create: `superpower/js/app.js` (stub navigazione)
- Create: `superpower/js/ui.js` (stub `showView`)

**Interfaces:**
- Consumes: nessuno
- Produces: `window.AuraUI.showView(name)` dove `name` e `'home' | 'inspiration' | 'studio'`; attributo `data-view` su `#app`

- [ ] **Step 1: Creare `index.html` con shell e home**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura — Grafiche a gradienti</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="aura.css">
</head>
<body>
  <div id="app" data-view="home">
    <section id="view-home" class="view view-home">
      <div class="home-bg" aria-hidden="true"></div>
      <header class="home-hero">
        <p class="brand">Aura</p>
        <h1>Grafiche a gradienti, in un click</h1>
        <p class="tagline">Sfondi, social e ispirazioni — genera, ritocca, scarica.</p>
      </header>
      <div class="category-doors">
        <button type="button" class="door" data-category="sfondi">
          <i class="fa-solid fa-panorama"></i>
          <span>Sfondi</span>
          <small>Wallpaper e sfondi full-bleed</small>
        </button>
        <button type="button" class="door" data-category="social">
          <i class="fa-solid fa-share-nodes"></i>
          <span>Social</span>
          <small>Post e storie con testo</small>
        </button>
        <button type="button" class="door" data-category="ispirazione">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>Ispirazione</span>
          <small>Mood e palette da esplorare</small>
        </button>
      </div>
    </section>

    <section id="view-inspiration" class="view view-inspiration hidden" hidden>
      <button type="button" class="back-btn" data-nav="home">Indietro</button>
      <h2>Ispirazione</h2>
      <div id="inspiration-grid" class="inspiration-grid"></div>
    </section>

    <section id="view-studio" class="view view-studio hidden" hidden>
      <button type="button" class="back-btn" data-nav="home">Indietro</button>
      <div class="studio-layout">
        <div class="preview-wrap">
          <canvas id="preview-canvas" width="1280" height="720"></canvas>
        </div>
        <aside id="controls-panel" class="controls-panel">
          <!-- controlli nelle task successive -->
        </aside>
      </div>
    </section>
  </div>
  <div id="toast" class="toast hidden" role="status"></div>

  <script src="js/presets.js"></script>
  <script src="js/state.js"></script>
  <script src="js/gradient-engine.js"></script>
  <script src="js/export.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Creare `aura.css` base (home vivace + view)**

Includere variabili CSS, background animato `.home-bg` (gradienti in movimento con `@keyframes`), brand Syne grande, porte categoria senza look “card dashboard”, `.hidden { display: none !important; }`, toast, layout studio anteprima+pannello, media query mobile (pannello sotto).

Variabili minime:

```css
:root {
  --bg: #0c0a12;
  --ink: #f7f2ff;
  --accent-a: #ff6bcb;
  --accent-b: #6bffd3;
  --accent-c: #ffd36b;
  --panel: rgba(255,255,255,0.06);
  --font-display: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
}
```

Almeno 2 motion: (1) drift del `.home-bg`, (2) leggero float delle `.door` on hover.

- [ ] **Step 3: Stub `ui.js` e `app.js`**

```javascript
// js/ui.js
window.AuraUI = {
  showView(name) {
    const app = document.getElementById('app');
    app.dataset.view = name;
    document.querySelectorAll('.view').forEach((el) => {
      const on = el.id === 'view-' + name;
      el.classList.toggle('hidden', !on);
      el.hidden = !on;
    });
  },
  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(window.__auraToastTimer);
    window.__auraToastTimer = setTimeout(() => t.classList.add('hidden'), 2200);
  }
};
```

```javascript
// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.door').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (cat === 'ispirazione') {
        AuraUI.showView('inspiration');
        return;
      }
      // studio wiring in Task 3+
      AuraUI.showView('studio');
    });
  });
  document.querySelectorAll('[data-nav="home"]').forEach((btn) => {
    btn.addEventListener('click', () => AuraUI.showView('home'));
  });
});
```

Creare anche file stub vuoti (o con commento minimo) per `presets.js`, `state.js`, `gradient-engine.js`, `export.js` cosi gli script non 404.

- [ ] **Step 4: Verifica manuale**

Aprire `superpower/index.html` nel browser.
Atteso: brand Aura visibile, tre porte, click Ispirazione apre view ispirazione, Indietro torna home, click Sfondi/Social apre studio (vuoto ok).

- [ ] **Step 5: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/index.html superpower/aura.css superpower/js/
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: scaffold home, view e navigazione base."
```

---

### Task 2: Stato grafica + serialize hash URL

**Files:**
- Create/Modify: `superpower/js/state.js`
- Modify: `superpower/js/presets.js` (costanti formato)

**Interfaces:**
- Consumes: `AuraPresets` (da Task 2 step presets)
- Produces:
  - `AuraState.createDefault(category)` → state object
  - `AuraState.clamp(state)` → state
  - `AuraState.toHash(state)` → string senza `#`
  - `AuraState.fromHash(hashString)` → state | null
  - Shape stato:

```javascript
{
  v: 1,
  category: 'sfondi' | 'social' | 'ispirazione',
  width: number,
  height: number,
  gradientType: 'linear' | 'radial' | 'conic',
  angle: number, // 0-360
  cx: number, // 0-1 per radial/conic
  cy: number,
  stops: [{ color: '#rrggbb', pos: number }], // pos 0-1, length 2-5
  overlays: { blobs: number, intensity: number, vignette: number, layout: number },
  text: {
    content: string,
    x: number, // 0-1
    y: number,
    size: number, // px relativi al min(w,h) o px assoluti — usare px assoluti nello stato
    weight: number,
    align: 'left' | 'center' | 'right',
    color: '#rrggbb'
  } | null
}
```

- [ ] **Step 1: `presets.js`**

```javascript
window.AuraPresets = {
  MAX_SIDE: 4096,
  MIN_SIDE: 64,
  formats: {
    sfondi: [
      { id: 'hd', label: '16:9 HD', width: 1920, height: 1080 },
      { id: 'ultrawide', label: '21:9', width: 2560, height: 1080 },
      { id: 'mobile', label: 'Mobile', width: 1080, height: 1920 }
    ],
    social: [
      { id: 'square', label: 'Post quadrato', width: 1080, height: 1080 },
      { id: 'story', label: 'Storia', width: 1080, height: 1920 },
      { id: 'cover', label: 'Cover', width: 1500, height: 500 }
    ]
  },
  inspiration: [
    {
      id: 'aurora',
      label: 'Aurora',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1280,
        height: 720,
        gradientType: 'linear',
        angle: 125,
        cx: 0.5,
        cy: 0.4,
        stops: [
          { color: '#0f172a', pos: 0 },
          { color: '#22d3ee', pos: 0.45 },
          { color: '#a78bfa', pos: 1 }
        ],
        overlays: { blobs: 3, intensity: 0.55, vignette: 0.35, layout: 0.2 },
        text: null
      }
    },
    {
      id: 'sunset',
      label: 'Tramonto soft',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1080,
        height: 1080,
        gradientType: 'radial',
        angle: 0,
        cx: 0.5,
        cy: 0.65,
        stops: [
          { color: '#fff7ed', pos: 0 },
          { color: '#fb7185', pos: 0.5 },
          { color: '#7c2d12', pos: 1 }
        ],
        overlays: { blobs: 2, intensity: 0.4, vignette: 0.25, layout: 0.6 },
        text: null
      }
    },
    {
      id: 'mint',
      label: 'Menta elettrica',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1080,
        height: 1920,
        gradientType: 'conic',
        angle: 40,
        cx: 0.5,
        cy: 0.5,
        stops: [
          { color: '#042f2e', pos: 0 },
          { color: '#2dd4bf', pos: 0.4 },
          { color: '#f0abfc', pos: 0.75 },
          { color: '#042f2e', pos: 1 }
        ],
        overlays: { blobs: 4, intensity: 0.5, vignette: 0.4, layout: 0.8 },
        text: null
      }
    }
  ]
};
```

Aggiungere almeno **6** item in `inspiration` (ripetere il pattern con palette diverse) cosi la galleria non sembra vuota.

- [ ] **Step 2: Implementare `state.js`**

```javascript
window.AuraState = {
  createDefault(category) {
    const formats = AuraPresets.formats[category === 'social' ? 'social' : 'sfondi'];
    const f = formats[0];
    const state = {
      v: 1,
      category,
      width: f.width,
      height: f.height,
      gradientType: 'linear',
      angle: 135,
      cx: 0.5,
      cy: 0.5,
      stops: [
        { color: '#312e81', pos: 0 },
        { color: '#db2777', pos: 0.5 },
        { color: '#f59e0b', pos: 1 }
      ],
      overlays: { blobs: 3, intensity: 0.45, vignette: 0.3, layout: 0.35 },
      text: category === 'social'
        ? { content: 'Il tuo messaggio', x: 0.5, y: 0.5, size: 64, weight: 700, align: 'center', color: '#ffffff' }
        : null
    };
    return this.clamp(state);
  },

  clamp(state) {
    const s = JSON.parse(JSON.stringify(state));
    let { width, height } = s;
    width = Math.round(Number(width) || AuraPresets.MIN_SIDE);
    height = Math.round(Number(height) || AuraPresets.MIN_SIDE);
    width = Math.max(AuraPresets.MIN_SIDE, width);
    height = Math.max(AuraPresets.MIN_SIDE, height);
    const long = Math.max(width, height);
    if (long > AuraPresets.MAX_SIDE) {
      const scale = AuraPresets.MAX_SIDE / long;
      width = Math.max(AuraPresets.MIN_SIDE, Math.round(width * scale));
      height = Math.max(AuraPresets.MIN_SIDE, Math.round(height * scale));
    }
    s.width = width;
    s.height = height;
    s.angle = ((Number(s.angle) || 0) % 360 + 360) % 360;
    s.cx = Math.min(1, Math.max(0, Number(s.cx) || 0.5));
    s.cy = Math.min(1, Math.max(0, Number(s.cy) || 0.5));
    if (!['linear', 'radial', 'conic'].includes(s.gradientType)) s.gradientType = 'linear';
    if (!Array.isArray(s.stops) || s.stops.length < 2) {
      s.stops = [
        { color: '#111827', pos: 0 },
        { color: '#6d28d9', pos: 1 }
      ];
    }
    s.stops = s.stops.slice(0, 5).map((st, i, arr) => ({
      color: /^#[0-9a-fA-F]{6}$/.test(st.color) ? st.color : '#888888',
      pos: Math.min(1, Math.max(0, Number(st.pos) ?? (i / (arr.length - 1))))
    }));
    s.overlays = s.overlays || { blobs: 2, intensity: 0.4, vignette: 0.3, layout: 0.5 };
    s.overlays.blobs = Math.min(6, Math.max(0, Math.round(Number(s.overlays.blobs) || 0)));
    s.overlays.intensity = Math.min(1, Math.max(0, Number(s.overlays.intensity) || 0));
    s.overlays.vignette = Math.min(1, Math.max(0, Number(s.overlays.vignette) || 0));
    s.overlays.layout = Math.min(1, Math.max(0, Number(s.overlays.layout) || 0));
    if (s.category !== 'social') s.text = null;
    else if (!s.text) {
      s.text = { content: 'Il tuo messaggio', x: 0.5, y: 0.5, size: 64, weight: 700, align: 'center', color: '#ffffff' };
    }
    return s;
  },

  toHash(state) {
    const json = JSON.stringify(this.clamp(state));
    const b64 = btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return 's=' + b64;
  },

  fromHash(hashString) {
    try {
      const raw = (hashString || '').replace(/^#/, '');
      const params = new URLSearchParams(raw);
      const b64 = params.get('s');
      if (!b64) return null;
      const padded = b64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64.length + 3) % 4);
      const json = decodeURIComponent(escape(atob(padded)));
      const obj = JSON.parse(json);
      if (!obj || obj.v !== 1) return null;
      return this.clamp(obj);
    } catch (e) {
      return null;
    }
  }
};
```

- [ ] **Step 3: Verifica in console browser**

Aprire la pagina, in DevTools:

```javascript
const a = AuraState.createDefault('social');
const h = AuraState.toHash(a);
const b = AuraState.fromHash(h);
console.assert(b.category === 'social' && b.stops.length >= 2);
console.assert(AuraState.fromHash('s=###') === null);
const big = AuraState.clamp({ ...a, width: 9000, height: 9000 });
console.assert(Math.max(big.width, big.height) <= 4096);
```

Atteso: nessun assert fallito.

- [ ] **Step 4: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/state.js superpower/js/presets.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: stato grafica, preset e serializzazione URL."
```

---

### Task 3: Motore gradienti + render canvas

**Files:**
- Modify: `superpower/js/gradient-engine.js`
- Modify: `superpower/js/ui.js` (hook `renderPreview`)
- Modify: `superpower/js/app.js` (tenere `window.__auraState`)

**Interfaces:**
- Consumes: `AuraState`
- Produces:
  - `AuraEngine.randomize(state)` → nuovo state (stessa category/size salvo overlay/colori)
  - `AuraEngine.cssGradient(state)` → stringa CSS
  - `AuraEngine.paint(canvas, state)` → void (disegna gradient + overlay + testo se social)

- [ ] **Step 1: Implementare `gradient-engine.js`**

```javascript
window.AuraEngine = {
  randomize(state) {
    const s = AuraState.clamp(state);
    const hue = Math.floor(Math.random() * 360);
    const n = 2 + Math.floor(Math.random() * 4);
    s.stops = [];
    for (let i = 0; i < n; i++) {
      const h = (hue + i * (50 + Math.random() * 40)) % 360;
      const sat = 55 + Math.random() * 35;
      const light = 35 + Math.random() * 35;
      s.stops.push({
        color: this._hslToHex(h, sat, light),
        pos: i / (n - 1)
      });
    }
    const types = ['linear', 'radial', 'conic'];
    s.gradientType = types[Math.floor(Math.random() * types.length)];
    s.angle = Math.floor(Math.random() * 360);
    s.cx = 0.3 + Math.random() * 0.4;
    s.cy = 0.3 + Math.random() * 0.4;
    s.overlays.blobs = 1 + Math.floor(Math.random() * 5);
    s.overlays.intensity = 0.25 + Math.random() * 0.55;
    s.overlays.vignette = 0.15 + Math.random() * 0.45;
    s.overlays.layout = Math.random();
    return AuraState.clamp(s);
  },

  cssGradient(state) {
    const s = AuraState.clamp(state);
    const stops = s.stops.map((st) => st.color + ' ' + (st.pos * 100) + '%').join(', ');
    if (s.gradientType === 'radial') {
      return `radial-gradient(circle at ${s.cx * 100}% ${s.cy * 100}%, ${stops})`;
    }
    if (s.gradientType === 'conic') {
      return `conic-gradient(from ${s.angle}deg at ${s.cx * 100}% ${s.cy * 100}%, ${stops})`;
    }
    return `linear-gradient(${s.angle}deg, ${stops})`;
  },

  paint(canvas, state) {
    const s = AuraState.clamp(state);
    canvas.width = s.width;
    canvas.height = s.height;
    const ctx = canvas.getContext('2d');
    const g = this._makeCanvasGradient(ctx, s);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s.width, s.height);
    this._paintOverlays(ctx, s);
    if (s.category === 'social' && s.text) this._paintText(ctx, s);
  },

  _makeCanvasGradient(ctx, s) {
    const sorted = s.stops.slice().sort((a, b) => a.pos - b.pos);
    let g;
    if (s.gradientType === 'radial') {
      const r = Math.hypot(s.width, s.height) * 0.6;
      g = ctx.createRadialGradient(s.cx * s.width, s.cy * s.height, 0, s.cx * s.width, s.cy * s.height, r);
    } else if (s.gradientType === 'conic' && typeof ctx.createConicGradient === 'function') {
      g = ctx.createConicGradient(s.angle * Math.PI / 180, s.cx * s.width, s.cy * s.height);
    } else {
      const rad = s.angle * Math.PI / 180;
      const x0 = s.width / 2 - Math.cos(rad) * s.width;
      const y0 = s.height / 2 - Math.sin(rad) * s.height;
      const x1 = s.width / 2 + Math.cos(rad) * s.width;
      const y1 = s.height / 2 + Math.sin(rad) * s.height;
      g = ctx.createLinearGradient(x0, y0, x1, y1);
    }
    sorted.forEach((st) => g.addColorStop(st.pos, st.color));
    return g;
  },

  _paintOverlays(ctx, s) {
    const { width: w, height: h, overlays: o } = s;
    for (let i = 0; i < o.blobs; i++) {
      const seed = o.layout * 10 + i * 1.7;
      const x = (Math.sin(seed) * 0.35 + 0.5) * w;
      const y = (Math.cos(seed * 1.3) * 0.35 + 0.5) * h;
      const r = Math.min(w, h) * (0.15 + (i % 3) * 0.08) * (0.6 + o.intensity);
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      const stop = s.stops[i % s.stops.length].color;
      grd.addColorStop(0, this._withAlpha(stop, 0.35 * o.intensity));
      grd.addColorStop(1, this._withAlpha(stop, 0));
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (o.vignette > 0) {
      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.hypot(w, h) * 0.55);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, `rgba(0,0,0,${0.65 * o.vignette})`);
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    }
  },

  _paintText(ctx, s) {
    const t = s.text;
    ctx.save();
    ctx.fillStyle = t.color;
    ctx.font = `${t.weight} ${t.size}px "DM Sans", sans-serif`;
    ctx.textAlign = t.align;
    ctx.textBaseline = 'middle';
    const x = t.x * s.width;
    const y = t.y * s.height;
    const maxW = s.width * 0.85;
    this._fillWrap(ctx, t.content || '', x, y, maxW, t.size * 1.2);
    ctx.restore();
  },

  _fillWrap(ctx, text, x, y, maxW, lineH) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else line = test;
    });
    if (line) lines.push(line);
    const startY = y - ((lines.length - 1) * lineH) / 2;
    lines.forEach((ln, i) => ctx.fillText(ln, x, startY + i * lineH, maxW));
  },

  _withAlpha(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r},${g},${b},${a})`;
  },

  _hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const to = (x) => Math.round(255 * x).toString(16).padStart(2, '0');
    return `#${to(f(0))}${to(f(8))}${to(f(4))}`;
  }
};
```

- [ ] **Step 2: Collegare render in `ui.js`**

Aggiungere:

```javascript
renderPreview(state) {
  const canvas = document.getElementById('preview-canvas');
  if (!canvas || !window.AuraEngine) return;
  AuraEngine.paint(canvas, state);
}
```

In `app.js`, dopo click Sfondi/Social:

```javascript
window.__auraState = AuraState.createDefault(cat);
AuraUI.showView('studio');
AuraUI.renderPreview(window.__auraState);
```

- [ ] **Step 3: Verifica manuale**

Aprire Sfondi: canvas mostra un gradiente. In console: `AuraUI.renderPreview(AuraEngine.randomize(__auraState))` cambia i colori.

- [ ] **Step 4: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/gradient-engine.js superpower/js/ui.js superpower/js/app.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: motore gradienti e anteprima canvas."
```

---

### Task 4: Controlli studio (genera, colori, tipo, angolo, overlay, formato)

**Files:**
- Modify: `superpower/index.html` (`#controls-panel` markup)
- Modify: `superpower/js/ui.js` (`mountControls`, sync form → state)
- Modify: `superpower/aura.css` (stili controlli)
- Modify: `superpower/js/app.js`

**Interfaces:**
- Consumes: `AuraEngine`, `AuraState`, `AuraPresets`
- Produces: `AuraUI.mountControls(state, onChange)` dove `onChange(nextState)` aggiorna `__auraState`, hash opzionale, re-render

- [ ] **Step 1: Markup controlli in `#controls-panel`**

Includere:
- Bottoni `Genera` / `Rigenera` (`#btn-generate`)
- Select tipo gradiente `#ctrl-type`
- Range angolo `#ctrl-angle` (0–360)
- Range cx/cy (visibili se radial/conic)
- Container stop colori `#stops-list` + bottone aggiungi (max 5) / rimuovi (min 2)
- Range blobs, intensity, vignette, layout
- Select preset formato `#ctrl-format` + input number width/height
- Sezione testo `#text-controls` (nascosta se non social) — wiring testo in Task 5; per ora placeholder hidden

- [ ] **Step 2: `mountControls` + listeners**

Ogni input chiama `onChange(AuraState.clamp({...}))` poi `renderPreview`.  
`#btn-generate` chiama `AuraEngine.randomize`.  
Cambio preset formato aggiorna width/height.  
Input custom: se invalidi (NaN, < min) toast e ripristina valori precedenti; se > max lato lungo, clamp + toast `"Dimensioni ridotte al massimo consentito"`.

- [ ] **Step 3: Verifica manuale**

- Genera cambia aspetto
- Slider angolo aggiorna subito
- Aggiungere/togliere stop (limiti 2–5)
- Formato Mobile cambia aspect del canvas
- Custom 99999 → clamp ≤ 4096 + toast

- [ ] **Step 4: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/index.html superpower/aura.css superpower/js/ui.js superpower/js/app.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: controlli studio per gradienti e formato."
```

---

### Task 5: Layer testo Social

**Files:**
- Modify: `superpower/index.html` (`#text-controls`)
- Modify: `superpower/js/ui.js`
- Modify: `superpower/js/app.js`

**Interfaces:**
- Consumes: `state.text` solo se `category === 'social'`
- Produces: controlli content, x, y, size, weight, align, color → state

- [ ] **Step 1: UI testo**

Campi: textarea contenuto, range x/y (0–100% mappati 0–1), number size, select weight (400/600/700/800), select align, color input.

Mostrare `#text-controls` solo se `state.category === 'social'`.

Opzionale v1: trascinare il testo sul canvas = aggiornare x/y (pointer events sul canvas in studio). Se troppo lungo, tenere solo slider x/y.

- [ ] **Step 2: Verifica**

Entrare in Social → testo visibile e modificabile. Entrare in Sfondi → sezione testo assente. Testo lunghissimo va a capo nell’export.

- [ ] **Step 3: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/index.html superpower/js/ui.js superpower/js/app.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: layer testo per categoria Social."
```

---

### Task 6: Galleria Ispirazione → studio

**Files:**
- Modify: `superpower/js/ui.js` (`renderInspirationGrid`)
- Modify: `superpower/js/app.js`
- Modify: `superpower/aura.css`

**Interfaces:**
- Consumes: `AuraPresets.inspiration`
- Produces: card con anteprima (mini canvas o div con `backgroundImage` da `cssGradient`), azioni `Usa in studio` e `Copia palette`

- [ ] **Step 1: Render grid**

Per ogni item: thumb via `cssGradient` su un `div`, label, bottone `Usa in studio` che fa:

```javascript
window.__auraState = AuraState.clamp({ ...item.state, category: item.state.category || 'ispirazione' });
// Per export testo: se si vuole editare testo da ispirazione, lasciare text null (spec: ispirazione senza testo).
AuraUI.showView('studio');
AuraUI.mountControls(window.__auraState, ...);
AuraUI.renderPreview(window.__auraState);
```

Bottone `Copia palette` puo gia usare stub che copia HEX join — completato in Task 7 se `AuraExport` non pronto: per ora `navigator.clipboard.writeText(stops.map...)`.

- [ ] **Step 2: Verifica**

Ispirazione mostra ≥6 mood; Usa in studio apre editor con quel look; Indietro funziona.

- [ ] **Step 3: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/ui.js superpower/js/app.js superpower/aura.css
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: galleria ispirazione collegata allo studio."
```

---

### Task 7: Export PNG, copia palette, link condividibile

**Files:**
- Create/Modify: `superpower/js/export.js`
- Modify: `superpower/index.html` (bottoni azioni)
- Modify: `superpower/js/ui.js`, `app.js`

**Interfaces:**
- Produces:
  - `AuraExport.downloadPng(canvas, filename)`
  - `AuraExport.copyPalette(state)` → Promise
  - `AuraExport.copyLink(state)` → Promise (usa `location.origin + location.pathname + '#' + AuraState.toHash(state)`)
  - Bootstrap: se `AuraState.fromHash(location.hash)` → apri studio con quello; se null e hash presente → default + toast `"Link non valido, parto da un preset."`

- [ ] **Step 1: `export.js`**

```javascript
window.AuraExport = {
  downloadPng(canvas, filename) {
    const a = document.createElement('a');
    a.download = filename || 'aura.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  },
  async copyPalette(state) {
    const s = AuraState.clamp(state);
    const hex = s.stops.map((st) => st.color).join(', ');
    const css = AuraEngine.cssGradient(s);
    const text = `Palette: ${hex}\nCSS: background: ${css};`;
    await navigator.clipboard.writeText(text);
  },
  async copyLink(state) {
    const url = location.origin + location.pathname + '#' + AuraState.toHash(state);
    await navigator.clipboard.writeText(url);
    history.replaceState(null, '', '#' + AuraState.toHash(state));
  }
};
```

Nota: aprire file via `file://` puo bloccare clipboard: gestire catch con toast `"Copia non disponibile in questo contesto"`. Per il link, `replaceState` dell'hash funziona comunque.

- [ ] **Step 2: Bottoni UI** Scarica / Copia palette / Copia link + toast successo.

- [ ] **Step 3: Load da hash all’avvio in `app.js`**

```javascript
const fromUrl = AuraState.fromHash(location.hash);
if (location.hash && location.hash.includes('s=')) {
  if (fromUrl) {
    window.__auraState = fromUrl;
    AuraUI.showView('studio');
    AuraUI.mountControls(...);
    AuraUI.renderPreview(fromUrl);
  } else {
    AuraUI.toast('Link non valido, parto da un preset.');
    window.__auraState = AuraState.createDefault('sfondi');
    AuraUI.showView('studio');
    // mount + render
  }
}
```

- [ ] **Step 4: Verifica**

- Scarica PNG e apri il file
- Copia palette e incolla in un editor di testo
- Copia link, apri in nuova scheda → stessa grafica
- Hash `#s=%%%` → toast soft + default

- [ ] **Step 5: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/export.js superpower/index.html superpower/js/ui.js superpower/js/app.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: export PNG, palette e link condividibile."
```

---

### Task 8: Polish motion, responsive, accettazione

**Files:**
- Modify: `superpower/aura.css`
- Modify: `superpower/js/ui.js` / `app.js` se servono micro-interazioni
- Modify: spec status se serve (opzionale, no)

**Interfaces:** nessuna nuova API pubblica

- [ ] **Step 1: Motion intenzionali (≥3)**

1. Drift home background  
2. Hover/press porte categoria  
3. Transizione soft cambio view o pulse leggero su Genera  

Evitare glow viola generico eccessivo; tenere palette Aura (rosa/menta/oro su fondo scuro caldo) coerente ma distintiva.

- [ ] **Step 2: Responsive**

Studio: su viewport &lt; 800px stack verticale, canvas `max-width: 100%; height: auto`, controlli scrollabili.

- [ ] **Step 3: Checklist accettazione (manuale)**

Barrare mentalmente / annotare:

- [ ] Home 3 categorie  
- [ ] Genera da ogni percorso studio  
- [ ] Controlli live  
- [ ] Testo solo Social  
- [ ] Preset + custom px  
- [ ] PNG / palette / link  
- [ ] Motion presenti  
- [ ] Mobile usabile  

- [ ] **Step 4: Commit** (dopo conferma)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: polish motion, responsive e chiusura v1."
```

---

## Self-review piano vs spec

| Requisito spec | Task |
|---|---|
| Hub 3 categorie | 1, 6 |
| Studio condiviso + genera | 3, 4 |
| Controlli ampi (colori, tipo, angolo, forme, formato) | 4 |
| Testo Social posizione/stile | 5 |
| Custom px + preset | 4 |
| Ispirazione → studio | 6 |
| Download PNG | 7 |
| Copia palette/CSS | 7 |
| Link condividibile | 2, 7 |
| Atmosfera vivace + motion | 1, 8 |
| Casi limite dimensioni/link/testo/stop | 2, 4, 5, 7 |
| No account/cloud | rispettato (solo hash) |

Nessun TBD lasciato. Tipi stato coerenti tra Task 2–7.
