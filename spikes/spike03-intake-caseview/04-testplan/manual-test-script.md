# Manual Test Script — Spike03

Gebruik dit script tijdens het testen. Niet improviseren tijdens de eerste run; eerst bewijs verzamelen.

## Voorbereiding

- Open de echte Tally-formulierlinks.
- Open de Google Sheet.
- Open deze bestanden:
  - `form-inventory.md`
  - `tally-redirect-checklist.md`
  - `test-run-2026-06-25.md`
  - `findings-log.md`

## Testcase 012 — volledige correcte aanvraag

### Input

```text
flow_id: cpf_flow_test_012
naam: Jan Testers
email: jan.testers@example.com
telefoon: +32470000012
locatie: Turnhout
merk: Alfa Romeo
model: Spider Veloce
bouwjaar: 1978
onderdeel: Nardi Classico houten stuurwiel incl. naaf
omschrijving: origineel of goede reproductie, lichte patina toegestaan, naaf moet passen op Alfa Romeo Spider Veloce 1978
budget_hint: 250-450 EUR
urgentie: niet dringend
toestemming contact: yes
toestemming aanvraag delen: yes
privacy bevestigd: yes
```

### Verwacht resultaat

```text
case_complete: yes
status: ready_for_source_check
next_action: start_source_check
missing_fields: leeg
source_quality: sufficient
```

## Testcase 013 — gebruiker stopt halverwege

### Input

```text
flow_id: cpf_flow_test_013
naam: Els Incompleet
email: els.incompleet@example.com
telefoon: +32470000013
locatie: Geel
merk: Porsche
model: 911 F-model
bouwjaar: 1971
stop na formulier auto
```

### Verwacht resultaat

```text
case_complete: no
status: needs_info
next_action: complete_missing_steps
missing_fields: ad, consent
```

## Testcase 014 — volledige flow maar onderdeelinfo te vaag

### Input

```text
flow_id: cpf_flow_test_014
naam: Marc Vaag
email: marc.vaag@example.com
telefoon: +32470000014
locatie: Mol
merk: Ford
model: Mustang Fastback
bouwjaar: 1966
onderdeel: bumperstuk
omschrijving: rechter deel
budget_hint: tot 300 EUR
toestemming contact: yes
toestemming aanvraag delen: yes
privacy bevestigd: yes
```

### Verwacht resultaat

```text
case_complete: no of source_quality: insufficient
status: needs_info
next_action: complete_missing_steps
missing_fields: part_description_detail of ad
```

## Per formulier controleren

Na elke redirect:

```text
zit flow_id nog in de URL? ja/nee
komt flow_id mee in Tally-submission? ja/nee
komt flow_id mee in raw tab? ja/nee
```

## Per testcase afronden

Vul dit in `05-results/test-run-2026-06-25.md` in:

```text
flow_id:
resultaat: pass/fail/blocked
belangrijkste observatie:
issue id indien relevant:
```

## Stop wanneer

- `flow_id` wegvalt;
- data niet in raw tabs verschijnt;
- `case_view` niet update;
- incomplete cases fout als klaar worden gemarkeerd.
