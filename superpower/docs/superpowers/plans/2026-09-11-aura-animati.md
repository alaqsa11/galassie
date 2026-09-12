# Aura Animati Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere la sezione Animati (porta in home, Studio con gradiente in loop influenzato dal mouse, download GIF o Video con registrazione dell'interazione) senza cambiare Sfondi, Social e Ispirazione.

**Architecture:** Stesso Studio condiviso, acceso in modalita movimento solo se `state.category === 'animati'`. `AuraMotion.frame` calcola una copia di disegno (loop autonomo + puntatore) senza mutare lo stato salvato. Un `requestAnimationFrame` dipinge l'anteprima. GIF/Video catturano i frame gia disegnati sul canvas dopo un countdown.

**Tech Stack:** HTML/CSS/JS vanilla, canvas 2D, `gif.js` in `superpower/vendor/` (niente npm), `MediaRecorder` + `canvas.captureStream` per WebM.

## Global Constraints

- Comunicare e commentare in italiano; evitare accenti nei messaggi di commit
- Niente Node.js/npm: nessuna suite test; verifica = lettura codice + prova browser su `superpower/index.html`
- Non cambiare testi, icone, ordine relativo o comportamento di Sfondi, Social, Ispirazione
- Non aggiungere testo in Animati; niente PNG in Animati; niente GIF/Video/Velocita/Durata in Sfondi e Social
- Il mouse non entra nello stato ne nel link; `animation.speed` (0–1) e `animation.duration` (2–8) si
- Git: `& "C:\Program Files\Git\cmd\git.exe"`; chiedere conferma all'utente prima di ogni commit

## File Structure

| File | Ruolo |
|---|---|
| `superpower/index.html` | Porta Animati; overlay registrazione; controlli Velocita/Durata; pulsanti GIF/Video; script motion + gif.js |
| `superpower/aura.css` | Overlay countdown/registrazione; lock pannello; preview-wrap relative |
| `superpower/js/presets.js` | `formats.animati` = stessi preset di Sfondi |
| `superpower/js/state.js` | Default e clamp di `animation` solo per `animati` |
| `superpower/js/motion.js` | **nuovo.** `AuraMotion.frame` + helper puntatore |
| `superpower/js/export.js` | GIF, Video, supporto WebM, download blob |
| `superpower/js/ui.js` | Loop, mouse, gate controlli, countdown, lock, annulla |
| `superpower/js/app.js` | Stop loop/registrazione su Indietro (via `showView`) |
| `superpower/vendor/gif.js` | Encoder GIF (cdnjs 0.2.0, file locale) |
| `superpower/vendor/gif.worker.js` | Worker gif.js same-origin |

`gradient-engine.js` e `app.js` (click porte) restano come oggi: `data-category="animati"` riusa gia `openStudio(AuraState.createDefault(cat))`.

---

### Task 1: Porta home Animati

**Files:**
- Modify: `superpower/index.html` (blocco `.category-doors`, circa linee 21–37)
- Test: aprire `superpower/index.html` nel browser

**Interfaces:**
- Consumes: CSS `.door` esistente; `app.js` gia fa `btn.dataset.category` e `openStudio(AuraState.createDefault(cat))` per tutto cio che non e `ispirazione`
- Produces: bottone `data-category="animati"` tra Social e Ispirazione

- [ ] **Step 1: Inserire la porta tra Social e Ispirazione**

In `superpower/index.html`, dopo il bottone Social e prima di Ispirazione, inserire **esattamente**:

```html
        <button type="button" class="door" data-category="animati">
          <i class="fa-solid fa-circle-play"></i>
          <span>Animati</span>
          <small>Gradienti in movimento</small>
        </button>
```

Non modificare i tre bottoni esistenti, l'header, ne la tagline.

- [ ] **Step 2: Verifica home**

Aprire `superpower/index.html`. Expected: ordine Sfondi, Social, Animati, Ispirazione; testi/icone delle tre porte vecchie identici; click Animati apre lo Studio (ancora fermo, come Sfondi, finche Task 4). Click Sfondi/Social/Ispirazione invariati.

- [ ] **Step 3: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/index.html
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: porta Animati in home tra Social e Ispirazione."
```

---

### Task 2: Stato e preset Animati

**Files:**
- Modify: `superpower/js/presets.js`
- Modify: `superpower/js/state.js`
- Modify: `superpower/js/ui.js` (solo lookup formati, circa riga 67)
- Test: console browser + click porte

**Interfaces:**
- Consumes: `AuraPresets.formats.sfondi` esistente
- Produces: `AuraPresets.formats.animati`; `AuraState.createDefault('animati')` con `animation: { speed: 0.45, duration: 4 }`; `clamp` che tiene `animation` solo se `category === 'animati'`

- [ ] **Step 1: Preset formato**

In `superpower/js/presets.js`, dopo l'oggetto `formats` (chiavi `sfondi` e `social`), assegnare:

```javascript
  }
};
AuraPresets.formats.animati = AuraPresets.formats.sfondi;
```

Attenzione: oggi `formats` e dentro il letterale `window.AuraPresets = { ... }`. Chiudere l'oggetto come gia avviene, poi **subito dopo** la chiusura di `window.AuraPresets` aggiungere:

```javascript
AuraPresets.formats.animati = AuraPresets.formats.sfondi;
```

Se il file non ha una riga vuota dopo l'oggetto, inserire l'assegnazione come ultima riga del file.

- [ ] **Step 2: createDefault e clamp**

In `createDefault`, dopo `text: ...`, prima di `return this.clamp(state)`:

```javascript
      text: category === 'social'
        ? { content: 'Il tuo messaggio', x: 0.5, y: 0.5, size: 64, weight: 700, align: 'center', color: '#ffffff' }
        : null
    };
    if (category === 'animati') {
      state.animation = { speed: 0.45, duration: 4 };
    }
    return this.clamp(state);
```

In `clamp`, dopo il blocco che azzera `text` se non e social, aggiungere:

```javascript
    if (s.category === 'animati') {
      const a = s.animation || {};
      const speed = Number(a.speed);
      const duration = Math.round(Number(a.duration));
      s.animation = {
        speed: Number.isFinite(speed) ? Math.min(1, Math.max(0, speed)) : 0.45,
        duration: Number.isFinite(duration) ? Math.min(8, Math.max(2, duration)) : 4
      };
    } else {
      delete s.animation;
    }
```

- [ ] **Step 3: Lookup formati in ui.js**

Sostituire:

```javascript
    const formats = AuraPresets.formats[current.category === 'social' ? 'social' : 'sfondi'];
```

con:

```javascript
    const formats = AuraPresets.formats[current.category] || AuraPresets.formats.sfondi;
```

Stesso identico cambio in `state.js` `createDefault` (riga del `const formats = ...`).

- [ ] **Step 4: Verifica stato**

Aprire `superpower/index.html`, F12 console:

```javascript
const a = AuraState.createDefault('animati');
console.log(a.category, a.animation, a.text, a.width, a.height);
const s = AuraState.createDefault('sfondi');
console.log('sfondi animation', s.animation);
```

Expected: Animati → `animati`, `{speed: 0.45, duration: 4}`, `text === null`, `1920x1080`. Sfondi → `animation === undefined`. Social e Ispirazione invariati. Click Animati: Studio senza blocco Testo.

- [ ] **Step 5: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/presets.js superpower/js/state.js superpower/js/ui.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: stato e formati per la categoria Animati."
```

---

### Task 3: AuraMotion — frame di disegno

**Files:**
- Create: `superpower/js/motion.js`
- Modify: `superpower/index.html` (tag script, dopo `gradient-engine.js`)
- Test: console browser

**Interfaces:**
- Consumes: `AuraState.clamp`, `AuraEngine._hslToHex` (gia sul motore)
- Produces:
  - `AuraMotion.frame(state, timeMs, pointer) -> paintState`
  - `AuraMotion.pointerFromEvent(canvas, event) -> {x, y} | null`
  - `pointer` e `{ x: 0–1, y: 0–1 }` oppure `null`

- [ ] **Step 1: Creare `superpower/js/motion.js`**

```javascript
window.AuraMotion = {
  frame(state, timeMs, pointer) {
    const s = JSON.parse(JSON.stringify(AuraState.clamp(state)));
    const speed = s.animation ? s.animation.speed : 0.45;
    const t = (Number(timeMs) || 0) / 1000 * (0.15 + speed * 1.85);
    s.stops = (s.stops || []).map((st) => {
      const hsl = this._hexToHsl(st.color);
      hsl.h = (hsl.h + t * 38) % 360;
      return { ...st, color: AuraEngine._hslToHex(hsl.h, hsl.s, hsl.l) };
    });
    s.angle = ((s.angle + t * 42) % 360 + 360) % 360;
    const wave = Math.sin(t * 1.15) * 0.16 * (0.3 + speed);
    s.overlays.layout = Math.min(1, Math.max(0, s.overlays.layout + wave));
    if (pointer && Number.isFinite(pointer.x) && Number.isFinite(pointer.y)) {
      const x = Math.min(1, Math.max(0, pointer.x));
      const y = Math.min(1, Math.max(0, pointer.y));
      s.cx = s.cx * 0.4 + x * 0.6;
      s.cy = s.cy * 0.4 + y * 0.6;
      s.angle = ((s.angle + (x - 0.5) * 58) % 360 + 360) % 360;
    }
    return s;
  },

  pointerFromEvent(canvas, event) {
    if (!canvas || !event) return null;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return null;
    return { x, y };
  },

  _hexToHsl(hex) {
    const n = parseInt(String(hex).slice(1), 16);
    if (!Number.isFinite(n)) return { h: 0, s: 0, l: 50 };
    const r = ((n >> 16) & 255) / 255;
    const g = ((n >> 8) & 255) / 255;
    const b = (n & 255) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return { h, s: s * 100, l: l * 100 };
  }
};
```

- [ ] **Step 2: Script in index.html**

Dopo `js/gradient-engine.js` e prima di `js/export.js`:

```html
  <script src="js/gradient-engine.js"></script>
  <script src="js/motion.js"></script>
  <script src="js/export.js"></script>
```

- [ ] **Step 3: Verifica in console**

```javascript
const s = AuraState.createDefault('animati');
const a = AuraMotion.frame(s, 0, null);
const b = AuraMotion.frame(s, 4000, { x: 0.9, y: 0.1 });
console.log(s.angle, a.angle, b.angle, s.stops[0].color, b.stops[0].color, b.cx);
```

Expected: `s.angle` resta 135; `b.angle` diverso; colore stop diverso da quello originale; `b.cx` tirato verso 0.9; `s.cx` ancora 0.5.

- [ ] **Step 4: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/motion.js superpower/index.html
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: calcolo frame per i gradienti Animati."
```

---

### Task 4: Loop anteprima e mouse

**Files:**
- Modify: `superpower/js/ui.js` (`showView`, `renderPreview`, `mountControls` / `emit`)
- Test: browser, categorie Animati vs Sfondi

**Interfaces:**
- Consumes: `AuraMotion.frame`, `AuraMotion.pointerFromEvent`, `AuraEngine.paint`
- Produces: `AuraUI.stopMotion()`; loop attivo solo con `category === 'animati'`; `window.__auraPointer` `{x,y}|null`

- [ ] **Step 1: stop/start motion su AuraUI**

Subito dopo `renderPreview`, aggiungere:

```javascript
  stopMotion() {
    if (window.__auraMotionRaf) {
      cancelAnimationFrame(window.__auraMotionRaf);
      window.__auraMotionRaf = 0;
    }
    window.__auraPointer = null;
  },
  startMotion(getState) {
    this.stopMotion();
    const canvas = document.getElementById('preview-canvas');
    if (!canvas || typeof getState !== 'function' || !window.AuraMotion) return;
    window.__auraMotionOrigin = performance.now();
    const tick = (now) => {
      const state = getState();
      if (!state || state.category !== 'animati') {
        this.stopMotion();
        return;
      }
      const painted = AuraMotion.frame(state, now - window.__auraMotionOrigin, window.__auraPointer || null);
      AuraEngine.paint(canvas, painted);
      window.__auraMotionRaf = requestAnimationFrame(tick);
    };
    window.__auraMotionRaf = requestAnimationFrame(tick);
  },
```

In `showView`, dopo il forEach delle view, chiamare `this.stopMotion()` se `name !== 'studio'`. Se `name === 'studio'` non avviare qui il loop: lo avvia `mountControls`.

- [ ] **Step 2: Puntatore sul canvas e gate di emit**

In `mountControls`, dopo aver definito `current`:

```javascript
    this.stopMotion();
    const canvas = document.getElementById('preview-canvas');
    const setPointer = (event) => {
      window.__auraPointer = canvas ? AuraMotion.pointerFromEvent(canvas, event) : null;
    };
    if (canvas && current.category === 'animati') {
      listen(canvas, 'pointermove', setPointer);
      listen(canvas, 'pointerdown', setPointer);
      listen(canvas, 'pointerleave', () => { window.__auraPointer = null; });
      listen(canvas, 'pointercancel', () => { window.__auraPointer = null; });
    }
```

Sostituire il corpo di `emit` con:

```javascript
    const emit = (next) => {
      current = AuraState.clamp(next);
      onChange(current);
      paintGradientBar();
      if (current.category !== 'animati') this.renderPreview(current);
    };
```

Alla fine di `mountControls`, al posto del solo `syncAll()` finale, dopo `syncAll()`:

```javascript
    syncAll();
    if (current.category === 'animati') {
      this.startMotion(() => current);
    } else {
      this.renderPreview(current);
    }
```

`AbortController` di `mountControls` gia toglie i listener al remount. `stopMotion` in cima evita loop doppi.

- [ ] **Step 3: Verifica movimento**

1. Home → Animati: l'anteprima si muove da sola (colori, rotazione, macchie).
2. Mouse sopra il canvas: il gradiente segue il cursore; fuori torna il loop.
3. Genera: nuovo look, il loop non si ferma.
4. Indietro: home, niente errore console, nessun loop visibile.
5. Sfondi e Social: anteprima **ferma**; PNG visibile; mouse non anima.
6. Ispirazione → Usa in studio: fermo come oggi.

- [ ] **Step 4: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/ui.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: anteprima Animati in loop con influenza del mouse."
```

---

### Task 5: Controlli Velocita, Durata e visibilita export

**Files:**
- Modify: `superpower/index.html` (pannello controlli)
- Modify: `superpower/js/ui.js` (`syncAll`, binding, gate PNG/GIF/Video)
- Test: browser Animati vs Sfondi/Social

**Interfaces:**
- Consumes: `state.animation.speed` (0–1), `state.animation.duration` (2–8)
- Produces: `#animation-controls`, `#ctrl-speed`, `#ctrl-speed-value`, `#ctrl-duration`, `#ctrl-duration-value`, `#btn-download-gif`, `#btn-download-video` (i click GIF/Video arrivano nel Task 6–7; qui solo markup e visibilita)

- [ ] **Step 1: Markup**

Prima della sezione Formato, inserire:

```html
          <section id="animation-controls" class="control-section hidden" hidden aria-labelledby="animation-controls-title">
            <h3 id="animation-controls-title">Animazione</h3>
            <label class="control-field">
              <span class="control-label-row">
                Velocita
                <span class="control-value">
                  <input id="ctrl-speed-value" type="number" min="0" max="100" step="1" value="45" aria-label="Velocita percentuale">
                  <span class="control-unit" aria-hidden="true">%</span>
                </span>
              </span>
              <input id="ctrl-speed" type="range" min="0" max="100" step="1" value="45">
            </label>
            <label class="control-field">
              <span class="control-label-row">
                Durata
                <span class="control-value">
                  <input id="ctrl-duration-value" type="number" min="2" max="8" step="1" value="4" aria-label="Durata secondi">
                  <span class="control-unit" aria-hidden="true">s</span>
                </span>
              </span>
              <input id="ctrl-duration" type="range" min="2" max="8" step="1" value="4">
            </label>
          </section>
```

Nel wrap `.preview-wrap`, avvolgere cosi (canvas invariato):

```html
        <div class="preview-wrap">
          <canvas id="preview-canvas" width="1280" height="720"></canvas>
          <div id="record-overlay" class="record-overlay hidden" hidden role="status">
            <span id="record-overlay-text"></span>
          </div>
        </div>
```

Nella sezione Esporta, dopo `#btn-download` e prima di Copia palette:

```html
              <button type="button" id="btn-download-gif" class="inspiration-btn inspiration-btn-primary hidden" hidden>
                <i class="fa-solid fa-film" aria-hidden="true"></i>
                GIF
              </button>
              <button type="button" id="btn-download-video" class="inspiration-btn inspiration-btn-primary hidden" hidden>
                <i class="fa-solid fa-video" aria-hidden="true"></i>
                Video
              </button>
```

- [ ] **Step 2: CSS overlay e preview relative**

In `superpower/aura.css`, aggiornare `.preview-wrap` aggiungendo `position: relative;` e in fondo al file:

```css
.record-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(12, 10, 18, 0.45);
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  pointer-events: none;
  z-index: 2;
}

.controls-panel.is-recording {
  pointer-events: none;
  opacity: 0.55;
}
```

- [ ] **Step 3: Binding e gate in mountControls**

Prendere gli elementi:

```javascript
    const animationControls = document.getElementById('animation-controls');
    const speed = document.getElementById('ctrl-speed');
    const duration = document.getElementById('ctrl-duration');
    const downloadGif = document.getElementById('btn-download-gif');
    const downloadVideo = document.getElementById('btn-download-video');
```

Aggiungere `syncAnimation` e `syncExport`:

```javascript
    const setAnimatiUi = (on) => {
      if (animationControls) {
        animationControls.classList.toggle('hidden', !on);
        animationControls.hidden = !on;
      }
      if (download) {
        download.classList.toggle('hidden', on);
        download.hidden = on;
      }
      [downloadGif, downloadVideo].forEach((btn) => {
        if (!btn) return;
        btn.classList.toggle('hidden', !on);
        btn.hidden = !on;
      });
    };
    const syncAnimation = () => {
      const on = current.category === 'animati';
      setAnimatiUi(on);
      if (!on || !current.animation) return;
      if (speed) speed.value = String(Math.round(current.animation.speed * 100));
      if (duration) duration.value = String(current.animation.duration);
      setNumeric('ctrl-speed-value', Math.round(current.animation.speed * 100));
      setNumeric('ctrl-duration-value', current.animation.duration);
    };
```

Chiamare `syncAnimation()` dentro `syncAll` (dopo `syncText`).

Se `current.category === 'animati'` e gli slider esistono, bindare come gli altri:

```javascript
    if (speed && duration && current.category === 'animati') {
      bindLinkedNumber({
        rangeEl: speed,
        numberEl: document.getElementById('ctrl-speed-value'),
        min: 0,
        max: 100,
        onRange: (v) => emit({
          ...current,
          animation: { ...current.animation, speed: v / 100 }
        }),
        onCommit: (v) => {
          speed.value = String(v);
          emit({
            ...current,
            animation: { ...current.animation, speed: v / 100 }
          });
        }
      });
      bindLinkedNumber({
        rangeEl: duration,
        numberEl: document.getElementById('ctrl-duration-value'),
        min: 2,
        max: 8,
        onRange: (v) => emit({
          ...current,
          animation: { ...current.animation, duration: v }
        }),
        onCommit: (v) => {
          duration.value = String(v);
          emit({
            ...current,
            animation: { ...current.animation, duration: v }
          });
        }
      });
    }
```

Non collegare ancora i click GIF/Video (Task 6). PNG resta collegato come oggi: in Animati il bottone e `hidden`, quindi inutilizzabile.

- [ ] **Step 4: Verifica controlli**

Animati: sezione Animazione visibile; Velocita cambia la rapidita del loop; Durata si aggiorna (il file ancora non parte); pulsanti GIF e Video visibili; **Scarica PNG assente**. Sfondi/Social: niente Animazione, niente GIF/Video, PNG presente e funzionante.

- [ ] **Step 5: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/index.html superpower/aura.css superpower/js/ui.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: controlli velocita, durata e pulsanti GIF/Video in Animati."
```

---

### Task 6: Vendor gif.js e download GIF

**Files:**
- Create: `superpower/vendor/gif.js`
- Create: `superpower/vendor/gif.worker.js`
- Modify: `superpower/index.html` (script gif.js prima di export.js)
- Modify: `superpower/js/export.js`
- Modify: `superpower/js/ui.js` (click GIF + overlay + lock; Video ancora no)
- Test: browser, scaricare una GIF da Animati

**Interfaces:**
- Consumes: canvas anteprima gia dipinto dal loop; `current.animation.duration`
- Produces:
  - `AuraExport.isVideoSupported() -> boolean` (usato nel Task 7; si puo gia aggiungere)
  - `AuraExport.downloadBlob(blob, filename)`
  - `AuraExport.captureGif({ getCanvas, durationMs, fps, maxSide, isCancelled, onEncoding }) -> Promise<Blob>`
  - `AuraUI.setRecordUi(phase, text)` con `phase`: `'off' | 'countdown' | 'record' | 'encode'`

- [ ] **Step 1: Scaricare gif.js in vendor (niente npm)**

Da `superpower/`:

```powershell
New-Item -ItemType Directory -Force vendor | Out-Null
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js" -OutFile "vendor\gif.js"
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js" -OutFile "vendor\gif.worker.js"
```

In `index.html`, prima di `js/export.js`:

```html
  <script src="vendor/gif.js"></script>
  <script src="js/export.js"></script>
```

- [ ] **Step 2: Metodi in export.js**

Estendere `window.AuraExport` (tenere `downloadPng`, `copyPalette`, `copyLink`):

```javascript
  downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 2000);
  },

  isVideoSupported() {
    const CanvasProto = window.HTMLCanvasElement && HTMLCanvasElement.prototype;
    return !!(CanvasProto && CanvasProto.captureStream && window.MediaRecorder &&
      MediaRecorder.isTypeSupported('video/webm'));
  },

  _scaleCanvas(source, maxSide) {
    const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
    const w = Math.max(1, Math.round(source.width * scale));
    const h = Math.max(1, Math.round(source.height * scale));
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(source, 0, 0, w, h);
    return c;
  },

  captureGif({ getCanvas, durationMs, fps, maxSide, isCancelled, onEncoding }) {
    const delay = Math.round(1000 / (fps || 12));
    const frames = [];
    const started = performance.now();
    return new Promise((resolve, reject) => {
      const grab = () => {
        if (isCancelled && isCancelled()) {
          reject(new Error('cancelled'));
          return;
        }
        const src = getCanvas();
        if (!src) {
          reject(new Error('canvas'));
          return;
        }
        frames.push(this._scaleCanvas(src, maxSide || 720));
        if (performance.now() - started < durationMs) {
          setTimeout(grab, delay);
          return;
        }
        if (typeof onEncoding === 'function') onEncoding();
        if (typeof GIF !== 'function') {
          reject(new Error('gif.js mancante'));
          return;
        }
        const w = frames[0].width;
        const h = frames[0].height;
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: w,
          height: h,
          workerScript: 'vendor/gif.worker.js'
        });
        frames.forEach((frame) => gif.addFrame(frame, { copy: true, delay }));
        gif.on('finished', (blob) => resolve(blob));
        gif.on('abort', () => reject(new Error('cancelled')));
        gif.render();
      };
      grab();
    });
  }
```

- [ ] **Step 3: Overlay, lock, countdown, click GIF in ui.js**

Aggiungere su `AuraUI`:

```javascript
  setRecordUi(phase, text) {
    const overlay = document.getElementById('record-overlay');
    const label = document.getElementById('record-overlay-text');
    const panel = document.getElementById('controls-panel');
    const on = phase !== 'off';
    if (overlay) {
      overlay.classList.toggle('hidden', !on);
      overlay.hidden = !on;
    }
    if (label) label.textContent = text || '';
    if (panel) panel.classList.toggle('is-recording', on && phase !== 'off');
  },
```

In `showView`, se `name !== 'studio'`: `this.stopMotion()` (gia Task 4) e inoltre `window.__auraRecordAbort && window.__auraRecordAbort.abort()`.

Helper interno in `mountControls` (chiusura su `current`):

```javascript
    const sleep = (ms, signal) => new Promise((resolve, reject) => {
      const t = setTimeout(resolve, ms);
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(t);
          reject(new Error('cancelled'));
        }, { once: true });
      }
    });
    const runRecording = async (mode) => {
      if (current.category !== 'animati') return;
      if (window.__auraRecordAbort) window.__auraRecordAbort.abort();
      const controller = new AbortController();
      window.__auraRecordAbort = controller;
      const isCancelled = () => controller.signal.aborted;
      try {
        for (let n = 3; n >= 1; n--) {
          this.setRecordUi('countdown', String(n));
          await sleep(1000, controller.signal);
        }
        this.setRecordUi('record', 'Registrazione...');
        const durationMs = (current.animation.duration || 4) * 1000;
        const canvas = document.getElementById('preview-canvas');
        let blob;
        if (mode === 'gif') {
          blob = await AuraExport.captureGif({
            getCanvas: () => canvas,
            durationMs,
            fps: 12,
            maxSide: 720,
            isCancelled,
            onEncoding: () => this.setRecordUi('encode', 'Preparazione GIF...')
          });
          if (isCancelled()) return;
          AuraExport.downloadBlob(blob, 'aura.gif');
          this.toast('GIF scaricata');
        }
      } catch (error) {
        if (error && error.message === 'cancelled') return;
        this.toast('Export non riuscito');
      } finally {
        if (window.__auraRecordAbort === controller) window.__auraRecordAbort = null;
        this.setRecordUi('off', '');
      }
    };
    if (downloadGif) listen(downloadGif, 'click', () => { runRecording('gif'); });
```

`setRecordUi` / `runRecording` usano `this` di `AuraUI`: in `mountControls` e un metodo, quindi `this` e `AuraUI` se si lascia `mountControls` come metodo (non arrow). Gia e cosi.

- [ ] **Step 4: Verifica GIF**

Animati → GIF: countdown 3-2-1 (non finisce nel file), poi "Registrazione...", muovere il mouse, file `aura.gif` con quel movimento. Durata 2s vs 8s cambia la lunghezza. Indietro a meta: nessun file. Sfondi: PNG invariato.

- [ ] **Step 5: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/vendor/gif.js superpower/vendor/gif.worker.js superpower/index.html superpower/js/export.js superpower/js/ui.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: registrazione e download GIF in Animati."
```

---

### Task 7: Download Video (WebM) e casi limite

**Files:**
- Modify: `superpower/js/export.js` (`captureVideo`)
- Modify: `superpower/js/ui.js` (ramo `mode === 'video'` in `runRecording`)
- Test: browser Chromium; se Video non supportato, toast

**Interfaces:**
- Consumes: `AuraExport.isVideoSupported`, canvas con loop attivo (altrimenti `captureStream` e nero)
- Produces: `AuraExport.captureVideo({ canvas, durationMs, isCancelled }) -> Promise<Blob>` file `aura.webm`

- [ ] **Step 1: captureVideo**

```javascript
  captureVideo({ canvas, durationMs, isCancelled }) {
    if (!this.isVideoSupported()) {
      return Promise.reject(new Error('unsupported'));
    }
    const stream = canvas.captureStream(30);
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';
    const chunks = [];
    const recorder = new MediaRecorder(stream, { mimeType: mime });
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) chunks.push(event.data);
    };
    return new Promise((resolve, reject) => {
      let settled = false;
      let cancelled = false;
      const stopTracks = () => stream.getTracks().forEach((track) => track.stop());
      const finish = (err, blob) => {
        if (settled) return;
        settled = true;
        stopTracks();
        if (err) reject(err);
        else resolve(blob);
      };
      recorder.onerror = () => finish(new Error('recorder'));
      recorder.onstop = () => {
        if (cancelled) finish(new Error('cancelled'));
        else finish(null, new Blob(chunks, { type: mime }));
      };
      recorder.start();
      const timer = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, durationMs);
      const watch = setInterval(() => {
        if (!isCancelled || !isCancelled()) return;
        cancelled = true;
        clearInterval(watch);
        clearTimeout(timer);
        if (recorder.state === 'recording') recorder.stop();
        else finish(new Error('cancelled'));
      }, 80);
    });
  }
```

- [ ] **Step 2: Ramo video in runRecording**

All'inizio di `runRecording`, subito dopo `if (current.category !== 'animati') return;`:

```javascript
      if (mode === 'video' && !AuraExport.isVideoSupported()) {
        this.toast('Video non disponibile in questo browser');
        return;
      }
```

Dopo il blocco GIF, nello stesso `try` (senza ripetere il check):

```javascript
        } else if (mode === 'video') {
          blob = await AuraExport.captureVideo({
            canvas,
            durationMs,
            isCancelled
          });
          if (isCancelled()) return;
          AuraExport.downloadBlob(blob, 'aura.webm');
          this.toast('Video scaricato');
        }
```

Click:

```javascript
    if (downloadVideo) listen(downloadVideo, 'click', () => { runRecording('video'); });
```

- [ ] **Step 3: Verifica Video**

Animati → Video: stesso countdown, mouse influenzante, file `aura.webm` riproducibile. Indietro a meta: nessun download. GIF continua a funzionare. Sfondi/Social invariati. Copia palette e Copia link in Animati: palette ok; il link riapre colori/velocita/durata, non il gesto.

- [ ] **Step 4: Commit** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" add superpower/js/export.js superpower/js/ui.js
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: registrazione e download video in Animati."
```

---

### Task 8: Passata di regressione

**Files:**
- Nessuno, salvo fix se la verifica trova bug
- Test: checklist spec

**Interfaces:**
- Consumes: tutta la feature
- Produces: comportamento allineato ai criteri di accettazione dello spec `superpower/docs/superpowers/specs/2026-09-11-aura-animati-design.md`

- [ ] **Step 1: Checklist browser**

1. Home: Sfondi, Social, Animati, Ispirazione. Tre porte vecchie identiche.
2. Sfondi: fermo, PNG, niente GIF/Video/Velocita.
3. Social: fermo, testo, PNG.
4. Ispirazione: galleria e Usa in studio come prima.
5. Animati: loop, mouse, Genera, Velocita, Durata, GIF, Video, niente PNG, niente testo.
6. GIF: countdown escluso dal file; interazione mouse nel file.
7. Video: idem, `.webm`; se non supportato, toast e GIF resta.
8. Indietro in countdown o registrazione: nessun file, home, controlli ok al rientro.
9. Copia link Animati: riapre il look, non il mouse.
10. Nessun errore in console nei flussi sopra.

- [ ] **Step 2: Fix solo se qualcosa fallisce**, poi ripetere i punti toccati.

- [ ] **Step 3: Commit eventuale fix** (solo dopo conferma utente)

```bash
& "C:\Program Files\Git\cmd\git.exe" commit -m "Aura: correzioni sezione Animati."
```

---

## Spec coverage

| Requisito spec | Task |
|---|---|
| Porta Animati tra Social e Ispirazione | 1 |
| Altre porte invariate | 1, 8 |
| Stato `animation`, formati Sfondi, no testo | 2 |
| Loop colori/rotazione/macchie | 3, 4 |
| Mouse influenza, fuori loop autonomo | 3, 4 |
| Stato salvato non mutato dal mouse | 3 |
| Velocita / Durata | 5 |
| PNG nascosto in Animati; GIF/Video nascosti altrove | 5 |
| Countdown 3s non nel file | 6, 7 |
| Registrazione durata scelta + mouse | 6, 7 |
| GIF lato lungo max 720 | 6 |
| Video WebM, toast se non supportato | 7 |
| Indietro annulla | 6, 7 |
| Copia palette/link senza mouse | 2, 7, 8 |
| Stop loop uscendo dallo Studio | 4 |
| Encoding GIF con attesa | 6 (`Preparazione GIF...`) |
