# Run 002 — Channel 3 Specialist Reference Check

## Status

```text
status: done
flow_id: R002_LIGHT_911_BOSCH
case: Porsche 911 F-model — Linker Koplamp Glas Bosch (Bol)
channel: channel_3_specialist_reference_if_needed
scope: Spike04 only
```

## Zoekdoel

Geen specialist mailen en geen aankoop doen. Alleen controleren welke specialist-/referentieroute nodig is om de juiste lens of het juiste partnummer te bepalen.

## Input uit channel 1 en 2

```text
onderdeel_categorie: lighting_electrical
onderdeel: linker koplampglas
voertuig: Porsche 911 T/E/S F-model
periode: 1968-1973
merkfilter: Bosch
conditie: gebruikt of NOS
probleem: geen partnummer, geen foto, lens-only versus complete unit onzeker
```

## Reference checks uitgevoerd

```text
Porsche 911 classic model context
Porsche 911 F-series / 1964-1973 context
Headlamp compatibility context
Porsche PET / parts catalogue search terms
Porsche specialist catalogue route search
```

## Bevindingen

| Route | Bevinding | Lead score | Actie |
|---|---|---:|---|
| Porsche 911 classic reference | Bevestigt dat 1968-1973 binnen vroege/originele 911-context valt; `F-model`, `911 T/E/S` en bouwjaarbereik blijven bruikbaar. | 2 | Context behouden in search terms. |
| Headlamp compatibility reference | Koplampen zijn gevoelig voor zijde, markt/rijrichting, lens versus complete unit en lamp-/reflectortype. | 3 | Intake moet `lens_only_or_complete_unit`, `market_region` en `photo_or_partnumber` vragen. |
| Porsche PET / parts catalogue route | Geen direct verifieerbaar partnummer gevonden via beschikbare indexed search. | 2 | Niet gokken; partnummer/foto of specialistcatalogus nodig. |
| Specialist catalogue route | Reference check wijst naar Porsche-parts specialist of officiële onderdelenreferentie als logische volgende bron, niet naar brede marketplace. | 3 | Specialist/reference eerst, marketplace pas opnieuw met partnummer. |

## Analyse

Channel 3 levert geen productlead op, maar verhoogt de kwaliteit van de diagnose.

De bottleneck is niet dat de intake geen categorie had. Die werkte. De bottleneck is dat `lighting_electrical` cases vaak extra compatibiliteitsvelden nodig hebben.

Voor deze case ontbreken vooral:

```text
partnummer op glas of behuizing
foto van bestaande koplamp/lens
bevestiging: alleen glas/lens of volledige koplampunit
Bosch exact verplicht of Bosch-achtig/alternatief toegestaan
H1/H4/sealed-beam/context
EU/US of LHD/RHD marktcontext
```

## Intake-impact

Run 002 bevestigt dat `category_specific_details` nuttig is, maar dat `lighting_electrical` minimaal een extra helpervraag nodig heeft:

```text
Zoek je alleen de lens/het glas, de reflector/behuizing, of de volledige koplampunit? Staat er een partnummer of merk op het bestaande onderdeel? Is de auto EU/US of LHD/RHD?
```

## Beslissing na channel 3

```text
channel_3_result: specialist_reference_needed_before_more_marketplace
lead_score_best: 3
hard_product_lead_found: no
source_lead_found: yes_reference_route
category_intake_helped: yes
recommended_next_action: pause Run 002 active search and update intake helper for lighting_electrical
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
