# Channel 2b — Marketplace Refined Summary

## Status

```text
status: done
flow_id: 7Xo88NP
case: Alfa Romeo Spider 1990 — Nardi Stuurwiel
channel: channel_2b_marketplace_refined
scope: Spike04 only
```

## Doel

De marketplace search opnieuw uitvoeren met de verfijnde specificatie uit kanaal 4 en channel 1b:

```text
Nardi steering wheel + hub/boss/adaptor + Alfa Romeo Spider 105/115 / Series 4 + 70 mm PCD
```

## Queries uitgevoerd

```text
eBay Nardi hub adapter Alfa Romeo Spider 105 115
eBay Nardi boss kit Alfa Romeo Spider 115
Nardi steering wheel boss hub Alfa Romeo Spider eBay 105 115
Nardi 70mm PCD Alfa Romeo Spider eBay
site:ebay.com Alfa Romeo Spider 105 115 Nardi hub adapter
site:ebay.com Nardi boss kit Alfa Romeo Spider 105 115
site:marktplaats.nl Nardi stuurwiel Alfa Romeo Spider naaf
site:2dehands.be Nardi stuurwiel Alfa Romeo Spider naaf
```

## Bevindingen

| Marketplace | Resultaat | Lead score | Actie |
|---|---|---:|---|
| eBay indexed search | Geen verifieerbare productlisting gevonden voor Nardi + Alfa Spider 105/115 + hub/boss/adaptor. | 1 | Niet tellen als productlead. Eventuele browser/UI-check later apart. |
| Marktplaats indexed search | Geen verifieerbare listing gevonden voor Nardi stuurwiel + Alfa Spider + naaf/hub. | 1 | Niet verder pushen binnen Spike04. |
| 2dehands indexed search | Geen verifieerbare listing gevonden voor Nardi stuurwiel + Alfa Spider + naaf/hub. | 1 | Niet verder pushen binnen Spike04. |
| Brede marketplace-query | Geen harde productlead; vooral reference/context-resultaten. | 1 | Conclusie: marketplace levert niet binnen 90 min. |

## Analyse

Refined marketplace search verbeterde de zoekprecisie, maar niet de leaduitkomst.

```text
lead_score_before: 1 voor marketplace original
lead_score_after: 1 voor marketplace refined
was_search_improved: yes qua specificatie, no qua productlead
```

De bottleneck lijkt dus niet alleen de zoekterm te zijn. Waarschijnlijke bottlenecks:

- het onderdeel is te specifiek/zeldzaam;
- marketplace-indexering is zwak;
- listings gebruiken afwijkende termen;
- compatibiliteit vraagt specialistische bevestiging;
- intake mist diameter, variant, hub/boss/adaptor en origineel/repro/used voorkeur.

## Conclusie

```text
channel_2b_marketplace_refined_result: no_verified_product_lead
active_search_time_total: 90 minuten
hard_product_leads: 0
strong_source_leads: 4
best_lead_score: 4
recommended_next_action: stop active search for Run 001; prepare specialist/contact or improve intake fields
```

## Scopebewaking

Geen betaling getest.
Geen aankoop gedaan.
Geen scraping uitgevoerd.
Geen persoonsgegevens gedeeld.
Geen marktplaats gebouwd.
Geen claims richting klant gemaakt.
