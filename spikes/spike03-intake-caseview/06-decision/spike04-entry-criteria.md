# Spike04 Entry Criteria — Manual Source Check

Spike04 mag pas starten als Spike03 voldoende bewijs levert.

## Minimale ingangseisen

- `cpf_flow_test_012` slaagt als volledige correcte aanvraag.
- `cpf_flow_test_013` wordt correct als incompleet gemarkeerd.
- `cpf_flow_test_014` wordt niet zomaar als sourcing-ready gemarkeerd wanneer de onderdeelinfo te vaag is.
- `flow_id` blijft behouden in alle noodzakelijke stappen.
- `case_view` toont bruikbare operationele cases.
- Er zijn geen open blockers.

## Spike04-doel

Niet betalen testen. Wel testen of sourcing waarde oplevert.

Spike04 moet aantonen:

- Kunnen we per case relevante bronnen vinden?
- Kunnen we specialisten, leveranciers, fora of eigenaars identificeren?
- Is de aanvraag concreet genoeg om te zoeken?
- Hoeveel tijd kost één handmatige source-check?
- Is er een realistische matchkans?

## Spike04 minimale test

```text
5 aanvragen
5 bronnen per aanvraag
maximaal 30 minuten source-check per aanvraag
resultaat per aanvraag: match / lead / no match / needs info
```

## Niet starten met Spike04 wanneer

- De intakeflow onbetrouwbaar is.
- Cases vaak te weinig onderdeelinfo bevatten.
- Toestemming niet goed vastligt.
- Testresultaten niet zijn gelogd.
