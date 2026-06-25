# Data Quality Checks — Spike03

## Doel

Deze checks voorkomen dat een technisch foute of incomplete aanvraag naar handmatige source-checks gaat.

## Checks per raw tab

| Check | Formule/controle | Blocker? |
|---|---|---|
| `flow_id` ontbreekt | lege waarde in flow_id-kolom | ja |
| dubbele submission | zelfde `flow_id` + zelfde timestamp of payload | mogelijk |
| oude testdata | `flow_id` niet uit huidige testrange | nee, maar filteren |
| onverwachte lege rij | geen inhoud behalve timestamp | mogelijk |

## Checks per objecttab

| Object | Minimale vereiste | Incomplete wanneer |
|---|---|---|
| person | naam + e-mail of telefoon | geen contact mogelijk |
| car | merk + model | auto niet identificeerbaar |
| ad | onderdeelnaam + duidelijke omschrijving | sourcing niet mogelijk |
| consent | contact/privacy bevestigd | geen correcte opvolging mogelijk |

## Checks in case_view

| Check | Verwacht gedrag |
|---|---|
| `flow_id` uniek | één operationele case per flow |
| alle object-ID's gevuld | alleen bij volledige flow |
| `case_complete=yes` | alleen wanneer alle objecten compleet zijn |
| `missing_fields` | leeg bij complete case, gevuld bij incomplete case |
| `status` | `ready_for_source_check` of `needs_info` |
| `next_action` | `start_source_check` of `complete_missing_steps` |

## Blockers

Deze fouten blokkeren go:

```text
missing_flow_id
wrong_flow_join
case_complete_false_positive
raw_data_not_arriving
wrong_redirect
```

## High-impact issues

Deze moeten eerst hersteld of bewust geaccepteerd worden:

```text
duplicate_flow_id
missing_consent
unclear_part_description
inconsistent_status
```

## Low-impact issues

Deze mogen open blijven voor Spike04 als ze de test niet verstoren:

```text
layout_issue
documentation_gap
old_testdata_present_but_filtered
minor_label_cleanup
```
