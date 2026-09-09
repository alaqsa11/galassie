window.AuraExport = {
  downloadPng(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename || 'aura.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  },

  async copyPalette(state) {
    const current = AuraState.clamp(state);
    const hex = current.stops.map((stop) => stop.color.toUpperCase()).join(', ');
    const css = AuraEngine.cssGradient(current);
    const text = `Palette: ${hex}\nCSS: background: ${css};`;
    await navigator.clipboard.writeText(text);
  },

  async copyLink(state) {
    const hash = AuraState.toHash(state);
    const url = location.href.split('#')[0] + '#' + hash;
    history.replaceState(null, '', '#' + hash);
    await navigator.clipboard.writeText(url);
  }
};
