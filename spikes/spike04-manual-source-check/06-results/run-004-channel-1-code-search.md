# Run 004 — Channel 1 Code Search

## Status

```text
status: done
flow_id: R004_CODE_0261S01070
case: Onderdeelcode 0261S01070
channel: channel_1_code_search
scope: Spike04 only
```

## Zoekdoel

Controleren of exacte codezoekopdrachten zelfstandig een onderdeeltype, broncategorie, productlead of sourcelead opleveren.

## Queries uitgevoerd

```text
0261S01070
"0261S01070"
"0261S01070" auto part
"0261S01070" used car part
"0261S01070" pièces voiture occasion
"0261S01070" Dispositifs interrupteurs système électronique
0261 S01070 used car part
0261-S01070 auto part
0 261 S01 070 Bosch
0261S01070 Bosch
"261S01070"
"0261 S010 70"
"0 261 S 01070"
"0261S0107" auto
```

## Bevindingen

| Route | Bevinding | Lead score | Actie |
|---|---|---:|---|
| Exact code search | Geen zelfstandige indexed webmatch gevonden op `0261S01070`. | 1 | Niet tellen als productlead. |
| Quoted code variants | Geen bruikbare match op exacte of gesplitste varianten. | 1 | Code mogelijk platformspecifiek, verkeerd overgenomen of niet geïndexeerd. |
| Bosch-like variants | Geen bevestiging dat dit een Bosch/OE-code is. | 1 | Niet aannemen dat leverancier Bosch is. |
| French used-parts wording | Geen zelfstandige indexed match buiten de user-provided interface-output. | 1 | Bronoutput van gebruiker blijft enige categorisatiebron. |

## Analyse

Code-first search leverde geen harde match op via indexed web search.

De code is dus niet automatisch sterk genoeg zonder:

```text
voertuigmerk
voertuigmodel
bouwjaar
foto van label/sticker
bronwebsite of product-URL
bevestiging of het OE/OEM/leverancierscode/platformcode is
```

## Beslissing na channel 1

```text
channel_1_result: no_indexed_code_match
code_match_found: no
lead_score_best: 1
hard_product_lead_found: no
next_action: channel_2_source_category_detection_using_user_observed_source
```
