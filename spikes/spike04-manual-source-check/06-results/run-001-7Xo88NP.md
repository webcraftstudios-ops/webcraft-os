# Run 001 — Spike04 Manual Source Check

## Status

```text
status: google_broad_search_done
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
| 2 | Marketplace | eBay/Marktplaats/2dehands kandidaten | pending |
| 3 | Community/forum | Alfa Romeo Spider/Nardi kennis | pending |
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

### Belangrijkste blocking issue

```text
De aanvraag vermeldt alleen “Nardi Stuurwiel”. Voor een echte match is minimaal nodig: diameter, exacte Nardi-lijn/variant, 6-bouts/PCD, naaf/hub/adaptor en voorkeur origineel/repro/gebruikt.
```

## Stopregel

```text
max_active_search_time: 90 minuten
stop bij: lead_score >= 4, 5 kanalen zonder match, of blokkerende ontbrekende info
```

## Tussenresultaat na kanaal 1

```text
active_search_time: 20 minuten
channels_checked: 1
leads_found: 0 harde productleads, 3 specialist/source leads
best_lead_score: 3
first_response_time: n.v.t.
blocking_issues: naaf/hub/diameter/variant ontbreken
recommended_next_action: marketplace search + specialistvraag voorbereiden
```
