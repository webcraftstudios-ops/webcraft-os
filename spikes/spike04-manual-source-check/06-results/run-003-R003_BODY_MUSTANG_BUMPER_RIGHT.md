# Run 003 — Spike04 Intake Prototype Test

## Status

```text
status: prepared_not_started
started_at:
last_updated_at: 2026-06-26
flow_id: R003_BODY_MUSTANG_BUMPER_RIGHT
case: Ford Mustang Fastback 1965-1966 — Originele chromen achterbumper rechter deel
category_code: body_exterior
secondary_category_hint: chrome_trim
```

## Doel

Testen of de categoriegestuurde intake ook werkt voor `body_exterior`, een categorie waarbij fitment, staat, zijde/deel, bevestigingspunten en verzendbaarheid belangrijk zijn.

## Case summary

```text
Ik zoek het rechter deel van een originele chromen achterbumper voor een Ford Mustang Fastback 1965-1966. Roestvrij gewenst, lichte krassen toegestaan. Budget tot €300. Onduidelijk of beugels, bouten, rubbers of aansluitende sierdelen nodig zijn.
```

## Intake v0

```text
merk: Ford
model: Mustang Fastback
bouwjaar_of_periode: 1965-1966
onderdeel_omschrijving: Originele chromen achterbumper, rechter deel
onderdeel_categorie: body_exterior
secondary_category_hint: chrome_trim
category_specific_details: Rechter deel van een originele chromen achterbumper voor Ford Mustang Fastback 1965-1966. Roestvrij gewenst, lichte krassen zijn aanvaardbaar. Onduidelijk of bevestigingsbeugels, rubbers, bouten of aansluitende sierdelen nodig zijn. Geen foto of partnummer beschikbaar. Budget tot €300.
foto_of_partnummer_available: no
origineel_repro_used: origineel of gebruikt
compatibiliteit_onzeker: onbekend
```

## Category-specific helper used

```text
Gaat het om links/rechts, voor/achter, volledig paneel of reparatiestuk, chroom of lak, en zijn bevestigingspunten/beugels nodig?
```

## Detailkwaliteit

```text
category_detail_quality: usable
```

## Missing info check

| Check | Status | Opmerking |
|---|---|---|
| merk bekend | ok | Ford |
| model bekend | ok | Mustang Fastback |
| bouwjaar/periode bekend | ok | 1965-1966 |
| onderdeelcategorie bekend | ok | body_exterior |
| secundaire categorie | ok | chrome_trim |
| onderdeel concreet genoeg | ok | rechter deel achterbumper |
| zijde/deel bekend | ok | rechter deel |
| materiaal/afwerking bekend | ok | chroom |
| conditie-eis bekend | ok | roestvrij, lichte krassen toegestaan |
| budget bekend | ok | tot €300 |
| foto/partnummer aanwezig | nee | verzwakt matchzekerheid |
| beugels/bouten/rubbers nodig | onbekend | belangrijk voor complete match |
| Fastback vs Coupe/Convertible compatibiliteit | onbekend | specialist/reference check mogelijk nodig |
| verzending/afstand | onbekend | belangrijk wegens groot onderdeel |

## Eerste status volgens case-view-status-logic-v0

```text
status: ready_for_refinement_check
next_action: build_category_specific_search_terms
sourcing_route_hint: marketplace_refined + specialist_reference_check
```

## Eerste zoektermen

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

## Geplande kanaalpogingen

| # | Kanaal | Doel | Status |
|---|---|---|---|
| 1 | Google refined body | termen, varianten, partnummers, specialistbronnen | pending |
| 2 | Marketplace refined body | eBay/Marktplaats/2dehands/klassiekerplatformen | pending |
| 3 | Specialist/reference | Mustang-parts specialist of catalogus ter verificatie | pending_if_needed |

## Te meten

```text
time_to_first_search_strategy_minutes:
missing_info_count:
category_detail_quality: usable
sourcing_route_hint: marketplace_refined + specialist_reference_check
first_channel_chosen:
channels_checked:
best_lead_score:
hard_product_lead_found:
source_lead_found:
refinement_needed_yes_no:
```

## Vergelijking met Run 001 en Run 002

Run 003 moet aantonen of de categoriegestuurde intake ook werkt voor body/exterior en randcategorie chrome/trim.

```text
Run 001: steering_controls — veel compatibiliteitsafhankelijkheden
Run 002: lighting_electrical — helper aangescherpt na diagnose
Run 003: body_exterior — test zijde/deel, staat, bevestiging, shipping en body style
```

## Stopregels

```text
max_active_search_time: 60 minuten
stop bij lead_score >= 4
stop als duidelijk wordt dat foto/partnummer nodig is
stop als compatibiliteit Fastback/Coupe/Convertible onduidelijk blijft
stop als shipping/condition risico belangrijker wordt dan vindbaarheid
```
