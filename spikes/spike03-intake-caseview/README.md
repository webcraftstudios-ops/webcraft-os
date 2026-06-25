# Spike03 — Intakeflow & case_view

## Doel

Spike03 bewijst dat een oldtimer-onderdeelzoekvraag via vier formulieren betrouwbaar wordt omgezet naar één volledige `case_view`-regel, klaar voor handmatige broncontrole.

## Scope

Binnen scope:

- `flow_id` doorgeven doorheen alle formulieren.
- Raw form-data laten landen in Google Sheets.
- Objectlaag valideren: `persons`, `cars`, `ads`, `consents`.
- `case_view` automatisch vullen.
- Ontbrekende data zichtbaar maken.
- E2E-testcases `cpf_flow_test_012` t/m `cpf_flow_test_014` uitvoeren.
- Go/no-go bepalen voor de volgende fase: handmatige source-checks.

Buiten scope:

- Betaling of pricing.
- Volledige webshop.
- Accountsysteem.
- Automatische matching.
- Marketplace-functionaliteit.
- Betaalde tooling tenzij aantoonbaar nodig.

## Kernprincipe

Eerst bewijzen dat de intake en case-opbouw betrouwbaar werken. Monetisatie komt pas later, nadat duidelijk is dat aanvragen effectief gematcht kunnen worden met bronnen, specialisten of leveranciers.

## Folderstructuur

```text
spikes/spike03-intake-caseview/
├── README.md
├── 01-scope/
│   └── spike03-scope.md
├── 02-forms/
│   └── tally-redirect-checklist.md
├── 03-google-sheets/
│   ├── sheet-structure.md
│   ├── formulas.md
│   └── apps-script-optional.md
├── 04-testplan/
│   ├── e2e-testplan.md
│   └── testcases.md
├── 05-results/
│   └── findings-log.md
└── 06-decision/
    └── go-no-go.md
```

## Succescriterium

Spike03 is geslaagd wanneer minstens drie volledige testflows correct in `case_view` verschijnen, zonder verloren `flow_id`, met correcte statusvelden en zichtbare labels voor ontbrekende data.
