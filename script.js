// === GALAXY DATA ===
const galaxyData = {
  milkyway: {
    name: "Via Lattea",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1280px-ESO-VLT-Laser-phot-33a-07.jpg",
    type: "Spirale barrata (SBbc)",
    dist: "Nostra galassia (0 anni luce)",
    diametro: "~100.000 anni luce",
    stelle: "100 - 400 miliardi",
    desc: `La Via Lattea &egrave; la galassia che ospita il nostro Sistema Solare. Il nome deriva dall'aspetto luminoso e nebbioso che presenta a occhio nudo nel cielo notturno, simile a una "via di latte". La Terra si trova nel Braccio di Orione, a circa 26.000 anni luce dal centro galattico.`,
    history: `Il nome "Via Lattea" risale ai tempi dei Greci e Romani, che associavano questa striscia luminosa nel cielo a una "via" percorsa da animali o dagli dei. Nel 1610, Galileo dimostrò che la Via Lattea &egrave; composta da innumerevoli stelle. Solo nel 1924 Edwin Hubble dimostrò che la Via Lattea non &egrave; l'unica galassia nell'universo.`,
    facts: [
      "Il centro galattico ospita un buco nero supermassiccio chiamato Sagittarius A* (Sgr A*)",
      "La Via Lattea ha una forma a barra centrale con brazi spiraliformi",
      "La velocit&agrave; orbitale del Sole &egrave; di circa 230 km/s",
      "La galassia ruota su se stessa in circa 225-250 milioni di anni (un anno galattico)"
    ]
  },
  andromeda: {
    name: "Galassia di Andromeda (M31)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andromeda_Galaxy_560mm_FL.jpg/1280px-Andromeda_Galaxy_560mm_FL.jpg",
    type: "Spirale (SA(s)b)",
    dist: "2,537 milioni di anni luce",
    diametro: "~220.000 anni luce",
    stelle: "~1 trilione",
    desc: `La Galassia di Andromeda (M31) &egrave; la galassia pi&ugrave; grande nel Gruppo Locale e la pi&ugrave; vicina alla Via Lattea. &Egrave; visibile a occhio nudo come un'alone ovale nella costellazione di Andromeda. Contiene pi&ugrave; di 450 ammassi stellari e un buco nero supermassiccio al centro.`,
    history: `Descritta per la prima volta da Abd al-Rahman al-Sufi nel 964 d.C. come una "nebulosa piccola", fu Hubble nel 1923 a misurarne la distanza usando le Cefeidi, dimostrando che si tratta di una galassia separata. Si avvicina alla Via Lattea a circa 110 km/s e si fonder&agrave; con essa tra circa 4,5 miliardi di anni.`,
    facts: [
      "E' la galassia pi&ugrave; grande visibile a occhio nudo",
      "Ha circa 450 ammassi stellari nel suo alone",
      "Il suo buco nero supermassiccio ha circa 230 milioni di masse solari",
      "Si fonder&agrave; con la Via Lattea formando 'Milkomeda'"
    ]
  },
  triangolo: {
    name: "Galassia del Triangolo (M33)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Triangulum_Galaxy_M33_Scubi.jpg/1280px-Triangulum_Galaxy_M33_Scubi.jpg",
    type: "Spirale (SA(s)cd)",
    dist: "2,73 milioni di anni luce",
    diametro: "~60.000 anni luce",
    stelle: "~40 miliardi",
    desc: `La Galassia del Triangolo (M33) &egrave; la terza galassia pi&ugrave; grande del Gruppo Locale, dopo Andromeda e la Via Lattea. Ha una struttura spirale debole e contiene regioni di formazione stellare molto attive, in particolare NGC 604, una delle pi&ugrave; grandi regioni H II conosciute.`,
    history: `Scoperta da Giovanni Battista Hodierna prima del 1654, fu indipendentemente riscoperta da Charles Messier nel 1764 e catalogata come M33. La galassia &egrave; il terzo membro pi&ugrave; grande del Gruppo Locale e potrebbe essere un satellite di Andromeda o in orbita indipendente.`,
    facts: [
      "NGC 604 &egrave; una delle regioni di formazione stellare pi&ugrave; grandi note",
      "Ha un diametro di circa 60.000 anni luce",
      "E' visibile a occhio nudo in condizioni di cielo perfetto",
      "Contiene circa 40 miliardi di stelle"
    ]
  },
  sombrero: {
    name: "Galassia del Sombrero (M104)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sombrero_Galaxy_560mm_FL.jpg/1280px-Sombrero_Galaxy_560mm_FL.jpg",
    type: "Spirale barrata (SA(s)a)",
    dist: "29,35 milioni di anni luce",
    diametro: "~50.000 anni luce",
    stelle: "~100 miliardi",
    desc: `La Galassia del Sombrero (M104) &egrave; una galassia spirale nella costellazione della Vergine. Deve il suo nome alla sua forma che ricorda un cappello messicano sombrero, con un bordo di polvere scura che circonda il nucleo luminoso. Possiede un buco nero supermassiccio di circa 1 miliardo di masse solari.`,
    history: `Scoperta da Pierre M&eacute;chain nel 1781 e inclusa nel catalogo di Messier. La sua impressionante struttura con il caratteristico anello di polvere fu osservata per la prima volta nel XIX secolo. Nel 2003, osservazioni con il Telescopio Spaziale Hubble rivelarono circa 2.000 ammassi globulari, un numero insolitamente elevato.`,
    facts: [
      "Il suo buco nero supermassiccio ha circa 1 miliardo di masse solari",
      "Possiede circa 2.000 ammassi globulari (vs 150-200 nella Via Lattea)",
      "La sua forma ricorda un cappello sombrero messicano",
      "La regione centrale &egrave; la pi&ugrave; luminosa del Gruppo della Vergine"
    ]
  },
  magellano: {
    name: "Grande Nube di Magellano (LMC)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/NGC_2070_-_TOO_-_ESO.jpg/1024px-NGC_2070_-_TOO_-_ESO.jpg",
    type: "Irr I (SB(s)m)",
    dist: "160.000 anni luce",
    diametro: "~14.000 anni luce",
    stelle: "~30 miliardi",
    desc: `La Grande Nube di Magellano (LMC) &egrave; una galassia irregolare satellite della Via Lattea. Visibile a occhio nudo dall'emisfero australe, &egrave; una delle galassie pi&ugrave; vicine a noi. Contiene regioni di formazione stellare molto attive, incluso la Nebulosa della Tarantola (30 Doradus), una delle pi&ugrave; grandi regioni H II conosciute.`,
    history: `Osservata gi&agrave; nel 964 d.C. dal persiano al-Sufi, che la descrisse come una "nuvola minore". Fu poi riscoperta da Ferdinando Magellano durante il suo viaggio intorno al mondo nel 1519-1520, da cui prende il nome. Contiene la Nebulosa della Tarantola, una delle regioni di formazione stellare pi&ugrave; attive del Gruppo Locale.`,
    facts: [
      "Contiene la Nebulosa della Tarantola (30 Doradus), regione H II gigante",
      "E' visibile a occhio nudo dall'emisfero australe",
      "Si avvicina alla Via Lattea e la collasser&agrave; tra 2-4 miliardi di anni",
      "Ha una massa pari a circa 1/100 della Via Lattea"
    ]
  },
  m87: {
    name: "Messier 87 (M87 / Virgo A)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/M87_jet.jpg/1024px-M87_jet.jpg",
    type: "Ellittica gigante (E0-1)",
    dist: "53,49 milioni di anni luce",
    diametro: "~120.000 anni luce",
    stelle: "~100 trilioni",
    desc: `M87 &egrave; una galassia ellittica gigante nella costellazione della Vergine, membro dominante dell'Ammasso della Vergine. E' famosa per il suo potente getto di materia che si estende per circa 5.000 anni luce e per il suo buco nero supermassiccio, il primo mai fotografato direttamente dall'Event Horizon Telescope (EHT) nel 2019.`,
    history: `Scoperta da Charles Messier nel 1781. Nel 1918, Heber Curtis del Lick Observatory osserv&ograve; un "raggio sottile e lineare" proveniente dal nucleo, che si rivel&ograve; essere un getto di materia espulsa a velocit&agrave; relativistiche. Nel 2019, l'Event Horizon Telescope cattur&ograve; la prima immagine diretta del suo buco nero supermassiccio (M87*), confermando la teoria della relativit&agrave; generale di Einstein.`,
    facts: [
      "Il suo buco nero (M87*) &egrave; il primo mai fotografato (2019, EHT)",
      "Ha circa 6,5 miliardi di masse solari nel suo buco nero centrale",
      "Possiede oltre 12.000 ammassi globulari",
      "Il suo getto si estende per circa 5.000 anni luce"
    ]
  },
  whirlpool: {
    name: "Galassia Whirlpool (M51)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Whirlpool_Galaxy_by_Hubble.jpg/1024px-Whirlpool_Galaxy_by_Hubble.jpg",
    type: "Spirale (SA(s)bc)",
    dist: "23 milioni di anni luce",
    diametro: "~76.000 anni luce",
    stelle: "~160 miliardi",
    desc: `La Galassia Whirlpool (M51) &egrave; una delle galassie spirali pi&ugrave; fotografate del cielo notturno. La sua struttura a spirale perfetta e il suo compagno NGC 5195 la rendono un oggetto iconico dell'astronomia. I brazi spiraliformi sono percorsi da nubi di idrogeno e regioni di formazione stellare.`,
    history: `Scoperta da Charles Messier nel 1773 e poi osservata da Lord Rosse nel 1845 con il suo telescopio di 72 pollici, che fu il primo a riconoscere la struttura a spirale. Lord Rosse disegn&ograve; una rappresentazione della galassia che divenne una delle prime immagini di una galassia a spirale. La galassia interagisce gravitazionalmente con NGC 5195.`,
    facts: [
      "E' stata una delle prime galassie in cui fu riconosciuta la struttura a spirale",
      "Il suo compagno NGC 5195 si trova "dietro" la galassia principale",
      "I brazi spiraliformi contengono ammassi di stelle giovani e blu",
      "E' stata la prima galassia in cui fu osservata una supernova (1994)"
    ]
  },
  "piccola-magellano": {
    name: "Piccola Nube di Magellano (SMC)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/SMC_-_Gems_of_the_Southern_Sky_-_ESO_-_1024.jpg/1024px-SMC_-_Gems_of_the_Southern_Sky_-_ESO_-_1024.jpg",
    type: "Irr I / SB(s)m",
    dist: "200.000 anni luce",
    diametro: "~7.000 anni luce",
    stelle: "~3 miliardi",
    desc: `La Piccola Nube di Magellano (SMC) &egrave; una galassia irregolare satellite della Via Lattea. Insieme alla Grande Nube di Magellano forma una coppia di galassie che interagiscono gravitazionalmente. Contiene diverse regioni di formazione stellare attive, tra cui NGC 346.`,
    history: `Descritta da al-Sufi nel 964 d.C. come la "Nuvola Maggiore". Fu successivamente mappata durante il viaggio di Ferdinando Magellano. Insieme alla Grande Nube di Magellano, forma un sistema di galassie in interazione gravitazionale con la Via Lattea. La SMC &egrave; anche oggetto di studio per la comprensione della formazione stellare.`,
    facts: [
      "Contiene circa 3 miliardi di stelle",
      "NGC 346 &egrave; una delle regioni di formazione stellare pi&ugrave; attive",
      "Ha una metallicit&agrave; pi&ugrave; bassa della Via Lattea",
      "E' visibile a occhio nudo dall'emisfero australe"
    ]
  },
  boomerang: {
    name: "Nebulosa Boomerang",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Boomerang_Nebula_HST.png/1024px-Boomerang_Nebula_HST.png",
    type: "Nebulosa protoplanetaria",
    dist: "~5.000 anni luce",
    diametro: "~1 anno luce",
    stelle: "1 (stella centrale)",
    desc: `La Nebulosa Boomerang, nota anche come NGC 6543, &egrave; una nebulosa protoplanetaria situata nella costellazione del Centauro. &Egrave; famosa per essere il luogo pi&ugrave; freddo nell'universo conosciuto, con una temperatura di circa -272 gradi Celsius, appena sopra lo zero assoluto.`,
    history: `Scoperta nel 1980 da Rheinhardt Schilbach e Max Wagner con il telescopio di 2,2 metri dell'European Southern Observatory (ESO) in Cile. La sua forma a boomerang e la sua temperatura estremamente bassa la rendono un oggetto unico e particolarmente interessante per lo studio dell'evoluzione stellare.`,
    facts: [
      "E' il luogo pi&ugrave; freddo conosciuto nell'universo (-272°C)",
      "La sua forma a boomerang &egrave; dovuta a getti bipolari di gas",
      "La stella centrale sta expellendo i suoi strati esterni",
      "La temperatura &egrave; prossima allo zero assoluto (-273,15°C)"
    ]
  },
  antennae: {
    name: "Galassie Antenne (NGC 4038/4039)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Antennae_Galaxies_-_Potentially_Hostile_-_PIA19780.jpg/1024px-Antennae_Galaxies_-_Potentially_Hostile_-_PIA19780.jpg",
    type: "In interazione",
    dist: "45 milioni di anni luce",
    diametro: "~350.000 anni luce (including tails)",
    stelle: "~100 miliardi (combined)",
    desc: `Le Galassie Antenne (NGC 4038 e NGC 4039) sono un pair di galassie in interazione gravitazionale. La loro fusione ha creato due lunghe code di stelle, gas e polvere che si estendono per centinaia di migliaia di anni luce, ricordando le antenne di un insetto.`,
    history: `Scoperte da William Herschel nel 1785, le Galassie Antenne sono uno degli esempi pi&ugrave; famosi di galassie in interazione. Le lunghe code sono state riconosciute come tali solo nel XX secolo, rivelando che la fusione in corso inizier&agrave; circa 900 milioni di anni fa. La regione centrale &egrave; ricca di formazione stellare.`,
    facts: [
      "Le code si estendono per circa 500.000 anni luce",
      "La fusione inizier&agrave; circa 900 milioni di anni fa",
      "La regione centrale &egrave; ricca di formazione stellare",
      "Sono uno degli esempi pi&ugrave; studiati di fusione galattica"
    ]
  },
  cartwheel: {
    name: "Galassia della Ruota di Carro",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Cartwheel_Galaxy_560mm_FL.jpg/1024px-Cartwheel_Galaxy_560mm_FL.jpg",
    type: "Anulare (ring)",
    dist: "~500 milioni di anni luce",
    diametro: "~150.000 anni luce",
    stelle: "~1 trilione (estimated)",
    desc: `La Galassia della Ruota di Carro &egrave; una galassia anulare situata nella costellazione dello Scultore. La sua struttura unica &egrave; il risultato di una collisione frontale con un'altra galassia, che ha creato un'onda di espansione di materia simile a quella di un sasso lanciato in un laghino.`,
    history: `Scoperta nel 1941 da Fritz Zwicky, la Galassia della Ruota di Carro divenne un oggetto di grande interesse per gli astronomi. La sua forma a ruota &egrave; stata spiegata con un modello di collisione frontale tra due galassie, un processo che richiede centinaia di milioni di anni per completarsi.`,
    facts: [
      "La struttura anulare &egrave; il risultato di una collisione frontale",
      "L'onda di espansione si muove a circa 300 km/s",
      "Contiene ricchi depositi di gas e polvere",
      "La sua forma unica &egrave; rara tra le galassie conosciute"
    ]
  },
  blackeye: {
    name: "Black Eye Galaxy (M64)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/NGC_4826_-_Black_Eye_Galaxy_-_Heic0415a.jpg/1024px-NGC_4826_-_Black_Eye_Galaxy_-_Heic0415a.jpg",
    type: "Spirale (SA(rs)ab)",
    dist: "17 milioni di anni luce",
    diametro: "~50.000 anni luce",
    stelle: "~100 miliardi",
    desc: `La Black Eye Galaxy (M64) &egrave; una galassia spirale nella costellazione dei Berretto. Il suo nome deriva dalla sua caratteristica banda scura di polvere che circonda il nucleo luminoso. &Egrave; nota per avere una regione esterna che ruota in direzione opposta rispetto al disco interno.`,
    history: `Scoperta da Edward Pigott nel 1779 e indipendentemente da Johann Elert Bode nello stesso anno. La sua peculiarit&agrave; principale fu scoperta negli anni '90: la galassia ha due dischi rotanti in direzioni opposte, un fenomeno raro e affascinante che suggerisce una storia di fusione galattica.`,
    facts: [
      "I dischi rotano in direzioni opposte, un fenomeno raro",
      "La banda scura &egrave; composta da polvere e gas",
      "E' stata scoperta da due astronomi indipendentemente nel 1779",
      "La regione esterna ruota in direzione opposta al disco interno"
    ]
  },
  tirano: {
    name: "M106 (Cane Maggiore)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/M106_%28Messier_106%29.jpg/1024px-M106_%28Messier_106%29.jpg",
    type: "Spirale barrata (SAB(s)bc)",
    dist: "22,8 milioni di anni luce",
    diametro: "~130.000 anni luce",
    stelle: "~300 miliardi",
    desc: `M106 &egrave; una galassia spirale nella costellazione del Cane Maggiore. Possiede un nucleo attivo (Seyfert II) con getti di materia che emettono radiazione potente. I suoi getti non sono visibili nella luce ottica ma sono stati rilevati nelle microonde.`,
    history: `Scoperta da Pierre M&eacute;chain nel 1781 e aggiunta al catalogo di Messier. La sua natura di galassia con nucleo attivo fu riconosciuta nel XX secolo. I getti di materia sono stati studiati in dettaglio utilizzando osservazioni radio e a raggi X, rivelando un buco nero supermassiccio al centro.`,
    facts: [
      "Possiede un buco nero supermassiccio attivo al centro",
      "I suoi getti sono visibili solo nelle microonde",
      "E' una delle galassie pi&ugrave; luminose nel suo gruppo",
      "Ha una struttura a barra centrale debole"
    ]
  },
  occhio: {
    name: "Galassia dell'Occhio di Gatto (M94)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/M94_Galaxy_by_Hubble.jpg/1024px-M94_Galaxy_by_Hubble.jpg",
    type: "Spirale / Lenticolare (SA(s)ab)",
    dist: "16 milioni di anni luce",
    diametro: "~40.000 anni luce",
    stelle: "~50 miliardi",
    desc: `La Galassia dell'Occhio di Gatto (M94) &egrave; una galassia nella costellazione dei Cani da Caccia. Possiede un disco interno molto luminoso e un disco esterno pi&ugrave; debole. Il suo nucleo &egrave; attivo e produce un getto di materia relativistico.`,
    history: `Scoperta da Pierre M&eacute;chain nel 1781 e inclusa nel catalogo di Messier. La galassia &egrave; nota per la sua struttura a doppio disco, una caratteristica che fu descritta per la prima volta nel XX secolo. Il suo nucleo attivo &egrave; stato oggetto di intensi studi.`,
    facts: [
      "Possiede un disco interno molto luminoso e uno esterno pi&ugrave; debole",
      "Il nucleo &egrave; attivo e produce un getto relativistico",
      "La sua luminosit&agrave; interna &egrave; molto elevata",
      "E' situata nella costellazione dei Cani da Caccia"
    ]
  },
  cigaro: {
    name: "Galassia del Cigaro (M82)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/M82_HST_big_stelum.jpg/1024px-M82_HST_big_stelum.jpg",
    type: "Irregolare (I0 pec)",
    dist: "11,4 milioni di anni luce",
    diametro: "~37.000 anni luce",
    stelle: "~30 miliardi",
    desc: `La Galassia del Cigaro (M82) &egrave; una galassia irregolare nella costellazione dell'Orsa Maggiore. &Egrave; una delle galassie starburst pi&ugrave; vicine, con un tasso di formazione stellare circa 10 volte superiore a quello della Via Lattea. Il suo aspetto "sfregato" &egrave; dovuto a getti di materia espulsa dal nucleo.`,
    history: `Scoperta da Johann Elert Bode nel 1774. La sua natura di galassia starburst fu riconosciuta nel XX secolo, dopo la scoperta che la galassia produce stelle a un ritmo insostenibile. M82 &egrave; interagente con M81, e questa interazione ha scatenato la sua intensa attivit&agrave; di formazione stellare.`,
    facts: [
      "Ha un tasso di formazione stellare 10 volte superiore alla Via Lattea",
      "I getti di materia si estendono per circa 10.000 anni luce",
      "E' interagente con la galassia M81",
      "Il nome 'Cigaro' deriva dal suo aspetto allungato"
    ]
  },
  sirena: {
    name: "NGC 1300 (Sirena)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/NGC_1300_-_ERL_-_ESO.jpg/1024px-NGC_1300_-_ERL_-_ESO.jpg",
    type: "Spirale barrata (SB(s)bc)",
    dist: "~69 milioni di anni luce",
    diametro: "~110.000 anni luce",
    stelle: "~100 miliardi",
    desc: `NGC 1300 &egrave; una galassia spirale barrata nella costellazione dell'Eridano. E' considerata una delle galassie a spirale barrata pi&ugrave; "perfette" conosciute, con una barra centrale molto definita e brazi spiraliformi che si avvolgono elegantemente.`,
    history: `Scoperta da John Herschel nel 1835. La galassia &egrave; divenuta un oggetto di riferimento per lo studio delle galassie a spirale barrata. La sua struttura a barra centrale &egrave; una delle pi&ugrave; evidenti e simmetriche conosciute, rendendola ideale per gli studi dinamici.`,
    facts: [
      "E' una delle spirali barrate pi&ugrave; perfette conosciute",
      "La barra centrale si estende per circa 50.000 anni luce",
      "I brazi spiraliformi sono perfettamente simmetrici",
      "E' situata nella costellazione dell'Eridano"
    ]
  },
  foca: {
    name: "NGC 2903 (Leone)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/NGC_2903_-_Galactic_Nucleus_-_ESO.jpg/1024px-NGC_2903_-_Galactic_Nucleus_-_ESO.jpg",
    type: "Spirale barrata (SB(s)d)",
    dist: "~30 milioni di anni luce",
    diametro: "~90.000 anni luce",
    stelle: "~100 miliardi",
    desc: `NGC 2903 &egrave; una galassia spirale barrata nella costellazione del Leone. Il suo nucleo &egrave; molto luminoso e presenta segni di attivit&agrave; stellare intensa. La galassia ha una barra debole e brazi spiraliformi bien definiti.`,
    history: `Scoperta da William Herschel nel 1784. La galassia &egrave; stata oggetto di numerosi studi sulle regioni H II e sulla formazione stellare. Il suo nucleo luminoso ha attirato l'attenzione degli astronomi per la sua attivit&agrave; intensa e la presenza di numerosi ammassi stellari giovani.`,
    facts: [
      "Il nucleo &egrave; molto luminoso con attivit&agrave; stellare intensa",
      "Ha una barra debole ma evidente",
      "Possiede numerose regioni H II",
      "E' situata nella costellazione del Leone"
    ]
  },
  pescatore: {
    name: "NGC 1637 (Eridano)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/NGC_1637_by_Esurvey.jpg/1024px-NGC_1637_by_Esurvey.jpg",
    type: "Spirale (SAB(rs)c)",
    dist: "~38 milioni di anni luce",
    diametro: "~65.000 anni luce",
    stelle: "~50 miliardi",
    desc: `NGC 1637 &egrave; una galassia spirale nella costellazione dell'Eridano. Ha una struttura spirale relativamente debole e un nucleo poco luminoso. La galassia &egrave; ricca di gas e polvere, con attivit&agrave; di formazione stellare moderata.`,
    history: `Scoperta da William Herschel nel 1785. La galassia &egrave; stata studiata per la sua struttura a spirale debole e la distribuzione del gas interstellare. NGC 1637 &egrave; un esempio di galassia spirale con una barra debole e una struttura less definita rispetto ad altre galassie spirali.`,
    facts: [
      "Ha una struttura spirale relativamente debole",
      "Il nucleo &egrave; poco luminoso",
      "E' ricca di gas e polvere",
      "E' situata nella costellazione dell'Eridano"
    ]
  }
};

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

// === FILTER ===
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.galaxy-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// === MODAL ===
function openModal(id) {
  const data = galaxyData[id];
  if (!data) return;
  const body = document.getElementById('modal-body');
  const factsHtml = data.facts.map(f => `<li>${f}</li>`).join('');

  body.innerHTML = `
    <img src="${data.img}" alt="${data.name}">
    <h2>${data.name}</h2>
    <div class="modal-meta">
      <span><strong>Tipo:</strong> ${data.type}</span>
      <span><strong>Distanza:</strong> ${data.dist}</span>
      ${data.diametro ? `<span><strong>Diametro:</strong> ${data.diametro}</span>` : ''}
      ${data.stelle ? `<span><strong>Stelle:</strong> ${data.stelle}</span>` : ''}
    </div>
    <h3>Descrizione</h3>
    <p>${data.desc}</p>
    <h3>Storia</h3>
    <p>${data.history}</p>
    <h3>Curiosit&agrave;</h3>
    <ul>${factsHtml}</ul>
  `;

  document.getElementById('galaxy-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('galaxy-modal').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('galaxy-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// === SCROLL ANIMATION ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.galaxy-card, .info-card, .class-card, .fact-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
