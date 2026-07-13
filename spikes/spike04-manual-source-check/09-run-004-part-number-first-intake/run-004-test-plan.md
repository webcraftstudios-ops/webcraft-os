# Run 004 Test Plan — Part Number First Intake

## Status

```text
status: prepared
run: Run 004
flow_id: R004_CODE_0261S01070
scope: Spike04 only
```

## Doel

Testen of een `part_number_or_code`-first route sneller tot classificatie en sourcingroute leidt dan vrije tekst of category-first intake.

## Hypothese

```text
Een onderdeelcode reduceert interpretatieverlies.
```

Wanneer een gebruiker een code heeft, moet de intake niet eerst vragen naar brede categorieën, maar eerst zoeken op code en daarna pas fitment verfijnen.

## Testcase

```text
input_code: 0261S01070
observed_source_category: Dispositifs / interrupteurs / système électronique
subcategory_hint_internal: electrical_electronics
vehicle_known: no
```

## Nieuwe velden onder test

```text
part_number_or_code
source_category_detected
subcategory_hint_internal
code_search_first
vehicle_fitment_required_after_code_search
```

## Kanaalplan

| # | Kanaal | Doel | Stopconditie |
|---|---|---|---|
| 1 | channel_1_code_search | zoeken op exacte code | categorie of onderdeeltype gevonden |
| 2 | channel_2_source_category_detection | broncategorie bepalen | source_category_detected ingevuld |
| 3 | channel_3_vehicle_fitment_check | voertuigfitment of noodzakelijke fitment-vraag bepalen | fitment gevonden of missing-info duidelijk |

## Meetpunten

```text
time_to_first_category_detection_minutes:
time_to_first_source_route_minutes:
code_match_found: yes/no
source_category_detected:
subcategory_hint_internal:
vehicle_fitment_found: yes/no
vehicle_fitment_missing_info:
best_lead_score:
hard_product_lead_found:
source_lead_found:
free_text_ambiguity_reduced: yes/no
```

## Scoring

```text
lead_score_5: exacte productlead met code, voertuigfitment, prijs/contact en beschikbaarheid
lead_score_4: sterke sourcelead of catalogusmatch met code en vermoedelijk onderdeeltype
lead_score_3: code classificeert categorie maar geen hard product/fitment
lead_score_2: code geeft alleen zwakke context of alternatieve categorie
lead_score_1: code levert geen bruikbare match
```

## Success criteria

Run 004 is nuttig als minstens één van deze waar is:

```text
source_category_detected binnen 10 minuten
subcategory_hint_internal duidelijker dan vrije tekst
vehicle_fitment_missing_info expliciet bepaald
lead_score >= 3 via code route
bewijs dat code-first minder ambigu is dan category-first
```

## Stopregels

```text
max_active_search_time: 45 minuten
stop bij lead_score >= 4
stop als code alleen categorie oplevert maar geen fitment
stop als duidelijk is welke extra voertuiggegevens nodig zijn
stop als code niet uniek genoeg is zonder foto/leverancier/OE-context
```

## Beslissing na Run 004

```text
if code-first classifies faster:
    add part_number_or_code to intake prototype
    add code_search_first status logic
elif code is ambiguous without vehicle:
    add helper asking for vehicle + photo + exact code source
else:
    keep part_number_or_code optional but do not prioritize yet
```

## Niet doen

```text
Geen aankoop.
Geen betaling.
Geen specialistmail als eerste stap.
Geen scraping.
Geen webshopwijziging.
Geen klantbelofte.
Geen Spike05.
```
