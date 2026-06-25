# Handoff voor tester — Spike03

## Wat jij nu moet doen

Je test niet of het concept verkoopt. Je test alleen of de intakeflow technisch en operationeel betrouwbaar genoeg is.

## Open eerst

1. `00-start-here.md`
2. `02-forms/form-inventory.md`
3. `02-forms/tally-redirect-checklist.md`
4. `04-testplan/manual-test-script.md`
5. `05-results/test-run-2026-06-25.md`

## Testvolgorde

### Stap 1 — Formulierlinks vastleggen

Vul in `form-inventory.md` de echte Tally-links in.

### Stap 2 — Redirects controleren

Controleer per formulier of `flow_id` behouden blijft.

### Stap 3 — Google Sheet controleren

Controleer of de raw tabs en objecttabs bestaan.

Verwacht:

```text
raw_persons
raw_cars
raw_ads
raw_consents
persons
cars
ads
consents
case_view
```

### Stap 4 — Testcases uitvoeren

Voer exact deze flows uit:

```text
cpf_flow_test_012
cpf_flow_test_013
cpf_flow_test_014
```

### Stap 5 — Resultaten vastleggen

Schrijf resultaten in:

```text
05-results/test-run-2026-06-25.md
```

Schrijf fouten in:

```text
05-results/findings-log.md
```

## Snelste interpretatie

| Resultaat | Betekenis |
|---|---|
| 012 slaagt | Volledige aanvraag werkt |
| 013 slaagt | Incomplete aanvraag wordt correct afgehandeld |
| 014 slaagt | Vage onderdeelinfo wordt niet te vroeg doorgestuurd naar sourcing |

## Belangrijkste fout om te vinden

Een case die onvolledig is maar toch `ready_for_source_check` krijgt. Dat is gevaarlijker dan een formulier dat gewoon faalt, want dan ga je later tijd verliezen op slechte aanvragen.

## Klaar voor feedback

Na de test stuur je terug:

```text
012: pass/fail + korte uitleg
013: pass/fail + korte uitleg
014: pass/fail + korte uitleg
blockers:
vragen:
```
