# Google Sheets Structuur

## Raw tabs

De raw tabs blijven zo dicht mogelijk bij de oorspronkelijke formulieroutput.

Verwacht:

- `raw_persons`
- `raw_cars`
- `raw_ads`
- `raw_consents`

Elke raw tab moet minimaal `flow_id` bevatten.

## Object tabs

De objectlaag maakt van raw formulierdata bruikbare objecten.

### persons

Minimale kolommen:

```text
flow_id
person_id
name
email
phone
location
created_at
person_complete
```

### cars

Minimale kolommen:

```text
flow_id
car_id
make
model
year_from
year_to
engine_or_variant
created_at
car_complete
```

### ads

Minimale kolommen:

```text
flow_id
ad_id
part_name
part_category
part_description
condition_preference
budget_hint
urgency
created_at
ad_complete
```

### consents

Minimale kolommen:

```text
flow_id
consent_id
contact_allowed
share_request_allowed
privacy_acknowledged
created_at
consent_complete
```

## case_view

`case_view` is het operationele dashboard voor handmatige source-checks.

Minimale kolommen:

```text
flow_id
person_id
car_id
ad_id
consent_id
person_complete
car_complete
ad_complete
consent_complete
case_complete
status
next_action
missing_fields
notes
created_at
```

## Statuslogica

| case_complete | status | next_action |
|---|---|---|
| yes | ready_for_source_check | start_source_check |
| no | needs_info | complete_missing_steps |

## Datakwaliteit

Elke incomplete case moet zichtbaar maken welk onderdeel ontbreekt:

- person;
- car;
- ad;
- consent.

Geen enkele rij zonder `flow_id` mag als geldige case worden gezien.
