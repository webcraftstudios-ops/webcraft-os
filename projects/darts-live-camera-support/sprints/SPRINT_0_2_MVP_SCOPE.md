# Sprint 0.2 — MVP-scope

## Beslissing

De eerste MVP wordt géén volledig automatisch darts image-recognition systeem.

De eerste MVP wordt:

> Een live darts scoreboard met camera-assisted turn logging: scores worden manueel ingevoerd of bevestigd, snapshots worden per beurt gekoppeld en correcties zijn snel mogelijk.

Deze scope is bewust klein genoeg om snel te bouwen, maar sterk genoeg om aan clubs en cafés te tonen.

## MVP-doel

Een 501-leg tussen twee spelers volledig kunnen spelen met:

- live scorebord;
- correcte darts scorelogica;
- duidelijke beurtflow;
- snelle correctie;
- camera/mock snapshot per beurt;
- demo die binnen 2 minuten begrijpelijk is.

## Must-have functies

### 1. Match starten

- Nieuwe match starten.
- Twee spelers invoeren.
- Startscore kiezen: 501 als default, 301 optioneel.
- Eerste speler kiezen.

### 2. Live scoreboard

- Resterende score per speler tonen.
- Huidige speler duidelijk markeren.
- Laatste beurt tonen.
- Matchstatus tonen: bezig, bust, gewonnen.

### 3. Score-invoer

- Score per beurt invoeren als totaal van maximaal drie darts.
- Score aftrekken van huidige speler.
- Beurt automatisch wisselen na bevestiging.
- Ongeldige scores blokkeren waar zinvol.

### 4. Dartsregels basis

- 501-startscore ondersteunen.
- 301 optioneel ondersteunen.
- Bust detecteren wanneer score onder 0 gaat.
- Finish detecteren wanneer score exact 0 wordt.
- In MVP mag double-out als instelling later komen; eerste demo mag gewone exact-0 finish gebruiken, tenzij expliciet anders gekozen.

### 5. Beurtgeschiedenis

- Per beurt bewaren:
  - speler;
  - ingevoerde score;
  - resterende score na beurt;
  - bust ja/nee;
  - snapshot/mock snapshot referentie.

### 6. Correctieflow

- Laatste beurt kunnen aanpassen.
- Laatste beurt kunnen terugdraaien.
- Correctie zichtbaar maken in historiek of log.

### 7. Camera-assisted paneel

- In eerste demo mag dit mock zijn.
- Toon een snapshotgebied naast of onder het scorebord.
- Koppel snapshot aan huidige beurt.
- Laat zien dat latere camera-integratie hier logisch aansluit.

### 8. Demo-modus

- Demo moet zonder echte camera kunnen draaien.
- Demo moet binnen 2 minuten uitlegbaar zijn.
- Demo moet bruikbaar zijn in gesprek met café/club.

## Should-have functies

Deze functies verhogen waarde, maar blokkeren MVP niet:

- checkout-suggesties;
- gemiddelde score per speler;
- aantal beurten per speler;
- simpele match reset;
- full-screen scorebordmodus;
- visuele indicator voor bust;
- export van matchhistoriek als JSON of CSV;
- demo-data laden.

## Later bouwen

Niet in eerste MVP:

- automatische dartpuntdetectie;
- automatische segmentherkenning;
- multi-camera triangulatie;
- officiële double-out regels als complexe checkout engine;
- tornooibrackets;
- accounts en login;
- betalingen;
- mobiele native app;
- cloud sync;
- statistieken op lange termijn;
- streaming overlay;
- hardwarebundel.

## Eerste demo-scenario

### Context

Een café organiseert een kleine dartsavond. Twee spelers spelen een 501-leg. De organisator wil minder gedoe met papier of whiteboard en wil een duidelijk scorebord op scherm.

### Demo-flow

1. Open de webapp.
2. Start nieuwe match.
3. Vul twee spelers in: bijvoorbeeld Maarten en Johan.
4. Kies 501.
5. Toon live scorebord met beide spelers op 501.
6. Speler 1 gooit 60, score wordt 441.
7. Snapshot/mock snapshot wordt gekoppeld aan de beurt.
8. Speler 2 gooit 45, score wordt 456.
9. Toon beurtgeschiedenis.
10. Demonstreer foutcorrectie: wijzig laatste score van 45 naar 41.
11. Toon bijgewerkte score en correctielog.
12. Demonstreer bust: speler gooit meer dan resterende score.
13. Demonstreer finish: score exact naar 0.

## Minimale schermen

### Scherm 1 — Match setup

- Speler 1 naam
- Speler 2 naam
- Startscore: 501/301
- Startknop

### Scherm 2 — Live match

- Score speler 1
- Score speler 2
- Huidige speler
- Score-invoer
- Bevestig score
- Camera/mock snapshot paneel
- Beurtgeschiedenis
- Correctieknop

### Scherm 3 — Match summary

- Winnaar
- Eindscore
- Aantal beurten
- Historiek
- Nieuwe match starten

## Eerste user flow

```text
Start app
  -> Nieuwe match
  -> Spelers invoeren
  -> Startscore kiezen
  -> Match starten
  -> Huidige speler gooit
  -> Score invoeren
  -> Snapshot koppelen
  -> Score bevestigen
  -> Systeem berekent resterende score
  -> Bust of finish controleren
  -> Beurt wisselen
  -> Historiek tonen
  -> Correctie indien nodig
  -> Match eindigt bij score 0
  -> Summary tonen
```

## Niet-bouwen-lijst voor MVP

Deze lijst is belangrijk om scope creep te vermijden.

Voor Sprint 1 niet bouwen:

- echte camera-integratie als harde vereiste;
- AI-scoreherkenning;
- computer vision;
- bordkalibratie;
- gebruikersaccounts;
- backend met complexe rechten;
- betalingen;
- tornooimodule;
- mobiele app;
- officiële competitie-integraties.

## Acceptatiecriteria MVP

De MVP-scope is correct als:

- een volledige 501-leg gespeeld kan worden;
- scores correct worden bijgewerkt;
- bust en finish worden herkend;
- laatste score kan worden gecorrigeerd;
- beurtgeschiedenis zichtbaar is;
- snapshot/mock snapshot aan een beurt gekoppeld wordt;
- de demo begrijpelijk is voor een café- of clubuitbater.

## Commerciële rationale

Deze MVP is verkoopbaarder dan een pure AI-demo omdat hij meteen een herkenbaar probleem oplost:

- live overzicht;
- minder scorefouten;
- professionelere uitstraling;
- correcties zonder discussie;
- basis voor latere camera/AI-functionaliteit.

## Sprint 0.2 status

Sprint 0.2 is inhoudelijk klaar.

### Definitieve keuze

Start met een camera-assisted live scoreboard, niet met automatische herkenning.

### Volgende sprint

Sprint 0.3 — Technische projectkeuze maken.
