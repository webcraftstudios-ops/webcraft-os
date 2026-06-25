# Formula Pack — copy/paste voor Spike03

Gebruik deze formules als startpunt. Pas celverwijzingen aan aan de echte sheet.

## Assumptie

In elke objecttab staat `flow_id` in kolom A.

## Object-ID's

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

## Completeness per object

### person_complete

```gs
=IF(AND(A2<>"",C2<>"",D2<>""),"yes","no")
```

Controleert minimaal: `flow_id`, naam, e-mail.

### car_complete

```gs
=IF(AND(A2<>"",C2<>"",D2<>""),"yes","no")
```

Controleert minimaal: `flow_id`, merk, model.

### ad_complete

```gs
=IF(AND(A2<>"",C2<>"",E2<>""),"yes","no")
```

Controleert minimaal: `flow_id`, onderdeelnaam, omschrijving.

### consent_complete

```gs
=IF(AND(A2<>"",C2="yes",D2="yes"),"yes","no")
```

Controleert minimaal: `flow_id`, contact toegestaan, privacy bevestigd.

## case_view lookup-principe

Gebruik `XLOOKUP` wanneer beschikbaar.

### person_id ophalen

```gs
=IFERROR(XLOOKUP($A2,persons!$A:$A,persons!$B:$B),"")
```

### car_id ophalen

```gs
=IFERROR(XLOOKUP($A2,cars!$A:$A,cars!$B:$B),"")
```

### ad_id ophalen

```gs
=IFERROR(XLOOKUP($A2,ads!$A:$A,ads!$B:$B),"")
```

### consent_id ophalen

```gs
=IFERROR(XLOOKUP($A2,consents!$A:$A,consents!$B:$B),"")
```

## case_complete

```gs
=IF(AND(F2="yes",G2="yes",H2="yes",I2="yes"),"yes","no")
```

## status

```gs
=IF(J2="yes","ready_for_source_check","needs_info")
```

## next_action

```gs
=IF(J2="yes","start_source_check","complete_missing_steps")
```

## missing_fields

```gs
=TEXTJOIN(", ",TRUE,IF(F2<>"yes","person",""),IF(G2<>"yes","car",""),IF(H2<>"yes","ad",""),IF(I2<>"yes","consent",""))
```

## source_quality

Gebruik deze enkel wanneer de case technisch compleet is maar sourcingmatig nog te vaag.

```gs
=IF(AND(H2="yes",LEN(TRIM(N2))>=20),"sufficient","insufficient")
```

Pas `N2` aan naar de kolom met onderdeelomschrijving.

## Duplicatencheck

```gs
=IF(COUNTIF($A:$A,A2)>1,"duplicate_flow_id","")
```

## flow_id missing check

```gs
=IF(A2="","missing_flow_id","")
```

## Praktische regel

Geen enkele case mag naar `ready_for_source_check` wanneer `missing_fields` niet leeg is.
