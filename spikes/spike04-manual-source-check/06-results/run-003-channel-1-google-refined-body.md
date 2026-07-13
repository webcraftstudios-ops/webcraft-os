# Run 003 — Channel 1 Google Refined Body

## Status

```text
status: done
flow_id: R003_BODY_MUSTANG_BUMPER_RIGHT
case: Ford Mustang Fastback 1965-1966 — Originele chromen achterbumper rechter deel
channel: channel_1_google_refined_body
scope: Spike04 only
```

## Zoekdoel

Niet breed zoeken naar `Mustang bumper`, maar controleren of de categoriegerichte details meteen betere zoekrichting geven:

```text
Ford Mustang Fastback + 1965-1966 + rear bumper + chrome + right/right side + original/used + brackets/rubbers/bolts
```

## Queries uitgevoerd

```text
1965 1966 Ford Mustang Fastback rear bumper right chrome original
1965 Mustang rear bumper right side chrome used
1966 Mustang rear bumper end right chrome original
Ford Mustang 1965 1966 rear bumper right chrome NOS used
Mustang Fastback 1965 1966 rear bumper chrome brackets right
Mustang 1965 rear bumper chrome right part
Mustang 1966 rear bumper right side chrome
Ford Mustang 65 66 rear bumper chrome used right
```

## Bevindingen

| Bron/route | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Mustang modelcontext | reference | 1965-1966 past in eerste generatie Mustang; Fastback is een relevante body style. | 2 | Houd `1965-1966`, `Fastback`, `first generation` in search terms. |
| Body-year context | reference | 1965 en 1966 hebben uiterlijke verschillen; bouwjaar/periode blijft belangrijk voor body/exterior search. | 2 | Jaar/context niet vereenvoudigen naar alleen `classic Mustang`. |
| Right-side bumper search | search | Geen hard bewijs dat `rear bumper right part` de juiste onderdeelstructuur is. Zoekresultaten blijven ambigu tussen compleet bumperdeel, bumper end/quarter, bracket of trim. | 1 | Intake moet vragen of het om volledig bumperdeel, bumper end, bracket, guard, rubber of trim gaat. |
| Brackets/rubbers search | search | Gerelateerde onderdelen zijn relevant: beugels, bouten, rubbers, guards/trim. | 2 | Category helper voor body_exterior moet related mounting parts explicieter maken. |

## Analyse channel 1

De categoriegestuurde intake hielp snel om de zoekrichting te bepalen, maar legde ook een zwakke plek bloot:

```text
De case zegt `rechter deel achterbumper`, maar voor sourcing is niet duidelijk of dit een bumperhelft, bumper end, bracket, rubber, guard, trim of volledige achterbumper betekent.
```

Dat is een betere diagnose dan breed verder zoeken.

## Nieuwe refined termen na channel 1

```text
1965 1966 Mustang rear bumper chrome complete used
1965 Mustang rear bumper chrome brackets
1966 Mustang rear bumper mounting brackets
1965 Mustang rear bumper guards chrome
1965 1966 Mustang rear bumper hardware kit
1965 Mustang Fastback rear bumper chrome used original
1966 Mustang rear bumper chrome original used
1965 1966 Mustang rear bumper end right
```

## Beslissing na channel 1

```text
channel_1_result: context_found_no_product_lead
lead_score_best: 2
hard_product_lead_found: no
category_intake_helped: yes
next_action: channel_2_marketplace_refined_body
```

## Intake-impact

Voor `body_exterior` is de bestaande helper goed, maar Run 003 toont dat ze scherper mag vragen naar:

```text
volledig onderdeel versus deelstuk
beugels/bouten/rubbers nodig ja/nee/onbekend
body style compatibiliteit
staat: roestvrij, deukvrij, herchroomd toegestaan
verzending/afstand wegens groot onderdeel
```
