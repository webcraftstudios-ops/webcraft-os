# Tally Redirect Checklist

Gebruik deze checklist per formulier. Doel: controleren dat `flow_id` doorheen de volledige intake behouden blijft.

## Formulier 1 — Persoon

| Check | Verwachting | Status | Issue |
|---|---|---|---|
| Formulier ontvangt of genereert `flow_id` | ja | todo |  |
| Raw tab bevat `flow_id` | ja | todo |  |
| Redirect naar formulier 2 | ja | todo |  |
| Redirect bevat `?flow_id=@flow_id` | ja | todo |  |
| Geen oude script-URL | ja | todo |  |

## Formulier 2 — Auto

| Check | Verwachting | Status | Issue |
|---|---|---|---|
| Formulier ontvangt `flow_id` | ja | todo |  |
| Raw tab bevat `flow_id` | ja | todo |  |
| Redirect naar formulier 3 | ja | todo |  |
| Redirect bevat `?flow_id=@flow_id` | ja | todo |  |
| Geen oude script-URL | ja | todo |  |

## Formulier 3 — Onderdeelzoekertje

| Check | Verwachting | Status | Issue |
|---|---|---|---|
| Formulier ontvangt `flow_id` | ja | todo |  |
| Raw tab bevat `flow_id` | ja | todo |  |
| Redirect naar formulier 4 | ja | todo |  |
| Redirect bevat `?flow_id=@flow_id` | ja | todo |  |
| Geen oude script-URL | ja | todo |  |

## Formulier 4 — Toestemming

| Check | Verwachting | Status | Issue |
|---|---|---|---|
| Formulier ontvangt `flow_id` | ja | todo |  |
| Raw tab bevat `flow_id` | ja | todo |  |
| Eindredirect correct | ja | todo |  |
| Geen oude script-URL | ja | todo |  |

## Algemene controle

- Gebruik alleen `flow_id` als URL-parameter.
- Stuur geen `person_id`, `car_id`, `ad_id` of `consent_id` via URL.
- Leid object-ID's af in Google Sheets.
- Test elke redirect afzonderlijk.
- Test daarna de volledige flow.

## Testbewijs

Vul per flow in:

```text
flow_id:
formulier 1 raw aanwezig: ja/nee
formulier 2 raw aanwezig: ja/nee
formulier 3 raw aanwezig: ja/nee
formulier 4 raw aanwezig: ja/nee
case_view aanwezig: ja/nee
case_complete:
status:
next_action:
issue:
```
