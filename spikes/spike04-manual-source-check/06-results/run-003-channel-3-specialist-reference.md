# Run 003 — Channel 3 Specialist Reference Check

## Status

```text
status: done
flow_id: R003_BODY_MUSTANG_BUMPER_RIGHT
case: Ford Mustang Fastback 1965-1966 — Originele chromen achterbumper rechter deel
channel: channel_3_specialist_reference_if_needed
scope: Spike04 only
```

## Zoekdoel

Geen specialist mailen en geen aankoop doen. Alleen bepalen welke referentie- of specialistvraag nodig is om de juiste bumperstructuur en compatibiliteit te bepalen.

## Input uit channel 1 en 2

```text
onderdeel_categorie: body_exterior
secondary_category_hint: chrome_trim
onderdeel: rechter deel chromen achterbumper
voertuig: Ford Mustang Fastback
periode: 1965-1966
conditie: roestvrij, lichte krassen toegestaan
budget: tot €300
probleem: geen foto, geen partnummer, onzeker of `rechter deel` correcte parts-structuur is
```

## Reference checks uitgevoerd

```text
Ford Mustang first-generation context
1965-1966 body style context
rear bumper / bumper hardware terminology
Mustang specialist catalogue route search
```

## Bevindingen

| Route | Bevinding | Lead score | Actie |
|---|---|---:|---|
| Mustang first-generation reference | 1965-1966 valt binnen eerste generatie; body styles zoals fastback zijn relevant. | 2 | Context behouden. |
| Body style/year reference | 1965 en 1966 hebben zichtbare exterieurverschillen; niet te breed maken naar alle classic Mustangs. | 2 | Jaar/periode behouden. |
| Bumper terminology reference | `rechter deel` is te ambigu voor sourcing; mogelijke interpretaties zijn complete bumper, bumper end, bracket, guard, rubber, bolt kit of trim. | 3 | Intake-helper aanscherpen. |
| Specialist catalogue route | Logische volgende bron is Mustang-parts catalogus of specialistreference, niet extra marketplace zonder betere specs. | 3 | Eerst specificatie verbeteren. |

## Analyse

Run 003 levert geen productlead op, maar bevestigt de waarde van category-based intake voor body/exterior.

De grootste commerciële les is:

```text
Voor carrosserie- en chroomdelen is niet alleen het hoofdonderdeel belangrijk, maar ook de samenstelling van de set en de staat/verzendbaarheid.
```

## Intake-impact

De body/exterior helper moet explicieter worden:

```text
Zoek je het volledige onderdeel of een deelstuk? Gaat het om links/rechts, voor/achter, chroom of lak? Zijn beugels, bouten, rubbers, clips of sierdelen nodig? Is de staat roestvrij/deukvrij/herchroomd belangrijk? Is verzending of afstand een probleem?
```

## Beslissing na channel 3

```text
channel_3_result: intake_helper_update_needed
lead_score_best: 3
hard_product_lead_found: no
source_lead_found: yes_reference_route
category_intake_helped: yes
recommended_next_action: pause Run 003 active search and update body_exterior helper
```

## Scopebewaking

```text
Geen aankoop.
Geen betaling.
Geen extra specialistmail.
Geen scraping.
Geen webshopwijziging.
Geen klantbelofte.
```
