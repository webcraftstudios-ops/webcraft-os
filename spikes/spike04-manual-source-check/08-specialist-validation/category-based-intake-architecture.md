# Category-Based Intake Architecture — Spike04

## Status

```text
status: proposed_correction
source: user_feedback_after_intake_research
scope: Spike04 only
```

## Correctie

De intake mag niet worden ontworpen vanuit één onderdeeltype zoals stuurwielen.

Classic Parts Finder moet werken voor uiteenlopende onderdelen:

```text
stuurwiel
stoelbekleding
carrosserieplaat
koplampglas
bumperdeel
carburateur
revisieset
motoronderdeel
elektrisch onderdeel
dashboardmeter
chroom/trim
rubbers/seals
```

Daarom is het juiste model:

```text
common core fields + category selector + conditional specification modules
```

Niet:

```text
één groot formulier met stuurwielspecificaties voor iedereen
```

## Principe

Iedere aanvraag krijgt eerst een klein generiek minimum. Daarna activeert het gekozen onderdeeltype alleen de relevante verdiepingsvragen.

## Common core fields

Deze velden gelden voor elke aanvraag:

| Veld | Type | Verplicht? | Waarom |
|---|---|---:|---|
| merk | tekst/dropdown | ja | Basisidentificatie voertuig. |
| model | tekst | ja | Basisidentificatie voertuig. |
| bouwjaar_of_periode | jaar/tekst | ja | Fitment en generatie. |
| onderdeel_categorie | dropdown | ja | Bepaalt conditionele module. |
| onderdeel_omschrijving | tekst | ja | Klanttaal bewaren. |
| foto_of_partnummer | upload/text | sterk aanbevolen | Verhoogt matchkwaliteit. |
| origineel_repro_used | dropdown | ja | Bepaalt sourcingroute. |
| compatibiliteit_onzeker | ja/nee/onbekend | ja | Bepaalt specialist/community route. |
| urgentie | dropdown | optioneel | Prioriteit, geen fitment. |
| extra_context | tekst | optioneel | Vrij veld voor details. |

## Onderdeelcategorieën

MVP-categorieën:

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

## Conditional module — steering_controls

Alleen tonen bij stuurwiel, stuurkolom, naaf, claxonknop, stuurbediening.

```text
steering_wheel_diameter
steering_wheel_brand
steering_wheel_line_or_model
hub_boss_adaptor_known
bolt_pattern_or_pcd_known
airbag_or_non_airbag
horn_button_needed
column_type_known
```

## Conditional module — interior_trim_upholstery

Voor zetels, bekleding, deurpanelen, tapijt, hemelbekleding, interieurtrim.

```text
seat_position_front_rear_left_right
body_style_coupe_spider_sedan_wagon
material_vinyl_leather_fabric
color_code_or_description
pattern_or_stitching
seat_frame_included_yes_no
upholstery_only_or_complete_seat
condition_match_required
photo_of_current_interior
```

Stuurwieldiameter is hier irrelevant.

## Conditional module — body_exterior

Voor bumpers, spatborden, deuren, motorkap, kofferklep, panelen.

```text
body_side_left_right_front_rear
body_style
chrome_or_painted
mounting_points_present
repair_panel_or_full_part
rust_free_required
color_relevant_yes_no
shipping_size_sensitive
```

## Conditional module — lighting_electrical

Voor koplampen, achterlichten, knipperlichten, schakelaars, kabelboom, relais, meters.

```text
voltage_6v_12v_unknown
left_right_front_rear
lens_color
brand_bosch_carello_lucas_other
part_number_on_unit
connector_type
complete_unit_or_lens_only
working_condition_required
```

## Conditional module — engine_fuel

Voor carburateur, injectie, ontsteking, filters, motoronderdelen, revisiesets.

```text
engine_code_or_displacement
fuel_system_carb_injection_unknown
carburetor_brand_type
number_of_cylinders
single_or_pair_set
rebuild_kit_or_complete_unit
matching_numbers_required
part_number_or_casting_number
related_parts_needed
```

## Conditional module — brakes_suspension

Voor remmen, ophanging, stuurinrichting, veren, dempers, bussen.

```text
front_or_rear
left_or_right
brake_disc_drum_unknown
diameter_or_size_known
caliper_brand
suspension_type
kit_or_single_part
safety_critical_yes
```

## Conditional module — transmission_drivetrain

Voor koppeling, versnellingsbak, cardan, differentieel, aandrijfassen.

```text
gearbox_type_manual_auto
number_of_gears
differential_ratio_known
engine_pairing
spline_count_known
clutch_diameter_known
complete_unit_or_internal_part
```

## Conditional module — rubber_seals

Voor raamrubbers, deurrubbers, kofferrubbers, pakkingen.

```text
location_on_vehicle
body_style
left_right_front_rear
profile_shape_photo_available
complete_set_or_single_piece
original_profile_required
```

## Conditional module — chrome_trim

Voor sierlijsten, emblemen, bumpersierdelen, chroomdelen.

```text
location_on_vehicle
left_right_front_rear
chrome_condition_required
mounting_clips_needed
complete_set_or_single_piece
length_or_dimensions_known
photo_of_missing_trim
```

## Conditional module — instruments_dashboard

Voor VDO-klokjes, meters, schakelaars, dashboardonderdelen.

```text
instrument_brand
scale_or_units
face_color
connector_or_mounting_type
working_or_cosmetic
part_number_on_back
complete_unit_or_component
```

## Dependency logic

Sommige onderdelen hebben mechanische of technische afhankelijkheden.

Voorbeeld:

```text
requested_part = steering_wheel
related_required_parts = hub/boss/adaptor, horn button, bolt pattern
```

Voorbeelden per categorie:

| Gevraagd onderdeel | Mogelijke gekoppelde onderdelen |
|---|---|
| stuurwiel | naaf, boss, adaptor, claxonknop, boutpatroon |
| carburateur | spruitstuk, luchtfilter, gaskabel, revisieset, pakkingen |
| koplampglas | behuizing, reflector, ring, afdichtrubber, merk Bosch/Carello/Lucas |
| stoelbekleding | stoeltype, frame, schuim, patroon, kleur, bekledingsmateriaal |
| bumperdeel | beugels, bouten, rubbers, chroomtrim, links/rechts, modeljaar |
| deurpaneel | clips, handgreep, raamslinger, kleur, materiaal, links/rechts |
| remklauw | schijfdiameter, bevestigingspunten, remslang, revisieset, links/rechts |

## Statuslogica

```text
if common_core_missing:
    status = needs_info
elif category = unknown_other:
    status = needs_manual_classification
elif critical_category_fields_missing:
    status = needs_category_specific_info
elif compatibility_uncertain = yes:
    status = needs_specialist_validation
elif photo_or_partnumber_available = yes:
    status = ready_for_source_check
else:
    status = ready_for_refinement_check
```

## MVP implementation

Voor Spike04 niet alles als formulier bouwen.

MVP-aanpak:

```text
1. behoud common core
2. voeg onderdeel_categorie dropdown toe
3. voeg één conditioneel tekstblok toe: category_specific_details
4. gebruik helpervragen afhankelijk van categorie
5. evalueer Run 002 manueel
```

## Helpervraag per categorie

```text
Stuurwiel/stuurbediening: weet je diameter, merk/model, naaf/boss/adaptor of claxonknop?
Interieur/bekleding: gaat het om links/rechts, voor/achter, materiaal, kleur, patroon of complete zetel?
Carrosserie: gaat het om links/rechts, voor/achter, volledig paneel of reparatiestuk?
Verlichting/elektrisch: staat er een merk of partnummer op het onderdeel, en is het links/rechts?
Motor/brandstof: ken je motorcode, carburateurmerk/type of revisiesetnummer?
Remmen/ophanging: gaat het om voor/achter, links/rechts, diameter/maat of merk?
Transmissie/aandrijving: ken je type bak, aantal versnellingen, spline count of verhouding?
Rubbers/seals: waar zit het rubber en heb je een foto van het profiel?
Chroom/trim: waar zit de sierlijst, links/rechts, lengte en bevestigingsclips?
Dashboard/instrumenten: merk, schaal, kleur wijzerplaat, partnummer achterkant?
```

## Belangrijkste regel

Vraag nooit categorievelden die niet relevant zijn voor de gekozen categorie.

```text
Geen stuurwieldiameter bij zetelbekleding.
Geen bekledingskleur bij remklauw.
Geen carburateurtype bij koplampglas.
```
