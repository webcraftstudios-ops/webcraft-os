# Run 004 — Channel 2 Source Category Detection

## Status

```text
status: done
flow_id: R004_CODE_0261S01070
case: Onderdeelcode 0261S01070
channel: channel_2_source_category_detection
scope: Spike04 only
```

## Zoekdoel

Bepalen of de code een broncategorie en interne subcategorie oplevert, zelfs wanneer de externe websearch geen productlead geeft.

## Input uit user-observed source

De gebruiker gaf een used-parts interface-output met:

```text
0261S01070 - pièces de voiture d'occasion par code
```

En één resultaat onder:

```text
Dispositifs / interrupteurs / système électronique: 1
```

Andere hoofdcategorieën stonden op 0.

## Categorie-detectie

| Veld | Waarde | Confidence | Opmerking |
|---|---|---|---|
| source_category_detected | Dispositifs / interrupteurs / système électronique | medium | Gebaseerd op user-observed interface-output, niet onafhankelijk via indexed search bevestigd. |
| subcategory_hint_internal | electrical_electronics | medium | Past beter dan `lighting_electrical`, omdat de broncategorie over schakelaars/elektronica gaat. |
| top_level_customer_category | unknown_or_electrical | low/medium | Zonder voertuig of onderdeeltype niet klantvriendelijk genoeg. |
| code_search_first | yes | high | Code was de beste beschikbare input. |

## Analyse

Run 004 toont een nuance:

```text
Code-first is niet altijd een directe productlead-route.
Code-first kan wel sneller een waarschijnlijke broncategorie geven wanneer een broninterface categorie-output toont.
```

Maar zonder productdetail blijft het risico hoog dat de code een intern platformnummer of niet-unieke code is.

## Beslissing na channel 2

```text
channel_2_result: source_category_detected_from_user_observed_source
source_category_detected: Dispositifs / interrupteurs / système électronique
subcategory_hint_internal: electrical_electronics
confidence: medium
lead_score_best: 3
hard_product_lead_found: no
source_lead_found: yes_category_route
next_action: channel_3_vehicle_fitment_check
```

## Intake-impact

Toevoegen aan intake/proces:

```text
part_number_or_code
source_category_detected
subcategory_hint_internal
code_source_context
```

Helpertekst:

```text
Staat er een onderdeelnummer, OE-nummer, leverancierscode of platformcode op het onderdeel? Vul die exact over en vermeld waar je die code vond.
```
