# Run 001 — Spike04 Manual Source Check

## Status

```text
status: case_prepared
started_at: 2026-06-26
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
| 1 | Google brede search | oriënteren op termen, varianten, specialisten | pending |
| 2 | Marketplace | eBay/Marktplaats/2dehands kandidaten | pending |
| 3 | Community/forum | Alfa Romeo Spider/Nardi kennis | pending |
| 4 | Specialist | Nardi/Alfa classic specialist contacteren | pending |
| 5 | Breaker/parts supplier | gebruikte delen of stuur/naaf | pending |

## Stopregel

```text
max_active_search_time: 90 minuten
stop bij: lead_score >= 4, 5 kanalen zonder match, of blokkerende ontbrekende info
```

## Resultaatvelden

```text
active_search_time:
channels_checked:
leads_found:
best_lead_score:
first_response_time:
blocking_issues:
recommended_next_action:
```
