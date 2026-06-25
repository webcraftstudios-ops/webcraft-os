# Google Sheets Formules

Formules moeten eerst volstaan. Apps Script blijft optioneel.

## ID-afleiding

Uitgangspunt: object-ID's worden afgeleid uit `flow_id` en niet via URL meegestuurd.

### person_id

```gs
=IF(A2<>"",SUBSTITUTE(A2,"flow","person"),"")
```

### car_id

```gs
=IF(A2<>"",SUBSTITUTE(A2,"flow","car"),"")
```

### ad_id

```gs
=IF(A2<>"",SUBSTITUTE(A2,"flow","ad"),"")
```

### consent_id

```gs
=IF(A2<>"",SUBSTITUTE(A2,"flow","consent"),"")
```

## Completeness flags

Pas kolommen aan aan de werkelijke sheetstructuur.

### case_complete

```gs
=IF(AND(B2<>"",C2<>"",D2<>"",E2<>""),"yes","no")
```

### status

```gs
=IF(F2="yes","ready_for_source_check","needs_info")
```

### next_action

```gs
=IF(F2="yes","start_source_check","complete_missing_steps")
```

### missing_fields

```gs
="missing: "&TEXTJOIN(", ",TRUE,IF(B2="","person",""),IF(C2="","car",""),IF(D2="","ad",""),IF(E2="","consent",""))
```

## Belangrijk

- Gebruik exacte kolomverwijzingen uit de echte sheet.
- Zet incomplete cases nooit automatisch op `ready_for_source_check`.
- Controleer duplicaten op `flow_id`.
- Controleer rijen zonder `flow_id` apart.

## Minimale datakwaliteitschecks

```text
flow_id_missing
flow_id_duplicate
person_missing
car_missing
ad_missing
consent_missing
case_complete_mismatch
```

## Stopregel

Als `flow_id` niet in elke raw tab staat voor een volledige flow, wordt de E2E-flow als failed beschouwd.
