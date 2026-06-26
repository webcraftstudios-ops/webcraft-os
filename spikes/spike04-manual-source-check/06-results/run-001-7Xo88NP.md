# Run 001 — Spike04 Manual Source Check

## Status

```text
status: channel_1b_google_refined_done
started_at: 2026-06-26
last_updated_at: 2026-06-26
flow_id: 7Xo88NP
case: Alfa Romeo Spider 1990 — Nardi Stuurwiel
```

## Opened files

```text
README.md
01-scope/spike04-scope.md
03-process/manual-sourcing-sop.md
05-testplan/testcases.md
05-testplan/sourcing-log-template.csv
06-results/findings-log.md
```

## Case summary

```text
Ik zoek een Nardi stuurwiel voor een Alfa Romeo Spider uit 1990. Belangrijke details ontbreken nog: diameter, exacte Nardi-variant, naaf/hub/adaptor, staat, origineel/repro en eventuele foto of partnummer.
```

## Missing info check

| Check | Status | Opmerking |
|---|---|---|
| merk bekend | ok | Alfa Romeo |
| model bekend | ok | Spider |
| bouwjaar/periode bekend | ok | 1990 |
| onderdeel concreet genoeg | deels | Nardi stuurwiel is bruikbaar, maar variant/diameter/naaf ontbreken |
| conditie/origineel/repro bekend | onzeker | niet opgegeven |
| toestemming aanwezig | ok | case kwam uit complete consent-flow |

## Diagnose

De case is bruikbaar voor een eerste sourcingrun, maar de kans op valse leads is hoog zolang de naaf/hub en diameter ontbreken.

## Eerste zoektermen

```text
Alfa Romeo Spider 1990 Nardi stuurwiel
Alfa Romeo Spider Nardi steering wheel
Nardi steering wheel Alfa Romeo Spider 1990
Nardi hub Alfa Romeo Spider 1990
Alfa Romeo Spider Nardi naaf
Nardi volante Alfa Romeo Spider
Alfa Spider Nardi Lenkrad
Alfa Romeo Spider Series 4 Nardi steering wheel
```

## Kanaalpogingen gepland

| # | Kanaal | Doel | Status |
|---|---|---|---|
| 1 | Google brede search | oriënteren op termen, varianten, specialisten | done |
| 2 | Marketplace | eBay/Marktplaats/2dehands kandidaten | done |
| 3 | Community/forum | Alfa Romeo Spider/Nardi kennis | done |
| 4 | Specialist | Nardi/Alfa classic specialist contacteren | done |
| 1b | Google refined | refined search na specialist-informatie | done |
| 2b | Marketplace refined | refined marketplace search | pending |
| 5 | Breaker/parts supplier | gebruikte delen of stuur/naaf | pending |

## Kanaalpoging 1 — Google brede search

### Zoekdoel

Oriëntatie op:

- correcte modelcontext voor Alfa Romeo Spider 1990;
- Nardi stuurwielvarianten;
- hub/adapter/noodzakelijke compatibiliteitsinfo;
- eerste specialistische bronnen.

### Queries uitgevoerd

```text
Alfa Romeo Spider 1990 Nardi stuurwiel
Alfa Romeo Spider Nardi steering wheel
Nardi steering wheel Alfa Romeo Spider 1990
Nardi hub Alfa Romeo Spider 1990
Alfa Romeo Spider Series 4 Nardi steering wheel
Alfa Romeo Spider 105 115 Nardi steering wheel hub adapter
```

### Bevindingen

| Bron | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Alfa Romeo Spider modelcontext | reference | 1990 valt binnen de originele Spider-generatie; 1990/91-1993 is Series 4-context. | 2 | Gebruik `Series 4` en `105/115 Spider` als zoektermvarianten. |
| Nardi-Personal steering wheels | specialist/catalogus | Officiële Nardi site toont 133 steering-wheel producten, meerdere diameters en designlijnen, incl. Classic Line. | 3 | Mogelijke bron voor nieuw/repro of specificatiecontrole. |
| Nardi-Personal adapters | specialist/catalogus | Adapterproduct voor Nardi/Personal steering wheels op 70 mm PCD hub adapters; prijs op aanvraag. | 3 | Compatibiliteit met Alfa Spider hub/boss moet bevestigd worden. |
| Alfaholics | specialist | Alfa-specialist met 105/115 Spider parts-categorie voor 1968-1994 en contactkanaal. | 3 | Geschikt als specialistvraag voor stuurwiel/naafadvies. |

### Conclusie kanaal 1

Google brede search leverde nog geen harde marketplace-match of concrete verkoper op, maar wel drie nuttige sourcingrichtingen:

```text
1. zoektermen uitbreiden met Series 4 / 105/115 Spider
2. Nardi-Personal checken/contacten voor stuurwiel + adaptercompatibiliteit
3. Alfa-specialist contacteren voor hub/boss/naafadvies
```

## Kanaalpoging 2 — Marketplace search

### Zoekdoel

Controleren of er direct beschikbare marketplace-kandidaten zijn op of rond:

- eBay;
- Marktplaats;
- 2dehands;
- algemene geïndexeerde marketplace-resultaten.

### Queries uitgevoerd

```text
site:ebay.com Nardi steering wheel Alfa Romeo Spider
site:ebay.co.uk Nardi steering wheel Alfa Romeo Spider
site:marktplaats.nl Alfa Romeo Spider Nardi stuurwiel
site:2dehands.be Nardi stuurwiel Alfa Romeo Spider
Nardi steering wheel Alfa Romeo eBay
Nardi stuurwiel Alfa Romeo Marktplaats
Nardi stuurwiel Alfa Romeo 2dehands
Nardi Classic steering wheel Alfa Romeo Spider sale
Nardi hub Alfa Romeo Spider eBay
```

### Bevindingen

| Marketplace | Resultaat | Lead score | Actie |
|---|---|---:|---|
| eBay | Geen verifieerbare Spider-specifieke marketplace-listing gevonden via de beschikbare search-resultaten. | 1 | Later manueel in browser controleren met filters op locatie/wereldwijd. |
| Marktplaats | Geen verifieerbare Alfa Spider/Nardi match gevonden via geïndexeerde zoekresultaten. | 1 | Niet verder pushen in Spike04 zonder browser/UI-check. |
| 2dehands | Geen verifieerbare match gevonden via geïndexeerde zoekresultaten. | 1 | Niet verder pushen in Spike04 zonder browser/UI-check. |
| Brede search | Resultaten gingen vooral naar achtergrondinformatie over Nardi en Alfa Spider, niet naar concrete productlistings. | 1 | Marketplace-kanaal levert voorlopig geen harde lead. |

### Conclusie kanaal 2

Marketplace search leverde geen harde productlead op.

Belangrijk: dit betekent niet dat er geen aanbod bestaat. Het betekent alleen dat de beschikbare geïndexeerde websearch geen betrouwbare, citeerbare marketplace-match opleverde.

### Beslissing na kanaal 2

```text
marketplace_result: no_verified_product_lead
best_lead_score: 1
next_action: ga door naar community/forum of specialistvraag
```

## Kanaalpoging 3 — Community/forum search

### Zoekdoel

Controleren of er geschikte Alfa-communitykanalen bestaan om deze vraag gericht te stellen zonder persoonsgegevens van de aanvrager te delen.

### Queries uitgevoerd

```text
Alfa Romeo Spider community forum 105 115 owners club
Alfa Romeo 105 115 Spider forum owners club parts
Alfa Romeo Spider owners club forum parts
Alfa Romeo forum steering wheel Nardi Spider
Alfa Romeo Spider Nardi boss kit forum
Nardi steering wheel boss kit Alfa Romeo Spider 105 115
Alfa Romeo owners club forum Spider parts Nardi steering wheel
AlfaBB Alfa Romeo Spider forum parts
Facebook group Alfa Romeo Spider 105 115 parts
```

### Bevindingen

| Community | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Alfa Romeo Owners Club UK (AROC) | club/community | Heeft Community, Area Sections, Model Registers en een ledenforum. Site vermeldt model-register expertise en contactgegevens. | 3 | Geschikt voor vraag naar juiste Nardi-naaf/variant; mogelijk lidmaatschap nodig. |
| AROC Forum Index | forum | Forum is gelinkt vanuit members-sectie. Toegang lijkt leden/login-afhankelijk. | 2 | Alleen bruikbaar als account/lidmaatschap beschikbaar is. |
| AlfaOwner forum | community/forum candidate | Komt als externe Alfa-communitylink naar voren, maar directe opening via tool lukte niet. | 2 | Manueel in browser controleren. |
| AlfaBB | community/forum candidate | Bekende Alfa-community; directe toegang via tool geblokkeerd/niet leesbaar. | 2 | Manueel in browser controleren; mogelijk hoge waarde voor 105/115 kennis. |
| Facebookgroepen | social/community | Via geïndexeerde zoekresultaten geen betrouwbare concrete groep bevestigd. | 1 | Alleen manueel via Facebook zoeken; niet als citeerbare lead loggen. |

### Conclusie kanaal 3

Community/forum search leverde geen directe productlead op, maar wel een duidelijke community-route:

```text
AROC is de beste eerste communitytarget.
De vraag moet niet zijn “heeft iemand een Nardi stuurwiel?”, maar eerst:
“Welke Nardi wheel + hub/boss/adaptor past correct op een Alfa Romeo Spider 1990 / Series 4 / 105-115?”
```

### Aanbevolen communityvraag

```text
For a 1990 Alfa Romeo Spider Series 4 / 105-115, which Nardi steering wheel diameter and boss/hub/adaptor setup is correct? I am trying to verify compatibility before looking for a used or NOS Nardi wheel. Any part numbers, photos or supplier references would help.
```

### Beslissing na kanaal 3

```text
community_result: source_route_found_no_product_lead
best_lead_score: 3
next_action: specialistvraag voorbereiden met AROC/Nardi/Alfa-specialist inputfocus
```

## Kanaalpoging 4 — Specialist search

### Zoekdoel

Niet alleen zoeken naar voorraad, maar vooral de technische specificatie valideren:

- welke Nardi-lijn/diameter logisch is;
- welke hub/boss/adaptor nodig is;
- of Spider 1990 beter als Series 4, 105/115 Spider of 1968-1994 Spider moet worden gevraagd;
- of er een passend nieuw/repro/NOS/used alternatief bestaat.

### Queries uitgevoerd

```text
Alfa Romeo Spider 1990 Nardi steering wheel hub boss kit specialist
Alfa Romeo Spider 105 115 Nardi boss kit steering wheel specialist
Nardi Personal hub adapter Alfa Romeo Spider 105 115
Alfa Romeo Spider 1990 steering wheel boss kit Nardi
Classic Alfa steering wheel boss Alfa Spider 1990 Nardi
Alfaholics Nardi steering wheel Alfa Romeo Spider hub boss
```

### Bevindingen

| Specialist | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Nardi-Personal | fabrikant/specialist | Officiële Nardi-Personal site heeft 133 steering-wheel producten, filters op diameter en design, en aparte `Hubs & Adapters` producten. Contactgegevens zijn beschikbaar. | 4 | Beste specialist voor compatibiliteit en Nardi-variant/adaptorvraag. |
| Nardi-Personal hubs/adapters | fabrikant/specialist | Hubs & Adapters-categorie bevat `Adapters – 4300.00.000X` en `Hubs`, prijs op aanvraag. Geen directe Alfa Spider-fit bevestigd. | 4 | Vraag expliciet naar Alfa Romeo Spider 1990 / Series 4 / 105-115 compatibiliteit. |
| Alfaholics | Alfa-specialist | Alfaholics toont `105 & 115 Spider` parts voor 1968-1994 en vermeldt contactgegevens. | 4 | Beste Alfa-specialist voor 105/115 Spider-context en praktische montagevraag. |
| Classic Alfa / andere Alfa-specialisten | kandidaat-specialist | Via beschikbare search/tooling geen betrouwbare productpagina bevestigd. | 2 | Later manueel checken; niet als harde lead tellen. |

### Conclusie kanaal 4

Specialist search leverde geen harde productmatch op, maar wel twee sterke specialistleads:

```text
1. Nardi-Personal: officiële bron voor stuurwielvariant + hubs/adapters
2. Alfaholics: Alfa 105/115 Spider specialist voor bouwjaar/modelcontext en montageadvies
```

Belangrijk: kanaal 4 verhoogt de leadscore van 3 naar 4, maar als specialist/source lead, niet als directe productlead.

### Aanbevolen specialistvraag

```text
For a 1990 Alfa Romeo Spider Series 4 / 105-115, I am trying to identify a correct Nardi steering wheel setup before searching for a used or NOS wheel.

Could you confirm:
1. which Nardi steering wheel diameter/style is suitable;
2. which hub/boss/adaptor is required;
3. whether 105/115 Spider or Series 4 is the correct compatibility reference;
4. whether you can supply a suitable wheel/hub combination or recommend a part number/source?
```

### Beslissing na kanaal 4

```text
specialist_result: strong_specialist_source_leads_found
best_lead_score: 4
product_lead_found: no
specification_improved: yes
next_action: activate refinement loop, then run channel_1b_google_refined and channel_2b_marketplace_refined
```

## Specification refinement trigger

Kanaal 4 activeert officieel de refinement loop.

### Nieuwe specificatie

```text
zoek niet alleen op Nardi stuurwiel;
zoek op Nardi steering wheel + hub/boss/adaptor;
gebruik Alfa Romeo Spider Series 4 én 105/115 Spider;
controleer 1968-1994 Spider-compatibiliteit;
Nardi diameter/designlijn blijft open punt.
```

### Nieuwe refined zoektermen

```text
Alfa Romeo Spider Series 4 Nardi hub boss kit
Alfa Romeo Spider 105 115 Nardi hub adapter
Nardi Personal hub Alfa Romeo Spider 1990
Nardi steering wheel boss kit Alfa Romeo Spider 1968 1994
Alfa Romeo Spider 115 Nardi Classico hub
Nardi 70mm PCD Alfa Romeo Spider hub adapter
```

## Channel 1b — Google refined search

### Zoekdoel

De Google-search opnieuw uitvoeren met de verbeterde specificatie uit kanaal 4. Doel: niet opnieuw breed zoeken naar “Nardi stuurwiel”, maar controleren of de combinatie `Spider Series 4 / 105-115 + Nardi + hub/boss/adaptor` betere bronnen of leads oplevert.

### Queries uitgevoerd

```text
Alfa Romeo Spider Series 4 Nardi hub boss kit
Alfa Romeo Spider 105 115 Nardi hub adapter
Nardi Personal hub Alfa Romeo Spider 1990
Nardi steering wheel boss kit Alfa Romeo Spider 1968 1994
Alfa Romeo Spider 115 Nardi Classico hub
Nardi 70mm PCD Alfa Romeo Spider hub adapter
```

### Bevindingen

| Bron | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Alfa Romeo Spider modelcontext | reference | Refined terms bevestigen dat 1990 binnen 105/115 Spider-context valt en dat Series 4 vanaf 1990/91 relevant is; markt/regio kan bepalen of 1990 als Series 3 of 4 wordt gezien. | 2 | Intake moet markt/regio of chassis/context vragen als exact Series 4 cruciaal is. |
| Nardi-Personal adapter product | compatibility source | Adapter `4300.00.000X` laat Nardi/Personal steering wheels monteren op competitor hub adapters met 70 mm PCD. Geen directe Alfa Spider-fit bevestigd. | 4 | Sterke specificatiebron: zoek niet alleen wiel, maar wiel + 70 mm PCD/hub/boss compatibiliteit. |
| Nardi-Personal hubs/adapters | specialist/source | Hubs & Adapters-categorie heeft twee producten: `Adapters – 4300.00.000X` en `Hubs`, beide price on request. | 4 | Specialistcontact is nodig voor Alfa Spider hub/boss-fitment. |
| Nardi-Personal steering wheels | specialist/catalogus | Catalogus toont 133 steering wheels met filters op diameter en designlijn. | 4 | Vraag moet diameter/designlijn verplicht gaan onderscheiden. |
| Alfaholics | Alfa-specialist/source | Site toont `105 & 115 Spider` als parts-modelcategorie en geeft contactgegevens. | 4 | Geschikt om 1968-1994 Spider-compatibiliteit praktisch te laten bevestigen. |

### Analyse refined search

Refined Google search verbeterde de bronkwaliteit, maar leverde nog geen harde productlead op.

De belangrijkste verbetering is inhoudelijk:

```text
Origineel zoeken: Nardi stuurwiel Alfa Spider
Refined zoeken: Nardi stuurwiel + hub/boss/adaptor + 105/115/Series 4 + 70 mm PCD
```

Hierdoor is duidelijker geworden dat Classic Parts Finder bij dit type aanvraag minstens twee subvragen moet behandelen:

```text
1. Welk Nardi-stuur past esthetisch/technisch?
2. Welke hub/boss/adaptor maakt montage op deze Alfa Spider mogelijk?
```

### Beslissing na channel 1b

```text
refinement_source: kanaal 4 specialist search
new_terms: Series 4, 105/115 Spider, hub, boss, adaptor, 70 mm PCD
channels_retried: Google
lead_score_before: 3-4 source leads, 0 product leads
lead_score_after: 4 source leads, 0 product leads
was_search_improved: yes, inhoudelijk; no, directe productlead
next_action: channel_2b_marketplace_refined of eerst specialistcontact voorbereiden
```

## Belangrijkste blocking issue

```text
De aanvraag vermeldt alleen “Nardi Stuurwiel”. Voor een echte match is minimaal nodig: diameter, exacte Nardi-lijn/variant, 6-bouts/PCD, naaf/hub/adaptor en voorkeur origineel/repro/gebruikt.
```

## Stopregel

```text
max_active_search_time: 90 minuten
stop bij: lead_score >= 4, 5 kanalen zonder match, of blokkerende ontbrekende info
```

## Tussenresultaat na channel 1b

```text
active_search_time: 83 minuten
channels_checked: 5 incl. refined Google
leads_found: 0 harde productleads, 4 sterke specialist/source leads
best_lead_score: 4
first_response_time: n.v.t.
blocking_issues: naaf/hub/diameter/variant ontbreken
specification_refinement_done: yes
recommended_next_action: channel_2b_marketplace_refined, maar strak max 7 minuten binnen 90-minutenlimiet
```
