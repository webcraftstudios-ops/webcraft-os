# Run 002 — Spike04 Intake Prototype Test

## Status

```text
status: channel_1_google_refined_lighting_done
started_at: 2026-06-26
last_updated_at: 2026-06-26
flow_id: R002_LIGHT_911_BOSCH
case: Porsche 911 F-model — Linker Koplamp Glas Bosch (Bol)
category_code: lighting_electrical
```

## Doel

Testen of de nieuwe categoriegestuurde intake sneller tot een bruikbare zoekstrategie leidt dan Run 001.

## Case summary

```text
Ik zoek linker koplampglas voor een Porsche 911 F-model / 911 T/E/S uit 1968-1973. Het gaat vermoedelijk om Bosch bol glas. Conditie gebruikt of NOS. Partnummer en foto ontbreken nog.
```

## Intake v0

```text
merk: Porsche
model: 911 T/E/S
bouwjaar_of_periode: 1968-1973
onderdeel_omschrijving: Linker Koplamp Glas Bosch (Bol) - Porsche 911 F-model
onderdeel_categorie: lighting_electrical
category_specific_details: Linker koplampglas voor Porsche 911 F-model, vermoedelijk Bosch bol glas. Alleen glas gezocht, geen volledige unit. Bouwjaarbereik 1968-1973. Conditie gebruikt of NOS. Partnummer onbekend. Moet passen op 911 T/E/S.
foto_of_partnummer_available: no
origineel_repro_used: gebruikt of NOS
compatibiliteit_onzeker: onbekend
```

## Category-specific helper used

```text
Staat er een merk of partnummer op? Is het links/rechts, voor/achter, lens/behuizing/reflector, 6V/12V, en welk connectortype?
```

## Detailkwaliteit

```text
category_detail_quality: usable
```

## Missing info check

| Check | Status | Opmerking |
|---|---|---|
| merk bekend | ok | Porsche |
| model bekend | ok | 911 T/E/S |
| bouwjaar/periode bekend | ok | 1968-1973 |
| onderdeelcategorie bekend | ok | lighting_electrical |
| onderdeel concreet genoeg | ok | linker koplampglas |
| zijde bekend | ok | links |
| merk onderdeel bekend | deels | Bosch genoemd, maar niet bevestigd met partnummer/foto |
| lens/unit/samenstelling bekend | deels | tekst zegt glas; moet opletten dat geen complete unit wordt gezocht |
| partnummer/foto aanwezig | nee | verzwakt matchzekerheid |
| origineel/repro/used bekend | deels | gebruikt of NOS; repro niet genoemd |
| compatibiliteit onzeker | onbekend | kan specialist/reference check nodig maken |

## Eerste status volgens case-view-status-logic-v0

```text
status: ready_for_refinement_check
next_action: build_category_specific_search_terms
sourcing_route_hint: marketplace_refined + specialist_reference_check
```

## Eerste zoektermen

```text
Porsche 911 F-model Bosch headlight lens left
Porsche 911 1968 1973 Bosch headlight glass left
Porsche 911 T E S Bosch headlight lens
Porsche 911 F model Bosch headlamp glass NOS
Porsche 911 left headlight glass Bosch used
Porsche 911 Bosch H4 headlight lens F model
Porsche 911 Bosch headlight glass 1968 1973
Porsche 911 F model headlight glass Bosch part number
```

## Geplande kanaalpogingen

| # | Kanaal | Doel | Status |
|---|---|---|---|
| 1 | Google refined lighting | termen, varianten, partnummers, specialistbronnen | done |
| 2 | Marketplace refined lighting | eBay/Marktplaats/2dehands/klassiekerplatformen | pending |
| 3 | Specialist/reference | Porsche parts specialist of catalogus ter verificatie | pending_if_needed |

## Channel 1 — Google refined lighting

### Zoekdoel

Niet breed zoeken naar `Porsche koplamp`, maar controleren of de categoriegerichte details meteen betere zoekrichting geven:

```text
Porsche 911 F-model + 1968-1973 + Bosch + headlight lens/glass + left + used/NOS
```

### Queries uitgevoerd

```text
Porsche 911 F model Bosch headlight lens left 1968 1973
Porsche 911 1968 1973 Bosch headlight glass left NOS used
Porsche 911 F-model Bosch H4 headlight lens glass part number
Porsche 911 F Modell Bosch Scheinwerferglas links
Porsche 911 F Modell Scheinwerferglas Bosch 1968 1973
Porsche 911 F model Bosch koplampglas links
Porsche 911 F model verre phare Bosch gauche
```

### Bevindingen

| Bron | Type | Bevinding | Lead score | Actie |
|---|---|---|---:|---|
| Porsche 911 modelcontext | reference | 1968-1973 past binnen de vroege/originele Porsche 911 context; 911 T/E/S en F-model zijn bruikbare zoektermen. | 2 | Houd `F-model`, `911 T/E/S`, `1968-1973` in refined queries. |
| Headlamp reference | reference | Voor koplampen zijn zijde/rijrichting/marktcontext belangrijk; links/rechts en land/regio kunnen compatibiliteit beïnvloeden. | 2 | Voeg `LHD/RHD`, `EU/US`, `left-hand traffic/right-hand traffic` toe als follow-up indien nodig. |
| English refined search | search | Geen harde, verifieerbare productlead gevonden via indexed Google-resultaten. Resultaten waren vooral modelcontext of generiek. | 1 | Door naar marketplace/refined of specialistcatalogus. |
| German/French/NL refined search | search | Meertalige termen leverden wel betere terminologie op, maar geen verifieerbare productlead. | 1 | Bewaar termen `Scheinwerferglas`, `verre phare`, `koplampglas`. |

### Analyse channel 1

De categoriegestuurde intake hielp sneller dan Run 001 bij het vormen van zoektermen.

Binnen enkele minuten was duidelijk:

```text
1. onderdeelcategorie = lighting_electrical
2. zijde = links
3. lens/glass i.p.v. complete unit is kritisch
4. Bosch is een mogelijk merkfilter
5. 1968-1973 / F-model / 911 T/E/S zijn relevante contexttermen
6. markt/rijrichting kan een extra compatibiliteitsvraag zijn
```

Maar channel 1 leverde nog geen harde productlead op.

### Nieuwe refined termen na channel 1

```text
Porsche 911 F model Bosch Scheinwerferglas links
Porsche 911 F model Bosch headlight lens left NOS
Porsche 911 T E S Bosch headlight glass left
Porsche 911 1968 1973 headlight lens left Bosch NOS
Porsche 911 F model verre phare Bosch gauche
Porsche 911 F model koplampglas Bosch links
Porsche 911 F model Bosch headlight lens LHD
Porsche 911 F model Bosch headlight lens EU US
```

### Beslissing na channel 1

```text
channel_1_result: source_context_found_no_product_lead
lead_score_best: 2
hard_product_lead_found: no
category_intake_helped: yes
next_action: channel_2_marketplace_refined_lighting
```

## Te meten

```text
time_to_first_search_strategy_minutes: 7
missing_info_count: 4
category_detail_quality: usable
sourcing_route_hint: marketplace_refined + specialist_reference_check
first_channel_chosen: Google refined lighting
channels_checked: 1
best_lead_score: 2
hard_product_lead_found: no
source_lead_found: yes_context_only
refinement_needed_yes_no: yes
```

## Vergelijking met Run 001

Run 001 had:

```text
category_detail_quality: weak/usable but too narrow
active_search_time: 90 minuten
best_lead_score: 4 source lead
hard_product_lead_found: no
blocking_issues: diameter, variant, hub/boss/adaptor
```

Run 002 start beter qua intake:

```text
Run 002 komt sneller tot eerste zoekstrategie.
Run 002 heeft minder conceptuele verwarring over het onderdeeltype.
Run 002 blijft wel afhankelijk van partnummer/foto/marktcontext voor harde match.
```

## Stopregels

```text
max_active_search_time: 60 minuten
stop bij lead_score >= 4
stop als duidelijk wordt dat partnummer/foto nodig is
stop als search alleen generieke koplampunits oplevert en geen lens/glass match
```
