# Intake Field Delta — after Spike04 Run 001

## Status

```text
status: proposed
source: Spike04 Run 001 + Specialist Validation Sprint prep
```

## Waarom aanpassen?

Run 001 toont dat een aanvraag zoals `Nardi Stuurwiel` technisch sourcable is, maar te vaag voor een snelle productmatch.

De intake moet dus niet meteen complex worden, maar wel genoeg informatie verzamelen om valse leads te vermijden.

## Minimale extra velden voor volgende echte cases

| Veld | Type | Verplicht? | Waarom |
|---|---|---:|---|
| onderdeel_type | dropdown | ja | Onderscheid stuurwiel, naaf/hub, carrosserie, motor, interieur. |
| origineel_repro_used | dropdown | ja | Bepaalt of specialist, NOS, used of repro logisch is. |
| foto_of_partnummer | upload/text | sterk aanbevolen | Verhoogt matchkwaliteit en voorkomt verkeerde compatibiliteit. |
| variant_details | tekst | aanbevolen | Bv. Nardi Classic, Personal, Classico, hout, leder, diameter. |
| compatibiliteit_onzeker | ja/nee | ja | Als ja, dan eerst specialist/communityvalidatie in plaats van marketplace. |
| hub_boss_adaptor_nodig | ja/nee/onbekend | conditioneel | Cruciaal voor stuurwielcases. |
| maximale_afstand_of_verzending | tekst/dropdown | later | Nuttig voor productlead, maar niet nodig voor Run 001-validatie. |

## Specifiek voor stuurwielcases

Voeg conditionele velden toe wanneer `onderdeel_type = stuurwiel`:

```text
steering_wheel_diameter
steering_wheel_brand
steering_wheel_line_or_model
hub_boss_adaptor_known
bolt_pattern_or_pcd_known
airbag_or_non_airbag
photo_available
```

## Lean implementatie

Niet alles moet meteen gebouwd worden.

Voor de volgende test kan dit handmatig via één extra tekstblok in de intake:

```text
Extra details indien bekend:
- exacte variant / partnummer:
- gewenste staat:
- origineel, repro of gebruikt:
- foto beschikbaar:
- compatibiliteit onzeker:
- bij stuurwiel: diameter, naaf/hub/boss/adaptor bekend?
```

## Beslisregel

Als een aanvraag `compatibiliteit_onzeker = ja` heeft, dan wordt de eerste actie:

```text
specialist_validation
```

Niet:

```text
marketplace_search
```

## Voorstel statuslogica

```text
if case_complete = no:
    status = needs_info
elif compatibility_uncertain = yes:
    status = needs_specialist_validation
elif part_number_or_photo_available = yes:
    status = ready_for_source_check
else:
    status = ready_for_refinement_check
```

## Niet nu bouwen

Deze velden zijn een voorstel. Pas ze pas structureel toe na minimaal één specialistreactie of een tweede testcase met betere intake.
