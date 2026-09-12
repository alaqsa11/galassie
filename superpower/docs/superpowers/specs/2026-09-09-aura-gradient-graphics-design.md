# Aura — Generatore di grafiche a gradienti

**Data:** 2026-09-09  
**Stato:** bozza per review utente  
**Prodotto:** sito web che genera grafiche basate su gradienti, divise per categoria

## Problema

Greta vuole creare grafiche belle e utilizzabili (sfondi, social, ispirazione) senza partire da zero ogni volta, ma con abbastanza controllo da ritoccare colori, forme, layout e testo.

## Obiettivi

- Generare grafiche a gradienti in pochi secondi
- Separare chiaramente tre usi: Sfondi, Social, Ispirazione
- Offrire generazione automatica + controlli ampi (mix verso controllo totale)
- Consentire download, copia palette/codici colore e condivisione via link
- Dare un'esperienza creativa e vivace (il sito stesso usa gradienti e movimento)

## Non-obiettivi (v1)

- Account utente, login, salvataggio cloud
- Collaborazione in team
- Export video o animazioni
- Upload di foto/immagini di sfondo
- Editor tipografico avanzato (piu di un blocco testo semplice ma completo)
- App mobile nativa

## Utente e successo

**Utente:** Greta (e chiunque apra il sito), che vuole grafiche pronte da scaricare o ispirazioni da rifinire.

**Successo:** in meno di un minuto posso scegliere una categoria, generare qualcosa di bello, ritoccarlo, scaricare PNG, copiare i colori e condividere un link che riapre la stessa grafica.

## Approccio scelto

**Hub per categoria + studio condiviso**

- Home vivace con tre porte di categoria
- Ogni categoria ha mood/preset diversi
- Un unico studio/editor con controlli potenti
- Ispirazione puo "mandare" un look nello studio

Alternative scartate:

- Studio unico senza hub: piu veloce, ma categorie meno chiare
- Solo galleria-first: ottimo per browsing, meno diretto per wallpaper/post immediati

## Architettura dell'esperienza

```
Home (brand + 3 categorie)
  ├─ Sfondi     → Studio (formato wallpaper, senza testo obbligatorio)
  ├─ Social     → Studio (formato social + layer testo)
  └─ Ispirazione → Galleria mood → "Usa in studio" → Studio
```

Lo stato della grafica corrente (categoria, colori, angolo, forme, formato, testo) e serializzabile in un link condividibile.

## Flussi principali

### 1. Generazione rapida
1. Apri una categoria
2. Premi Genera
3. Vedi anteprima grande
4. Opzionale: Rigenera o ritocca
5. Scarica / copia palette / copia link

### 2. Social con testo
1. Entra in Social
2. Genera o scegli preset formato (o dimensioni custom)
3. Aggiungi testo libero
4. Regola posizione, dimensione, peso, allineamento, colore
5. Esporta PNG

### 3. Da ispirazione a studio
1. Scorri la galleria Ispirazione
2. Clicca "Usa in studio"
3. Lo studio si apre con quel look gia applicato
4. Ritocca e esporta

### 4. Link condiviso
1. Copia link dalla UI
2. Chi lo apre vede la stessa grafica (stessi parametri)
3. Puo ritoccarla e riesportarla

## Categorie e comportamenti

### Sfondi
- Focus: wallpaper e sfondi full-bleed
- Preset: 16:9, 21:9, mobile portrait, + larghezza/altezza custom
- Controlli gradienti/forme pieni
- Testo: non disponibile in questa categoria (il layer testo e riservato a Social)

### Social
- Focus: post e storie
- Preset social base (es. quadrato, storia verticale, cover orizzontale) + custom px
- Controlli gradienti/forme pieni
- Testo obbligatoriamente disponibile: un blocco testo libero con posizione e stile regolabili

### Ispirazione
- Focus: browsing di mood/palette/composizioni
- Azioni: anteprima, copia palette, "Usa in studio"
- Download disponibile anche dalla galleria quando ha senso (stessa pipeline di export)

## Controlli dello studio

Sempre disponibili:

- **Genera / Rigenera** — punto di partenza automatico coerente con la categoria
- **Colori** — fino a 4–5 stop, editabili
- **Tipo gradiente** — lineare, radiale, conico
- **Angolo / origine** — direzione o centro
- **Forme / overlay** — elementi soft (blob, mesh leggera, vignette) con intensita
- **Layout** — disposizione relativa degli overlay
- **Formato** — preset della categoria + custom larghezza/altezza in pixel

Solo Social (e se riaperto da link Social):

- **Testo** — contenuto, posizione (trascinabile o controlli), dimensione, peso, allineamento, colore

## Export e condivisione

| Azione | Comportamento |
|---|---|
| Download | Esporta PNG dell'anteprima alla risoluzione scelta |
| Copia palette | Copia codici HEX (e snippet CSS del gradiente) |
| Copia link | URL che ricostruisce la grafica senza account |

Niente salvataggio cloud in v1. La "memoria" della grafica e nel link (e, se utile in implementazione, nella sessione locale del browser, senza diventare feature di prodotto primaria).

## Interfaccia e atmosfera

- Brand **Aura** come segnale forte in home
- Atmosfera creativa: gradienti animati, micro-motion, gerarchia chiara
- Layout studio: anteprima dominante + pannello controlli (desktop a lato, mobile sotto)
- Una composizione per viewport in home; niente dashboard piena di widget
- Testi UI in italiano

## Casi limite

- Dimensioni custom troppo grandi: avviso e tetto massimo ragionevole (es. lato lungo limitato) per non bloccare il browser
- Dimensioni invalide (0, negative): messaggio chiaro e ripristino ultimo valore valido
- Link condiviso corrotto/incompleto: apri studio con default della categoria e messaggio soft
- Testo lunghissimo: wrappa o riduci in modo leggibile nell'anteprima; non spezzare l'export
- Nessun colore selezionato: sempre almeno 2 stop validi

## Criteri di accettazione

- [ ] Home mostra tre categorie distinte (Sfondi, Social, Ispirazione)
- [ ] Da ogni categoria si arriva allo studio e si puo Generare
- [ ] Controlli colore, tipo, angolo, forme, formato funzionano e aggiornano l'anteprima in tempo reale
- [ ] Social permette testo libero con posizione e stile
- [ ] Formato supporta preset + custom px
- [ ] Download PNG funziona
- [ ] Copia palette/codici funziona
- [ ] Link condividibile ripristina la grafica
- [ ] Look vivace con almeno 2–3 motion intenzionali
- [ ] Usabile su desktop e mobile

## Scope v1 vs dopo

**v1:** hub + studio, tre categorie, controlli ampi, testo Social, export PNG, palette, link.

**Dopo (solo se richiesto):** preferiti locali, piu layer testo, template brand, export JPG/WebP, animazioni.

## Note di implementazione (per il piano successivo)

Decisioni tecniche lasciate al piano di implementazione (stack allineato al repo statico esistente dove sensato). Questa spec fissa solo prodotto, flussi e comportamenti.
