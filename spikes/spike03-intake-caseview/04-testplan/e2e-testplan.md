# E2E Testplan — Spike03

## Testdoel

Aantonen dat een aanvraag via vier formulieren volledig en correct terechtkomt in `case_view`.

## Testomgeving

- Tally formulieren: testmodus of afgeschermde testlinks.
- Google Sheet: testdata toegestaan.
- Testflows: `cpf_flow_test_012`, `cpf_flow_test_013`, `cpf_flow_test_014`.

## Hoofdscenario — Complete flow

1. Start formulier 1 met nieuwe `flow_id`.
2. Vul persoonsgegevens in.
3. Controleer redirect naar formulier 2.
4. Vul autogegevens in.
5. Controleer redirect naar formulier 3.
6. Vul onderdeelzoekvraag in.
7. Controleer redirect naar formulier 4.
8. Vul toestemming in.
9. Controleer raw tabs.
10. Controleer object tabs.
11. Controleer `case_view`.

Verwacht resultaat:

```text
case_complete = yes
status = ready_for_source_check
next_action = start_source_check
missing_fields = leeg of geen kritieke ontbrekende velden
```

## Negatief scenario — Stop halverwege

1. Start formulier 1.
2. Vul formulier 1 en 2 in.
3. Stop vóór formulier 3.
4. Controleer of `case_view` de case als incompleet markeert.

Verwacht resultaat:

```text
case_complete = no
status = needs_info
next_action = complete_missing_steps
missing_fields bevat ad en/of consent
```

## Negatief scenario — Onvolledig onderdeelveld

1. Vul volledige flow in.
2. Laat een essentieel onderdeelveld leeg of vaag.
3. Controleer of de case technisch binnenkomt maar sourcingmatig niet klaar is.

Verwacht resultaat:

```text
case_complete = no of source_quality = insufficient
status = needs_info
next_action = complete_missing_steps
```

## Data-integriteit

Controleer per testcase:

- `flow_id` aanwezig in alle verwachte raw tabs;
- geen dubbele `flow_id`-regels zonder verklaring;
- object-ID's correct afgeleid;
- `case_view` toont één case per `flow_id`;
- status en next_action kloppen.

## Acceptatie

Spike03 slaagt alleen als minstens drie testflows correct gelogd en beoordeeld zijn.
