# Testcases — Spike03

## Testcase 012 — Volledige correcte aanvraag

```text
flow_id: cpf_flow_test_012
scenario: volledige flow
verwacht: case_complete=yes
status: ready_for_source_check
next_action: start_source_check
```

Voorbeelddata:

```text
persoon: Jan Testers
email: jan.testers@example.com
auto: Alfa Romeo Spider Veloce
bouwjaar: 1978
onderdeel: Nardi Classico houten stuurwiel incl. naaf
conditie: lichte patina toegestaan
budget_hint: 250-450 EUR
toestemming: contact toegestaan, aanvraag delen toegestaan
```

## Testcase 013 — Stop halverwege

```text
flow_id: cpf_flow_test_013
scenario: gebruiker stopt na autogegevens
verwacht: case_complete=no
status: needs_info
next_action: complete_missing_steps
missing_fields: ad, consent
```

Voorbeelddata:

```text
persoon: Els Incompleet
email: els.incompleet@example.com
auto: Porsche 911 F-model
bouwjaar: 1971
onderdeel: niet ingevuld
toestemming: niet ingevuld
```

## Testcase 014 — Volledige flow maar onvoldoende onderdeelinfo

```text
flow_id: cpf_flow_test_014
scenario: volledige flow, maar onderdeelomschrijving te vaag
verwacht: case_complete=no of source_quality=insufficient
status: needs_info
next_action: complete_missing_steps
missing_fields: part_description_detail
```

Voorbeelddata:

```text
persoon: Marc Vaag
email: marc.vaag@example.com
auto: Ford Mustang Fastback
bouwjaar: 1966
onderdeel: bumperstuk
omschrijving: rechter deel, maar geen foto/variant/details
toestemming: contact toegestaan
```

## Testcase-resultaattemplate

```text
flow_id:
datum:
tester:
formulier 1 raw: pass/fail
formulier 2 raw: pass/fail
formulier 3 raw: pass/fail
formulier 4 raw: pass/fail
persons object: pass/fail
cars object: pass/fail
ads object: pass/fail
consents object: pass/fail
case_view: pass/fail
case_complete:
status:
next_action:
missing_fields:
issues:
beslissing:
```
