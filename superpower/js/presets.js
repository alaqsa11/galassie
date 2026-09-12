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
    },
    {
      id: 'midnight',
      label: 'Notte profonda',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1920,
        height: 1080,
        gradientType: 'linear',
        angle: 180,
        cx: 0.5,
        cy: 0.5,
        stops: [
          { color: '#020617', pos: 0 },
          { color: '#1e1b4b', pos: 0.35 },
          { color: '#4338ca', pos: 0.7 },
          { color: '#6366f1', pos: 1 }
        ],
        overlays: { blobs: 3, intensity: 0.45, vignette: 0.5, layout: 0.3 },
        text: null
      }
    },
    {
      id: 'coral',
      label: 'Corallo tropicale',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1080,
        height: 1080,
        gradientType: 'radial',
        angle: 0,
        cx: 0.4,
        cy: 0.35,
        stops: [
          { color: '#fef3c7', pos: 0 },
          { color: '#f97316', pos: 0.55 },
          { color: '#be123c', pos: 1 }
        ],
        overlays: { blobs: 5, intensity: 0.6, vignette: 0.2, layout: 0.45 },
        text: null
      }
    },
    {
      id: 'lavender',
      label: 'Lavanda nebbiosa',
      state: {
        v: 1,
        category: 'ispirazione',
        width: 1080,
        height: 1920,
        gradientType: 'linear',
        angle: 160,
        cx: 0.5,
        cy: 0.5,
        stops: [
          { color: '#ede9fe', pos: 0 },
          { color: '#c4b5fd', pos: 0.4 },
          { color: '#8b5cf6', pos: 1 }
        ],
        overlays: { blobs: 2, intensity: 0.35, vignette: 0.3, layout: 0.55 },
        text: null
      }
    }
  ]
};
