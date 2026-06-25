# START HERE — Spike03 uitvoeren

## Doel van deze run

Bewijs dat de intakeflow betrouwbaar werkt van eerste formulier tot `case_view`.

Niet testen:

- betaling;
- prijsbereidheid;
- automatische matching;
- volledige webshop;
- branding.

Wel testen:

- `flow_id` blijft behouden;
- raw tabs worden gevuld;
- objecttabs worden gevuld;
- `case_view` toont één bruikbare case;
- incomplete cases worden correct gemarkeerd.

## Uitvoervolgorde

1. Vul `02-forms/form-inventory.md` aan met de echte Tally-links.
2. Controleer elk formulier met `02-forms/tally-redirect-checklist.md`.
3. Zet of controleer de Google Sheet-kolommen volgens `03-google-sheets/case-view-template.csv`.
4. Zet of controleer formules uit `03-google-sheets/formula-pack.md`.
5. Voer testcases uit uit `04-testplan/manual-test-script.md`.
6. Noteer resultaten in `05-results/test-run-2026-06-25.md`.
7. Noteer fouten in `05-results/findings-log.md`.
8. Beslis in `06-decision/go-no-go.md`.

## Minimaal testbewijs

Per testcase moet je kunnen aantonen:

```text
flow_id:
raw_persons aanwezig: ja/nee
raw_cars aanwezig: ja/nee
raw_ads aanwezig: ja/nee
raw_consents aanwezig: ja/nee
case_view aanwezig: ja/nee
case_complete:
status:
next_action:
missing_fields:
```

## Stopregels

Stop de test en herstel eerst wanneer:

- `flow_id` ontbreekt na een redirect;
- raw data niet in Sheets komt;
- `case_view` verkeerde objecten combineert;
- een incomplete case toch `ready_for_source_check` wordt.

## Go-regel

Ga pas naar Spike04 wanneer Spike03 minstens één volledige flow en minstens één incomplete flow correct verwerkt.
