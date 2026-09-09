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

    const setOutput = (id, value) => {
      document.getElementById(id).value = value;
    };
    const syncStopRow = (index, stop) => {
      const row = stopsList.children[index];
      if (!row) return;
      const colorInput = row.querySelector('input[type="color"]');
      const colorLabel = row.querySelector('.color-control span');
      const positionInput = row.querySelector('input[type="range"]');
      const positionOutput = row.querySelector('output');
      if (colorInput) colorInput.value = stop.color;
      if (colorLabel) colorLabel.textContent = stop.color.toUpperCase();
      if (positionInput) positionInput.value = Math.round(stop.pos * 100);
      if (positionOutput) positionOutput.value = Math.round(stop.pos * 100) + '%';
    };
    const paintGradientBar = () => {
      if (!gradientBar) return;
      const barStops = current.stops
        .slice()
        .sort((a, b) => a.pos - b.pos)
        .map((st) => st.color + ' ' + (st.pos * 100) + '%')
        .join(', ');
      gradientBar.style.backgroundImage = 'linear-gradient(90deg, ' + barStops + ')';
      const handles = gradientBar.querySelectorAll('.gradient-stop-handle');
      if (handles.length !== current.stops.length) return;
      current.stops.forEach((stop, index) => {
        handles[index].style.left = (stop.pos * 100) + '%';
        handles[index].style.backgroundColor = stop.color;
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
      setOutput('ctrl-angle-value', Math.round(current.angle) + '°');
      setOutput('ctrl-cx-value', Math.round(current.cx * 100) + '%');
      setOutput('ctrl-cy-value', Math.round(current.cy * 100) + '%');
      centerControls.classList.toggle('hidden', current.gradientType === 'linear');
    };
    const syncOverlays = () => {
      blobs.value = current.overlays.blobs;
      intensity.value = Math.round(current.overlays.intensity * 100);
      vignette.value = Math.round(current.overlays.vignette * 100);
      layout.value = Math.round(current.overlays.layout * 100);
      setOutput('ctrl-blobs-value', current.overlays.blobs);
      setOutput('ctrl-intensity-value', Math.round(current.overlays.intensity * 100) + '%');
      setOutput('ctrl-vignette-value', Math.round(current.overlays.vignette * 100) + '%');
      setOutput('ctrl-layout-value', Math.round(current.overlays.layout * 100) + '%');
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
      setOutput('ctrl-text-x-value', Math.round(current.text.x * 100) + '%');
      setOutput('ctrl-text-y-value', Math.round(current.text.y * 100) + '%');
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
              i === index ? { color: item.color, pos } : item
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
            i === index ? { color: item.color, pos } : item
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
          <label class="stop-position">
            <span>Posizione <output>${Math.round(stop.pos * 100)}%</output></span>
            <input type="range" min="0" max="100" step="1" value="${Math.round(stop.pos * 100)}" aria-label="Posizione colore ${index + 1}">
          </label>
          <button type="button" class="remove-stop" aria-label="Rimuovi colore ${index + 1}" ${current.stops.length <= 2 ? 'disabled' : ''}>
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        `;
        const colorInput = row.querySelector('input[type="color"]');
        const colorLabel = row.querySelector('.color-control span');
        const positionInput = row.querySelector('input[type="range"]');
        const positionOutput = row.querySelector('output');
        const removeButton = row.querySelector('.remove-stop');
        listen(colorInput, 'input', () => {
          const stops = current.stops.map((item, i) => i === index
            ? { color: colorInput.value, pos: item.pos }
            : item);
          colorLabel.textContent = colorInput.value.toUpperCase();
          emit({ ...current, stops });
        });
        listen(positionInput, 'input', () => {
          const pos = Number(positionInput.value) / 100;
          const stops = current.stops.map((item, i) => i === index
            ? { color: item.color, pos }
            : item);
          positionOutput.value = positionInput.value + '%';
          emit({ ...current, stops });
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
    listen(angle, 'input', () => {
      setOutput('ctrl-angle-value', angle.value + '°');
      emit({ ...current, angle: Number(angle.value) });
    });
    [cx, cy].forEach((input) => {
      listen(input, 'input', () => {
        setOutput('ctrl-' + input.id.slice(5) + '-value', input.value + '%');
        emit({ ...current, [input.id.slice(5)]: Number(input.value) / 100 });
      });
    });
    [
      [blobs, 'blobs', 1, 'ctrl-blobs-value'],
      [intensity, 'intensity', 0.01, 'ctrl-intensity-value'],
      [vignette, 'vignette', 0.01, 'ctrl-vignette-value'],
      [layout, 'layout', 0.01, 'ctrl-layout-value']
    ].forEach(([input, key, factor, outputId]) => {
      listen(input, 'input', () => {
        setOutput(outputId, key === 'blobs' ? input.value : input.value + '%');
        emit({
          ...current,
          overlays: { ...current.overlays, [key]: Number(input.value) * factor }
        });
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
        pos: (before.pos + after.pos) / 2
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
    listen(textX, 'input', () => {
      setOutput('ctrl-text-x-value', textX.value + '%');
      updateText({ x: Number(textX.value) / 100 });
    });
    listen(textY, 'input', () => {
      setOutput('ctrl-text-y-value', textY.value + '%');
      updateText({ y: Number(textY.value) / 100 });
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
