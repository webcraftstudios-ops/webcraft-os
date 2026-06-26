# Scope — Spike04 Manual Source Check

## Kernvraag

Kunnen we met een technisch volledige case uit `case_view` handmatig genoeg bruikbare sourcinginformatie vinden om te bewijzen dat Classic Parts Finder echte waarde kan leveren?

## Hypothese

Als een aanvraag voldoende concreet is, kan een handmatige zoekprocedure binnen beperkte tijd minstens één van deze outputs opleveren:

- concrete verkoper;
- specialist of leverancier;
- forum/community-contact;
- alternatieve zoekrichting;
- bewijs dat de aanvraag te vaag of onrealistisch is.

Daarnaast testen we of Classic Parts Finder waarde toevoegt door de zoekvraag zelf te verbeteren. Een ruwe aanvraag mag dus via community-, specialist- of broninformatie worden omgezet naar verfijnde zoektermen.

## Slaagcriterium

Spike04 slaagt wanneer de manual source check aantoont dat het proces herhaalbaar is:

```text
case -> zoekstrategie -> kanaalchecks -> specificatieverrijking -> refined search -> leads -> beoordeling -> volgende actie
```

## Specification refinement loop

De sourcingflow is niet lineair. Als een kanaal nieuwe specificatie oplevert, keren we terug naar eerdere kanalen met betere zoektermen.

Voorbeelden van nieuwe specificatie:

- modelgeneratie;
- partnummer;
- alternatieve benaming;
- diameter/maatvoering;
- Nardi-lijn of variant;
- hub/boss/adaptor;
- compatibele bouwjaren;
- leverancier- of communityadvies.

Refined searches worden apart gelogd, bijvoorbeeld:

```text
channel_1b_google_refined
channel_2b_marketplace_refined
channel_3b_community_refined
channel_4b_specialist_refined
```

## Te testen cases

### Case A — RWR7prp

```text
flow_id: RWR7prp
auto: Ford Mustang
bouwjaar: 1969
onderdeel: test 12
status: ready_for_source_check
```

Deze case is vooral een technische sourcing-test. Waarschijnlijk is de onderdeelomschrijving onvoldoende realistisch. Gebruik deze case om te testen of de checklist ontbrekende info detecteert.

### Case B — 7Xo88NP

```text
flow_id: 7Xo88NP
auto: Alfa Romeo Spider
bouwjaar: 1990
onderdeel: Nardi Stuurwiel
status: ready_for_source_check
```

Deze case is commercieel interessanter, want een Nardi-stuurwiel is een herkenbaar klassiekeronderdeel met vermoedelijke tweedehands-, specialist- en communitykanalen.

## Buiten scope

- Geen aankoop doen.
- Geen persoonlijke gegevens van de aanvrager delen.
- Geen garantie geven op match.
- Geen commissie of prijs testen.
- Geen automatische scraping of bots.
- Geen sourcing uit betaalde databanken.

## Verwachte output per case

```text
1. case_summary
2. missing_info_check
3. search_terms_nl_en_de_fr
4. channel_attempts
5. specification_refinements
6. refined_search_attempts
7. lead_candidates
8. lead_quality_score
9. recommended_next_action
```

## Go naar Spike05 wanneer

- minstens één realistische case bruikbare leads oplevert;
- het werkproces duidelijk genoeg is om te herhalen;
- de tijd per case meetbaar is;
- minstens één refinement loop is getest wanneer nieuwe specificatie beschikbaar kwam;
- de grootste herhaalbare taken geïdentificeerd zijn voor automatisering.

## No-go of herwerk wanneer

- de cases te vaag zijn om te sourcen;
- er geen bruikbare bronnen gevonden worden;
- handmatige opvolging te rommelig is;
- er privacy- of toestemmingsproblemen ontstaan;
- de sourcer niet objectief kan bepalen of een lead past;
- refined searches geen betere beoordeling opleveren en de intake dus eerst scherper moet.
