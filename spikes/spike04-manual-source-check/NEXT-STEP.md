# NEXT STEP — Spike04 after Run 001

## Beslissing

```text
next_step: specialist_validation_sprint
status: prepared
date: 2026-06-26
scope: Spike04 only
```

## Waarom deze stap

Run 001 heeft binnen de 90-minuten-timebox geen harde productlead opgeleverd, maar wel sterke source/specialist-leads en een duidelijke refinement-loop.

De logische volgende stap is daarom niet Spike05 en ook niet meteen nieuwe automatisering. Eerst moet worden gevalideerd of de beste specialistbronnen de ontbrekende specificaties kunnen bevestigen.

## Concrete volgende stap

Start een korte Specialist Validation Sprint met twee targets:

```text
1. Alfaholics — Alfa 105/115 Spider en S4 Spider fitment
2. Nardi-Personal — Nardi steering wheel, hub, boss, adapter en diameter/designlijn
```

## Doel

Bevestigen:

- welke hub/boss/adaptor past op Alfa Romeo Spider 1990 / Series 4 / 105-115;
- of Alfaholics STE1030 of vergelijkbaar de juiste route is;
- welke Nardi diameter en designlijn logisch zijn;
- of een complete stuurwiel + hub combinatie beschikbaar of vindbaar is;
- welke intakevelden verplicht moeten worden voor volgende echte cases.

## Niet doen

Binnen deze stap doen we niet:

- betaling;
- aankoop;
- commissie;
- checkout;
- scraping;
- klantbelofte;
- Spike05 starten;
- nieuwe webshopfunctionaliteit bouwen.

## Deliverables

```text
08-specialist-validation/README.md
08-specialist-validation/specialist-contact-log.csv
08-specialist-validation/specialist-message-templates.md
08-specialist-validation/intake-field-delta.md
```

## Success criteria

Deze stap is geslaagd wanneer minstens één van deze uitkomsten bekend is:

```text
A. specialist bevestigt exacte hub/boss/adaptor
B. specialist bevestigt noodzakelijke Nardi diameter/designlijn/compatibiliteit
C. specialist verwijst naar een concrete leverancier, product of partnummer
D. specialist bevestigt dat intake eerst extra gegevens nodig heeft
```

## Decision after sprint

```text
if specialist_confirms_specs:
    run refined search again with confirmed specs
elif specialist_requests_more_info:
    improve intake fields before Run 002
elif no_response_after_followup:
    run Run 002 only with a better-specified case
else:
    pause Spike04 and improve intake
```
