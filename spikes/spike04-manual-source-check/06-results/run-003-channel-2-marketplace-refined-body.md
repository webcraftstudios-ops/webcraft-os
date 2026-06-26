# Run 003 — Channel 2 Marketplace Refined Body

## Status

```text
status: done
flow_id: R003_BODY_MUSTANG_BUMPER_RIGHT
case: Ford Mustang Fastback 1965-1966 — Originele chromen achterbumper rechter deel
channel: channel_2_marketplace_refined_body
scope: Spike04 only
```

## Zoekdoel

Controleren of de refined body/exterior-termen een concrete marketplace-listing opleveren.

Geen aankoop, betaling, specialistmail, scraping of webshopwijziging.

## Queries uitgevoerd

```text
eBay 1965 1966 Mustang rear bumper chrome used original
eBay 1965 Mustang rear bumper right side chrome
eBay 1966 Mustang rear bumper chrome brackets
eBay 1965 1966 Mustang rear bumper guards chrome
Marktplaats Ford Mustang 1965 achterbumper chroom
2dehands Ford Mustang achterbumper chroom
1965 Mustang rear bumper chrome used Europe
1966 Mustang rear bumper chrome original used
```

## Resultaat per route

| Marketplace/search route | Resultaat | Lead score | Actie |
|---|---|---:|---|
| eBay indexed search | Geen verifieerbare exacte listing gevonden voor `rechter deel` van originele chromen achterbumper. | 1 | Niet tellen als productlead. |
| eBay complete bumper search | Termen wijzen eerder naar complete bumpers/repro/sets dan naar rechter deel. | 1 | Intake moet exactere samenstelling vragen. |
| eBay bracket/guard search | Gerelateerde onderdelen komen logisch in beeld, maar geen harde match met hoofdvraag. | 2 | Related-parts loggen als intake-impact. |
| Marktplaats indexed search | Geen verifieerbare Nederlandse listing gevonden via indexed search. | 1 | Niet verder pushen zonder manuele UI-check. |
| 2dehands indexed search | Geen verifieerbare Belgische listing gevonden via indexed search. | 1 | Niet verder pushen zonder manuele UI-check. |
| Europe/used search | Geen harde productlead; shipping/locatie wordt belangrijker voor groot onderdeel. | 1 | Afstand/verzending toevoegen als belangrijk intakeveld. |

## Analyse channel 2

Marketplace refined search leverde geen harde productlead op.

De intake werkte wel beter voor diagnose:

```text
De term `rechter deel` is vermoedelijk te vaag of mogelijk niet de juiste parts-structuur.
Marketplace-resultaten verwarren complete bumper, bumper guards, brackets, hardware en chrome trim.
Budget tot €300 is bruikbaar, maar shipping kan het totaal onaantrekkelijk maken.
```

## Beslissing na channel 2

```text
channel_2_result: no_verified_product_lead
lead_score_best: 2
hard_product_lead_found: no
category_intake_helped: yes_for_diagnosis
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
