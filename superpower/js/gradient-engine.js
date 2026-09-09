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
    const stops = s.stops.slice()
      .sort((a, b) => a.pos - b.pos)
      .map((st) => st.color + ' ' + (st.pos * 100) + '%')
      .join(', ');
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
      const rad = (s.angle - 90) * Math.PI / 180;
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
