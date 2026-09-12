document.addEventListener('DOMContentLoaded', () => {
  const openStudio = (state) => {
    window.__auraState = AuraState.clamp(state);
    AuraUI.showView('studio');
    AuraUI.renderPreview(window.__auraState);
    AuraUI.mountControls(window.__auraState, (nextState) => {
      window.__auraState = nextState;
    });
  };

  if (location.hash && location.hash.includes('s=')) {
    const fromUrl = AuraState.fromHash(location.hash);
    if (fromUrl) {
      openStudio(fromUrl);
    } else {
      openStudio(AuraState.createDefault('sfondi'));
      AuraUI.toast('Link non valido, parto da un preset.');
    }
  }

  document.querySelectorAll('.door').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (cat === 'ispirazione') {
        AuraUI.showView('inspiration');
        AuraUI.renderInspirationGrid(AuraPresets.inspiration);
        return;
      }
      openStudio(AuraState.createDefault(cat));
    });
  });
  document.querySelectorAll('[data-nav="home"]').forEach((btn) => {
    btn.addEventListener('click', () => AuraUI.showView('home'));
  });
});
