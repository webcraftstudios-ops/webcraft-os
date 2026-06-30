# Darts Live Camera Support System

Project voor een commercieel haalbaar darts live camera support systeem.

## Productidee

Een systeem dat echte dartswedstrijden ondersteunt met camera-assisted scoring. Het systeem herkent of ondersteunt de herkenning van worpen op een echt dartbord, koppelt scores aan spelers en toont live score-informatie per spel.

## Belangrijk uitgangspunt

De snelste verkoopbare route is niet meteen volledig automatische scoreherkenning, maar een hybride MVP:

- camera maakt beeld na elke beurt;
- systeem doet een scorevoorstel;
- speler of marker bevestigt of corrigeert;
- correcties worden bewaard als trainingsdata.

## Doelgroep

Eerste kansrijke doelgroepen:

1. dartclubs;
2. cafés met dartsactiviteiten;
3. kleine tornooiorganisatoren;
4. recreatieve spelers die hun wedstrijden willen streamen of bijhouden.

## MVP-richting

De eerste versie moet vooral aantonen dat het systeem nuttig is aan de oche, niet dat computer vision al perfect werkt.

Essentieel:

- spelers beheren;
- 501/301 spel starten;
- live scorebord;
- handmatige scorecorrectie;
- camera snapshot per beurt;
- scorevoorstel of markering;
- beurt- en matchhistoriek;
- eenvoudige demo-interface.

Niet essentieel in eerste versie:

- perfecte automatische dartdetectie;
- meerdere camera’s;
- volledige tornooiplanning;
- mobiele app;
- cloud accounts;
- betalingen;
- streamingintegratie.

## Projectfasen

1. Conceptvalidatie
2. Scoreboard MVP
3. Camera-assisted scoring
4. Bordkalibratie
5. Segmentdetectie
6. Dartdetectie
7. Demo bij club/café
8. Productisering

## Mogelijke winstpaden

- setup-service voor cafés/clubs;
- SaaS scoring dashboard;
- hardware + software pakket;
- tornooi scoring service;
- white-label score overlay;
- trainingsdata/detectiemodel als technisch asset.
