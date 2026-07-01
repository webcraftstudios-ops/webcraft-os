# Sprints — Darts Live Camera Support

## Fase 0 — Projectkader omgezet naar sprints

Doel van fase 0: het project scherp genoeg maken om te bouwen zonder te verzanden in een te groot computer-vision R&D-traject.

Fase 0 bestaat uit vier korte sprints. Elke sprint levert een concreet beslisdocument of bouwklaar artefact op.

---

## Sprint 0.1 — Commerciële scope

### Doel

Bepalen voor wie de eerste versie bedoeld is en waarom die doelgroep zou betalen.

### Kernvraag

Voor wie is dit probleem urgent genoeg om een eerste versie te testen of te betalen?

### Taken

- Kies primaire doelgroep: dartclub, café, tornooiorganisator of recreatieve spelers.
- Beschrijf het huidige probleem: scorefouten, traag scoreverloop, weinig overzicht, geen historiek, geen professionele schermweergave.
- Bepaal betaalreden: tijdswinst, minder discussie, betere tornooi-ervaring, professionelere clubavond, betere stream/overlay.
- Kies eerste commerciële belofte.
- Bepaal wat níét beloofd wordt in MVP.

### Output

- Doelgroepkeuze
- Probleemdefinitie
- Eerste pitchzin
- Betaalhypothese

### Definition of Done

Sprint is klaar wanneer één primaire doelgroep is gekozen en er een korte pitch bestaat die getest kan worden bij een echte club of café.

---

## Sprint 0.2 — MVP-scope

### Doel

De kleinste nuttige versie vastleggen die demo- en testbaar is zonder perfecte AI-detectie.

### Kernvraag

Wat moet de eerste demo absoluut kunnen om geloofwaardig te zijn?

### Taken

- Splits functies in must-have, should-have en later.
- Bevestig dat automatische dartdetectie niet verplicht is voor versie 1.
- Leg de hybride flow vast: score invoeren, camera snapshot koppelen, mens bevestigt/corrigeert.
- Bepaal demo-scenario: 501-leg tussen twee spelers.
- Bepaal minimale UI-schermen.

### Output

- MVP-functielijst
- Demo-scenario
- Niet-bouwen-lijst
- Eerste user flow

### Definition of Done

Sprint is klaar wanneer een ontwikkelaar exact weet wat in de eerste prototypeversie moet zitten en wat bewust wordt uitgesteld.

---

## Sprint 0.3 — Technische projectkeuze

### Doel

Een technische basis kiezen die snel bouwbaar is en later camera/computer vision kan dragen.

### Kernvraag

Welke stack maakt de snelste demo mogelijk zonder de latere AI-route te blokkeren?

### Taken

- Kies frontend stack.
- Kies backend/API-aanpak.
- Kies opslag voor matchdata en snapshots.
- Bepaal of prototype lokaal, webgebaseerd of hosted wordt.
- Bepaal camera-aanpak voor fase 1: mock image, file upload of browser camera.
- Leg latere computer-vision route vast: OpenCV, verschilbeeld, segment mapping, confidence score.

### Output

- Technische stackbeslissing
- Architectuurschets
- Datamodel v0
- Camera-aanpak fase 1

### Definition of Done

Sprint is klaar wanneer de eerste technische bouwrichting vastligt en geen fundamentele keuzes meer openstaan voor het scoreboard prototype.

---

## Sprint 0.4 — Demo- en validatieplan

### Doel

Bepalen hoe de eerste demo getest wordt bij echte gebruikers of kopers.

### Kernvraag

Hoe krijgen we zo snel mogelijk bewijs dat dit nuttig of verkoopbaar is?

### Taken

- Maak een demo-script van maximaal 2 minuten.
- Maak vijf validatievragen voor clubs/cafés.
- Bepaal welke feedback gemeten wordt.
- Bepaal eerste prijs-/pakkettest.
- Maak lijst van 5 mogelijke testlocaties of profielen.

### Output

- Demo-script
- Validatievragen
- Feedbackcriteria
- Eerste prijs-/pakketopties

### Definition of Done

Sprint is klaar wanneer het prototype niet alleen gebouwd kan worden, maar ook getest kan worden bij een echte doelgroep.

---

## Sprintvolgorde

1. Sprint 0.1 — Commerciële scope
2. Sprint 0.2 — MVP-scope
3. Sprint 0.3 — Technische projectkeuze
4. Sprint 0.4 — Demo- en validatieplan

## Fase 0 eindbeslissing

Na deze vier sprints moet beslist worden:

- primaire doelgroep;
- exacte MVP-scope;
- technische stack;
- eerste demo-flow;
- wat expliciet niet gebouwd wordt;
- of het project doorgaat naar Fase 1: Scoreboard Prototype.
