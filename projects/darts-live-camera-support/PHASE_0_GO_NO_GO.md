# Fase 0 — Go/No-Go Samenvatting

## Project

Darts Live Camera Support System

## Fase 0 doel

Voorkomen dat het project te snel verandert in een zwaar computer-vision R&D-traject. Eerst moest duidelijk worden:

- voor wie dit waardevol is;
- welke MVP verkoopbaar en bouwbaar is;
- welke techniek volstaat voor een eerste demo;
- hoe de eerste validatie gebeurt;
- wat expliciet niet gebouwd wordt.

## Sprintstatus

- Sprint 0.1 — Commerciële scope: klaar
- Sprint 0.2 — MVP-scope: klaar
- Sprint 0.3 — Technische projectkeuze: klaar
- Sprint 0.4 — Demo- en validatieplan: klaar

## 1. Gekozen doelgroep

Primaire doelgroep:

> Lokale dartclubs en cafés met georganiseerde dartavonden of kleine tornooien.

Waarom deze doelgroep:

- meer scoremomenten dan thuisspelers;
- meer kans op scorefouten en discussie;
- duidelijke waarde van groot scorebord op scherm;
- organisatorische nood aan overzicht;
- hogere kans op betaling via club, café of event;
- betere ingang voor testavond.

Secundaire doelgroep later:

- kleine tornooiorganisatoren;
- cafés die darts als activiteit promoten;
- streamers of spelers die een eenvoudige score overlay willen.

Niet als eerste doelgroep:

- recreatieve thuisspelers.

Reden:

- lagere urgentie;
- lagere betaalbereidheid;
- sneller tevreden met gratis apps;
- minder behoefte aan schermweergave of clubhistoriek.

## 2. Gekozen MVP

Definitieve MVP-richting:

> Een camera-assisted live darts scoreboard, niet een volledig automatisch image-recognition systeem.

De eerste MVP moet kunnen:

- 501-match tussen twee spelers starten;
- spelers invoeren;
- live scorebord tonen;
- huidige speler tonen;
- score per beurt invoeren;
- score automatisch aftrekken;
- bust detecteren;
- finish detecteren;
- beurtgeschiedenis tonen;
- laatste score corrigeren of terugdraaien;
- mock snapshot of camera snapshot-paneel tonen;
- snapshot koppelen aan een beurt;
- match demo binnen 2 minuten tonen.

Eerste MVP-belofte:

> Een live darts scoreboard met camera-assisted turn logging: scores worden manueel ingevoerd of bevestigd, snapshots worden per beurt gekoppeld en correcties zijn snel mogelijk.

## 3. Technische keuze

Definitieve technische keuze:

> Start met een Next.js + TypeScript + Tailwind webapp-prototype zonder verplichte backend. Gebruik lokale state en mock snapshots. Houd scorelogica apart in een pure module zodat camera/computer vision later kan aansluiten.

Fase 1 stack:

- Next.js;
- TypeScript;
- Tailwind CSS;
- lokale state;
- optioneel localStorage;
- pure score engine module;
- mock snapshot paneel;
- geen database verplicht;
- geen echte camera verplicht.

Belangrijk architectuurprincipe:

- scorelogica los van UI;
- match state duidelijk gescheiden;
- snapshots als aparte entiteit;
- camera/computer vision later als extra laag aansluiten.

Latere uitbreidingsrichting:

- browser camera via `getUserMedia`;
- snapshot capture;
- upload/storage;
- Supabase/Postgres;
- OpenCV verschilbeeld;
- segment mapping;
- confidence score;
- menselijke bevestiging.

## 4. Validatieplan

Eerste validatie test niet of AI perfect werkt.

Eerste validatie test:

- is live scoreboard waardevol tijdens dartavond of klein tornooi;
- vermindert snelle correctie discussie;
- is camera snapshot per beurt nuttig als concept;
- wil een café/club dit één avond testen;
- welke prijsrichting voelt logisch.

Testdoel:

- 5 gesprekken;
- minstens 2 demo’s tonen;
- minstens 1 partij bereid vinden voor een testavond.

Demo duurt maximaal 2 minuten:

1. context: huidige scoreproblemen;
2. match starten met twee spelers;
3. 501 scoreflow tonen;
4. correctie tonen;
5. snapshot-paneel tonen;
6. feedback vragen.

Eerste prijs-/pakkettests:

- Clubavond Scoreboard: €19–€49/maand;
- Tornooiavond: €49–€149/event;
- Setup-service: €149–€399 eenmalig.

Deze prijzen zijn alleen validatiehypotheses, geen finale prijszetting.

## 5. Expliciete niet-bouwen-lijst

Niet bouwen in Fase 1:

- automatische dartpuntdetectie;
- automatische segmentherkenning;
- multi-camera setup;
- bordkalibratie;
- OpenCV-integratie;
- AI-scoreherkenning;
- login/accounts;
- betalingen;
- cloud sync;
- tornooibrackets;
- officiële competitie-integraties;
- mobiele native app;
- geavanceerde statistieken;
- streaming overlay;
- hardwarebundel.

Waarom niet:

- verhoogt complexiteit;
- vertraagt demo;
- leidt af van commerciële validatie;
- maakt het project te snel R&D in plaats van verkoopbare MVP.

## 6. Go/No-Go beslissing

Beslissing:

> GO naar Fase 1 — Scoreboard Prototype.

Reden:

- doelgroep is concreet genoeg;
- probleem is herkenbaar;
- MVP is klein genoeg;
- technische route is haalbaar;
- eerste demo kan zonder zware camera/AI gebouwd worden;
- validatiepad is helder.

## 7. Fase 1 doel

Fase 1 bouwt het eerste werkende scoreboard prototype.

Doel:

> Een volledige 501-leg tussen twee spelers kunnen spelen in een browserdemo, met correcte scorelogica, bust/finish, beurtgeschiedenis, correctie en mock snapshot-paneel.

## 8. Fase 1 build-issues

Fase 1 wordt opgesplitst in build-issues:

1. Project scaffold aanmaken
2. TypeScript datamodel toevoegen
3. Score engine bouwen
4. Match setup UI bouwen
5. Live scoreboard UI bouwen
6. Score input en beurtflow bouwen
7. Turn history bouwen
8. Correctieflow bouwen
9. Mock snapshot paneel bouwen
10. Demo flow en acceptatietest toevoegen

## 9. Fase 1 exitcriteria

Fase 1 is klaar wanneer:

- een 501-match gestart kan worden;
- twee spelers zichtbaar zijn;
- score-invoer werkt;
- scores correct worden afgetrokken;
- bust correct wordt verwerkt;
- finish correct wordt herkend;
- beurtgeschiedenis zichtbaar is;
- laatste score gecorrigeerd kan worden;
- mock snapshot aan beurt gekoppeld wordt;
- demo in minder dan 2 minuten uitlegbaar is.

## Eindstatus Fase 0

Fase 0 is afgerond.

Volgende stap:

> Start Fase 1 — Scoreboard Prototype.
