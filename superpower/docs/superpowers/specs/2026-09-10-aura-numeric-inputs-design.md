# Aura — Valori numerici editabili (barra + digitazione)

**Data:** 2026-09-10  
**Stato:** bozza per review utente  
**Prodotto:** Aura (generatore di grafiche a gradienti)

## Problema

Nello studio, molti controlli mostrano un numero accanto alla barra (angolo, percentuali, forme, ecc.), ma quel numero e solo un'etichetta: si puo cambiare solo trascinando la barra. Greta vuole poter impostare il valore anche digitandolo a mano.

## Obiettivi

- Permettere di modificare ogni valore numerico sia con la barra sia digitando
- Tenere barra e campo sempre sincronizzati
- Applicare i valori digitati solo a Invio o all'uscita dal campo (blur)
- Limitare i valori al min/max gia previsti dalla barra
- Non appesantire il layout del pannello controlli

## Non-obiettivi

- Cambiare i controlli che sono gia campi numerici (larghezza, altezza, dimensione testo)
- Aggiungere spinner custom o tastierini
- Validazione con messaggi di errore testuali
- Cambiare il comportamento di trascinamento dei punti colore sulla barra del gradiente

## Approccio scelto

**Campo numerico al posto dell'etichetta (`<output>`)**

Accanto a ogni barra, il numero diventa un piccolo `input type="number"`. Le unita (`°`, `%`) restano testo fisso accanto al campo. Barra e campo condividono gli stessi limiti.

Alternative scartate:

- Clic sull'etichetta per entrare in edit: un passaggio in piu, meno immediato
- Barra e campo come due controlli separati verticalmente: troppo spazio nel pannello

## Controlli coinvolti

| Controllo | Unita | Min | Max |
|---|---|---|---|
| Angolo | ° | 0 | 360 |
| Centro X | % | 0 | 100 |
| Centro Y | % | 0 | 100 |
| Forme | (nessuna) | 0 | 6 |
| Intensita | % | 0 | 100 |
| Vignettatura | % | 0 | 100 |
| Disposizione | % | 0 | 100 |
| Posizione testo X | % | 0 | 100 |
| Posizione testo Y | % | 0 | 100 |
| Tratto (ogni colore) | % | 0 | 100 |

Gia fuori scope (restano come oggi): Larghezza, Altezza, Dimensione testo.

## Comportamento

1. **Barra:** al movimento (`input`), aggiorna subito campo, stato e anteprima.
2. **Campo numerico:** mentre si digita non aggiorna lo stato. Su **Invio** o **blur**:
   - se il valore e un numero valido, lo clamp al min/max, aggiorna barra/stato/anteprima
   - se vuoto o non valido, ripristina il valore corrente dello stato
3. **Sincronizzazione:** ogni sync dello stato aggiorna sia barra sia campo (come oggi con `setOutput`).
4. **Accessibilita:** label esistente del controllo resta collegata; il campo ha min/max/step coerenti con la barra.

## UI / layout

- Stile compatto, allineato all'etichetta del controllo (dove oggi c'e `<output>`)
- Unita visibili come testo statico dopo il campo (`°` o `%`)
- Nessuna nuova sezione o card

## Implementazione (ambito tecnico)

File toccati (previsti):

- `superpower/index.html` — sostituire gli `<output>` fissi con input number + unita
- `superpower/js/ui.js` — binding blur/Enter, sync bidirezionale, stessa logica per i campi "Tratto" generati in JS
- `superpower/aura.css` — stile compatto per i campi numerici accanto alle label

Nessun cambiamento a `state.js` / `gradient-engine.js` oltre all'uso dei clamp gia esistenti.

## Criteri di accettazione

- Posso digitare un angolo (es. 90) e, uscendo dal campo, barra e anteprima si aggiornano
- Posso ancora usare solo la barra e il numero nel campo segue
- Un valore fuori range viene corretto al limite (es. 999 → 360 per l'angolo)
- Campo vuoto al blur torna al valore precedente
- Intensita, vignettatura, disposizione, centri, forme, posizioni testo e tratto colore funzionano allo stesso modo
- Larghezza/altezza/dimensione testo non regrediscono

## Verifica

Verifica manuale nel browser (niente Node/npm): aprire lo studio Sfondi e Social, provare barra e digitazione su tutti i controlli della tabella, inclusa una riga colore con Tratto.
