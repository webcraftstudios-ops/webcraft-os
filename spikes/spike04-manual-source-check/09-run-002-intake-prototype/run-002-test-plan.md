# Run 002 Test Plan — Intake Prototype

## Doel

Testen of categoriegestuurde intake betere sourcing oplevert dan Run 001.

## Hypothese

```text
Als we onderdeel_categorie + category_specific_details toevoegen, dan daalt het aantal missing-info blokkades en kan de sourcer sneller de juiste route kiezen.
```

## Voorwaarden om te starten

Run 002 mag starten wanneer één van deze dingen beschikbaar is:

```text
A. specialistreactie op Run 001
B. nieuwe case met betere details
C. handmatig ingevulde mockcase met category_specific_details
```

## Testopzet

Gebruik minimaal 2 en maximaal 3 cases:

```text
1. één technische/fitment-gevoelige case
2. één interieur/body/trim-case
3. optioneel één unknown_other case voor classificatietest
```

## Minimum dataset per case

```text
flow_id
merk
model
bouwjaar_of_periode
onderdeel_omschrijving
onderdeel_categorie
category_specific_details
foto_of_partnummer_available
origineel_repro_used
compatibiliteit_onzeker
```

## Te meten per case

```text
time_to_first_search_strategy_minutes
missing_info_count
category_detail_quality
sourcing_route_hint
first_channel_chosen
channels_checked
best_lead_score
hard_product_lead_found
source_lead_found
refinement_needed_yes_no
```

## Succescriteria

Run 002 is geslaagd wanneer minstens één van deze uitkomsten optreedt:

```text
1. time_to_first_search_strategy < Run 001
2. missing_info_count lager dan Run 001
3. sourcing_route_hint is duidelijk zonder extra analyse
4. lead_score >= 4
5. de intake toont duidelijk welke categorievelden structureel nodig zijn
```

## Stopregels

```text
max_active_search_time_per_case: 60 minuten
stop bij lead_score >= 4
stop als core fields ontbreken
stop als category_specific_details onvoldoende zijn en follow-up nodig is
geen extra specialisten mailen tenzij route_hint = specialist_first en case dit rechtvaardigt
```

## Vergelijking met Run 001

Run 001:

```text
case: 7Xo88NP
onderdeel: Nardi Stuurwiel
probleem: onvoldoende categorie-specifieke details
beste resultaat: source lead score 4, geen productlead
actieve tijd: 90 minuten
```

Run 002 moet aantonen of de intake-aanpassing helpt.

## Beslissing na Run 002

```text
if intake_prototype_improves_sourcing:
    prepare minimal Tally intake update
elif improvement unclear:
    run one more case with same prototype
else:
    do not add fields; improve manual refinement SOP instead
```
