# Aura — Sezione Animati (gradienti in movimento)

**Data:** 2026-09-11  
**Stato:** approvato  
**Prodotto:** Aura (generatore di grafiche a gradienti)

## Problema

Aura genera solo immagini ferme (PNG). Greta vuole una sezione dedicata per creare gradienti animati, giocarci col mouse in anteprima, e scaricare il risultato come GIF o video. La sezione testo animato resta fuori da questo lavoro.

## Obiettivi

- Aggiungere in home una quarta porta **Animati**, tra Social e Ispirazione
- In Animati, l'anteprima e sempre in movimento (colori, rotazione, macchie)
- Il mouse sopra l'anteprima influenza il movimento; il file scaricato registra quella interazione
- Consentire di scegliere **GIF** o **Video** in download
- Lasciare Sfondi, Social e Ispirazione identici a oggi (testi, flussi, PNG, nessun movimento)

## Non-obiettivi

- Sezione testo animato (gradiente + testo, o solo testo)
- Movimento "pazzo" tipo Space Type Generator sul testo
- Account, salvataggio cloud, galleria di animazioni salvate
- Export PNG in Animati
- Registrazione della traiettoria del mouse nel link condiviso
- Cambiare look, testi o comportamento delle tre porte gia esistenti
- Cambiare Ispirazione, i controlli di Sfondi/Social, o il download PNG di quelle categorie

## Approccio scelto

**Nuova porta + stesso Studio, acceso solo per Animati**

Una nuova card in home apre lo Studio gia usato da Sfondi/Social. Se la categoria e `animati`, l'anteprima gira in loop, compaiono Velocita/Durata e i pulsanti GIF/Video, e il PNG sparisce. Se la categoria e un'altra, lo Studio resta esattamente come oggi.

Alternative scartate:

- Playground a tutto schermo: troppo diverso da Aura, e un'altra app
- Interruttore "Anima" dentro Sfondi: mescola fermo e movimento, e non e una sezione nuova

## Home

Ordine delle porte:

1. Sfondi — Wallpaper e sfondi full-bleed (invariata)
2. Social — Post e storie con testo (invariata)
3. **Animati** — Gradienti in movimento (nuova)
4. Ispirazione — Mood e palette da esplorare (invariata)

La porta Animati ha lo stesso stile delle altre (icona, titolo, riga piccola). Icona: play in cerchio (`fa-circle-play`). Clic: apre lo Studio con stato di default categoria `animati`.

Sfondi, Social e Ispirazione: stesso HTML/testo/click di oggi.

## Studio Animati

Stesso layout: Indietro, anteprima a sinistra, pannello a destra.

**Uguale a Sfondi:** tipo gradiente, angolo, centri (se radiale/conico), colori (barra, tratto, aggiungi/rimuovi), overlay, formato. I preset formato sono quelli di Sfondi (16:9 HD, 21:9, Mobile) + larghezza/altezza. Nessun blocco Testo.

**Solo Animati:**

| Controllo | Comportamento |
|---|---|
| Anteprima | Sempre in loop, mai ferma |
| Velocita | Barra + numero 0–100%, come gli altri slider. Piu alto = movimento piu rapido |
| Durata | Barra + numero da 2 a 8 secondi (default 4). Quanto dura la registrazione / il file |
| Genera | Randomizza colori, tipo, overlay (stessa logica di oggi). Il loop continua |
| GIF | Avvia il flusso di registrazione e scarica una GIF |
| Video | Avvia il flusso di registrazione e scarica un video |
| Copia palette | Come oggi |
| Copia link | Come oggi: riapre colori e impostazioni, senza il movimento del mouse |

**Nascosto in Animati:** Scarica PNG.  
**Nascosto in Sfondi/Social:** Velocita, Durata, GIF, Video. PNG resta.

Durante la registrazione tutti i controlli (Genera incluso) sono bloccati.

## Movimento

Due strati, solo in Animati. Lo stato salvato (colori, tipo, overlay, formato, velocita, durata) non viene sovrascritto dal mouse: ogni frame si calcola una copia di disegno.

**Autonomo (sempre):** loop continuo. I colori si fondono, l'angolo gira piano, le macchie fluttuano. L'ampiezza segue Velocita.

**Mouse sopra l'anteprima:** il gradiente segue il cursore (centro e inclinazione tirati verso il punto). Fuori dall'anteprima, resta solo il movimento autonomo.

**Genera:** nuovo look casuale; il loop non si ferma.

## Registrazione e download

1. L'utente sceglie GIF o Video.
2. Conto alla rovescia visibile di 3 secondi sull'anteprima. Il mouse gia influenza il disegno, ma questi secondi **non** finiscono nel file.
3. Parte la registrazione per la Durata scelta. Indicatore "Registrazione...". I pulsanti e gli slider sono bloccati; il mouse sull'anteprima continua a influenzare il disegno.
4. Allo scadere, il file si scarica da solo (`aura.gif` o `aura.webm`).
5. I controlli si sbloccano.

Se durante la registrazione il mouse non entra nell'anteprima, il file contiene solo il loop autonomo.

**Indietro** durante conto alla rovescia o registrazione: annulla, nessun file, ritorno in home, controlli sbloccati.

**Video:** file WebM dal canvas (etichetta UI: "Video").  
**GIF:** file GIF dello stesso periodo. Se le dimensioni sono molto grandi, la GIF puo essere ridotta sul lato lungo (tetto 720 px) per non bloccare il browser; il video resta alla risoluzione dello Studio, con lo stesso tetto massimo gia usato per le immagini (4096).

## Architettura (unita)

```
Home porta Animati
  → Studio (categoria animati)
       → AuraMotion.frame(stato, tempo, puntatore) → stato di disegno
       → AuraEngine.paint(canvas, stato di disegno)
       → AuraRecorder (conto alla rovescia + cattura frame)
            → GIF  oppure  Video (MediaRecorder)
```

| Unita | Fa | Si usa cosi | Dipende da |
|---|---|---|---|
| Porta home | Apre Studio Animati | Click sulla card | `AuraState.createDefault('animati')` |
| `AuraMotion` | Calcola il frame (autonomo + mouse) | Loop `requestAnimationFrame` solo se categoria `animati` | stato, tempo, posizione mouse 0–1 o null |
| `AuraEngine.paint` | Disegna un frame fermo | Come oggi, su uno stato di disegno | invariato nel contratto |
| `AuraRecorder` | Countdown, cattura, download | Click GIF o Video | canvas, durata, formato |
| Controlli Studio | Mostrano/nascondono PNG vs GIF/Video | In base a `state.category` | stato |

Il loop di animazione **non** parte in Sfondi, Social, Ispirazione.

## Stato

`category: 'animati'`. `text` sempre `null` (come Sfondi).

Campo nuovo, solo per Animati:

```
animation: { speed: 0–1, duration: 2–8 }
```

Default: `speed` 0.45, `duration` 4. `clamp` ignora o strippa `animation` sulle altre categorie, cosi i link Sfondi/Social restano identici.

Il puntatore **non** sta nello stato ne nel link.

## Casi limite

- Browser senza Video (MediaRecorder o WebM): toast chiaro, GIF resta disponibile
- Encoding GIF lento: indicatore di attesa dopo la registrazione, poi download
- Dimensioni invalide: stesso comportamento di oggi
- Link Animati corrotto: default Animati + toast (stesso schema dei link non validi)
- Link senza `animation`: default velocita/durata
- Uscita dallo Studio: stop del loop e di eventuale registrazione
- Puntatore fuori dal canvas: influenza disattivata (valore `null`)

## Criteri di accettazione

- In home l'ordine e Sfondi, Social, Animati, Ispirazione
- Testi, icone e click di Sfondi, Social e Ispirazione sono identici a prima
- Da Animati si apre lo Studio con anteprima in movimento e senza testo
- Genera, colori, overlay e formato funzionano; Velocita e Durata aggiornano il movimento / la lunghezza del file
- Mouse sopra l'anteprima sposta/inclina il gradiente; fuori torna il loop autonomo
- GIF: countdown, registrazione della durata scelta, download `.gif` con l'interazione
- Video: stesso flusso, download `.webm`; se non supportato, toast e nessuna perdita della GIF
- Indietro a meta registrazione non scarica nulla
- Sfondi e Social scaricano ancora PNG, anteprima ferma, niente GIF/Video/Velocita/Durata
- Copia palette funziona in Animati; Copia link riapre lo stesso look (non il gesto del mouse)

## Verifica

Manuale nel browser (niente Node/npm):

1. Home: quattro porte, ordine corretto, le tre vecchie invariate
2. Sfondi e Social: anteprima ferma, Scarica PNG, nessun controllo animazione
3. Ispirazione: galleria e "Usa in studio" come oggi
4. Animati: loop, mouse, Genera, GIF, Video, Indietro in registrazione
5. Link copiato da Animati: riapre i colori; il mouse non e "registrato" nel link

## File previsti

- `superpower/index.html` — porta Animati; controlli Velocita/Durata; pulsanti GIF/Video (visibili solo in Animati)
- `superpower/aura.css` — stile minimo per indicatore registrazione/countdown, allineato al resto
- `superpower/js/app.js` — click della nuova porta
- `superpower/js/state.js` — categoria `animati`, clamp di `animation`
- `superpower/js/presets.js` — formati Animati = formati Sfondi
- `superpower/js/ui.js` — avvio/stop loop, mouse sull'anteprima, gate controlli, flusso recorder
- `superpower/js/motion.js` — **nuovo**: calcolo del frame
- `superpower/js/export.js` — download GIF e Video, oltre al PNG esistente

Encoder GIF: `gif.js` da CDN (cdnjs), niente npm, stesso modello di Font Awesome. Video: `MediaRecorder` sul canvas, file WebM.

## Scope dopo

Sezione testo animato (gradiente + testo, o solo testo) e il tipo di movimento del testo: fuori da questa spec, da brainstorming successivo.
