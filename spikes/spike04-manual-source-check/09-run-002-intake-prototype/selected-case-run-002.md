# Selected Case — Run 002

## Status

```text
status: selected
run: Run 002
scope: Spike04 only
case_type: mockcase_from_existing_landingpage_billboard
```

## Gekozen case

```text
flow_id: R002_LIGHT_911_BOSCH
case_label: Linker Koplamp Glas Bosch — Porsche 911 F-model
category_code: lighting_electrical
```

## Broncase

Deze case is gebaseerd op het bestaande billboardvoorbeeld:

```text
Linker Koplamp Glas Bosch (Bol) - Porsche 911 F-model
Porsche 911 T/E/S
1968 - 1973
Conditie: Gebruikt of NOS
```

## Waarom deze case

Deze case is beter geschikt voor Run 002 dan opnieuw een stuurwielcase, omdat ze een andere categorie test:

```text
lighting_electrical
```

De case bevat al categorie-relevante details:

```text
links
koplampglas
Bosch
bol
Porsche 911 F-model
1968-1973
gebruikt of NOS
```

Daarmee kan Run 002 testen of `onderdeel_categorie + category_specific_details` sneller tot een juiste sourcingroute leidt.

## Intake v0 ingevuld

### Common core

```text
merk: Porsche
model: 911 T/E/S
bouwjaar_of_periode: 1968-1973
onderdeel_omschrijving: Linker Koplamp Glas Bosch (Bol) - Porsche 911 F-model
onderdeel_categorie: lighting_electrical
origineel_repro_used: gebruikt of NOS
compatibiliteit_onzeker: onbekend
foto_of_partnummer: niet aanwezig
extra_context: F-model context, bol koplampglas, linkerzijde
```

### category_specific_details

```text
Linker koplampglas voor Porsche 911 F-model, vermoedelijk Bosch bol glas. Alleen glas gezocht, geen volledige unit. Bouwjaarbereik 1968-1973. Conditie gebruikt of NOS. Partnummer onbekend. Moet passen op 911 T/E/S.
```

## Detailkwaliteit

```text
category_detail_quality: usable
```

Waarom niet `strong`:

```text
Geen partnummer.
Geen foto.
Geen bevestiging of alleen lens, lens + ring, of complete koplampunit nodig is.
Geen bevestiging of Bosch exact verplicht is of ook Hella/Carello alternatief mag.
```

Waarom wel `usable`:

```text
categorie duidelijk;
zijde duidelijk;
merk van onderdeel duidelijk;
modelgeneratie duidelijk;
bouwjaarperiode duidelijk;
conditievoorkeur duidelijk.
```

## Eerste status volgens case-view-status-logic-v0

```text
status: ready_for_refinement_check
next_action: build_category_specific_search_terms
sourcing_route_hint: marketplace_refined + specialist_reference_check
```

## Verwachte helpervraag

Voor `lighting_electrical` toont de intake:

```text
Staat er een merk of partnummer op? Is het links/rechts, voor/achter, lens/behuizing/reflector, 6V/12V, en welk connectortype?
```

## Missing info voor eventuele follow-up

```text
partnummer op glas
foto van bestaande koplamp of ontbrekend glas
bevestiging: alleen lens of volledige koplampunit
bevestiging: Bosch verplicht of alternatief toegestaan
land/regio-specificatie indien relevant
```

## Waarom deze case commercieel nuttig is

- Geen stuurwielcase, dus valideert bredere intakearchitectuur.
- Klassiek onderdeel met duidelijke modelgeneratie en merk.
- Category-specific helpervragen zijn relevant, maar niet overdreven complex.
- Waarschijnlijk beter vindbaar dan een extreem zeldzame mechanische variant.
- Test zowel marketplace search als specialist/reference check.

## Niet doen in Run 002

```text
Geen aankoop.
Geen betaling.
Geen extra specialistmail als eerste stap.
Geen scraping.
Geen nieuwe webshopfunctionaliteit.
Geen belofte dat onderdeel beschikbaar is.
```

## Startcriteria Run 002

Run 002 mag starten met:

```text
channel_1_google_refined_lighting
channel_2_marketplace_refined_lighting
channel_3_specialist_reference_if_needed
```

Maximale actieve zoektijd:

```text
60 minuten
```
