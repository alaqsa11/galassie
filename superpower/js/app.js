document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.door').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (cat === 'ispirazione') {
        AuraUI.showView('inspiration');
        return;
      }
      AuraUI.showView('studio');
    });
  });
  document.querySelectorAll('[data-nav="home"]').forEach((btn) => {
    btn.addEventListener('click', () => AuraUI.showView('home'));
  });
});
