# MVP Specificatie — Darts Live Camera Support

## MVP-doel

Een werkende demo bouwen die live darts scoring ondersteunt met camera-assistentie, zonder afhankelijk te zijn van perfecte automatische beeldherkenning.

## MVP-positionering

Eerste verkoopbare belofte:

> Minder scorefouten, meer overzicht en een professionelere wedstrijdervaring voor cafés, clubs en kleine tornooien.

## Kerngebruikers

- Speler
- Marker/scheidsrechter
- Clubverantwoordelijke
- Café-uitbater
- Tornooiorganisator

## Must-have functies

### 1. Game setup

- Nieuwe match starten
- Speler 1 en speler 2 toevoegen
- Startscore kiezen: 301 of 501
- Huidige speler tonen
- Beurt wisselen na drie darts

### 2. Scoreboard

- Resterende score per speler
- Score-invoer per beurt
- Bust-detectie
- Leg gewonnen bij correcte finish
- Historiek van beurten

### 3. Camera-assisted input

- Snapshot nemen na een beurt
- Snapshot koppelen aan speler en beurt
- Scorevoorstel tonen als optioneel veld
- Mens bevestigt of corrigeert score

### 4. Correctieflow

- Laatste score aanpassen
- Beurt terugdraaien
- Correctie loggen

### 5. Demo-modus

- Voorbeeldwedstrijd kunnen tonen zonder echte camera
- Mock snapshots of testbeelden gebruiken
- Snel toonbaar aan café/club

## Should-have functies

- Checkout-suggesties
- Player averages
- Darts per leg
- Export van matchhistoriek
- Basis overlay voor scherm of stream

## Later bouwen

- Volledige automatische dartdetectie
- Multi-camera triangulatie
- Tornooibrackets
- Accounts en rollen
- Betalingen
- Mobile native app
- Geavanceerde statistieken

## Technische MVP-architectuur

### Frontend

- Webapp
- Live scoreboard
- Score input
- Camera/snapshot paneel
- Matchhistoriek

### Backend

- Match state API
- Score calculation service
- Snapshot upload endpoint
- Event/history storage

### Computer vision laag

Fase 1: geen harde afhankelijkheid.

Fase 2:
- bordkalibratie;
- segment mapping;
- verschilbeeld voor/na beurt;
- confidence score;
- menselijke bevestiging.

## Datamodel eerste versie

### Player

- id
- name

### Match

- id
- game_type
- starting_score
- status
- current_player_id
- created_at

### Turn

- id
- match_id
- player_id
- entered_score
- suggested_score
- confirmed_score
- is_bust
- snapshot_url
- created_at

### Correction

- id
- turn_id
- old_score
- new_score
- reason
- created_at

## Succescriteria MVP

Een demo is bruikbaar wanneer:

- een 501-match volledig gespeeld kan worden;
- scores correct worden afgetrokken;
- bust en finish correct werken;
- snapshots aan beurten gekoppeld worden;
- correcties eenvoudig zijn;
- het aan een club/café getoond kan worden binnen 2 minuten uitleg.

## Eerste commerciële test

Niet verkopen als AI-perfectie.

Wel testen met pitch:

> Ik bouw een darts score-assistent voor cafés en clubs. Eerste versie geeft live scoreboard, camera snapshots per beurt en foutcorrectie. De AI-detectie groeit mee op basis van echte wedstrijden.

Validatievragen:

1. Zouden jullie dit gebruiken tijdens clubavonden of tornooien?
2. Waar gebeuren vandaag de meeste scorefouten?
3. Is live scoreboard op een scherm nuttig?
4. Zou camera-replay of matchhistoriek waarde hebben?
5. Wat zou dit waard zijn per maand, per tornooi of per installatie?
