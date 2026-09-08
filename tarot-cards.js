const TAROT_CARDS = {
  major: [
    {
      id: 0, name: "Il Matto", symbol: "🃏", number: "0",
      uprightKeywords: ["Nuovi inizi", "Spontaneita", "Fiducia", "Liberta"],
      reversedKeywords: ["Rischio", "Follia", "Imprudenza", "Incertezza"],
      uprightMeaning: "Il Matto rappresenta il principio di un nuovo viaggio, sia esso fisico, emotivo o spirituale. E' il segno che e arrivato il momento di osare, di abbandonarsi all'ignoto con leggerezza e curiosita. L'universo ti invita a fidarti del processo e a seguire il tuo istinto.",
      reversedMeaning: "In posizione invertita, il Matto avverte di eccessi di impulsivita e mancanza di pianificazione. Potresti essere sul punto di fare una scelta avventata. E' il momento di rallentare e valutare attentamente le conseguenze prima di agire.",
      advice: "Affidati alla tua intuizione ma non ignorare i segnali di pericolo. Ogni grande avventura inizia con un passo nella nebbia."
    },
    {
      id: 1, name: "Il Mago", symbol: "🧙", number: "I",
      uprightKeywords: ["Manifestazione", "Habilita", "Volonta", "Concentrazione"],
      reversedKeywords: ["Inganno", "Manipolazione", "Abilita inutilizzate", "Illusione"],
      uprightMeaning: "Il Mago ti ricorda che possiedi tutti gli strumenti necessari per realizzare i tuoi desideri. La tua capacita di manifestare la realta e nel suo apice. Concentra la tua energia e la tua attenzione su un obiettivo specifico e vedrai i risultati.",
      reversedMeaning: "Il Mago invertito suggerisce che stai usando le tue abilita in modo manipolatorio o che non stai sfruttando il tuo vero potenziale. Potresti sentirti impotente o privo degli strumenti necessari, ma la realta e che hai gia tutto cio che ti serve.",
      advice: "Hai il potere di creare la realta che desideri. Concentra la tua mente e agisci con determinazione."
    },
    {
      id: 2, name: "La Papessa", symbol: "🌙", number: "II",
      uprightKeywords: ["Intuizione", "Mistero", "Saggezza interiore", "Silenzio"],
      reversedKeywords: ["Segreti", "Inconsapevolezza", "Isolamento", "Dipendenza"],
      uprightMeaning: "La Papessa incarna la saggezza nascosta e la conoscenza intuitiva. Ti invita a ritirarti nel silenzio per ascoltare la voce della tua anima. Le risposte che cerchi si trovano dentro di te, non nel mondo esterno.",
      reversedMeaning: "In posizione invertita, la Papessa suggerisce che stai ignorando la tua intuizione o che ci sono segreti che impediscono la tua crescita. Potresti sentirti disconnesso dalla tua parte piu profonda.",
      advice: "Dai spazio al silenzio e ascolta la voce interiore. La risposta che cerchi e gia dentro di te."
    },
    {
      id: 3, name: "L'Imperatrice", symbol: "👑", number: "III",
      uprightKeywords: ["Fertilita", "Abbondanza", "Natura", "Grazia"],
      reversedKeywords: ["Creativita bloccata", "Dipendenza", "Narcisismo", "Mancanza"],
      uprightMeaning: "L'Imperatrice e il simbolo dell'abbondanza, della bellezza e della creativita in fiore. Ti invita a nutrire te stesso e i tuoi progetti con amore e pazienza. E' il momento di raccogliere i frutti della tua dedizione.",
      reversedMeaning: "L'Imperatrice invertita indica un blocco creativo o una relazione tossica che drena le tue energie. Potresti sentirti vuoto o dipendente dall'approvazione altrui.",
      advice: "Nutri te stesso con amore e cura. La bellezza e l'abbondanza nascono dalla cura costante."
    },
    {
      id: 4, name: "L'Imperatore", symbol: "🏛️", number: "IV",
      uprightKeywords: ["Autorita", "Struttura", "Stabilita", "Protezione"],
      reversedKeywords: ["Tirannia", "Rigidita", "Mancanza di controllo", "Abuso"],
      uprightMeaning: "L'Imperatore rappresenta l'ordine, la struttura e la padronanza. Ti invita a prendere il controllo della tua vita con decisione e responsabilita. E' il momento di stabilire fondamenta solide per i tuoi progetti.",
      reversedMeaning: "L'Imperatore invertito suggerisce un uso improprio del potere o una mancanza di disciplina. Potresti sentirti sovraccarico dalle responsabilita o avere difficulty nel gestire le situazioni.",
      advice: "Costruisci solide fondamenta nella tua vita. La disciplina e la struttura sono le basi del successo."
    },
    {
      id: 5, name: "Il Papa", symbol: "📿", number: "V",
      uprightKeywords: ["Tradizione", "Insegnamento", "Spiritualita", "Guida"],
      reversedKeywords: ["Dogma", "Ipocrisia", "Rigidezza", "Ribellione"],
      uprightMeaning: "Il Papa simboleggia la saggezza tradizionale, la guida spirituale e la comunita. Ti invita a cercare un mentore o a condividere la tua conoscenza con gli altri. Le risposte possono trovarsi nelle tradizioni e nella saggezza collettiva.",
      reversedMeaning: "Il Papa invertito avverte di non seguire ciecamente le regole o le figure di autorita. Potresti sentirti limitato da convinzioni rigide o da un ambiente troppo conformista.",
      advice: "Cerca la saggezza nella tradizione ma non temere di mettere in discussione le convinzioni obsolete."
    },
    {
      id: 6, name: "Gli Amanti", symbol: "💕", number: "VI",
      uprightKeywords: ["Amore", "Armonia", "Scelta", "Unione"],
      reversedKeywords: ["Disharmonia", "Indecisione", "Tradimento", "Superficialita"],
      uprightMeaning: "Gli Amanti rappresentano l'unione armoniosa, sia esso romantica o spirituale. Ti invitano a seguire il cuore nelle tue decisioni e a cercare l'equilibrio nelle relazioni. E' il momento di fare una scelta autentica e dal profondo.",
      reversedMeaning: "Gli Amanti invertiti indicano un conflitto tra cuore e ragione, o una relazione in crisi. Potresti essere indeciso su quale strada prendere o sentirti tradito.",
      advice: "Segui il tuo cuore ma non ignorare la voce della ragione. L'amore autentico nasce dall'equilibrio."
    },
    {
      id: 7, name: "Il Carro", symbol: "⚔️", number: "VII",
      uprightKeywords: ["Vittoria", "Determinazione", "Controllo", "Ambizione"],
      reversedKeywords: ["Sconfitta", "Mancanza di direzione", "Aggressivita", "Stallo"],
      uprightMeaning: "Il Carro simboleggia il trionfo della volonta e della determinazione. Hai superato gli ostacoli e ora e il momento di avanzare con sicurezza verso i tuoi obiettivi. La tua forza interiore e invincibile.",
      reversedMeaning: "Il Carro invertito suggerisce una perdita di direzione o una sconfitta apparente. Potresti sentirti bloccato o incapace di avanzare nonostante i tuoi sforzi.",
      advice: "Avanza con determinazione verso i tuoi obiettivi. La vittoria appartiene a chi non si arrende."
    },
    {
      id: 8, name: "La Forza", symbol: "🦁", number: "VIII",
      uprightKeywords: ["Coraggio", "Pazienza", "Inner Strength", "Compassione"],
      reversedKeywords: ["Debolezza", "Insicurezza", "Aggressivita", "Paura"],
      uprightMeaning: "La Forza ti invita a trovare il coraggio e la pazienza per affrontare le sfide. Il vero potere non risiede nella forza bruta, ma nella capacita di dominare le proprie emozioni con dolcezza e compassion.",
      reversedMeaning: "La Forza invertita indica un momento di insicurezza o paura. Potresti sentirti debole o incapace di gestire le tue emozioni. E' importante riconnettersi con la propria forza interiore.",
      advice: "La vera forza risiede nella pazienza e nella compassion. Dominati con dolcezza, non con forza."
    },
    {
      id: 9, name: "L'Eremita", symbol: "🔮", number: "IX",
      uprightKeywords: ["Solitudine", "Riflessione", "Saggezza", "Ricerca interiore"],
      reversedKeywords: ["Isolamento", "Solitudine", "Chiusura", "Rigidita"],
      uprightMeaning: "L'Eremita ti invita a ritirarti dal mondo esterno per cercare risposte dentro di te. La solitudine e necessaria per la crescita personale. E' il momento di riflettere sulla tua vita e sul tuo percorso.",
      reversedMeaning: "L'Eremita invertito suggerisce che stai evitando la introspezione o che la tua solitudine e diventata un ostacolo. Potresti sentirti troppo isolato dal mondo.",
      advice: "Cerca la saggezza nella quiete. A volte le risposte piu importanti si trovano nel silenzio."
    },
    {
      id: 10, name: "La Ruota della Fortuna", symbol: "☸️", number: "X",
      uprightKeywords: ["Cicli", "Cambio", "Fortuna", "Destino"],
      reversedKeywords: ["Sfortuna", "Stallo", "Cambiamento avverso", "Resistenza"],
      uprightMeaning: "La Ruota della Fortuna indica che i cicli della vita stanno girando a tuo favore. E' il momento di cogliere le opportunita che si presentano e di adattarti ai cambiamenti. Il destino ti sta mettendo alla prova.",
      reversedMeaning: "La Ruota invertita suggerisce un periodo di sfortuna o resistenza al cambiamento. Potresti sentirti bloccato in un circulo vizioso. E' importante accettare i cambiamenti anziche resistervi.",
      advice: "Accetta i cambiamenti con grazia. I cicli della vita portano sempre nuove opportunita."
    },
    {
      id: 11, name: "La Giustizia", symbol: "⚖️", number: "XI",
      uprightKeywords: ["Giustizia", "Verita", "Equilibrio", "Responsabilita"],
      reversedKeywords: ["Inganno", "Ingiustizia", "Disonestà", "Conseguenze"],
      uprightMeaning: "La Giustizia ti invita a cercare la verita e l'equilibrio in ogni situazione. Le tue azioni avranno conseguenze, positive o negative. E' il momento di agire con integrita e onesta.",
      reversedMeaning: "La Giustizia invertita indica un periodo di ingiustizia o disonestà. Potresti sentirti vittima di circostanze avverse o delle azioni altrui. La verita prima o poi emergera.",
      advice: "Agisci con integrita e onesta. La giustizia prima o poi prevale sempre."
    },
    {
      id: 12, name: "L'Appeso", symbol: "🙃", number: "XII",
      uprightKeywords: ["Sospensione", "Nuova prospettiva", "Rassegnazione", "Sacrificio"],
      reversedKeywords: ["Stallo", "Indecisione", "Resistenza", "Egoismo"],
      uprightMeaning: "L'Appeso ti invita a vedere le cose da una prospettiva completamente nuova. A volte e necessario sospendere le azioni per comprendere meglio la situazione. Il sacrificio di oggi porta benefici domani.",
      reversedMeaning: "L'Appeso invertito suggerisce che stai resistendo al cambiamento di prospettiva. Potresti sentirti bloccato o incapace di prendere una decisione.",
      advice: "Cambia prospettiva e vedrai le cose in modo diverso. A volte e necessario rinunciare per ottenere di piu."
    },
    {
      id: 13, name: "La Morte", symbol: "💀", number: "XIII",
      uprightKeywords: ["Trasformazione", "Fine", "Rinascita", "Cambiamento"],
      reversedKeywords: ["Resistenza al cambiamento", "Stagnazione", "Paura", "Rinuncia"],
      uprightMeaning: "La Morte non rappresenta una fine fisica, ma una profonda trasformazione. Qualcosa nella tua vita deve finire per permettere a qualcosa di nuovo di nascere. E' un cambiamento necessario e inevitabile.",
      reversedMeaning: "La Morte invertita indica una resistenza al cambiamento necessario. Potresti aggrapparti al passato per paura dell'ignoto. Il cambiamento e inevitabile, e meglio accettarlo.",
      advice: "Accetta la trasformazione come parte naturale della vita. Ogni fine e un nuovo inizio."
    },
    {
      id: 14, name: "La Temperanza", symbol: "⏳", number: "XIV",
      uprightKeywords: ["Equilibrio", "Moderazione", "Pazienza", "Armonia"],
      reversedKeywords: ["Eccesso", "Impazienza", "Disharmonia", "Squilibrio"],
      uprightMeaning: "La Temperanza ti invita a cercare l'equilibrio in ogni aspetto della tua vita. La moderazione e la pazienza sono le chiavi per raggiungere i tuoi obiettivi. Tutto ha il suo tempo giusto.",
      reversedMeaning: "La Temperanza invertita suggerisce un eccesso in qualche area della tua vita o una mancanza di pazienza. Potresti sentirti squilibrato o in conflitto con te stesso.",
      advice: "Cerca l'equilibrio in tutto. La moderazione e la pazienza portano alla pace interiore."
    },
    {
      id: 15, name: "Il Diavolo", symbol: "😈", number: "XV",
      uprightKeywords: ["Tentazione", "Dipendenza", "Libido", "Materialismo"],
      reversedKeywords: ["Liberazione", "Rottura di catene", "Consapevolezza", "Riscatto"],
      uprightMeaning: "Il Diavolo rappresenta le catene che ci leghiamo alle nossre stesse paure e dipendenze. Ti invita a riconoscere ciò che ti imprigiona e a trovare il coraggio per liberartene.",
      reversedMeaning: "Il Diavolo invertito indica un periodo di liberazione da dipendenze o convinzioni limitanti. Stai rompendo le catene che ti tenevano prigioniero e riconquistando la tua liberta.",
      advice: "Riconosci le tue dipendenze e prendi coscienza delle catene invisibili. La liberta inizia dalla consapevolezza."
    },
    {
      id: 16, name: "La Torre", symbol: "🗼", number: "XVI",
      uprightKeywords: ["Rovina", "Cambiamento improvviso", "Rivelazione", "Caos"],
      reversedKeywords: ["Evitamento", "Cambiamento ritardato", "Paura", "Distruzione"],
      uprightMeaning: "La Torre simboleggia la distruzione di ciò che non e piu solido nella tua vita. Anche se il cambiamento e improvviso e doloroso, e necessario per costruire qualcosa di migliore sulle rovine del passato.",
      reversedMeaning: "La Torre invertita suggerisce che stai evitando un cambiamento necessario o che la distruzione e stata ritardata. La tensione sta crescendo e prima o poi si manifesterà.",
      advice: "Accetta il cambiamento anche quando e doloroso. Dalla distruzione nasce la rinascita."
    },
    {
      id: 17, name: "La Stella", symbol: "⭐", number: "XVII",
      uprightKeywords: ["Speranza", "Ispirazione", "Fiducia", "Rinnovamento"],
      reversedKeywords: ["Disperazione", "Mancanza di fiducia", "Solitudine", "Pessimismo"],
      uprightMeaning: "La Stella porta un messaggio di speranza e rinnovamento dopo un periodo difficile. L'universo ti sta guidando verso un futuro migliore. Mantieni la fiducia e lasciati ispirare dalla bellezza della vita.",
      reversedMeaning: "La Stella invertita indica un momento di disperazione o mancanza di fiducia. Potresti sentirti solo e senza speranza. Ricorda che dopo la tempesta arriva sempre la calma.",
      advice: "Mantieni viva la speranza. Le stelle brillano anche nelle notti piu buie."
    },
    {
      id: 18, name: "La Luna", symbol: "🌕", number: "XVIII",
      uprightKeywords: ["Illusione", "Intuizione", "Sogni", "Inconscio"],
      reversedKeywords: ["Chiarezza", "Rivelazione", "Uscita dalla confusione", "Verita"],
      uprightMeaning: "La Luna ti invita a esplorare il mondo dei sogni e dell'inconscio. Le apparenze possono essere ingannevoli, ma la tua intuizione puo guidarti attraverso l'oscurita. Ascolta i segnali del tuo inconscio.",
      reversedMeaning: "La Luna invertita indica un periodo di chiarificazione dopo un momento di confusione. Le verita nascoste stanno emergendo e stai comprendendo meglio la situazione.",
      advice: "Fidati della tua intuizione anche quando le apparenze sono ingannevoli. I sogni possono contenere messaggi importanti."
    },
    {
      id: 19, name: "Il Sole", symbol: "☀️", number: "XIX",
      uprightKeywords: ["Gioia", "Successo", "Vitalita", "Chiarezza"],
      reversedKeywords: ["Tristezza", "Fallimento temporaneo", "Mancanza di energia", "Ottimismo"],
      uprightMeaning: "Il Sole e il simbolo della gioia, del successo e della piena realizzazione. Ti invita a godere dei frutti dei tuoi sforzi e a irradiare positivita. E' il momento di brillare.",
      reversedMeaning: "Il Sole invertito suggerisce un momento di tristezza o mancanza di energia. Il successo potrebbe essere ritardato ma non e negato. Ricorda che anche il sole ha bisogno di riposare.",
      advice: "Brilla con tutta la tua luce. Il successo e la gioia sono tuoi di diritto."
    },
    {
      id: 20, name: "Il Giudizio", symbol: "📯", number: "XX",
      uprightKeywords: ["Rinascita", "Chiamata", "Perdono", "Evaluazione"],
      reversedKeywords: ["Autocritica", "Mancanza di perdono", "Dubbio", "Rinuncia"],
      uprightMeaning: "Il Giudizio ti invita a valutare il tuo percorso e a rispondere alla chiamata della tua anima. E' il momento di perdonare te stesso e gli altri e di iniziare un nuovo capitolo della tua vita.",
      reversedMeaning: "Il Giudizio invertito suggerisce che stai evitando di confrontarti con il passato o che la tua autocritica e troppo severa. E' importante perdonare se stessi e guardare avanti.",
      advice: "Rispondi alla chiamata della tua anima. Il perdono libera e apre la strada a un nuovo inizio."
    },
    {
      id: 21, name: "Il Mondo", symbol: "🌍", number: "XXI",
      uprightKeywords: ["Completezza", "Realizzazione", "Armonia", "Integrazione"],
      reversedKeywords: ["Incompletezza", "Mancanza di chiusura", "Stallo", "Disconnessione"],
      uprightMeaning: "Il Mondo simboleggia il raggiungimento di un obiettivo importante e la completezza di un ciclo. Hai integrato tutte le lezioni e sei pronto per un nuovo livello di esistenza. Celebra i tuoi successi.",
      reversedMeaning: "Il Mondo invertito indica un senso di incompletezza o un mancato raggiungimento di un obiettivo. Potresti sentirti disconnesso o incapace di chiudere un capitolo importante.",
      advice: "Celebra i tuoi successi e preparati a un nuovo ciclo. Ogni completamento e un nuovo inizio."
    }
  ],

  wands: [
    {
      id: "w1", name: "Asso di Bastoni", symbol: "🔥", suit: "Bastoni", number: "I",
      uprightKeywords: ["Inspirazione", "Nuova energia", "Potenza", "Creativita"],
      reversedKeywords: ["Blocco", "Manca di direzione", "Ritardo", "Frustrazione"],
      uprightMeaning: "L'Asso di Bastoni porta una nuova ondata di energia e ispirazione. Un'idea brillante o un'opportunita sta nascendo. E' il momento di agire con passione e determinazione.",
      reversedMeaning: "L'Asso di Bastoni invertito indica un ritardo nei progetti o una mancanza di motivazione. La tua energia e dispersa e non riesci a trovare la direzione giusta.",
      advice: "Cogli l'energia nuova e transfomala in azione concreta. La passione e il carburante del successo."
    },
    {
      id: "w2", name: "Due di Bastoni", symbol: "🔥", suit: "Bastoni", number: "II",
      uprightKeywords: ["Pianificazione", "Scelta", "Visione", "Determinazione"],
      reversedKeywords: ["Incertezza", "Mancanza di visione", "Paura", "Stallo"],
      uprightMeaning: "Il Due di Bastoni ti invita a pianificare i tuoi progetti con attenzione e a scegliere la direzione migliore. Hai una visione chiara di ciò che vuoi raggiungere.",
      reversedMeaning: "Il Due di Bastoni invertito suggerisce che stai avendo difficulty a prendere una decisione o a vedere il quadro completo. Potresti sentirti perso e senza direzione.",
      advice: "Fissa un obiettivo chiaro e crea un piano d'azione. La chiarezza precede l'azione."
    },
    {
      id: "w3", name: "Tre di Bastoni", symbol: "🔥", suit: "Bastoni", number: "III",
      uprightKeywords: ["Espansione", "Lontananza", "Progresso", "Opportunita"],
      reversedKeywords: ["Stallo", "Ritardo", "Mancanza di progresso", "Frustrazione"],
      uprightMeaning: "Il Tre di Bastoni indica un momento di espansione e progresso. I tuoi progetti stanno prendendo forma e si stanno estendendo verso nuove direzioni. E' il momento di guardare lontano.",
      reversedMeaning: "Il Tre di Bastoni invertito suggerisce un ritardo nei piani o un senso di frustrazione per la mancanza di progresso. Potresti sentirti bloccato.",
      advice: "Guarda lontano e non perdere di vista i tuoi obiettivi a lungo termine. Il progresso richiede pazienza."
    },
    {
      id: "w4", name: "Quattro di Bastoni", symbol: "🔥", suit: "Bastoni", number: "IV",
      uprightKeywords: ["Stabilita", "Celebrizione", "Comunità", "Armonia"],
      reversedKeywords: ["Instabilita", "Mancanza di supporto", "Solitudine", "Conflitto"],
      uprightMeaning: "Il Quattro di Bastoni rappresenta la stabilita e la celebrazione di un traguardo raggiunto. E' il momento di godere dei risultati insieme alla tua comunita.",
      reversedMeaning: "Il Quattro di Bastoni invertito indica un periodo di instabilita o mancanza di supporto. Potresti sentirti solo o non apprezzato.",
      advice: "Celebra i successi con le persone care. La stabilita nasce dalle relazioni solide."
    },
    {
      id: "w5", name: "Cinque di Bastoni", symbol: "🔥", suit: "Bastoni", number: "V",
      uprightKeywords: ["Conflitto", "Competizione", "Sfida", "Tensione"],
      reversedKeywords: ["Armonia", "Risoluzione", "Compromesso", "Pace"],
      uprightMeaning: "Il Cinque di Bastoni indica un periodo di conflitto o competizione. Le differenze di opinioni creano tensione, ma possono anche portare a nuove prospettive.",
      reversedMeaning: "Il Cinque di Bastoni invertito suggerisce una risoluzione dei conflitti o un compromesso raggiunto. La tensione si sta dissolvendo.",
      advice: "Affronta i conflitti con coraggio ma anche con apertura. Ogni sfida e un'opportunita di crescita."
    },
    {
      id: "w6", name: "Sei di Bastoni", symbol: "🔥", suit: "Bastoni", number: "VI",
      uprightKeywords: ["Vittoria", "Successo", "Riconoscimento", "Trionfo"],
      reversedKeywords: ["Sconfitta", "Mancanza di riconoscimento", "Arroganza", "Fallimento"],
      uprightMeaning: "Il Sei di Bastoni celebra una vittoria meritata. I tuoi sforzi sono stati riconosciuti e hai raggiunto un traguardo importante. Godi del tuo trionfo.",
      reversedMeaning: "Il Sei di Bastoni invertito indica una sconfitta temporanea o un mancato riconoscimento. Potresti sentirti sottovalutato o non apprezzato.",
      advice: "Godi dei tuoi successi ma resta umile. La vera grandezza sta nella modestia."
    },
    {
      id: "w7", name: "Sette di Bastoni", symbol: "🔥", suit: "Bastoni", number: "VII",
      uprightKeywords: ["Difesa", "Coraggio", "Persistenza", "Determinatione"],
      reversedKeywords: ["Resa", "Fuga", "Mancanza di coraggio", "Debolezza"],
      uprightMeaning: "Il Sette di Bastoni ti invita a difendere le tue posizioni con coraggio e persistenza. Non arrenderti di fronte alle sfide. La tua determinazione sara premiata.",
      reversedMeaning: "Il Sette di Bastoni invertito suggerisce che stai evitando una situazione difficile o che ti stai arrendendo troppo facilmente.",
      advice: "Difendi le tue convinzioni con coraggio. La persistenza vince sempre alla lunga."
    },
    {
      id: "w8", name: "Otto di Bastoni", symbol: "🔥", suit: "Bastoni", number: "VIII",
      uprightKeywords: ["Velocita", "Azione rapida", "Movimento", "Progresso"],
      reversedKeywords: ["Rallentamento", "Frustrazione", "Stallo", "Ritardo"],
      uprightMeaning: "L'Otto di Bastoni indica un periodo di rapido movimento e progresso. Le cose stanno succedendo velocemente e i tuoi progetti stanno avanzando a grande velocita.",
      reversedMeaning: "L'Otto di Bastoni invertito suggerisce un rallentamento o una frustrazione per la mancanza di progresso. Le cose non vanno come speravi.",
      advice: "Sfrutta il momento di azione rapida. Non lasciare che le opportunita ti scappino di mano."
    },
    {
      id: "w9", name: "Nove di Bastoni", symbol: "🔥", suit: "Bastoni", number: "IX",
      uprightKeywords: ["Resilienza", "Forza", "Determinatione", "Coraggio"],
      reversedKeywords: ["Stanchezza", "Frustrazione", "Mancanza di forza", "Resa"],
      uprightMeaning: "Il Nove di Bastoni rappresenta la forza interiore e la capacita di resistere alle avversita. Sei piu forte di quanto pensi e puoi superare ogni ostacolo.",
      reversedMeaning: "Il Nove di Bastoni invertito indica un momento di stanchezza o frustrazione. Potresti sentirti esausto e vicino alla resa.",
      advice: "Ricorda la tua forza interiore. Sei piu forte di quanto credi e puoi superare ogni sfida."
    },
    {
      id: "w10", name: "Dieci di Bastoni", symbol: "🔥", suit: "Bastoni", number: "X",
      uprightKeywords: ["Carico", "Responsabilita", "Fatica", "Sforzo"],
      reversedKeywords: ["Leggera", "Delegazione", "Rilassamento", "Riduzione"],
      uprightMeaning: "Il Dieci di Bastoni indica un momento di grande carico e responsabilita. Potresti sentirti sovraccarico dagli impegni. E' importante imparare a delegare.",
      reversedMeaning: "Il Dieci di Bastoni invertito suggerisce un alleggerimento del carico o una riduzione delle responsabilita. Stai imparando a lasciare andare.",
      advice: "Non caricare tutto sulle tue spalle. Impara a delegare e a condividere il peso."
    },
    {
      id: "w11", name: "Pagina di Bastoni", symbol: "🔥", suit: "Bastoni", number: "Pagina",
      uprightKeywords: ["Entusiasmo", "Curiosita", "Creativita", "Energia"],
      reversedKeywords: ["Mancanza di direzione", "Immaturita", "Distrazione", "Frustrazione"],
      uprightMeaning: "Il Pagina di Bastoni porta un messaggio di entusiasmo e creativita. Una nuova idea o un progetto creativo sta nascendo. E' il momento di esplorare nuove possibilita.",
      reversedMeaning: "Il Pagina di Bastoni invertito indica un mancanza di direzione o un eccesso di entusiasmo senza un piano chiaro.",
      advice: "Canalizza il tuo entusiasmo in un progetto concreto. La creativita ha bisogno di una direzione."
    },
    {
      id: "w12", name: "Cavallo di Bastoni", symbol: "🔥", suit: "Bastoni", number: "Cavallo",
      uprightKeywords: ["Azione", "Energia", "Impeto", "Carisma"],
      reversedKeywords: ["Impulsivita", "Aggressivita", "Mancanza di controllo", "Stallo"],
      uprightMeaning: "Il Cavallo di Bastoni rappresenta un'energia dinamica e un'azione decisa. Sei pronto a lanciarti in nuove avventure con carisma e determinazione.",
      reversedMeaning: "Il Cavallo di Bastoni invertito suggerisce un eccesso di impulsivita o una mancanza di controllo. Le tue azioni potrebbero essere troppo brusche.",
      advice: "Agisci con energia e carisma ma non perdere il controllo. L'impeto deve essere guidato dalla saggezza."
    },
    {
      id: "w13", name: "Regina di Bastoni", symbol: "🔥", suit: "Bastoni", number: "Regina",
      uprightKeywords: ["Fiducia in se stessi", "Indipendenza", "Passione", "Leadership"],
      reversedKeywords: ["Egoismo", "Autocentramento", "Impazienza", "Aggressivita"],
      uprightMeaning: "La Regina di Bastoni incarna la fiducia in se stessi e l'indipendenza. Una donna carismatica e passionale sta guidando la situazione con sicurezza.",
      reversedMeaning: "La Regina di Bastoni invertita indica un eccesso di egoismo o una donna che usa il suo carisma in modo manipolatorio.",
      advice: "Guida con passione e sicurezza. La vera leadership nasce dalla fiducia in se stessi."
    },
    {
      id: "w14", name: "Re di Bastoni", symbol: "🔥", suit: "Bastoni", number: "Re",
      uprightKeywords: ["Visione", "Leadership", "Coraggio", "Successo"],
      reversedKeywords: ["Tirannia", "Arroganza", "Mancanza di visione", "Ambizione"],
      uprightMeaning: "Il Re di Bastoni rappresenta un leader carismatico e visionario. Il tuo coraggio e la tua visione ti porteranno al successo. E' il momento di prendere il comando.",
      reversedMeaning: "Il Re di Bastoni invertito suggerisce un uso improprio del potere o una mancanza di visione. Potresti sentirti minacciato o insicuro.",
      advice: "Guida con visione e integrita. Il vero leader ispira gli altri con il suo esempio."
    }
  ],

  cups: [
    {
      id: "c1", name: "Asso di Coppe", symbol: "🏆", suit: "Coppe", number: "I",
      uprightKeywords: ["Amore", "Nuove emozioni", "Compassione", "Intuizione"],
      reversedKeywords: ["Amore perso", "Emozioni represse", "Disconnessione", "Vuoto"],
      uprightMeaning: "L'Asso di Coppe porta un'onda di nuove emozioni e amore. E' il momento di aprirsi al mondo dei sentimenti e di accogliere la gioia nel tuo cuore.",
      reversedMeaning: "L'Asso di Coppe invertito indica un periodo di disconnessione emotiva o di emozioni represse. Potresti sentirti vuoto o triste.",
      advice: "Apri il tuo cuore alle nuove emozioni. L'amore e la gioia sono sempre a portata di mano."
    },
    {
      id: "c2", name: "Due di Coppe", symbol: "🏆", suit: "Coppe", number: "II",
      uprightKeywords: ["Partnership", "Armonia", "Unione", "Amicizia"],
      reversedKeywords: ["Disharmonia", "Rottura", "Incomprensione", "Solitudine"],
      uprightMeaning: "Il Due di Coppe rappresenta un'unione armoniosa e un partnership equilibrata. E' il momento di coltivare le relazioni e di creare connessioni profonde.",
      reversedMeaning: "Il Due di Coppe invertito indica una disharmonia nelle relazioni o una rottura di un legame importante.",
      advice: "Coltiva le tue relazioni con cura e attenzione. Le connessioni autentiche sono il tesoro piu prezioso."
    },
    {
      id: "c3", name: "Tre di Coppe", symbol: "🏆", suit: "Coppe", number: "III",
      uprightKeywords: ["Celebrizione", "Amicizia", "Gioia", "Comunità"],
      reversedKeywords: ["Isolamento", "Mancanza di gioia", "Tradimento", "Solitudine"],
      uprightMeaning: "Il Tre di Coppe celebra la gioia della comunita e delle amicizie. E' il momento di festeggiare con le persone care e di godere della vita.",
      reversedMeaning: "Il Tre di Coppe invertito indica un periodo di isolamento o di tradimento da parte di amici fidati.",
      advice: "Celebra la vita con le persone care. La gioia condivisa e la gioia piu grande."
    },
    {
      id: "c4", name: "Quattro di Coppe", symbol: "🏆", suit: "Coppe", number: "IV",
      uprightKeywords: ["Apatia", "Mancanza di interesse", "Stanchezza", "Meditazione"],
      reversedKeywords: ["Nuova motivazione", "Riscoperta", "Interesse", "Risveglio"],
      uprightMeaning: "Il Quattro di Coppe indica un momento di apatia o di stanchezza emotiva. Potresti sentirti annoiato o disinteressato alle opportunita che ti circondano.",
      reversedMeaning: "Il Quattro di Coppe invertito suggerisce un risveglio emotivo o una nuova motivazione. Stai riscoprendo l'interesse per la vita.",
      advice: "Riscopri la gioia nelle piccole cose. A volte la felicita e gia davanti a noi, ma non la vediamo."
    },
    {
      id: "c5", name: "Cinque di Coppe", symbol: "🏆", suit: "Coppe", number: "V",
      uprightKeywords: ["Delusione", "Perdita", "Tristezza", "Rimpianto"],
      reversedKeywords: ["Accettazione", "Ricerca", "Superamento", "Speranza"],
      uprightMeaning: "Il Cinque di Coppe rappresenta un momento di delusione e tristezza. Una perdita o un fallimento ti sta causando dolore. E' importante permettersi di piangere.",
      reversedMeaning: "Il Cinque di Coppe invertito indica un periodo di accettazione e superamento del dolore. Stai iniziando a guardare avanti.",
      advice: "Non restare intrappolato nel dolore. Guarda avanti e cerca le opportunita nascoste."
    },
    {
      id: "c6", name: "Sei di Coppe", symbol: "🏆", suit: "Coppe", number: "VI",
      uprightKeywords: ["Nostalgia", "Ricordi", "Innocenza", "Ritorno"],
      reversedKeywords: ["Impossibilita di tornare", "Cambiamento", "Adultita", "Distacco"],
      uprightMeaning: "Il Sei di Coppe evoca ricordi dolci e momenti di nostalgia. Un passato felice ti invita a rivisitare le radici e l'innocenza della giovinezza.",
      reversedMeaning: "Il Sei di Coppe invertito indica l'impossibilita di tornare al passato o la necessita di accettare i cambiamenti.",
      advice: "Ricorda i momenti belli del passato ma non aggrapparti ad essi. Il presente e il dono piu prezioso."
    },
    {
      id: "c7", name: "Sette di Coppe", symbol: "🏆", suit: "Coppe", number: "VII",
      uprightKeywords: ["Illusione", "Fantasia", "Scelta", "Desiderio"],
      reversedKeywords: ["Chiarezza", "Realismo", "Decisione", "Raddrizzamento"],
      uprightMeaning: "Il Sette di Coppe ti invita a distinguere tra realta e fantasia. I tuoi desideri possono creare illusioni che ti distolgono dagli obiettivi reali.",
      reversedMeaning: "Il Sette di Coppe invertito indica un periodo di chiarezza e realismo. Stai comprendendo la differenza tra ciò che vuoi e ciò che hai bisogno.",
      advice: "Distingui tra sogni e realta. Scegli con saggezza tra le molte opportunita che ti si presentano."
    },
    {
      id: "c8", name: "Otto di Coppe", symbol: "🏆", suit: "Coppe", number: "VIII",
      uprightKeywords: ["Abbandono", "Ricerca", "Allontanamento", "Cambiamento"],
      reversedKeywords: ["Stallo", "Mancanza di coraggio", "Rimpianto", "Paura"],
      uprightMeaning: "L'Otto di Coppe ti invita a lasciare andare ciò che non ti serve piu e a cercare nuove strade. E' il momento di abbandonare il passato e di avventurarti nell'ignoto.",
      reversedMeaning: "L'Otto di Coppe invertito suggerisce che stai resistendo al cambiamento o che non hai il coraggio di lasciare andare.",
      advice: "Lascia andare ciò che non ti serve piu. Il cambiamento e la porta verso nuove opportunita."
    },
    {
      id: "c9", name: "Nove di Coppe", symbol: "🏆", suit: "Coppe", number: "IX",
      uprightKeywords: ["Soddisfazione", "Realizzazione", "Gioia", "Compiacimento"],
      reversedKeywords: ["Insoddisfazione", "Vuoto", "Mancanza", "Delusione"],
      uprightMeaning: "Il Nove di Coppe celebra la realizzazione di un desiderio. La tua vita e piena di gioia e soddisfazione. Godi dei frutti della tua dedizione.",
      reversedMeaning: "Il Nove di Coppe invertito indica un periodo di insoddisfazione o di vuoto interiore. Anche quando tutto sembra perfetto, qualcosa manca.",
      advice: "Godi dei tuoi successi ma non fermarti. La vera felicita non e nell'avere, ma nell'essere."
    },
    {
      id: "c10", name: "Dieci di Coppe", symbol: "🏆", suit: "Coppe", number: "X",
      uprightKeywords: ["Felicità familiare", "Armonia", "Piena realizzazione", "Amore"],
      reversedKeywords: ["Disharmonia familiare", "Separazione", "Mancanza di amore", "Conflitto"],
      uprightMeaning: "Il Dieci di Coppe rappresenta la felicita familiare e la piena realizzazione emotiva. E' il momento di godere dell'armonia e dell'amore delle persone care.",
      reversedMeaning: "Il Dieci di Coppe invertito indica un periodo di disharmonia familiare o di conflitti nelle relazioni.",
      advice: "Cura le relazioni familiari con amore e pazienza. La famiglia e il fondamento della felicita."
    },
    {
      id: "c11", name: "Pagina di Coppe", symbol: "🏆", suit: "Coppe", number: "Pagina",
      uprightKeywords: ["Sensibilita", "Intuizione", "Gentilezza", "Compassione"],
      reversedKeywords: ["Immaturita emotiva", "Sensibilita eccessiva", "Dipendenza", "Naivete"],
      uprightMeaning: "Il Pagina di Coppe porta un messaggio di sensibilita e intuizione. Una persona sensibile e gentile sta entrando nella tua vita.",
      reversedMeaning: "Il Pagina di Coppe invertito indica un'immaturita emotiva o una sensibilita eccessiva che ti rende vulnerabile.",
      advice: "Sii gentile con te stesso e con gli altri. La sensibilita e una forza, non una debolezza."
    },
    {
      id: "c12", name: "Cavallo di Coppe", symbol: "🏆", suit: "Coppe", number: "Cavallo",
      uprightKeywords: ["Romanticismo", "Charm", "Immaginazione", "Sogni"],
      reversedKeywords: ["Idealismo", "Delusione", "Inconstanza", "Superficialita"],
      uprightMeaning: "Il Cavallo di Coppe rappresenta il romanticismo e la capacita di sognare ad occhi aperti. Un messaggio d'amore o un'ispirazione artistica sta arrivando.",
      reversedMeaning: "Il Cavallo di Coppe invertito suggerisce un idealismo eccessivo o una delusione romantica.",
      advice: "Lasciati ispirare dai sogni ma resta ancorato alla realta. L'ispirazione e la scintilla della creativita."
    },
    {
      id: "c13", name: "Regina di Coppe", symbol: "🏆", suit: "Coppe", number: "Regina",
      uprightKeywords: ["Empatia", "Compassione", "Intuizione", "Amore"],
      reversedKeywords: ["Dipendenza emotiva", "Manipolazione", "Instabilita", "Histrionismo"],
      uprightMeaning: "La Regina di Coppe incarna l'empatia e la compassione. Una donna sensibile e intuitiva ti guida con il suo amore incondizionato.",
      reversedMeaning: "La Regina di Coppe invertita indica una dipendenza emotiva o una manipolazione attraverso le emozioni.",
      advice: "Guida con empatia e compassione. L'amore incondizionato e la forza piu grande."
    },
    {
      id: "c14", name: "Re di Coppe", symbol: "🏆", suit: "Coppe", number: "Re",
      uprightKeywords: ["Equilibrio emotivo", "Saggezza", "Compassione", "Stabilita"],
      reversedKeywords: ["Instabilita emotiva", "Freddo", "Manipolazione", "Ipocrisia"],
      uprightMeaning: "Il Re di Coppe rappresenta l'equilibrio emotivo e la saggezza sentimentale. Un uomo empatico e compassionevole sta guidando la situazione.",
      reversedMeaning: "Il Re di Coppe invertito suggerisce un'instabilita emotiva o un uomo che nasconde i suoi sentimenti.",
      advice: "Mantieni l'equilibrio emotivo e guida con saggezza. La vera forza sta nella compassione."
    }
  ],

  swords: [
    {
      id: "s1", name: "Asso di Spade", symbol: "🗡️", suit: "Spade", number: "I",
      uprightKeywords: ["Chiarezza", "Verita", "Nuova idea", "Decisione"],
      reversedKeywords: ["Confusione", "Brutalita", "Disonesta", "Dolore"],
      uprightMeaning: "L'Asso di Spade porta chiarezza mentale e una nuova comprensione. E' il momento di prendere una decisione importante basata sulla verita e sulla logica.",
      reversedMeaning: "L'Asso di Spade invertito indica confusione mentale o una verita dolorosa. Le tue parole potrebbero ferire qualcuno.",
      advice: "Usa la chiarezza mentale per prendere decisioni sagge. La verita, anche quando fa male, libera."
    },
    {
      id: "s2", name: "Due di Spade", symbol: "🗡️", suit: "Spade", number: "II",
      uprightKeywords: ["Indecisione", "Bilanciamento", "Scelta difficile", "Pausa"],
      reversedKeywords: ["Decisone", "Risoluzione", "Chiarezza", "Azione"],
      uprightMeaning: "Il Due di Spade indica un momento di indecisione e la necessita di prendere una scelta difficile. E' importante prendersi una pausa prima di agire.",
      reversedMeaning: "Il Due di Spade invertito suggerisce che stai per prendere una decisione o che la chiarezta sta arrivando.",
      advice: "Prenditi il tempo necessario per decidere. Le decisioni affrettate portano a errori."
    },
    {
      id: "s3", name: "Tre di Spade", symbol: "🗡️", suit: "Spade", number: "III",
      uprightKeywords: ["Dolore", "Tradimento", "Delusione", "Rottura"],
      reversedKeywords: ["Recupero", "Perdono", "Guarigione", "Speranza"],
      uprightMeaning: "Il Tre di Spade rappresenta un momento di dolore profondo causato da un tradimento o una delusione. E' importante permettersi di piangere e di elaborare il lutto.",
      reversedMeaning: "Il Tre di Spade invertito indica un periodo di guarigione e recupero dopo un periodo difficile.",
      advice: "Il dolore e parte del cammino. Lasciati piangere, ma non restare nel dolore per sempre."
    },
    {
      id: "s4", name: "Quattro di Spade", symbol: "🗡️", suit: "Spade", number: "IV",
      uprightKeywords: ["Riposo", "Meditazione", "Recupero", "Pausa"],
      reversedKeywords: ["Agitazione", "Inquietudine", "Ripresa", "Energia"],
      uprightMeaning: "Il Quattro di Spade ti invita a prenderti una pausa per riposare e ricaricare le energie. Il corpo e la mente hanno bisogno di riposo.",
      reversedMeaning: "Il Quattro di Spade invertito suggerisce che sei pronto per riprendere l'attivita dopo un periodo di pausa.",
      advice: "Dai al tuo corpo e alla tua mente il riposo che meritano. Il recupero e fondamentale per la crescita."
    },
    {
      id: "s5", name: "Cinque di Spade", symbol: "🗡️", suit: "Spade", number: "V",
      uprightKeywords: ["Conflitto", "Sconfitta", "Dishonore", "Vittoria"],
      reversedKeywords: ["Armonia", "Riconciliazione", "Compromesso", "Perdono"],
      uprightMeaning: "Il Cinque di Spade indica un conflitto in cui qualcuno vince e qualcuno perde. E' importante valutare se la vittoria ne vale la pena.",
      reversedMeaning: "Il Cinque di Spade invertito suggerisce una riconciliazione o un compromesso dopo un conflitto.",
      advice: "Scegli le tue battaglie con saggezza. Non tutte le vittorie meritano il prezzo del conflitto."
    },
    {
      id: "s6", name: "Sei di Spade", symbol: "🗡️", suit: "Spade", number: "VI",
      uprightKeywords: ["Transizione", "Cambiamento", "Abbandono", "Viaggio"],
      reversedKeywords: ["Stallo", "Impossibilita di andare", "Blocco", "Resistenza"],
      uprightMeaning: "Il Sei di Spade rappresenta una transizione necessaria. Stai lasciando il passato alle spalle e muovendoti verso un futuro migliore.",
      reversedMeaning: "Il Sei di Spade invertito indica un senso di stallo o l'impossibilita di andare avanti. Potresti sentirti bloccato.",
      advice: "Accetta la transizione con grazia. Ogni cambiamento porta con sè nuove opportunita."
    },
    {
      id: "s7", name: "Sette di Spade", symbol: "🗡️", suit: "Spade", number: "VII",
      uprightKeywords: ["Inganno", "Furberia", "Strategia", "Segreto"],
      reversedKeywords: ["Verita", "Svelamento", "Onesta", "Riconciliazione"],
      uprightMeaning: "Il Sette di Spade ti invita a usare la strategia e l'intelligenza per raggiungere i tuoi obiettivi. A volte e necessario essere furbi.",
      reversedMeaning: "Il Sette di Spade invertito indica che un segreto sta per essere svelato o che un inganno e stato scoperto.",
      advice: "Usa l'intelligenza ma mantieni l'integrita. Le strategie furbe possono ritorcersi contro."
    },
    {
      id: "s8", name: "Otto di Spade", symbol: "🗡️", suit: "Spade", number: "VIII",
      uprightKeywords: ["Prigionia", "Restrizione", "Paura", "Isolamento"],
      reversedKeywords: ["Liberazione", "Rottura di catene", "Chiarezza", "Risveglio"],
      uprightMeaning: "L'Otto di Spade rappresenta una situazione di prigionia o restrizione. Le tue paure ti stanno impedendo di vedere le possibilita che ti circondano.",
      reversedMeaning: "L'Otto di Spade invertito indica un periodo di liberazione o di rottura delle catene invisibili che ti tenevano prigioniero.",
      advice: "Riconosci che le catene che ti imprigionano sono spesso create dalla tua mente. La liberta inizia dalla consapevolezza."
    },
    {
      id: "s9", name: "Nove di Spade", symbol: "🗡️", suit: "Spade", number: "IX",
      uprightKeywords: ["Ansia", "Paura", "Insonnia", "Preoccupazione"],
      reversedKeywords: ["Speranza", "Rilassamento", "Risoluzione", "Pace"],
      uprightMeaning: "Il Nove di Spade rappresenta un periodo di ansia e preoccupazione. I tuoi timori stanno causando sofferenza interiore. E' importante affrontarli.",
      reversedMeaning: "Il Nove di Spade invertito indica un periodo di speranza e rilassamento dopo un momento di ansia.",
      advice: "Non lasciare che le tue paure ti dominino. Affrontale con coraggio e troverai la pace."
    },
    {
      id: "s10", name: "Dieci di Spade", symbol: "🗡️", suit: "Spade", number: "X",
      uprightKeywords: ["Fine", "Rovina", "Dolore", "Tradimento"],
      reversedKeywords: ["Rinascita", "Nuovo inizio", "Speranza", "Recupero"],
      uprightMeaning: "Il Dieci di Spade indica la fine di un ciclo doloroso. Anche se il dolore e intenso, e importante ricordare che dopo la notte viene sempre il giorno.",
      reversedMeaning: "Il Dieci di Spade invertito suggerisce una rinascita o un nuovo inizio dopo un periodo di sofferenza.",
      advice: "Ricorda che dopo il dolore piu profondo arriva la rinascita. Ogni fine e un nuovo inizio."
    },
    {
      id: "s11", name: "Pagina di Spade", symbol: "🗡️", suit: "Spade", number: "Pagina",
      uprightKeywords: ["Curiosita", "Intelligenza", "Verita", "Comunicazione"],
      reversedKeywords: ["Maldicenza", "Cattiveria", "Brutalita", "Immaginazione negativa"],
      uprightMeaning: "Il Pagina di Spade porta un messaggio di verita e intelligenza. Una mente acuta e curiosa sta cercando la verità.",
      reversedMeaning: "Il Pagina di Spade invertito indica un uso sbagliato dell'intelligenza o la tendenza alle maldicenze.",
      advice: "Usa la tua intelligenza per cercare la verita, non per ferire gli altri."
    },
    {
      id: "s12", name: "Cavallo di Spade", symbol: "🗡️", suit: "Spade", number: "Cavallo",
      uprightKeywords: ["Ambizione", "Velocita", "Audacia", "Cambiamento"],
      reversedKeywords: ["Aggressivita", "Brutalita", "Mancanza di direzione", "Stallo"],
      uprightMeaning: "Il Cavallo di Spade rappresenta un'ambizione audace e un cambiamento rapido. Sei pronto a lanciarti in nuove avventure con determinazione.",
      reversedMeaning: "Il Cavallo di Spade invertito suggerisce un eccesso di aggressivita o una mancanza di direzione.",
      advice: "Avanza con audacia ma non perdere la direzione. L'ambizione deve essere guidata dalla saggezza."
    },
    {
      id: "s13", name: "Regina di Spade", symbol: "🗡️", suit: "Spade", number: "Regina",
      uprightKeywords: ["Indipendenza", "Chiarezza", "Verita", "Intelletto"],
      reversedKeywords: ["Gelosia", "Cattiveria", "Freddo", "Rigidita"],
      uprightMeaning: "La Regina di Spade incarna l'indipendenza e la chiarezza mentale. Una donna intelligente e diretta sta guidando la situazione con lucidita.",
      reversedMeaning: "La Regina di Spade invertita indica una donna fredda e calcolatrice che usa l'intelletto in modo manipolatorio.",
      advice: "Usa la tua intelligenza con integrita. La verita e una lama a doppio taglio."
    },
    {
      id: "s14", name: "Re di Spade", symbol: "🗡️", suit: "Spade", number: "Re",
      uprightKeywords: ["Autorita", "Verita", "Giustizia", "Intelletto"],
      reversedKeywords: ["Tirannia", "Crudelta", "Manipolazione", "Disonesta"],
      uprightMeaning: "Il Re di Spade rappresenta l'autorita mentale e la giustizia. Un uomo intelligente e giusto sta guidando la situazione con lucidita.",
      reversedMeaning: "Il Re di Spade invertito suggerisce un uomo crudele e manipolatorio che usa il potere in modo improprio.",
      advice: "Guida con verita e giustizia. L'intelletto deve essere al servizio del bene comune."
    }
  ],

  pentacles: [
    {
      id: "p1", name: "Asso di Denari", symbol: "💰", suit: "Denari", number: "I",
      uprightKeywords: ["Nuova opportunita", "Abbodanza", "Prosperita", "Sicurezza"],
      reversedKeywords: ["Mancanza", "Instabilita", "Golosita", "Materilismo"],
      uprightMeaning: "L'Asso di Denari apre le porte all'abbondanza e alla prosperita. Una nuova opportunita finanziaria o materiale sta arrivando. E' il momento di coglierla.",
      reversedMeaning: "L'Asso di Denari invertito indica un periodo di mancanza o instabilita finanziaria. Potresti sentirti insicuro riguardo al futuro.",
      advice: "Accogli le opportunita con apertura e gratitudine. L'abbondanza e un diritto di tutti."
    },
    {
      id: "p2", name: "Due di Denari", symbol: "💰", suit: "Denari", number: "II",
      uprightKeywords: ["Bilanciamento", "Flessibilita", "Multitasking", "Adattabilita"],
      reversedKeywords: ["Squilibrio", "Ipocrisia", "Difficolta", "Stallo"],
      uprightMeaning: "Il Due di Denari ti invita a bilanciare le diverse aree della tua vita con flessibilita. La gestione delle risorse richiede adattabilita.",
      reversedMeaning: "Il Due di Denari invertito indica un senso di squilibrio o difficolta nel gestire le responsabilita.",
      advice: "Mantieni l'equilibrio tra le diverse aree della tua vita. La flessibilita e la chiave della gestione."
    },
    {
      id: "p3", name: "Tre di Denari", symbol: "💰", suit: "Denari", number: "III",
      uprightKeywords: ["Competenza", "Lavoro di squadra", "Collaborazione", "Successo"],
      reversedKeywords: ["Mancanza di competenza", "Conflitto", "Maldicenza", "Fallimento"],
      uprightMeaning: "Il Tre di Denari rappresenta la competenza e il lavoro di squadra. I tuoi sforzi combinati con quelli degli altri porteranno al successo.",
      reversedMeaning: "Il Tre di Denari invertito indica un conflitto nel team o una mancanza di competenza che impedisce il successo.",
      advice: "Collabora con gli altri e condividi le tue competenze. Il lavoro di squadra moltiplica i risultati."
    },
    {
      id: "p4", name: "Quattro di Denari", symbol: "💰", suit: "Denari", number: "IV",
      uprightKeywords: ["Stabilita", "Sicurezza", "Conservazione", "Prudenza"],
      reversedKeywords: ["Avarizia", "Mancanza", "Spreco", "Generosita"],
      uprightMeaning: "Il Quattro di Denari indica un momento di stabilita e sicurezza materiale. E' importante conservare le risorse e essere prudenti.",
      reversedMeaning: "Il Quattro di Denari invertito suggerisce un eccesso di avarizia o una mancanza di generosita.",
      advice: "Mantieni la stabilita ma non essere avaro. La generosita attira l'abbondanza."
    },
    {
      id: "p5", name: "Cinque di Denari", symbol: "💰", suit: "Denari", number: "V",
      uprightKeywords: ["Mancanza", "Poverta", "Preoccupazione", "Solitudine"],
      reversedKeywords: ["Recupero", "Speranza", "Risorse nascoste", "Guarigione"],
      uprightMeaning: "Il Cinque di Denari rappresenta un momento di mancanza e preoccupazione materiale. Le risorse sembrano scarse e la situazione e difficile.",
      reversedMeaning: "Il Cinque di Denari invertito indica un periodo di recupero o di scoperta di risorse nascoste.",
      advice: "Non perdere la speranza nelle difficoltà. Le risorse nascoste possono emergere nei momenti piu difficili."
    },
    {
      id: "p6", name: "Sei di Denari", symbol: "💰", suit: "Denari", number: "VI",
      uprightKeywords: ["Generosita", "Carita", "Equita", "Condivisione"],
      reversedKeywords: ["Avarizia", "Debiti", "Inequita", "Mancanza"],
      uprightMeaning: "Il Sei di Denari celebra la generosita e la condivisione delle risorse. E' il momento di aiutare gli altri e di creare equita.",
      reversedMeaning: "Il Sei di Denari invertito indica un periodo di avarizia o di iniquita nella distribuzione delle risorse.",
      advice: "Condividi le tue risorse con generosita. La carita torna sempre sotto forma di benedizione."
    },
    {
      id: "p7", name: "Sette di Denari", symbol: "💰", suit: "Denari", number: "VII",
      uprightKeywords: ["Pazienza", "Lavoro costante", "Investimento", "Risultati"],
      reversedKeywords: ["Impazienza", "Mancanza di risultati", "Spreco", "Fallimento"],
      uprightMeaning: "Il Sette di Denari ti invita ad avere pazienza e a continuare a lavorare costantemente verso i tuoi obiettivi. I risultati arriveranno.",
      reversedMeaning: "Il Sette di Denari invertito indica impazienza o una mancanza di risultati nonostante gli sforzi.",
      advice: "Hai pazienza e continua a lavorare. I risultati arriveranno con il tempo e la costanza."
    },
    {
      id: "p8", name: "Otto di Denari", symbol: "💰", suit: "Denari", number: "VIII",
      uprightKeywords: ["Competenza", "Maestria", "Dedizione", "Apprendimento"],
      reversedKeywords: ["Mancanza di competenza", "Negligenza", "Stallo", "Pigrizia"],
      uprightMeaning: "L'Otto di Denari rappresenta la maestria e la dedizione nel lavoro. I tuoi sforzi e la tua competenza saranno premiati.",
      reversedMeaning: "L'Otto di Denari invertito indica una mancanza di competenza o negligenza nel lavoro.",
      advice: "Dedicati con passione al tuo lavoro. La competenza e il risultato della pratica costante."
    },
    {
      id: "p9", name: "Nove di Denari", symbol: "💰", suit: "Denari", number: "IX",
      uprightKeywords: ["Prosperita", "Indipendenza", "Lusso", "Successo"],
      reversedKeywords: ["Mancanza", "Dipendenza", "Spreco", "Ingratitudine"],
      uprightMeaning: "Il Nove di Denari celebra la prosperita e l'indipendenza finanziaria. I tuoi sforzi sono stati premiati e godi dei frutti del tuo lavoro.",
      reversedMeaning: "Il Nove di Denari invertito indica un periodo di mancanza o dipendenza finanziaria.",
      advice: "Godi della prosperita ma non dimenticare la gratitudine. L'indipendenza e un tesoro da custodire."
    },
    {
      id: "p10", name: "Dieci di Denari", symbol: "💰", suit: "Denari", number: "X",
      uprightKeywords: ["Ricchezza", "Famiglia", "Eredita", "Stabilita"],
      reversedKeywords: ["Mancanza", "Perdita", "Instabilita", "Disconnessione"],
      uprightMeaning: "Il Dieci di Denari rappresenta la ricchezza e la stabilita familiare. E' il momento di godere dell'abbondanza e della sicurezza materiale.",
      reversedMeaning: "Il Dieci di Denari invertito indica un periodo di mancanza o perdita materiale. La stabilita familiare e minacciata.",
      advice: "Custodisci la ricchezza e la stabilita familiare. La vera ricchezza e nelle relazioni."
    },
    {
      id: "p11", name: "Pagina di Denari", symbol: "💰", suit: "Denari", number: "Pagina",
      uprightKeywords: ["Studioso", "Praticita", "Dedizione", "Apprendimento"],
      reversedKeywords: ["Immaturita", "Negligenza", "Pigrizia", "Mancanza di direzione"],
      uprightMeaning: "Il Pagina di Denari rappresenta lo studio e la dedicazione all'apprendimento. Una nuova opportunita di crescita materiale sta arrivando.",
      reversedMeaning: "Il Pagina di Denari invertito indica un'immaturita o una mancanza di dedizione nello studio o nel lavoro.",
      advice: "Dedicati all'apprendimento con costanza. La competenza si costruisce giorno per giorno."
    },
    {
      id: "p12", name: "Cavallo di Denari", symbol: "💰", suit: "Denari", number: "Cavallo",
      uprightKeywords: ["Lavoro", "Dedizione", "Costanza", "Progresso"],
      reversedKeywords: ["Mancanza di progresso", "Stallo", "Pigrizia", "Difficolta"],
      uprightMeaning: "Il Cavallo di Denari rappresenta il lavoro costante e la dedizione. I tuoi sforzi stanno portando a risultati concreti.",
      reversedMeaning: "Il Cavallo di Denari invertito indica un periodo di stallo o mancanza di progresso nel lavoro.",
      advice: "Continua a lavorare con costanza. I risultati concreti arrivano con la dedizione."
    },
    {
      id: "p13", name: "Regina di Denari", symbol: "💰", suit: "Denari", number: "Regina",
      uprightKeywords: ["Praticita", "Generosita", "Sicurezza", "Accoglienza"],
      reversedKeywords: ["Avarizia", "Mancanza", "Egoismo", "Dipendenza"],
      uprightMeaning: "La Regina di Denari incarna la praticita e la generosita. Una donna affidabile e accogliente ti supporta con le sue risorse.",
      reversedMeaning: "La Regina di Denari invertita indica un'eccesso di attaccamento alle risorse o una mancanza di generosita.",
      advice: "Condividi le tue risorse con generosita. La vera ricchezza sta nel dare."
    },
    {
      id: "p14", name: "Re di Denari", symbol: "💰", suit: "Denari", number: "Re",
      uprightKeywords: ["Successo", "Sicurezza", "Saggezza finanziaria", "Stabilita"],
      reversedKeywords: ["Avarizia", "Mancanza", "Corruzione", "Materilismo"],
      uprightMeaning: "Il Re di Denari rappresenta il successo finanziario e la saggezza nella gestione delle risorse. Un uomo affidabile e prospero ti guida.",
      reversedMeaning: "Il Re di Denari invertito suggerisce un eccesso di attaccamento al materiale o una corruzione nella gestione delle risorse.",
      advice: "Gestisci le tue risorse con saggezza e integrita. La vera prosperita e un bene per tutti."
    }
  ]
};

const SPREAD_POSITIONS = {
  tri: ["Passato", "Presente", "Futuro"],
  singola: ["Il tuo consiglio"],
  celtic: [
    "Situazione attuale", "Sfida", "Passato remoto",
    "Possibile futuro", "Situazione consapevole", "Situazione inconscia",
    "Consiglio", "Ambiente", "Speranze e timori", "Esito finale"
  ],
  amore: [
    "Tu", "Il/Lei", "La relazione",
    "I desideri", "Il possibile futuro"
  ],
  carriera: [
    "La situazione", "Le sfide", "Le tue abilita",
    "Le opportunita", "Il risultato probabile"
  ],
  siNo: [
    "La situazione", "L'influenza nascosta", "Il risultato probabile"
  ]
};

const CARD_IMAGES = {
  major: [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/250px-RWS_Tarot_00_Fool.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/RWS_Tarot_01_Magician.jpg/250px-RWS_Tarot_01_Magician.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/250px-RWS_Tarot_02_High_Priestess.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/RWS_Tarot_03_Empress.jpg/250px-RWS_Tarot_03_Empress.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/250px-RWS_Tarot_04_Emperor.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/RWS_Tarot_05_Hierophant.jpg/250px-RWS_Tarot_05_Hierophant.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/RWS_Tarot_06_Lovers.jpg/250px-RWS_Tarot_06_Lovers.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/RWS_Tarot_07_Chariot.jpg/250px-RWS_Tarot_07_Chariot.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/RWS_Tarot_08_Strength.jpg/250px-RWS_Tarot_08_Strength.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/RWS_Tarot_09_Hermit.jpg/250px-RWS_Tarot_09_Hermit.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg/250px-RWS_Tarot_10_Wheel_of_Fortune.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/RWS_Tarot_11_Justice.jpg/250px-RWS_Tarot_11_Justice.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/RWS_Tarot_12_Hanged_Man.jpg/250px-RWS_Tarot_12_Hanged_Man.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/RWS_Tarot_13_Death.jpg/250px-RWS_Tarot_13_Death.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/RWS_Tarot_14_Temperance.jpg/250px-RWS_Tarot_14_Temperance.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/RWS_Tarot_15_Devil.jpg/250px-RWS_Tarot_15_Devil.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_16_Tower.jpg/250px-RWS_Tarot_16_Tower.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/RWS_Tarot_17_Star.jpg/250px-RWS_Tarot_17_Star.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/RWS_Tarot_18_Moon.jpg/250px-RWS_Tarot_18_Moon.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/RWS_Tarot_19_Sun.jpg/250px-RWS_Tarot_19_Sun.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/RWS_Tarot_20_Judgement.jpg/250px-RWS_Tarot_20_Judgement.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/RWS_Tarot_21_World.jpg/250px-RWS_Tarot_21_World.jpg"
  ],
  wands: [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Wands01.jpg/250px-Wands01.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Wands02.jpg/250px-Wands02.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Wands03.jpg/250px-Wands03.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Wands04.jpg/250px-Wands04.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Wands05.jpg/250px-Wands05.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Wands06.jpg/250px-Wands06.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Wands07.jpg/250px-Wands07.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Wands08.jpg/250px-Wands08.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Wands09.jpg/250px-Wands09.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Wands10.jpg/250px-Wands10.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Wands11.jpg/250px-Wands11.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Wands12.jpg/250px-Wands12.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Wands13.jpg/250px-Wands13.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Wands14.jpg/250px-Wands14.jpg"
  ],
  cups: [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cups01.jpg/250px-Cups01.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Cups02.jpg/250px-Cups02.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Cups03.jpg/250px-Cups03.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Cups04.jpg/250px-Cups04.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Cups05.jpg/250px-Cups05.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Cups06.jpg/250px-Cups06.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Cups07.jpg/250px-Cups07.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Cups08.jpg/250px-Cups08.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Cups09.jpg/250px-Cups09.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Cups10.jpg/250px-Cups10.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Cups11.jpg/250px-Cups11.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Cups12.jpg/250px-Cups12.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Cups13.jpg/250px-Cups13.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Cups14.jpg/250px-Cups14.jpg"
  ],
  swords: [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Swords01.jpg/250px-Swords01.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Swords02.jpg/250px-Swords02.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Swords03.jpg/250px-Swords03.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Swords04.jpg/250px-Swords04.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Swords05.jpg/250px-Swords05.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Swords06.jpg/250px-Swords06.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Swords07.jpg/250px-Swords07.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Swords08.jpg/250px-Swords08.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Swords09.jpg/250px-Swords09.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Swords10.jpg/250px-Swords10.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Swords11.jpg/250px-Swords11.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Swords12.jpg/250px-Swords12.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Swords13.jpg/250px-Swords13.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Swords14.jpg/250px-Swords14.jpg"
  ],
  pentacles: [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Pents01.jpg/250px-Pents01.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Pents02.jpg/250px-Pents02.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Pents03.jpg/250px-Pents03.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Pents04.jpg/250px-Pents04.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Pents05.jpg/250px-Pents05.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Pents06.jpg/250px-Pents06.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Pents07.jpg/250px-Pents07.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Pents08.jpg/250px-Pents08.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Pents09.jpg/250px-Pents09.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Pents10.jpg/250px-Pents10.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Pents11.jpg/250px-Pents11.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Pents12.jpg/250px-Pents12.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Pents13.jpg/250px-Pents13.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/250px-Pents14.jpg"
  ]
};

function getCardImage(card) {
  const groupKey = card.suit ? {
    "Bastoni": "wands",
    "Coppe": "cups",
    "Spade": "swords",
    "Denari": "pentacles"
  }[card.suit] : "major";

  const images = CARD_IMAGES[groupKey];
  if (!images) return null;

  if (groupKey === "major") {
    return images[card.id] || null;
  } else {
    const romanToIndex = { "I": 0, "II": 1, "III": 2, "IV": 3, "V": 4, "VI": 5, "VII": 6, "VIII": 7, "IX": 8, "X": 9, "Pagina": 10, "Cavallo": 11, "Regina": 12, "Re": 13 };
    const minorIndex = romanToIndex[card.number] !== undefined ? romanToIndex[card.number] : 0;
    return images[minorIndex] || null;
  }
}
