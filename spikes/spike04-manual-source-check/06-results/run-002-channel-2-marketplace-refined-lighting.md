# Run 002 — Channel 2 Marketplace Refined Lighting

## Status

```text
status: done
flow_id: R002_LIGHT_911_BOSCH
case: Porsche 911 F-model — Linker Koplamp Glas Bosch (Bol)
channel: channel_2_marketplace_refined_lighting
scope: Spike04 only
```

## Zoekdoel

Controleren of de verfijnde categoriezoektermen een concrete marketplace-listing opleveren, zonder aankoop, betaling, extra specialistmail of webshopwijziging.

## Queries uitgevoerd

```text
eBay Porsche 911 F model Bosch headlight lens left 1968 1973
eBay Porsche 911 Bosch headlight glass left 1968 1973
eBay Porsche 911 F Bosch H4 headlight lens
eBay Porsche 911 F Bosch H1 headlight lens
Porsche 911 F Modell Bosch Scheinwerferglas links kaufen
Porsche 911 F model Bosch koplampglas links Marktplaats
Porsche 911 koplampglas Bosch 2dehands
Porsche 911 F model Bosch headlight lens EU US
```

## Resultaat per route

| Marketplace/search route | Resultaat | Lead score | Actie |
|---|---|---:|---|
| eBay indexed search | Geen verifieerbare listing gevonden voor exact `Porsche 911 F-model + Bosch + left/headlight lens/glass + 1968-1973`. | 1 | Niet tellen als productlead. |
| eBay H1/H4 search | Geen betrouwbare lens-only listing bevestigd. Resultaten/termen wijzen eerder op volledige headlight units of generieke H1/H4-verwarring. | 1 | Lens-only versus complete unit explicieter maken. |
| Marktplaats indexed search | Geen verifieerbare Nederlandse listing gevonden voor `Porsche 911 koplampglas Bosch links`. | 1 | Niet verder pushen zonder manuele UI-check. |
| 2dehands indexed search | Geen verifieerbare Belgische listing gevonden voor `Porsche 911 koplampglas Bosch`. | 1 | Niet verder pushen zonder manuele UI-check. |
| Meertalige marketplace search | Duitse/Nederlandse termen verbeteren terminologie, maar leveren geen harde productlead. | 1 | Bewaar termen voor specialist/reference. |

## Analyse

Marketplace refined search leverde geen productlead op.

De categoriegestuurde intake hielp wel om sneller te begrijpen waarom marketplace faalt:

```text
partnummer ontbreekt
foto ontbreekt
lens-only versus complete headlight unit is onzeker
Bosch/H1/H4/marktcontext kan verkeerde resultaten geven
LHD/RHD of EU/US kan compatibiliteit beïnvloeden
```

## Beslissing na channel 2

```text
channel_2_result: no_verified_product_lead
lead_score_best: 1
hard_product_lead_found: no
category_intake_helped: yes_for_diagnosis
active_search_time_total: 29 minuten
next_action: channel_3_specialist_reference_if_needed
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
