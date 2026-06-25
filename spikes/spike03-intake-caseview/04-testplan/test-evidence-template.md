# Test Evidence Template — Spike03

Gebruik dit per testcase om bewijs vast te leggen.

## Evidence block

```text
testcase:
flow_id:
datum:
tester:
starttijd:
eindtijd:
```

## Redirect evidence

| Stap | URL bevat flow_id | Verwachte volgende stap | Resultaat | Opmerking |
|---|---|---|---|---|
| Form 1 → Form 2 | todo | Form 2 | todo |  |
| Form 2 → Form 3 | todo | Form 3 | todo |  |
| Form 3 → Form 4 | todo | Form 4 | todo |  |
| Form 4 → Eindpagina | todo | Eindpagina | todo |  |

## Raw tabs evidence

| Raw tab | Rij aanwezig | flow_id aanwezig | Timestamp | Opmerking |
|---|---|---|---|---|
| raw_persons | todo | todo | todo |  |
| raw_cars | todo | todo | todo |  |
| raw_ads | todo | todo | todo |  |
| raw_consents | todo | todo | todo |  |

## Object tabs evidence

| Object tab | Object-ID aanwezig | Complete flag | Opmerking |
|---|---|---|---|
| persons | todo | todo |  |
| cars | todo | todo |  |
| ads | todo | todo |  |
| consents | todo | todo |  |

## case_view evidence

```text
flow_id:
person_id:
car_id:
ad_id:
consent_id:
person_complete:
car_complete:
ad_complete:
consent_complete:
case_complete:
status:
next_action:
missing_fields:
source_quality:
notes:
```

## Resultaat

```text
resultaat: pass/fail/blocked
reden:
issue_id:
volgende actie:
```
