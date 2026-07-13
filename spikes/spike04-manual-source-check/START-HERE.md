# START HERE — Spike04

## Eerste doel

Start niet met breed zoeken. Start met één case:

```text
flow_id: 7Xo88NP
case: Alfa Romeo Spider 1990 — Nardi Stuurwiel
```

## Stap 1 — Open deze bestanden

```text
README.md
01-scope/spike04-scope.md
03-process/manual-sourcing-sop.md
05-testplan/testcases.md
05-testplan/sourcing-log-template.csv
06-results/findings-log.md
```

## Stap 2 — Controleer de case

Vul vóór zoeken dit in:

```text
flow_id:
merk:
model:
bouwjaar:
onderdeel:
variant/partnummer:
fotolink:
origineel/repro/maakt niet uit:
minimale conditie:
```

Als `variant/partnummer` of `fotolink` ontbreekt, mag de test doorgaan, maar log dit als onzekerheid.

## Stap 3 — Maak zoektermen

Voor `7Xo88NP` start je met:

```text
Alfa Romeo Spider 1990 Nardi stuurwiel
Alfa Romeo Spider Nardi steering wheel
Nardi steering wheel Alfa Spider
Nardi hub Alfa Romeo Spider 1990
Alfa Romeo Spider Nardi naaf
Nardi volante Alfa Romeo Spider
Alfa Spider Nardi Lenkrad
```

## Stap 4 — Log minimaal 5 kanaalpogingen

Gebruik het CSV-template en vul per poging in:

```text
channel
source_name
search_term
url_or_contact
result
lead_score
next_action
time_spent_minutes
notes
```

## Stap 5 — Beoordeel resultaat

Na de eerste run vul je in `06-results/findings-log.md`:

```text
case:
active_search_time:
channels_checked:
leads_found:
best_lead_score:
first_response_time:
blocking_issues:
recommended_next_action:
```

## Stopregel

Stop de eerste run na:

```text
90 minuten actieve zoektijd
of
1 sterke lead score 4-5
of
blokkerende ontbrekende informatie
```
