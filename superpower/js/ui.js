window.AuraUI = {
  showView(name) {
    const app = document.getElementById('app');
    app.dataset.view = name;
    document.querySelectorAll('.view').forEach((el) => {
      const on = el.id === 'view-' + name;
      el.classList.toggle('hidden', !on);
      el.hidden = !on;
      if (on) {
        el.classList.remove('view-enter');
        void el.offsetWidth;
        el.classList.add('view-enter');
      }
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
  },
  mountControls(state, onChange) {
    const panel = document.getElementById('controls-panel');
    if (!panel || !state || typeof onChange !== 'function') return;

    if (window.__auraControlsAbort) window.__auraControlsAbort.abort();
    const controller = new AbortController();
    window.__auraControlsAbort = controller;
    const listen = (element, event, handler) => {
      element.addEventListener(event, handler, { signal: controller.signal });
    };

    let current = AuraState.clamp(state);
    const type = document.getElementById('ctrl-type');
    const angle = document.getElementById('ctrl-angle');
    const cx = document.getElementById('ctrl-cx');
    const cy = document.getElementById('ctrl-cy');
    const centerControls = document.getElementById('center-controls');
    const stopsList = document.getElementById('stops-list');
    const addStop = document.getElementById('btn-add-stop');
    const generate = document.getElementById('btn-generate');
    const blobs = document.getElementById('ctrl-blobs');
    const intensity = document.getElementById('ctrl-intensity');
    const vignette = document.getElementById('ctrl-vignette');
    const layout = document.getElementById('ctrl-layout');
    const format = document.getElementById('ctrl-format');
    const width = document.getElementById('ctrl-width');
    const height = document.getElementById('ctrl-height');
    const textControls = document.getElementById('text-controls');
    const textContent = document.getElementById('ctrl-text-content');
    const textX = document.getElementById('ctrl-text-x');
    const textY = document.getElementById('ctrl-text-y');
    const textSize = document.getElementById('ctrl-text-size');
    const textWeight = document.getElementById('ctrl-text-weight');
    const textAlign = document.getElementById('ctrl-text-align');
    const textColor = document.getElementById('ctrl-text-color');
    const download = document.getElementById('btn-download');
    const copyPalette = document.getElementById('btn-copy-palette');
    const copyLink = document.getElementById('btn-copy-link');
    const gradientBar = document.getElementById('gradient-stop-bar');
    const formats = AuraPresets.formats[current.category === 'social' ? 'social' : 'sfondi'];

    const setNumeric = (id, value) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = String(value);
    };
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
      listen(numberEl, 'blur', finish);
      listen(numberEl, 'keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        numberEl.blur();
      });
    };
    const syncStopRow = (index, stop) => {
      const row = stopsList.children[index];
      if (!row) return;
      const colorInput = row.querySelector('input[type="color"]');
      const colorLabel = row.querySelector('.color-control span');
      const strokeInput = row.querySelector('input[type="range"]');
      const strokeNumber = row.querySelector('.stop-stroke-value');
      if (colorInput) colorInput.value = stop.color;
      if (colorLabel) colorLabel.textContent = stop.color.toUpperCase();
      if (strokeInput) strokeInput.value = Math.round(stop.stroke * 100);
      if (strokeNumber) strokeNumber.value = String(Math.round(stop.stroke * 100));
    };
    const paintGradientBar = () => {
      if (!gradientBar) return;
      const barStops = AuraEngine.resolveStopPoints(current.stops)
        .map((st) => st.color + ' ' + (st.pos * 100) + '%')
        .join(', ');
      gradientBar.style.backgroundImage = 'linear-gradient(90deg, ' + barStops + ')';
      const handles = gradientBar.querySelectorAll('.gradient-stop-handle');
      if (handles.length !== current.stops.length) return;
      current.stops.forEach((stop, index) => {
        handles[index].style.left = (stop.pos * 100) + '%';
        handles[index].style.backgroundColor = stop.color;
        handles[index].style.opacity = String(0.45 + stop.stroke * 0.55);
        handles[index].style.transform = 'translate(-50%, -50%) scale(' + (0.85 + stop.stroke * 0.45) + ')';
        handles[index].setAttribute(
          'aria-valuenow',
          String(Math.round(stop.pos * 100))
        );
        handles[index].setAttribute(
          'aria-label',
          'Posizione colore ' + (index + 1) + ': ' + Math.round(stop.pos * 100) + '%'
        );
      });
    };
    const emit = (next) => {
      current = AuraState.clamp(next);
      onChange(current);
      this.renderPreview(current);
      paintGradientBar();
    };
    const matchingFormat = () => formats.find((item) => (
      item.width === current.width && item.height === current.height
    ));
    const syncGradient = () => {
      type.value = current.gradientType;
      angle.value = current.angle;
      cx.value = Math.round(current.cx * 100);
      cy.value = Math.round(current.cy * 100);
      setNumeric('ctrl-angle-value', Math.round(current.angle));
      setNumeric('ctrl-cx-value', Math.round(current.cx * 100));
      setNumeric('ctrl-cy-value', Math.round(current.cy * 100));
      centerControls.classList.toggle('hidden', current.gradientType === 'linear');
    };
    const syncOverlays = () => {
      blobs.value = current.overlays.blobs;
      intensity.value = Math.round(current.overlays.intensity * 100);
      vignette.value = Math.round(current.overlays.vignette * 100);
      layout.value = Math.round(current.overlays.layout * 100);
      setNumeric('ctrl-blobs-value', current.overlays.blobs);
      setNumeric('ctrl-intensity-value', Math.round(current.overlays.intensity * 100));
      setNumeric('ctrl-vignette-value', Math.round(current.overlays.vignette * 100));
      setNumeric('ctrl-layout-value', Math.round(current.overlays.layout * 100));
    };
    const syncFormat = () => {
      const match = matchingFormat();
      format.value = match ? match.id : 'custom';
      width.value = current.width;
      height.value = current.height;
    };
    const syncText = () => {
      const isSocial = current.category === 'social';
      textControls.classList.toggle('hidden', !isSocial);
      textControls.hidden = !isSocial;
      if (!isSocial || !current.text) return;
      textContent.value = current.text.content;
      textX.value = Math.round(current.text.x * 100);
      textY.value = Math.round(current.text.y * 100);
      textSize.value = current.text.size;
      textWeight.value = String(current.text.weight);
      textAlign.value = current.text.align;
      textColor.value = current.text.color;
      setNumeric('ctrl-text-x-value', Math.round(current.text.x * 100));
      setNumeric('ctrl-text-y-value', Math.round(current.text.y * 100));
    };
    const updateText = (patch) => {
      if (current.category !== 'social' || !current.text) return;
      emit({ ...current, text: { ...current.text, ...patch } });
    };
    const buildGradientBar = () => {
      if (!gradientBar) return;
      gradientBar.replaceChildren();
      current.stops.forEach((stop, index) => {
        const handle = document.createElement('button');
        handle.type = 'button';
        handle.className = 'gradient-stop-handle';
        handle.style.left = (stop.pos * 100) + '%';
        handle.style.backgroundColor = stop.color;
        handle.setAttribute('role', 'slider');
        handle.setAttribute('aria-valuemin', '0');
        handle.setAttribute('aria-valuemax', '100');
        handle.setAttribute('aria-valuenow', String(Math.round(stop.pos * 100)));
        handle.setAttribute(
          'aria-label',
          'Posizione colore ' + (index + 1) + ': ' + Math.round(stop.pos * 100) + '%'
        );
        listen(handle, 'pointerdown', (event) => {
          event.preventDefault();
          handle.classList.add('is-dragging');
          handle.setPointerCapture(event.pointerId);
          const move = (ev) => {
            const rect = gradientBar.getBoundingClientRect();
            if (!rect.width) return;
            const pos = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
            const stops = current.stops.map((item, i) => (
              i === index ? { ...item, pos } : item
            ));
            emit({ ...current, stops });
            syncStopRow(index, current.stops[index]);
          };
          const end = (ev) => {
            handle.classList.remove('is-dragging');
            if (handle.hasPointerCapture(ev.pointerId)) {
              handle.releasePointerCapture(ev.pointerId);
            }
            handle.removeEventListener('pointermove', move);
            handle.removeEventListener('pointerup', end);
            handle.removeEventListener('pointercancel', end);
          };
          handle.addEventListener('pointermove', move);
          handle.addEventListener('pointerup', end);
          handle.addEventListener('pointercancel', end);
        });
        listen(handle, 'keydown', (event) => {
          let delta = 0;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') delta = -0.01;
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') delta = 0.01;
          if (!delta) return;
          event.preventDefault();
          const pos = Math.min(1, Math.max(0, current.stops[index].pos + delta));
          const stops = current.stops.map((item, i) => (
            i === index ? { ...item, pos } : item
          ));
          emit({ ...current, stops });
          syncStopRow(index, current.stops[index]);
        });
        gradientBar.appendChild(handle);
      });
      paintGradientBar();
    };
    const renderStops = () => {
      stopsList.replaceChildren();
      current.stops.forEach((stop, index) => {
        const row = document.createElement('div');
        row.className = 'stop-row';
        row.innerHTML = `
          <label class="color-control" aria-label="Colore ${index + 1}">
            <input type="color" value="${stop.color}">
            <span>${stop.color.toUpperCase()}</span>
          </label>
          <label class="stop-stroke">
            <span class="control-label-row">
              Tratto
              <span class="control-value">
                <input type="number" class="stop-stroke-value" min="0" max="100" step="1" value="${Math.round(stop.stroke * 100)}" aria-label="Tratto colore ${index + 1}">
                <span class="control-unit" aria-hidden="true">%</span>
              </span>
            </span>
            <input type="range" min="0" max="100" step="1" value="${Math.round(stop.stroke * 100)}" aria-label="Ampiezza e intensita tratto colore ${index + 1}">
          </label>
          <button type="button" class="remove-stop" aria-label="Rimuovi colore ${index + 1}" ${current.stops.length <= 2 ? 'disabled' : ''}>
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        `;
        const colorInput = row.querySelector('input[type="color"]');
        const colorLabel = row.querySelector('.color-control span');
        const strokeInput = row.querySelector('input[type="range"]');
        const strokeNumber = row.querySelector('.stop-stroke-value');
        const removeButton = row.querySelector('.remove-stop');
        listen(colorInput, 'input', () => {
          const stops = current.stops.map((item, i) => i === index
            ? { ...item, color: colorInput.value }
            : item);
          colorLabel.textContent = colorInput.value.toUpperCase();
          emit({ ...current, stops });
        });
        listen(strokeInput, 'input', () => {
          const stroke = Number(strokeInput.value) / 100;
          strokeNumber.value = strokeInput.value;
          const stops = current.stops.map((item, i) => i === index
            ? { ...item, stroke }
            : item);
          emit({ ...current, stops });
        });
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
        listen(removeButton, 'click', () => {
          if (current.stops.length <= 2) return;
          emit({ ...current, stops: current.stops.filter((item, i) => i !== index) });
          renderStops();
        });
        stopsList.appendChild(row);
      });
      addStop.disabled = current.stops.length >= 5;
      buildGradientBar();
    };
    const syncAll = () => {
      syncGradient();
      syncOverlays();
      syncFormat();
      syncText();
      renderStops();
    };

    format.replaceChildren(...formats.map((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.label;
      return option;
    }));
    const customOption = document.createElement('option');
    customOption.value = 'custom';
    customOption.textContent = 'Personalizzato';
    format.appendChild(customOption);

    listen(generate, 'click', () => {
      generate.classList.remove('is-pulsing');
      void generate.offsetWidth;
      generate.classList.add('is-pulsing');
      emit(AuraEngine.randomize(current));
      generate.querySelector('span').textContent = 'Rigenera';
      syncAll();
    });
    listen(download, 'click', () => {
      AuraExport.downloadPng(
        document.getElementById('preview-canvas'),
        `aura-${current.width}x${current.height}.png`
      );
      this.toast('PNG scaricato');
    });
    listen(copyPalette, 'click', async () => {
      try {
        await AuraExport.copyPalette(current);
        this.toast('Palette copiata');
      } catch (error) {
        this.toast('Copia non disponibile in questo contesto');
      }
    });
    listen(copyLink, 'click', async () => {
      try {
        await AuraExport.copyLink(current);
        this.toast('Link copiato');
      } catch (error) {
        this.toast('Copia non disponibile in questo contesto');
      }
    });
    listen(type, 'change', () => {
      emit({ ...current, gradientType: type.value });
      syncGradient();
    });
    bindLinkedNumber({
      rangeEl: angle,
      numberEl: document.getElementById('ctrl-angle-value'),
      min: 0,
      max: 360,
      onRange: (v) => emit({ ...current, angle: v }),
      onCommit: (v) => {
        angle.value = String(v);
        emit({ ...current, angle: v });
      }
    });
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
    bindLinkedNumber({
      rangeEl: cy,
      numberEl: document.getElementById('ctrl-cy-value'),
      min: 0,
      max: 100,
      onRange: (v) => emit({ ...current, cy: v / 100 }),
      onCommit: (v) => {
        cy.value = String(v);
        emit({ ...current, cy: v / 100 });
      }
    });
    [
      [blobs, 'blobs', 1, 'ctrl-blobs-value', 0, 6],
      [intensity, 'intensity', 0.01, 'ctrl-intensity-value', 0, 100],
      [vignette, 'vignette', 0.01, 'ctrl-vignette-value', 0, 100],
      [layout, 'layout', 0.01, 'ctrl-layout-value', 0, 100]
    ].forEach(([input, key, factor, numberId, min, max]) => {
      bindLinkedNumber({
        rangeEl: input,
        numberEl: document.getElementById(numberId),
        min,
        max,
        onRange: (v) => {
          emit({
            ...current,
            overlays: { ...current.overlays, [key]: v * factor }
          });
        },
        onCommit: (v) => {
          input.value = String(v);
          emit({
            ...current,
            overlays: { ...current.overlays, [key]: v * factor }
          });
        }
      });
    });
    listen(addStop, 'click', () => {
      if (current.stops.length >= 5) return;
      let gapIndex = 0;
      let largestGap = -1;
      for (let i = 0; i < current.stops.length - 1; i++) {
        const gap = current.stops[i + 1].pos - current.stops[i].pos;
        if (gap > largestGap) {
          largestGap = gap;
          gapIndex = i;
        }
      }
      const before = current.stops[gapIndex];
      const after = current.stops[gapIndex + 1];
      const stop = {
        color: before.color,
        pos: (before.pos + after.pos) / 2,
        stroke: 0.3
      };
      const stops = current.stops.slice();
      stops.splice(gapIndex + 1, 0, stop);
      emit({ ...current, stops });
      renderStops();
    });
    listen(format, 'change', () => {
      if (format.value === 'custom') return;
      const preset = formats.find((item) => item.id === format.value);
      if (!preset) return;
      emit({ ...current, width: preset.width, height: preset.height });
      syncFormat();
    });
    const updateDimensions = () => {
      const nextWidth = Number(width.value);
      const nextHeight = Number(height.value);
      if (
        !Number.isFinite(nextWidth) ||
        !Number.isFinite(nextHeight) ||
        nextWidth < AuraPresets.MIN_SIDE ||
        nextHeight < AuraPresets.MIN_SIDE
      ) {
        this.toast('Inserisci dimensioni valide (minimo ' + AuraPresets.MIN_SIDE + ' px)');
        syncFormat();
        return;
      }
      const oversized = Math.max(nextWidth, nextHeight) > AuraPresets.MAX_SIDE;
      emit({ ...current, width: nextWidth, height: nextHeight });
      syncFormat();
      if (oversized) this.toast('Dimensioni ridotte al massimo consentito');
    };
    listen(width, 'change', updateDimensions);
    listen(height, 'change', updateDimensions);

    listen(textContent, 'input', () => updateText({ content: textContent.value }));
    bindLinkedNumber({
      rangeEl: textX,
      numberEl: document.getElementById('ctrl-text-x-value'),
      min: 0,
      max: 100,
      onRange: (v) => updateText({ x: v / 100 }),
      onCommit: (v) => {
        textX.value = String(v);
        updateText({ x: v / 100 });
      }
    });
    bindLinkedNumber({
      rangeEl: textY,
      numberEl: document.getElementById('ctrl-text-y-value'),
      min: 0,
      max: 100,
      onRange: (v) => updateText({ y: v / 100 }),
      onCommit: (v) => {
        textY.value = String(v);
        updateText({ y: v / 100 });
      }
    });
    listen(textSize, 'change', () => {
      const size = Math.min(200, Math.max(12, Number(textSize.value) || 64));
      textSize.value = size;
      updateText({ size });
    });
    listen(textWeight, 'change', () => updateText({ weight: Number(textWeight.value) }));
    listen(textAlign, 'change', () => updateText({ align: textAlign.value }));
    listen(textColor, 'input', () => updateText({ color: textColor.value }));

    generate.querySelector('span').textContent = 'Genera';
    syncAll();
  },
  renderInspirationGrid(items) {
    const grid = document.getElementById('inspiration-grid');
    if (!grid || !Array.isArray(items)) return;

    if (window.__auraInspirationAbort) window.__auraInspirationAbort.abort();
    const controller = new AbortController();
    window.__auraInspirationAbort = controller;
    const listen = (element, event, handler) => {
      element.addEventListener(event, handler, { signal: controller.signal });
    };

    grid.replaceChildren();
    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'inspiration-card';

      const thumb = document.createElement('div');
      thumb.className = 'inspiration-thumb';
      thumb.style.backgroundImage = AuraEngine.cssGradient(item.state);
      const ratio = item.state.width / item.state.height;
      thumb.style.aspectRatio = ratio > 0 ? String(ratio) : '16 / 9';

      const body = document.createElement('div');
      body.className = 'inspiration-card-body';

      const label = document.createElement('h3');
      label.className = 'inspiration-label';
      label.textContent = item.label;

      const actions = document.createElement('div');
      actions.className = 'inspiration-actions';

      const useBtn = document.createElement('button');
      useBtn.type = 'button';
      useBtn.className = 'inspiration-btn inspiration-btn-primary';
      useBtn.textContent = 'Usa in studio';
      listen(useBtn, 'click', () => {
        window.__auraState = AuraState.clamp({
          ...item.state,
          category: item.state.category || 'ispirazione'
        });
        AuraUI.showView('studio');
        AuraUI.mountControls(window.__auraState, (nextState) => {
          window.__auraState = nextState;
        });
        AuraUI.renderPreview(window.__auraState);
      });

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'inspiration-btn';
      copyBtn.textContent = 'Copia palette';
      listen(copyBtn, 'click', async () => {
        try {
          await AuraExport.copyPalette(item.state);
          AuraUI.toast('Palette copiata');
        } catch (error) {
          AuraUI.toast('Copia non disponibile in questo contesto');
        }
      });

      actions.append(useBtn, copyBtn);
      body.append(label, actions);
      card.append(thumb, body);
      grid.appendChild(card);
    });
  }
};
