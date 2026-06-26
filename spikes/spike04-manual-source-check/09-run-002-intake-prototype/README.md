# Run 002 Intake Prototype — Spike04

## Status

```text
status: prepared
scope: Spike04 only
purpose: test category-based intake before structural form changes
```

## Beslissing

Run 002 krijgt geen groot nieuw formulier met alle mogelijke technische velden.

Run 002 test een kleine, categoriegestuurde intake:

```text
common core fields
+ onderdeel_categorie
+ category_specific_details
+ helpertekst per categorie
```

## Waarom

Run 001 leerde dat extra specificatie nodig is, maar de correctie is dat specificatie afhankelijk moet zijn van het onderdeeltype.

Daarom testen we niet stuurwielvelden algemeen, maar een generiek patroon:

```text
onderdeeltype bepaalt de relevante verdiepingsvragen
```

## Wat Run 002 moet bewijzen

```text
Kan één extra categorieveld + één slim detailveld de sourcing sneller of nauwkeuriger maken?
```

## Niet bouwen in deze stap

Binnen dit prototype doen we niet:

- tien aparte formulieren bouwen;
- uitgebreide conditionele no-code logica implementeren;
- automatische scoring bouwen;
- betaalde tools toevoegen;
- publieke webshopfunctionaliteit aanpassen;
- klantbelofte doen.

## Prototype deliverables

```text
intake-form-v0.md
category-helper-map.csv
case-view-status-logic-v0.md
run-002-test-plan.md
```

## Kernvelden voor Run 002

```text
merk
model
bouwjaar_of_periode
onderdeel_omschrijving
onderdeel_categorie
category_specific_details
foto_of_partnummer
origineel_repro_used
compatibiliteit_onzeker
extra_context
```

## Evaluatiecriteria

Run 002 is nuttig wanneer minstens één van deze dingen meetbaar wordt:

```text
1. minder tijd nodig om eerste zoekstrategie te maken
2. minder missing-info blokkades
3. sneller keuze tussen marketplace, specialist of community
4. betere lead score dan Run 001
5. concretere refined search terms dan Run 001
```

## Beslispunt na Run 002

```text
if category_specific_details improved sourcing:
    keep category-based intake and prepare Tally change
elif users leave details blank:
    simplify helper copy
elif category choice is confusing:
    reduce categories
elif no improvement:
    keep current intake and rely on manual refinement
```
