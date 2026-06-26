# Specification Refinement Loop — Spike04

## Doel

Deze loop maakt Spike04 niet lineair maar lerend. Wanneer een kanaal nieuwe specificatie oplevert, keren we bewust terug naar eerdere kanalen met betere zoektermen.

## Waarom dit nodig is

Klanten formuleren hun zoekvraag vaak breed:

```text
Nardi stuurwiel voor Alfa Romeo Spider
```

De sourcingwaarde zit in het verrijken van die vraag tot iets dat veel beter zoekbaar en beoordeelbaar is:

```text
Nardi Classico / Personal stuurwiel, diameter onbekend, voor Alfa Romeo Spider 1990 / Series 4 / 105-115, inclusief juiste hub/boss/adaptor, liefst origineel of NOS.
```

## Officiële loop

```text
1. Originele aanvraag vastleggen
2. Kanaalronde uitvoeren
3. Nieuwe specificatie herkennen
4. Zoektermen verbeteren
5. Terugkeren naar eerdere kanalen
6. Nieuwe leads beoordelen
7. Verschil tussen originele en verfijnde search loggen
```

## Wanneer loop activeren?

Activeer de loop wanneer een kanaal één of meer van deze dingen oplevert:

- betere modelnaam of generatie;
- onderdeelnummer;
- alternatieve naam of vertaling;
- variant, diameter, maat of uitvoering;
- compatibiliteitsinfo;
- hub/boss/adaptor-informatie;
- merk- of leveranciersnaam;
- communityadvies;
- uitsluiting van verkeerde zoekrichting.

## Logregels

Gebruik aparte kanaalnamen:

```text
channel_1_google_original
channel_2_marketplace_original
channel_3_community_original
channel_4_specialist_original
channel_1b_google_refined
channel_2b_marketplace_refined
channel_3b_community_refined
channel_4b_specialist_refined
```

## Te meten

Per refined search loggen:

```text
refinement_source:
new_terms:
reason_for_refinement:
channels_retried:
lead_score_before:
lead_score_after:
time_spent_extra:
was_search_improved: yes/no
```

## Voor case 7Xo88NP

### Origineel

```text
Alfa Romeo Spider 1990 Nardi stuurwiel
```

### Na kanaal 1–3 verfijnd

```text
Alfa Romeo Spider Series 4 Nardi steering wheel
Alfa Romeo Spider 105 115 Nardi steering wheel
Nardi boss kit Alfa Romeo Spider 1990
Nardi hub Alfa Romeo Spider Series 4
Nardi Classico Alfa Spider 115
Nardi Personal Alfa Romeo Spider hub
```

## Beslisregel

Als een refined search een lead score 4 of 5 oplevert, is dit sterk bewijs dat Classic Parts Finder waarde toevoegt door zoekvragen te professionaliseren.

Als refined search geen betere resultaten oplevert, is dat ook waardevol bewijs: de bottleneck zit dan waarschijnlijk niet in zoektermen maar in beschikbaarheid, zeldzaamheid of ontbrekende case-informatie.
