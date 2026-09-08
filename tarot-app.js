let currentSpread = null;
let drawnCards = [];
let selectedCardIndex = null;

function getAllCards() {
  const all = [];
  Object.values(TAROT_CARDS).forEach(group => {
    group.forEach(card => all.push({
      ...card,
      image: getCardImage(card)
    }));
  });
  return all;
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawCards(count) {
  const deck = shuffleDeck(getAllCards());
  return deck.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5
  }));
}

function startReading(spreadType) {
  currentSpread = spreadType;
  const count = SPREAD_POSITIONS[spreadType].length;
  drawnCards = drawCards(count);
  selectedCardIndex = null;

  document.getElementById('reading-title').textContent = getSpreadTitle(spreadType);
  document.getElementById('reading-subtitle').textContent = 'Clicca sulle carte per scoprire il loro significato';

  renderSpread(spreadType);
  document.getElementById('reading-section').classList.remove('hidden');
  document.getElementById('interpretation-panel').classList.add('hidden');

  document.getElementById('reading-section').scrollIntoView({ behavior: 'smooth' });
}

function getSpreadTitle(type) {
  const titles = {
    singola: 'Carta Singola',
    tri: 'Passato - Presente - Futuro',
    celtic: 'Croce Celtica',
    amore: "Coppia d'Amore",
    carriera: 'Lavoro e Carriera',
    siNo: 'Sì o No'
  };
  return titles[type] || 'La Tua Lettura';
}

function renderSpread(spreadType) {
  const area = document.getElementById('spread-area');
  const positions = SPREAD_POSITIONS[spreadType];
  area.innerHTML = '';

  if (spreadType === 'celtic') {
    area.classList.add('celtic-layout');
    area.classList.remove('line-layout', 'cross-layout');
  } else if (['tri', 'siNo'].includes(spreadType)) {
    area.classList.add('line-layout');
    area.classList.remove('celtic-layout', 'cross-layout');
  } else {
    area.classList.add('line-layout');
    area.classList.remove('celtic-layout', 'cross-layout');
  }

  positions.forEach((posLabel, i) => {
    const slot = document.createElement('div');
    slot.className = 'card-slot';

    const label = document.createElement('div');
    label.className = 'card-slot-label';
    label.textContent = posLabel;

    const card = createCardElement(drawnCards[i], i);

    slot.appendChild(label);
    slot.appendChild(card);
    area.appendChild(slot);
  });
}

function createCardElement(cardData, index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'tarot-card';
  wrapper.setAttribute('data-index', index);

  const imgHtml = cardData.image
    ? `<img class="card-image" src="${cardData.image}" alt="${cardData.name}" loading="lazy">`
    : `<div class="card-symbol">${cardData.symbol}</div>`;

  wrapper.innerHTML = `
    <div class="tarot-card-inner">
      <div class="card-face card-back">
        <div class="card-back-pattern">
          <i class="fas fa-star"></i>
        </div>
      </div>
      <div class="card-face card-front">
        ${imgHtml}
        <div class="card-name">${cardData.name}</div>
        <span class="card-upright-tag">Dritta</span>
        <span class="card-reversed-tag">Invertita</span>
      </div>
    </div>
  `;

  wrapper.addEventListener('click', () => {
    if (!wrapper.classList.contains('flipped') && !wrapper.classList.contains('reversed')) {
      if (cardData.isReversed) {
        wrapper.classList.add('reversed');
      } else {
        wrapper.classList.add('flipped');
      }
    }
    selectCard(index);
  });

  return wrapper;
}

function selectCard(index) {
  selectedCardIndex = index;
  const card = drawnCards[index];
  const panel = document.getElementById('interpretation-panel');
  const positions = SPREAD_POSITIONS[currentSpread];

  document.querySelectorAll('.tarot-card').forEach(c => c.classList.remove('selected'));
  const cards = document.querySelectorAll('.tarot-card');
  if (cards[index]) {
    cards[index].classList.add('selected');
  }

  const posLabel = positions[index] || '';
  document.getElementById('interp-title').textContent = card.name;

  const badge = document.getElementById('interp-position');
  badge.textContent = card.isReversed ? `${posLabel} (Invertita)` : `${posLabel} (Dritta)`;
  badge.className = 'interp-badge' + (card.isReversed ? ' reversed' : '');

  const meaning = card.isReversed ? card.reversedMeaning : card.uprightMeaning;
  document.getElementById('interp-upright').textContent = meaning;

  const keywords = card.isReversed ? card.reversedKeywords : card.uprightKeywords;
  const keywordsContainer = document.getElementById('interp-keywords');
  keywordsContainer.innerHTML = keywords.map(k => `<span class="interp-keyword">${k}</span>`).join('');

  document.getElementById('interp-advice').textContent = card.advice;

  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function shuffleAndRedraw() {
  if (currentSpread) {
    startReading(currentSpread);
  }
}

function backToSpreads() {
  document.getElementById('reading-section').classList.add('hidden');
  document.getElementById('stese').scrollIntoView({ behavior: 'smooth' });
}

// === DECK BROWSER ===
let currentDeckType = 'major';

function showDeck(type) {
  currentDeckType = type;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const grid = document.getElementById('deck-grid');
  grid.innerHTML = '';

  const cards = TAROT_CARDS[type] || [];
  cards.forEach(card => {
    const img = getCardImage(card);
    const el = document.createElement('div');
    el.className = 'deck-card';
    el.innerHTML = `
      ${img ? `<img class="deck-card-image" src="${img}" alt="${card.name}" loading="lazy">` : `<div class="card-symbol">${card.symbol}</div>`}
      <div class="card-name">${card.name}</div>
      <div class="card-type">${card.suit || 'Arcano Maggiore'}</div>
    `;
    el.addEventListener('click', () => openCardModal(card));
    grid.appendChild(el);
  });
}

function openCardModal(card) {
  const body = document.getElementById('card-modal-body');
  const img = getCardImage(card);

  body.innerHTML = `
    ${img ? `<img class="card-modal-image" src="${img}" alt="${card.name}">` : `<div class="card-modal-symbol">${card.symbol}</div>`}
    <h2>${card.name}</h2>
    <div class="modal-card-type">${card.suit || 'Arcano Maggiore'} ${card.number || ''}</div>

    <h3>Significato Raddrizzato</h3>
    <p>${card.uprightMeaning}</p>
    <div class="modal-keywords">
      ${card.uprightKeywords.map(k => `<span class="modal-keyword">${k}</span>`).join('')}
    </div>

    <h3>Significato Invertito</h3>
    <p>${card.reversedMeaning}</p>
    <div class="modal-keywords">
      ${card.reversedKeywords.map(k => `<span class="modal-keyword">${k}</span>`).join('')}
    </div>

    <h3>Consiglio</h3>
    <p>${card.advice}</p>
  `;

  document.getElementById('card-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCardModal() {
  document.getElementById('card-modal').classList.remove('show');
  document.body.style.overflow = '';
}

// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

// === PARTICLES ===
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDelay = (Math.random() * 3) + 's';
    p.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(p);
  }
}
createParticles();

// === SCROLL ANIMATION ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.spread-card, .deck-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// === MODAL EVENTS ===
document.getElementById('card-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeCardModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCardModal();
  }
});

// === INIT DECK ===
showDeck('major');
