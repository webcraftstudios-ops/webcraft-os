# Selected Case — Run 003

## Status

```text
status: selected
run: Run 003
scope: Spike04 only
case_type: mockcase_from_existing_landingpage_billboard
```

## Gekozen categorie

```text
category_code: body_exterior
```

## Waarom body_exterior boven interior_trim_upholstery

Voor Run 003 is `body_exterior` de beste keuze omdat:

```text
1. er al een bruikbare mockcase bestaat in het billboard
2. de categorie duidelijk verschilt van steering_controls en lighting_electrical
3. fitment afhankelijk is van zijde, carrosserievorm, bouwjaar en bevestigingspunten
4. er commerciële relevantie is: carrosserie- en bumperdelen zijn duurder, schaarser en gevoeliger voor staat/verzending
5. de case test of de intake mechanische/gelieerde onderdelen meeneemt zoals beugels, rubbers en bevestiging
```

`interior_trim_upholstery` blijft een goede Run 004-kandidaat.

## Gekozen case

```text
flow_id: R003_BODY_MUSTANG_BUMPER_RIGHT
case_label: Originele chromen achterbumper — rechter deel — Ford Mustang Fastback
category_code: body_exterior
secondary_category_hint: chrome_trim
```

## Broncase

Deze case is gebaseerd op het bestaande billboardvoorbeeld:

```text
Originele Chromen Achterbumper (Rechter deel)
Ford Mustang Fastback
1965 - 1966
Conditie: Roestvrij, mag lichte krassen hebben
Budget: tot €300
```

## Intake v0 ingevuld

### Common core

```text
merk: Ford
model: Mustang Fastback
bouwjaar_of_periode: 1965-1966
onderdeel_omschrijving: Originele chromen achterbumper, rechter deel
onderdeel_categorie: body_exterior
origineel_repro_used: origineel of gebruikt
compatibiliteit_onzeker: onbekend
foto_of_partnummer: niet aanwezig
extra_context: achterbumper, rechter deel, roestvrij, lichte krassen toegestaan, budget tot €300
```

### category_specific_details

```text
Rechter deel van een originele chromen achterbumper voor Ford Mustang Fastback 1965-1966. Roestvrij gewenst, lichte krassen zijn aanvaardbaar. Onduidelijk of bevestigingsbeugels, rubbers, bouten of aansluitende sierdelen nodig zijn. Geen foto of partnummer beschikbaar. Budget tot €300.
```

## Detailkwaliteit

```text
category_detail_quality: usable
```

Waarom niet `strong`:

```text
Geen foto.
Geen partnummer.
Geen bevestiging of alleen bumperdeel of ook beugels/bouten/rubbers nodig zijn.
Geen bevestiging of Fastback-afwijking relevant is versus Coupe/Convertible.
Geen markt-/uitvoeringsspecificatie.
```

Waarom wel `usable`:

```text
categorie duidelijk;
zijde/deel duidelijk;
locatie op voertuig duidelijk;
merk/model/bouwjaar duidelijk;
conditie-eis duidelijk;
budget bekend.
```

## Eerste status volgens case-view-status-logic-v0

```text
status: ready_for_refinement_check
next_action: build_category_specific_search_terms
sourcing_route_hint: marketplace_refined + specialist_reference_check
```

## Verwachte helpervraag

Voor `body_exterior` toont de intake:

```text
Gaat het om links/rechts, voor/achter, volledig paneel of reparatiestuk, chroom of lak, en zijn bevestigingspunten/beugels nodig?
```

## Missing info voor eventuele follow-up

```text
foto van huidige/ontbrekende bumperzijde
partnummer indien beschikbaar
bevestiging: alleen bumperdeel of ook beugels/bouten/rubbers
compatibiliteit Fastback vs Coupe/Convertible
origineel verplicht of repro toegestaan
exacte staat: roestvrij, deukvrij, herchroomd toegestaan?
verzending/afstand wegens groot onderdeel
```

## Waarom deze case commercieel nuttig is

- Andere categorie dan Run 001 en Run 002.
- Test body/exterior én randzone chrome_trim.
- Dwingt intake om gelieerde onderdelen te herkennen: brackets, bolts, rubbers, trim.
- Duidelijk koopmotief en budget.
- Groot onderdeel met conditie- en verzendingsrisico, dus commercieel realistischer.

## Niet doen in Run 003

```text
Geen aankoop.
Geen betaling.
Geen extra specialistmail als eerste stap.
Geen scraping.
Geen nieuwe webshopfunctionaliteit.
Geen belofte dat onderdeel beschikbaar is.
```

## Startcriteria Run 003

Run 003 mag starten met:

```text
channel_1_google_refined_body
channel_2_marketplace_refined_body
channel_3_specialist_reference_if_needed
```

Maximale actieve zoektijd:

```text
60 minuten
```
