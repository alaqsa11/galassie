document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.door').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (cat === 'ispirazione') {
        AuraUI.showView('inspiration');
        return;
      }
      window.__auraState = AuraState.createDefault(cat);
      AuraUI.showView('studio');
      AuraUI.renderPreview(window.__auraState);
      AuraUI.mountControls(window.__auraState, (nextState) => {
        window.__auraState = nextState;
      });
    });
  });
  document.querySelectorAll('[data-nav="home"]').forEach((btn) => {
    btn.addEventListener('click', () => AuraUI.showView('home'));
  });
});
