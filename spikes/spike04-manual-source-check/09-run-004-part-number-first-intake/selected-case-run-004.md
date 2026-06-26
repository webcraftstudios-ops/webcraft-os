# Selected Case — Run 004

## Status

```text
status: selected
run: Run 004
scope: Spike04 only
case_type: part_number_first
```

## Waarom Run 004

Run 001, Run 002 en Run 003 tonen dat categoriegestuurde intake nuttig is, maar dat vrije tekst vaak ambigu blijft.

Run 004 test een andere route:

```text
part_number_or_code first
```

Hypothese:

```text
Als een onderdeelnummer of code beschikbaar is, kan zoeken op code sneller leiden tot juiste categorie, source route en voertuigfitment dan zoeken vanuit omschrijving of categorie.
```

## Gekozen case

```text
flow_id: R004_CODE_0261S01070
case_label: Onderdeelcode 0261S01070 — gebruikte auto-onderdelen
input_code: 0261S01070
case_type: part_number_first
observed_source_category: Dispositifs / interrupteurs / système électronique
```

## Broninput

Gebruiker gaf een used-parts interface-output met zoekcontext:

```text
0261S01070 - pièces de voiture d'occasion par code
```

De categorielijst toonde één resultaat onder:

```text
Dispositifs / interrupteurs / système électronique: 1
```

Andere categorieën stonden op 0.

## Intake v0 ingevuld

### Common core

```text
merk: onbekend
model: onbekend
bouwjaar_of_periode: onbekend
onderdeel_omschrijving: onbekend, maar onderdeelcode beschikbaar
onderdeel_categorie: unknown_from_user_input
part_number_or_code: 0261S01070
origineel_repro_used: gebruikt
compatibiliteit_onzeker: ja
foto_of_partnummer_available: yes_code_only
```

### Nieuwe velden voor Run 004

```text
part_number_or_code: 0261S01070
source_category_detected: Dispositifs / interrupteurs / système électronique
subcategory_hint_internal: electrical_electronics
code_search_first: yes
vehicle_fitment_required_after_code_search: yes
```

## Eerste status volgens case-view-status-logic-v0 uitbreiding

```text
status: ready_for_code_search
next_action: run_part_number_search_first
sourcing_route_hint: code_search + category_detection + vehicle_fitment_check
```

## Te testen beslisregel

```text
if part_number_or_code is not empty:
    first_action = code_search
    infer source_category_detected
    infer subcategory_hint_internal
    then request or verify vehicle fitment
else:
    use category-based intake
```

## Eerste zoektermen

```text
0261S01070
"0261S01070" auto part
"0261S01070" used car part
"0261S01070" pièces voiture occasion
"0261S01070" Dispositifs interrupteurs système électronique
"0261S01070" electronic control switch car part
```

## Verwachte uitkomst

Run 004 hoeft niet meteen een productlead te vinden. De test is geslaagd als code-first search sneller leidt tot:

```text
juiste categorie
waarschijnlijk onderdeeltype
passende voertuigfitment of fitment-vraag
source route
minder vrije-tekst ambiguïteit
```

## Missing info voor follow-up

```text
voertuigmerk
voertuigmodel
bouwjaar
waar code op onderdeel staat
foto van label/sticker/onderdeel
OE/OEM/Bosch/leverancierscode onderscheid
defect/zoekreden
nieuw/gebruikt/revisie voorkeur
```

## Niet doen in Run 004

```text
Geen aankoop.
Geen betaling.
Geen extra specialistmail als eerste stap.
Geen scraping.
Geen webshopwijziging.
Geen klantbelofte.
```

## Startcriteria Run 004

Run 004 mag starten met:

```text
channel_1_code_search
channel_2_source_category_detection
channel_3_vehicle_fitment_check
```

Maximale actieve zoektijd:

```text
45 minuten
```
