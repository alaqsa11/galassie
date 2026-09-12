# Aura Numeric Inputs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sostituire le etichette numeriche (`<output>`) accanto alle barre con campi `input type="number"` editabili, sincronizzati con le barre e applicati su Invio/blur.

**Architecture:** HTML/CSS/JS vanilla nello studio Aura. Gli `<output>` diventano piccoli `input type="number"` con unita testuali fisse. In `ui.js` si centralizza parse/clamp/commit del valore digitato; le barre restano aggiornate su `input`, i campi numerici solo su `change`/`keydown Enter`.

**Tech Stack:** HTML, CSS, JavaScript vanilla (nessun build, niente Node/npm). Verifica solo manuale nel browser.

## Global Constraints

- Comunicare e commentare in italiano; evitare accenti nei messaggi di commit
- Niente Node.js/npm: nessuna suite test automatizzata; verifica = lettura codice + prova browser
- Non modificare `state.js` / `gradient-engine.js` salvo uso dei clamp gia esistenti
- Non toccare Larghezza, Altezza, Dimensione testo (gia `type="number"`)
- Digitazione: aggiornare stato solo su Invio o blur; valore fuori range → clamp; vuoto/non valido → ripristino valore corrente
- Controlli coinvolti: angolo, cx, cy, blobs, intensity, vignette, layout, text x/y, tratto colori

## File Structure

| File | Ruolo |
|---|---|
| `superpower/index.html` | Markup: `<output>` → `input type="number"` + unita |
| `superpower/aura.css` | Stile compatto per i number inline nelle label (non full-width) |
| `superpower/js/ui.js` | Sync bidirezionale, commit digitazione, tratto stop |

---

### Task 1: Markup HTML — campi numerici al posto degli output

**Files:**
- Modify: `superpower/index.html` (controlli Gradiente, Overlay, Testo)
- Test: verifica manuale nel browser (aprire `superpower/index.html`)

**Interfaces:**
- Consumes: id esistenti delle barre (`ctrl-angle`, `ctrl-cx`, …)
- Produces: id campi numerici `ctrl-*-value` come `input type="number"` (stessi id usati oggi dagli `<output>`)

- [ ] **Step 1: Sostituire gli output fissi in index.html**

Per ogni controllo con barra, sostituire il pattern:

```html
<span>Angolo <output id="ctrl-angle-value">135°</output></span>
```

con:

```html
<span class="control-label-row">
  Angolo
  <span class="control-value">
    <input id="ctrl-angle-value" type="number" min="0" max="360" step="1" value="135" aria-label="Angolo gradi">
    <span class="control-unit" aria-hidden="true">°</span>
  </span>
</span>
```

Elenco completo da aggiornare:

1. **Angolo** — `ctrl-angle-value`, min 0 max 360, unita `°`
2. **Centro X** — `ctrl-cx-value`, min 0 max 100, unita `%`
3. **Centro Y** — `ctrl-cy-value`, min 0 max 100, unita `%`
4. **Forme** — `ctrl-blobs-value`, min 0 max 6, nessuna unita
5. **Intensita** — `ctrl-intensity-value`, min 0 max 100, unita `%`
6. **Vignettatura** — `ctrl-vignette-value`, min 0 max 100, unita `%`
7. **Disposizione** — `ctrl-layout-value`, min 0 max 100, unita `%`
8. **Posizione X** (testo) — `ctrl-text-x-value`, min 0 max 100, unita `%`
9. **Posizione Y** (testo) — `ctrl-text-y-value`, min 0 max 100, unita `%`

Non modificare Larghezza, Altezza, Dimensione testo.

- [ ] **Step 2: Verifica markup**

Aprire `superpower/index.html` nello studio (categoria Sfondi). Controllare che ogni label mostri un campo numerico editabile accanto al nome (anche se lo stile sara ancora grezzo).

Expected: i campi sono digitabili; le barre funzionano ancora; nessun errore in console per id mancanti (la logica JS ancora scrive su `.value` degli output — sugli input `type="number"` `.value` funziona uguale, ma i suffix `°`/`%` non devono piu essere scritti dentro il value).

Nota: dopo questo step lo studio puo mostrare valori strani finche Task 3 aggiorna `ui.js` (oggi `setOutput` scrive `"135°"`). E accettabile per un commit intermedio se Task 2+3 seguono subito; preferibile fare Task 1+2+3 nello stesso flusso di lavoro prima di considerare la feature usabile.

- [ ] **Step 3: Commit**

```bash
git add superpower/index.html
git commit -m "Aura: campi number al posto delle etichette accanto alle barre."
```

---

### Task 2: CSS — campi number compatti nelle label

**Files:**
- Modify: `superpower/aura.css` (sezioni `.control-field` e `.stop-stroke`, circa linee 448–620)
- Test: verifica visuale browser

**Interfaces:**
- Consumes: classi `control-label-row`, `control-value`, `control-unit` introdotte in Task 1
- Produces: stile compatto che non fa espandere i number a tutta larghezza della colonna

- [ ] **Step 1: Aggiornare selettori output → number inline**

Sostituire/estendere le regole esistenti:

```css
.control-field > span {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
```

con:

```css
.control-field > span,
.control-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.control-value {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.control-field input.control-number,
.control-field .control-value input[type="number"],
.stop-stroke .control-value input[type="number"] {
  width: 3.4rem;
  min-height: 1.55rem;
  padding: 0.15rem 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.4rem;
  outline: none;
  background: rgba(12, 10, 18, 0.78);
  color: var(--ink);
  font: inherit;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.control-field .control-value input[type="number"]:focus,
.stop-stroke .control-value input[type="number"]:focus {
  border-color: var(--accent-b);
}

.control-unit {
  color: rgba(247, 242, 255, 0.7);
  font-size: 0.78rem;
}
```

Importante: le regole esistenti

```css
.control-field select,
.control-field input[type="number"],
.control-field textarea {
  width: 100%;
  ...
}
```

devono **escludere** i number inline nelle label, altrimenti i campi angolo/percentuali diventano full-width. Aggiornare a:

```css
.control-field select,
.control-field > input[type="number"],
.control-field .dimensions-grid input[type="number"],
.control-field textarea {
  width: 100%;
  min-height: 2.45rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.65rem;
  outline: none;
  background: rgba(12, 10, 18, 0.78);
  color: var(--ink);
  font: inherit;
}
```

(e lo stesso per `:focus`).

Rimuovere (o lasciare innocue) le regole `.control-field output` e `.stop-stroke output` dopo che non ci sono piu output, oppure aggiornarle per non rompere nulla.

Per `.stop-stroke` (usato in Task 3 per Tratto):

```css
.stop-stroke > span,
.stop-stroke .control-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  color: rgba(247, 242, 255, 0.65);
  font-size: 0.65rem;
}
```

- [ ] **Step 2: Verifica visuale**

Aprire studio Sfondi: i number nella label devono essere piccoli, allineati a destra della riga, non a tutta larghezza. Larghezza/Altezza restano campi grandi full-width.

- [ ] **Step 3: Commit**

```bash
git add superpower/aura.css
git commit -m "Aura: stile compatto per i campi number accanto alle barre."
```

---

### Task 3: Logica JS — sync barra ↔ campo e commit su blur/Invio

**Files:**
- Modify: `superpower/js/ui.js` (`mountControls`, helper sync, listener barre, `renderStops` per Tratto)
- Test: verifica manuale browser (checklist sotto)

**Interfaces:**
- Consumes: elementi `ctrl-*-value` come `HTMLInputElement` number; barre range esistenti
- Produces: helper interni in `mountControls`:
  - `setNumeric(id, value)` — scrive solo il numero (senza `°`/`%`)
  - `bindLinkedNumber({ rangeEl, numberEl, min, max, formatDisplay, apply })` — collega barra e campo

- [ ] **Step 1: Sostituire `setOutput` con scritture numeriche pure**

Rimuovere/adattare:

```js
const setOutput = (id, value) => {
  document.getElementById(id).value = value;
};
```

In tutte le sync, scrivere solo il numero:

```js
const setNumeric = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = String(value);
};
```

Aggiornare chiamate:

- `setNumeric('ctrl-angle-value', Math.round(current.angle));`  // non piu + '°'
- `setNumeric('ctrl-cx-value', Math.round(current.cx * 100));`
- `setNumeric('ctrl-cy-value', Math.round(current.cy * 100));`
- `setNumeric('ctrl-blobs-value', current.overlays.blobs);`
- `setNumeric('ctrl-intensity-value', Math.round(current.overlays.intensity * 100));`
- `setNumeric('ctrl-vignette-value', Math.round(current.overlays.vignette * 100));`
- `setNumeric('ctrl-layout-value', Math.round(current.overlays.layout * 100));`
- `setNumeric('ctrl-text-x-value', Math.round(current.text.x * 100));`
- `setNumeric('ctrl-text-y-value', Math.round(current.text.y * 100));`

- [ ] **Step 2: Aggiungere helper di binding**

Dentro `mountControls`, dopo i riferimenti DOM:

```js
const commitLinkedNumber = (numberEl, min, max, apply) => {
  const raw = numberEl.value.trim();
  const parsed = Number(raw);
  if (raw === '' || !Number.isFinite(parsed)) {
    return false;
  }
  const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
  numberEl.value = String(clamped);
  apply(clamped);
  return true;
};

const bindLinkedNumber = ({ rangeEl, numberEl, min, max, onRange, onCommit }) => {
  listen(rangeEl, 'input', () => {
    numberEl.value = rangeEl.value;
    onRange(Number(rangeEl.value));
  });
  const finish = () => {
    if (!commitLinkedNumber(numberEl, min, max, onCommit)) {
      numberEl.value = rangeEl.value;
    }
  };
  listen(numberEl, 'change', finish);
  listen(numberEl, 'keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    numberEl.blur();
  });
};
```

Nota: `change` su `input type="number"` scatta tipicamente su blur dopo modifica, e `blur` via Enter dopo `preventDefault` + `blur()` riusa lo stesso percorso. Se il browser non emette `change` in qualche caso, ascoltare anche `blur` chiamando `finish` solo se il value e diverso da `rangeEl.value` (evitare doppio emit). Preferenza robusta:

```js
listen(numberEl, 'blur', finish);
listen(numberEl, 'keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  numberEl.blur();
});
```

(senza `change` separato, per evitare doppio commit). Su blur con valore invalido: `numberEl.value = rangeEl.value` ripristina.

- [ ] **Step 3: Ricollegare i controlli fissi**

Sostituire i listener attuali di angle/cx/cy/blobs/intensity/vignette/layout/textX/textY con `bindLinkedNumber`.

Esempio angolo:

```js
const angleValue = document.getElementById('ctrl-angle-value');
bindLinkedNumber({
  rangeEl: angle,
  numberEl: angleValue,
  min: 0,
  max: 360,
  onRange: (v) => emit({ ...current, angle: v }),
  onCommit: (v) => {
    angle.value = String(v);
    emit({ ...current, angle: v });
  }
});
```

Centro X/Y (fattore 0–1):

```js
bindLinkedNumber({
  rangeEl: cx,
  numberEl: document.getElementById('ctrl-cx-value'),
  min: 0,
  max: 100,
  onRange: (v) => emit({ ...current, cx: v / 100 }),
  onCommit: (v) => {
    cx.value = String(v);
    emit({ ...current, cx: v / 100 });
  }
});
```

Overlay blobs (`factor` 1) e intensity/vignette/layout (`/100`):

```js
bindLinkedNumber({
  rangeEl: intensity,
  numberEl: document.getElementById('ctrl-intensity-value'),
  min: 0,
  max: 100,
  onRange: (v) => emit({
    ...current,
    overlays: { ...current.overlays, intensity: v / 100 }
  }),
  onCommit: (v) => {
    intensity.value = String(v);
    emit({
      ...current,
      overlays: { ...current.overlays, intensity: v / 100 }
    });
  }
});
```

Testo X/Y analoghi con `updateText({ x: v / 100 })`.

Rimuovere le vecchie chiamate `setOutput(..., value + '%')` dai listener `input` delle barre.

- [ ] **Step 4: Tratto colori in `renderStops` / `syncStopRow`**

Nel template della riga stop, sostituire:

```html
<span>Tratto <output>${Math.round(stop.stroke * 100)}%</output></span>
```

con:

```html
<span class="control-label-row">
  Tratto
  <span class="control-value">
    <input type="number" class="stop-stroke-value" min="0" max="100" step="1" value="${Math.round(stop.stroke * 100)}" aria-label="Tratto colore ${index + 1}">
    <span class="control-unit" aria-hidden="true">%</span>
  </span>
</span>
```

Aggiornare query:

```js
const strokeInput = row.querySelector('input[type="range"]');
const strokeNumber = row.querySelector('.stop-stroke-value');
```

Listener barra:

```js
listen(strokeInput, 'input', () => {
  const stroke = Number(strokeInput.value) / 100;
  strokeNumber.value = strokeInput.value;
  const stops = current.stops.map((item, i) => i === index
    ? { ...item, stroke }
    : item);
  emit({ ...current, stops });
});
```

Listener digitazione (stesso pattern commit):

```js
const finishStroke = () => {
  const raw = strokeNumber.value.trim();
  const parsed = Number(raw);
  if (raw === '' || !Number.isFinite(parsed)) {
    strokeNumber.value = strokeInput.value;
    return;
  }
  const clamped = Math.min(100, Math.max(0, Math.round(parsed)));
  strokeNumber.value = String(clamped);
  strokeInput.value = String(clamped);
  const stops = current.stops.map((item, i) => i === index
    ? { ...item, stroke: clamped / 100 }
    : item);
  emit({ ...current, stops });
};
listen(strokeNumber, 'blur', finishStroke);
listen(strokeNumber, 'keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  strokeNumber.blur();
});
```

In `syncStopRow`:

```js
if (strokeInput) strokeInput.value = Math.round(stop.stroke * 100);
if (strokeNumber) strokeNumber.value = String(Math.round(stop.stroke * 100));
```

(rimuovere riferimenti a `strokeOutput`).

- [ ] **Step 5: Verifica manuale (checklist accettazione)**

Aprire `superpower/index.html` → Sfondi → Studio:

1. Muovere barra Angolo → campo mostra il numero senza `°`; anteprima aggiorna subito
2. Digitare `90` in Angolo, uscire dal campo → barra a 90, anteprima aggiornata
3. Digitare `90`, premere Invio → stesso effetto
4. Digitare `999` → diventa `360`
5. Svuotare il campo e blur → torna al valore precedente
6. Ripetere per Intensita, Vignettatura, Disposizione, Forme
7. Tipo Radiale/Conico: Centro X/Y digitabili
8. Aggiungere colore: Tratto digitabile + barra
9. Social → Posizione X/Y testo digitabili
10. Larghezza/Altezza/Dimensione testo invariati
11. Nessun errore in console

- [ ] **Step 6: Commit**

```bash
git add superpower/js/ui.js
git commit -m "Aura: digitazione manuale sincronizzata con le barre dei controlli."
```

---

### Task 4: Push e chiusura

**Files:** nessuno di codice

- [ ] **Step 1: Status e push**

```bash
git status
git push
```

Expected: branch `feature/aura-gradient` aggiornato sul remote, working tree clean.

- [ ] **Step 2: Conferma all'utente**

Elencare cosa e cambiato e la checklist di prova gia eseguita.

---

## Self-review (piano vs spec)

| Requisito spec | Task |
|---|---|
| Campo number al posto output | Task 1 |
| Unita fisse fuori dal value | Task 1 + 3 |
| Sync barra → campo immediata | Task 3 |
| Digitazione solo Invio/blur | Task 3 |
| Clamp min/max | Task 3 |
| Vuoto/invalido → ripristino | Task 3 |
| Controlli elenco + Tratto | Task 1 + 3 |
| Larghezza/altezza/size intatti | Task 1 esplicitamente |
| CSS compatto | Task 2 |
| Verifica browser | Task 3 Step 5 |
