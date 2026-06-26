# Lighting Taxonomy Evidence — Run 004 Candidate

## Status

```text
status: captured
scope: Spike04 intake research
source: user-provided category output from used-parts search interface
candidate_run: Run 004
```

## Raw signal

The used-parts interface shows a deep hierarchy under:

```text
Système d'éclairage
```

The code/search context also showed a separate result under:

```text
Dispositifs / interrupteurs / système électronique
```

This means `lighting_electrical` is too broad as a permanent category if we later want precise routing.

## Observed lighting subcategories

### Indicators / turn signals

```text
Clignotant
Clignotant avant
Feu clignotant répétiteur d'aile avant
Voyant lumineux de rétroviseur
```

### Rear lights

```text
Feux arrière / postérieurs
Set feux arrière / postérieurs
Feux arrière sur hayon
Moulure de garniture de feu arrière / postérieur
Pièces détachées feux arrière
Feu de recul
Troisième feu stop
Réflecteur de feu arrière
Ampoule, feu stop / feu arrière
Éclairage de plaque d'immatriculation
Lentilles de feu arrière
Lentilles de feu arrière sur le corps
Éclairage de pare-chocs arrière
Porte ampoule de feu arrière
Feu de coin arrière (stationnement)
```

### Fog lights

```text
Feux de brouillard
Kit antibrouillard
Feu antibrouillard avant
Feu antibrouillard arrière
Ampoule antibrouillard
Feu antibrouillard de qualité équivalente (en option)
Pièce antibrouillard
```

### Headlights / front lights

```text
Phare / lampe frontale
Phare frontale
Lot de 2 lampes frontales / phare
Autres pièces
Support phare frontale
Ampoule, projecteur principal
Moteur de réglage du niveau des phares
Moulure sous phares
Module de ballast de phare Xenon
Réflecteur avant
Cache-poussière de phare avant
Ampoule xénon
Couvercle de lentille de phare
Phare de jour LED
Module de contrôle de ballast LED
```

### Interior lighting

```text
Éclairage intérieur de l’habitacle
Éclairage de la boîte à gants
Éclairage du mécanisme de la poignée extérieur avant
Éclairage lumière plafonnier arrière
Éclairage lumière plafonnier avant
Éclairage de coffre
Éclairage intérieur porte avant
Éclairage intérieur porte arrière
Éclairage excitement de poignée extérieur porte arrière
Autre éclairage intérieur
Projecteur
```

## Mapping to current MVP categories

For the current MVP, these subcategories should not become full top-level dropdown categories yet.

Use this mapping:

```text
Système d'éclairage -> lighting_electrical
Phares / lampe frontale -> lighting_electrical.headlight_front
Feux arrière / postérieurs -> lighting_electrical.rear_light
Feux de brouillard -> lighting_electrical.fog_light
Clignotant -> lighting_electrical.indicator_turn_signal
Éclairage intérieur de l’habitacle -> lighting_electrical.interior_light
Dispositifs / interrupteurs / système électronique -> electrical_electronics
```

## Intake implication

The current top-level dropdown can stay lean, but `lighting_electrical` needs a second-level helper or internal subcategory hint.

Recommended additional internal field:

```text
subcategory_hint
```

For lighting, possible values:

```text
headlight_front
rear_light
indicator_turn_signal
fog_light
interior_light
plate_light
reflector
bulb_or_holder
control_module_or_ballast
unknown_lighting
```

## Part-number-first implication

The code/search example suggests a separate route:

```text
if part_number_or_code is present:
    run code_search first
    infer source_category_detected
    then refine by vehicle fitment
else:
    use category-based intake
```

## MVP decision

Do not add all these subcategories to the customer-facing form yet.

Do add:

```text
part_number_or_code
subcategory_hint_internal
source_category_detected
```

Only expose more detail when needed through helper text.

## Run 004 candidate

```text
flow_id: R004_CODE_0261S01070
case_type: part_number_first
input_code: 0261S01070
observed_source_category: Dispositifs / interrupteurs / système électronique
hypothesis: code-first search can classify faster than free-text/category-first intake
```

## Validation target

Run 004 should test whether `part_number_or_code` gives:

```text
faster category detection
less ambiguity
better source route
fewer irrelevant marketplace searches
clearer vehicle-fitment follow-up
```
