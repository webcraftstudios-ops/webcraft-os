# Roadmap — Darts Live Camera Support

## Fase 0 — Projectkader

Doel: voorkomen dat dit een te groot R&D-project wordt.

Taken:

- doelgroep kiezen;
- MVP-scope vastleggen;
- technische risico’s scheiden van verkoopbare demo;
- projectstructuur opzetten.

Output:

- README
- projectprompt
- MVP-specificatie
- eerste GitHub issue

## Fase 1 — Scoreboard Prototype

Doel: dartswedstrijd kunnen spelen zonder camera.

Functies:

- 501/301 match starten;
- spelers toevoegen;
- beurtinvoer;
- score aftrekken;
- bust-regels;
- winconditie;
- beurtgeschiedenis;
- scorecorrectie.

Waarom commercieel belangrijk:

Dit is al bruikbaar als live scorebord voor cafés, clubs of streams.

## Fase 2 — Camera Snapshot Support

Doel: camera toevoegen zonder automatische scoreherkenning als blocker.

Functies:

- snapshot nemen na beurt;
- snapshot koppelen aan turn;
- snapshot preview tonen;
- score manueel bevestigen;
- trainingsdata opslaan.

Waarom commercieel belangrijk:

Dit maakt het product onderscheidend en bouwt data op voor latere computer vision.

## Fase 3 — Demo UI

Doel: demo toonbaar maken aan niet-technische gebruikers.

Functies:

- grote scoreweergave;
- huidige speler duidelijk tonen;
- laatste 3 beurten;
- correctieknop;
- camera paneel;
- eenvoudige full-screen mode.

Waarom commercieel belangrijk:

Een café of club moet binnen enkele minuten begrijpen wat het oplevert.

## Fase 4 — Bordkalibratie

Doel: dartbord geometrisch herkennen.

Functies:

- bordcentrum aanduiden;
- rotatie bepalen;
- ringzones mappen;
- nummersegmenten mappen;
- kalibratie opslaan per setup.

Risico:

Belichting, hoek, lensvervorming en bordvariatie kunnen herkenning verstoren.

## Fase 5 — Semi-automatische scoring

Doel: scorevoorstel genereren, maar mens blijft eindbeslisser.

Functies:

- verschilbeeld voor/na beurt;
- dartkandidaten detecteren;
- coördinaten mappen naar segment;
- confidence score tonen;
- scorevoorstel bevestigen/corrigeren.

Waarom commercieel belangrijk:

Dit is de eerste echte AI-belofte zonder te doen alsof het foutloos is.

## Fase 6 — Producttest

Doel: testen in realistische omgeving.

Testlocaties:

- lokale dartclub;
- café met dartbord;
- thuissituatie met vaste camera.

Meten:

- tijd om setup te doen;
- aantal correcties;
- herkenningskwaliteit;
- gebruiksgemak;
- bereidheid om te betalen.

## Fase 7 — Productisering

Mogelijke pakketten:

### Setup service

Eenmalige installatie voor café of club.

### SaaS dashboard

Maandelijks abonnement voor scoring, historiek en statistieken.

### Tornooi pakket

Per event betalen voor scoreboard, camera support en schermweergave.

### Hardware bundel

Camera, mount, mini-pc en software als pakket.

## Eerstvolgende bouwstap

Maak een simpele webapp met:

- twee spelers;
- 501 scorelogica;
- score input;
- beurtgeschiedenis;
- correctieknop;
- mock camera snapshot paneel.

Pas daarna echte camera-integratie toevoegen.
