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
    const cx = Number(s.cx);
    const cy = Number(s.cy);
    s.cx = Math.min(1, Math.max(0, Number.isFinite(cx) ? cx : 0.5));
    s.cy = Math.min(1, Math.max(0, Number.isFinite(cy) ? cy : 0.5));
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
