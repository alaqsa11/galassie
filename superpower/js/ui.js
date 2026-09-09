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
  },
  renderPreview(state) {
    const canvas = document.getElementById('preview-canvas');
    if (!canvas || !window.AuraEngine) return;
    AuraEngine.paint(canvas, state);
  }
};
