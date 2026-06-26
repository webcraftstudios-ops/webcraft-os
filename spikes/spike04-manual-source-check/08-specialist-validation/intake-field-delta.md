# Intake Field Delta — after Spike04 Run 001

## Status

```text
status: corrected_category_based
source: Spike04 Run 001 + user feedback
```

## Correctie

De eerdere intake-delta was te sterk gestuurd door de Nardi-stuurwielcase.

Dat is fout als algemeen intakeontwerp.

Classic Parts Finder moet niet één set technische velden afdwingen voor alle onderdelen. Het juiste model is:

```text
common core fields + onderdeelcategorie + conditionele specificatievelden
```

## Waarom aanpassen?

Run 001 toont dat een aanvraag zoals `Nardi Stuurwiel` technisch sourcable is, maar te vaag voor een snelle productmatch.

Maar die les mag niet leiden tot een stuurwielgericht formulier. De echte les is:

```text
elk onderdeeltype heeft eigen fitment- en afhankelijkheidsvragen
```

Voorbeelden:

```text
stuurwiel -> diameter, naaf, boss, adaptor, PCD
zetelbekleding -> links/rechts, voor/achter, materiaal, kleur, patroon, frame/foam
koplampglas -> links/rechts, merk Bosch/Carello/Lucas, lenskleur, behuizing/reflector
carburateur -> motorcode, carburateurtype, revisieset/complete unit, pakkingen
bumperdeel -> links/rechts, voor/achter, beugels, chroom/paint, modeljaar
```

## Common core fields voor elke case

| Veld | Type | Verplicht? | Waarom |
|---|---|---:|---|
| merk | tekst/dropdown | ja | Basisidentificatie voertuig. |
| model | tekst | ja | Basisidentificatie voertuig. |
| bouwjaar_of_periode | jaar/tekst | ja | Fitment en generatie. |
| onderdeel_categorie | dropdown | ja | Bepaalt conditionele vragen. |
| onderdeel_omschrijving | tekst | ja | Klanttaal bewaren. |
| foto_of_partnummer | upload/text | sterk aanbevolen | Verhoogt matchkwaliteit. |
| origineel_repro_used | dropdown | ja | Bepaalt sourcingroute. |
| compatibiliteit_onzeker | ja/nee/onbekend | ja | Bepaalt specialist/community route. |
| urgentie | dropdown | optioneel | Prioriteit, geen fitment. |
| extra_context | tekst | optioneel | Vrije toelichting. |

## Onderdeelcategorieën MVP

```text
steering_controls
interior_trim_upholstery
body_exterior
lighting_electrical
engine_fuel
brakes_suspension
transmission_drivetrain
rubber_seals
chrome_trim
instruments_dashboard
unknown_other
```

## Lean implementatie voor Run 002

Niet meteen tien conditionele formulieren bouwen.

Voor Run 002 volstaat:

```text
1. voeg onderdeel_categorie toe
2. voeg één extra veld category_specific_details toe
3. toon helpertekst afhankelijk van categorie
4. verwerk details manueel in sourcing-log
5. beslis na Run 002 welke categorievelden structureel nodig zijn
```

## Category-specific helpervragen

```text
steering_controls:
Weet je diameter, merk/model, naaf/boss/adaptor, claxonknop of boutpatroon?

interior_trim_upholstery:
Gaat het om links/rechts, voor/achter, materiaal, kleur, patroon, complete zetel of alleen bekleding?

body_exterior:
Gaat het om links/rechts, voor/achter, volledig paneel of reparatiestuk, chroom of lak?

lighting_electrical:
Staat er een merk of partnummer op, is het links/rechts, lens/behuizing/reflector, 6V/12V?

engine_fuel:
Ken je motorcode, carburateurmerk/type, complete unit of revisieset, gekoppelde pakkingen/spruitstuk?

brakes_suspension:
Voor/achter, links/rechts, diameter/maat, merk, kit of enkel onderdeel?

transmission_drivetrain:
Type bak, aantal versnellingen, spline count, verhouding, complete unit of intern onderdeel?

rubber_seals:
Waar zit het rubber, volledig set of enkel stuk, profielvorm/foto?

chrome_trim:
Waar zit de sierlijst, links/rechts, lengte, clips of bevestiging nodig?

instruments_dashboard:
Merk, schaal, kleur wijzerplaat, partnummer achterzijde, complete meter of onderdeel?
```

## Dependency logic

Sommige onderdelen trekken automatisch verwante onderdelen mee.

```text
if onderdeel_categorie = steering_controls:
    check_related_parts = hub/boss/adaptor, horn_button, bolt_pattern

if onderdeel_categorie = engine_fuel:
    check_related_parts = gaskets, manifold, linkage, rebuild_kit

if onderdeel_categorie = lighting_electrical:
    check_related_parts = housing, reflector, trim_ring, seal, connector

if onderdeel_categorie = interior_trim_upholstery:
    check_related_parts = seat_frame, foam, clips, rails, matching_material
```

## Statuslogica

```text
if common_core_missing:
    status = needs_info
elif onderdeel_categorie = unknown_other:
    status = needs_manual_classification
elif category_specific_details_missing_for_sensitive_part:
    status = needs_category_specific_info
elif compatibility_uncertain = yes:
    status = needs_specialist_validation
elif photo_or_partnumber_available = yes:
    status = ready_for_source_check
else:
    status = ready_for_refinement_check
```

## Niet nu bouwen

Deze correctie is ontwerp/documentatie voor Spike04. Pas structurele formulierwijzigingen toe na:

```text
1. specialistreactie op Run 001
of
2. Run 002 met category_specific_details
```

## Belangrijkste regel

Vraag nooit categorievelden die niet relevant zijn voor de gekozen categorie.

```text
Geen stuurwieldiameter bij zetelbekleding.
Geen bekledingskleur bij remklauw.
Geen carburateurtype bij koplampglas.
```
