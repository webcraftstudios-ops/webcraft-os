# Fase 1 — Completion Summary & Technische Sanity Check

## Status

Fase 1 is functioneel afgerond op issue-niveau.

Afgeronde build-issues:

- #9 — Project scaffold voor scoreboard prototype
- #10 — TypeScript datamodel toevoegen
- #11 — Score engine bouwen
- #12 — Match setup UI bouwen
- #13 — Live scoreboard UI bouwen
- #14 — Score input en beurtflow bouwen
- #15 — Beurtgeschiedenis bouwen
- #16 — Correctieflow bouwen
- #17 — Mock beeldpaneel bouwen
- #18 — Demo flow en acceptatietest toevoegen

## Fase 1 doel

Een eerste browserdemo bouwen waarmee een 301/501 dartsleg tussen twee spelers gespeeld kan worden, zonder echte camera of AI-herkenning.

## Wat nu gebouwd is

De app bevat nu:

- Next.js + TypeScript + Tailwind scaffold;
- centraal TypeScript datamodel;
- pure score engine;
- match setup flow;
- live scoreboard;
- score input;
- bust-detectie;
- exact-0 finish;
- automatische spelerwissel;
- beurtgeschiedenis;
- correctieflow;
- undo laatste beurt;
- mock beeldpaneel;
- koppeling van mock beeldreferentie aan een beurt;
- demo-flow en acceptatietesten in de app README.

## Belangrijkste bestanden

```text
projects/darts-live-camera-support/app/
  README.md
  package.json
  next.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  src/
    app/
      globals.css
      page.tsx
    components/
      CorrectionControls.tsx
      MatchSetup.tsx
      MockImagePanel.tsx
      Scoreboard.tsx
      ScoreInput.tsx
      TurnHistory.tsx
    domain/
      scoring.ts
      types.ts
    data/
      demoData.ts
```

## Technische sanity check

### 1. Architectuur

Status: OK voor prototype.

De app heeft een logische scheiding tussen:

- UI-componenten;
- domain types;
- pure score engine;
- demo data;
- lokale app state.

Dit is voldoende voor Fase 1 en blokkeert latere camera-integratie niet.

### 2. Score engine

Status: OK voor MVP.

Ondersteund:

- scorevalidatie 0–180;
- score aftrekken;
- bust bij score onder 0;
- exact-0 finish;
- spelerwissel;
- undo laatste beurt;
- correctie laatste beurt.

Bewuste beperking:

- double-out is nog niet geïmplementeerd;
- dart-per-dart invoer is nog niet geïmplementeerd;
- checkout engine is nog niet geïmplementeerd.

Voor de commerciële MVP-demo is dit aanvaardbaar.

### 3. UI-flow

Status: OK voor demo.

De demo ondersteunt:

- match starten;
- score invoeren;
- actuele score tonen;
- history bekijken;
- correctie uitvoeren;
- mock beeldreferentie tonen.

Aandachtspunt:

- De UI is functioneel, maar nog geen afgewerkte commerciële demo-interface.
- Voor een café/clubdemo moet later een compactere full-screen scoreboard view gemaakt worden.

### 4. Mock beeldpaneel

Status: OK voor conceptvalidatie.

Het mock beeldpaneel toont het assisted-scoring concept zonder echte beeldinput.

Ondersteund:

- mock image reference maken;
- pending image koppelen aan eerstvolgende beurt;
- laatste gekoppelde image tonen;
- image reference zichtbaar in turn history.

Bewuste beperking:

- geen echte camera;
- geen file upload;
- geen beeldherkenning;
- geen opslag van echte beelden.

Dit is correct voor Fase 1.

### 5. State management

Status: OK voor prototype.

De app gebruikt lokale React state.

Dat is voldoende zolang:

- er geen accounts zijn;
- er geen persistente historiek nodig is;
- demo lokaal of tijdelijk draait;
- geen multi-device flow nodig is.

Voor Fase 2 of commerciële test moet localStorage of eenvoudige database-opslag overwogen worden.

### 6. Risico op buildfouten

Status: moet lokaal getest worden.

Omdat de code via GitHub-writes is aangemaakt en niet lokaal in deze sessie is uitgevoerd, is `npm install`, `npm run build` en `npm run dev` nog niet effectief gevalideerd.

Mogelijke aandachtspunten:

- Next.js 15 + React 19 versiecompatibiliteit;
- `next lint` script kan afwijken bij recente Next.js versies;
- Tailwind config moet lokaal gecontroleerd worden;
- TypeScript strict mode kan kleine typeproblemen tonen;
- gebruik van `crypto.randomUUID()` vereist browseromgeving of geschikte runtime.

Actie nodig:

```bash
cd projects/darts-live-camera-support/app
npm install
npm run build
npm run dev
```

## Functionele sanity check

### Verwachte werkende demo

1. App starten.
2. Twee spelers invoeren.
3. 501 kiezen.
4. Match starten.
5. Scores invoeren.
6. Beurt wisselt automatisch.
7. Bust wordt verwerkt.
8. Exact-0 finish beëindigt match.
9. Beurtgeschiedenis toont scores.
10. Correctie en undo werken.
11. Mock image kan aan beurt gekoppeld worden.

### Nog niet bewezen zonder lokale run

- effectieve build;
- browserrendering;
- volledige TypeScript-validatie;
- runtimegedrag van alle componenten samen.

## Commerciële sanity check

Status: positief voor prototypefase.

Fase 1 levert geen volledig product, maar wel een toonbare demo voor het kernidee:

> Live darts scoreboard met correcties en camera-assisted beeldreferenties.

Dit is voldoende om gesprekken met cafés en dartclubs concreter te maken.

Nog niet verkoopklaar als betaald product omdat:

- echte camera ontbreekt;
- visuele polish beperkt is;
- persistentie ontbreekt;
- full-screen scorebord ontbreekt;
- deployment ontbreekt;
- feedback van echte gebruikers ontbreekt.

Wel geschikt voor:

- interne demo;
- lokale test;
- technische basis voor Fase 2;
- eerste gesprek met potentiële testlocatie.

## Bekende beperkingen

Niet aanwezig in Fase 1:

- echte camera input;
- file upload;
- image recognition;
- OpenCV;
- board calibration;
- database;
- auth;
- tournament mode;
- full-screen TV mode;
- stream overlay;
- double-out;
- checkout suggestions;
- player averages;
- persistent match history.

## Aanbevolen volgende fase

Niet meteen naar AI/computer vision springen.

Aanbevolen Fase 2:

> Demo hardening + local run validation + full-screen scoreboard.

Voorgestelde Fase 2 issues:

1. Run app locally and fix build/runtime issues
2. Add full-screen scoreboard mode
3. Improve demo visual polish
4. Add localStorage persistence
5. Add reset/new match control
6. Add double-out setting
7. Add basic checkout suggestions
8. Prepare hosted demo deployment

Pas daarna:

- browser camera preview;
- image capture;
- file upload;
- real camera-assisted scoring.

## Go/No-Go beslissing

Beslissing:

> GO naar Fase 2, maar eerst technische lokale validatie uitvoeren.

Fase 1 is inhoudelijk klaar, maar technisch nog niet bewezen via lokale build/run.

## Eerstvolgende actie

Maak issue voor:

> Fase 2.1 — Local build and runtime validation

Doel:

- `npm install` uitvoeren;
- `npm run build` uitvoeren;
- TypeScript-errors oplossen;
- runtime in browser controleren;
- minimale bugs fixen;
- daarna pas visuele/demo-uitbreiding bouwen.
