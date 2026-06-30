# Sprint 0.3 — Technische projectkeuze

## Beslissing

De eerste technische versie wordt een webapp-prototype met een eenvoudige, uitbreidbare architectuur.

Definitieve keuze voor Fase 1:

> Bouw eerst een browser-based scoreboard prototype met lokale/mock data en een duidelijke scheiding tussen scorelogica, match state en UI. Camera-integratie start als mock/file-upload/snapshotpaneel en wordt pas later echte browser camera of OpenCV.

## Waarom deze keuze

De grootste technische valkuil is te vroeg starten met computer vision. Daarom wordt de eerste stack gekozen op snelheid, demo-waarde en uitbreidbaarheid.

Belangrijkste redenen:

- snelste route naar werkende demo;
- geen backend-complexiteit nodig voor eerste versie;
- eenvoudig te tonen aan café/club;
- scorelogica kan zuiver getest worden;
- camera-paneel kan later echte input krijgen;
- computer vision blijft mogelijk zonder MVP te blokkeren.

## Stackbeslissing Fase 1

### Frontend

Aanbevolen:

- React of Next.js;
- TypeScript;
- Tailwind CSS;
- component-based UI.

Minimale optie:

- plain HTML/CSS/JavaScript als ultra-snelle demo.

Voorkeur:

> Next.js + TypeScript + Tailwind, omdat dit later makkelijk naar SaaS/demo-site kan groeien.

### Backend

Voor Fase 1:

- geen aparte backend verplicht;
- match state mag lokaal in frontend state;
- optioneel localStorage voor tijdelijke demo-persistentie.

Voor Fase 2:

- simpele API-routes of kleine Node/Express backend;
- opslag van matches, turns en snapshots.

Voor latere SaaS:

- Supabase of Postgres;
- object storage voor snapshots;
- auth pas toevoegen na bewezen waarde.

### Opslag

Fase 1:

- in-memory state;
- optioneel localStorage;
- mock snapshot URLs of lokale demo-afbeeldingen.

Fase 2:

- database voor Match, Player, Turn, Correction;
- object storage voor snapshots.

Aanbevolen latere keuze:

- Supabase Postgres;
- Supabase Storage of S3-compatible storage.

## Prototype-vorm

Fase 1 wordt:

> Webgebaseerd, lokaal of als eenvoudige hosted demo deploybaar.

Opties:

- lokaal draaien via npm dev;
- later deploy op Vercel;
- geen login;
- geen betalingen;
- geen database verplicht.

## Camera-aanpak Fase 1

Fase 1 gebruikt geen echte camera als harde vereiste.

Keuze:

1. Mock snapshot paneel in de UI.
2. Optionele file upload als tussenstap.
3. Browser camera pas in Fase 2.
4. OpenCV/computer vision pas na werkend scoreboard.

## Camera-aanpak Fase 2

Fase 2 kan toevoegen:

- browser `getUserMedia` camera preview;
- snapshot capture na beurt;
- afbeelding koppelen aan Turn;
- snapshot opslaan;
- manuele scorebevestiging.

## Computer vision route later

Niet in Sprint 1 bouwen, maar architectuur moet dit toelaten.

Latere stappen:

1. Bordkalibratie
   - centrum aanduiden;
   - buitenring bepalen;
   - rotatie bepalen;
   - segmentgrid opslaan.

2. Verschilbeeld
   - foto vóór beurt;
   - foto ná beurt;
   - verschil detecteren;
   - kandidaat-dartlocaties bepalen.

3. Segment mapping
   - pixelcoördinaat mappen naar ring en segment;
   - single/double/triple/bull bepalen.

4. Confidence score
   - scorevoorstel tonen;
   - mens bevestigt of corrigeert;
   - correcties opslaan als trainingsdata.

5. Modeltraining later
   - dataset opbouwen uit echte snapshots;
   - object detection voor dartpunten;
   - model pas trainen na voldoende data.

## Architectuurschets Fase 1

```text
Browser UI
  -> Match Setup component
  -> Scoreboard component
  -> Score Input component
  -> Snapshot Panel component
  -> Turn History component
  -> Correction Controls

Score Engine
  -> validate score
  -> apply turn
  -> detect bust
  -> detect finish
  -> undo/correct turn

Local State
  -> players
  -> match
  -> turns
  -> corrections
  -> mock snapshots
```

## Architectuurschets Fase 2

```text
Browser UI
  -> Camera Preview
  -> Capture Snapshot
  -> Confirm Score

API Layer
  -> create match
  -> add turn
  -> upload snapshot
  -> correct turn

Storage
  -> match data database
  -> snapshot object storage

Future CV Worker
  -> receive snapshot
  -> detect board/darts
  -> return suggested score + confidence
```

## Datamodel v0

### Player

```ts
type Player = {
  id: string;
  name: string;
};
```

### Match

```ts
type Match = {
  id: string;
  gameType: '301' | '501';
  startingScore: 301 | 501;
  status: 'setup' | 'active' | 'finished';
  currentPlayerId: string;
  winnerPlayerId?: string;
  createdAt: string;
};
```

### PlayerScore

```ts
type PlayerScore = {
  playerId: string;
  remainingScore: number;
};
```

### Turn

```ts
type Turn = {
  id: string;
  matchId: string;
  playerId: string;
  turnNumber: number;
  enteredScore: number;
  confirmedScore: number;
  scoreBefore: number;
  scoreAfter: number;
  isBust: boolean;
  snapshotId?: string;
  createdAt: string;
};
```

### Snapshot

```ts
type Snapshot = {
  id: string;
  matchId: string;
  turnId?: string;
  url: string;
  source: 'mock' | 'upload' | 'camera';
  createdAt: string;
};
```

### Correction

```ts
type Correction = {
  id: string;
  matchId: string;
  turnId: string;
  oldScore: number;
  newScore: number;
  reason?: string;
  createdAt: string;
};
```

## Score engine regels v0

### Geldige invoer

- Score moet een getal zijn.
- Score moet tussen 0 en 180 liggen.
- Score mag niet negatief zijn.

### Beurt toepassen

- Neem resterende score van huidige speler.
- Trek ingevoerde score af.
- Als resultaat onder 0: bust, score blijft gelijk.
- Als resultaat exact 0: match finished, speler wint.
- Anders: score wordt bijgewerkt en beurt wisselt.

### MVP-beslissing rond double-out

Voor de eerste technische demo:

- gewone exact-0 finish is voldoende;
- double-out wordt als instelling of latere regel toegevoegd.

Reden:

- minder complexiteit;
- sneller prototype;
- commerciële demo focust op flow en overzicht, niet op volledige wedstrijdreglementen.

## Mappenstructuur voorstel

```text
projects/darts-live-camera-support/
  README.md
  PROJECT_PROMPT.md
  MVP_SPEC.md
  ROADMAP.md
  SPRINTS.md
  sprints/
    SPRINT_0_1_COMMERCIAL_SCOPE.md
    SPRINT_0_2_MVP_SCOPE.md
    SPRINT_0_3_TECHNICAL_CHOICE.md
  app/
    README.md
    src/
      components/
      domain/
        scoring.ts
        types.ts
      data/
      pages-or-app/
```

## Fase 1 build-keuze

Aanbevolen eerste implementatie:

- Next.js app in `projects/darts-live-camera-support/app/`;
- TypeScript types voor datamodel;
- pure `scoring.ts` module voor scorelogica;
- UI met setup, scoreboard, score input, snapshot paneel en history;
- geen externe AI-service;
- geen database.

## Risico’s

### Risico 1 — Te snel naar AI gaan

Mitigatie: AI pas na werkend scoreboard en demo-flow.

### Risico 2 — Camera werkt slecht in cafélicht

Mitigatie: Fase 1 mock/file upload; Fase 2 pas echte camera testen.

### Risico 3 — Regels worden te complex

Mitigatie: 501 exact-0 als eerste demo; double-out later configureerbaar.

### Risico 4 — Product wordt te breed

Mitigatie: geen tornooien, accounts, statistieken of betalingen in Fase 1.

## Sprint 0.3 status

Sprint 0.3 is inhoudelijk klaar.

### Definitieve technische keuze

Start met een Next.js + TypeScript + Tailwind webapp-prototype zonder verplichte backend. Gebruik lokale state en mock snapshots. Houd scorelogica apart in een pure module zodat camera/computer vision later kan aansluiten.

### Volgende sprint

Sprint 0.4 — Demo- en validatieplan maken.
