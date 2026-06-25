# Run 001 — Spike04 Manual Source Check

## Status

```text
status: community_forum_search_done
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
| 4 | Specialist | Nardi/Alfa classic specialist contacteren | pending |
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

## Belangrijkste blocking issue

```text
De aanvraag vermeldt alleen “Nardi Stuurwiel”. Voor een echte match is minimaal nodig: diameter, exacte Nardi-lijn/variant, 6-bouts/PCD, naaf/hub/adaptor en voorkeur origineel/repro/gebruikt.
```

## Stopregel

```text
max_active_search_time: 90 minuten
stop bij: lead_score >= 4, 5 kanalen zonder match, of blokkerende ontbrekende info
```

## Tussenresultaat na kanaal 3

```text
active_search_time: 50 minuten
channels_checked: 3
leads_found: 0 harde productleads, 4 specialist/community source leads
best_lead_score: 3
first_response_time: n.v.t.
blocking_issues: naaf/hub/diameter/variant ontbreken
recommended_next_action: kanaal 4 specialistvraag voorbereiden en gericht contact opnemen
```
