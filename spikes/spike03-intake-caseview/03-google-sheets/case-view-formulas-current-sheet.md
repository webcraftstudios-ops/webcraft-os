# case_view formules — huidige DataCore-kolommen

Gebaseerd op het geuploade bestand `ClassicPartsFinder_DataCore_v1_20260622_columns.ods`.

## Belangrijk uitgangspunt

Elke aanvraag start in Contact. Daarom is `persons!B:B` de masterlijst voor `case_view!A:A`.

Voor de nieuwe Tally-flow geldt:

```text
raw_persons!A:A = Contact Submission ID = flow_id voor de eerste stap
raw_cars!G:G = flow_id
raw_ads!J:J = flow_id
raw_consents!F:F = flow_id
```

## Stap 1 — objecttabs eerst vullen

`case_view` werkt pas wanneer `persons`, `cars`, `ads` en `consents` gevuld zijn.

### persons

Plak in `persons!B2` en kopieer omlaag:

```gs
=IF(raw_persons!A2<>"",IF(raw_persons!G2<>"",raw_persons!G2,raw_persons!A2),"")
```

Plak in `persons!A2` en kopieer omlaag:

```gs
=IF(B2<>"",IF(LEFT(B2,8)="cpf_flow",SUBSTITUTE(B2,"cpf_flow","cpf_person"),"cpf_person_"&B2),"")
```

Overige kolommen:

```gs
persons!C2 = raw_persons!B2
persons!D2 = raw_persons!D2
persons!E2 = raw_persons!E2
persons!F2 = raw_persons!F2
persons!G2 = raw_persons!C2
persons!H2 = raw_persons!A2
persons!I2 = TEXTJOIN(", ",TRUE,IF(B2="","missing_flow_id",""),IF(D2="","missing_name",""),IF(E2="","missing_email",""))
persons!J2 = ""
```

### cars

```gs
cars!B2 = raw_cars!G2
cars!A2 = IF(B2<>"",IF(LEFT(B2,8)="cpf_flow",SUBSTITUTE(B2,"cpf_flow","cpf_car"),"cpf_car_"&B2),"")
cars!C2 = IFERROR(XLOOKUP(B2,persons!B:B,persons!A:A),"")
cars!D2 = raw_cars!D2
cars!E2 = raw_cars!E2
cars!F2 = raw_cars!F2
cars!G2 = raw_cars!C2
cars!H2 = raw_cars!A2
cars!I2 = TEXTJOIN(", ",TRUE,IF(B2="","missing_flow_id",""),IF(D2="","missing_make",""),IF(E2="","missing_model",""),IF(F2="","missing_year",""))
cars!J2 = ""
```

### ads

```gs
ads!B2 = raw_ads!J2
ads!A2 = IF(B2<>"",IF(LEFT(B2,8)="cpf_flow",SUBSTITUTE(B2,"cpf_flow","cpf_ad"),"cpf_ad_"&B2),"")
ads!C2 = IFERROR(XLOOKUP(B2,persons!B:B,persons!A:A),"")
ads!D2 = IFERROR(XLOOKUP(B2,cars!B:B,cars!A:A),"")
ads!E2 = raw_ads!D2
ads!F2 = raw_ads!E2
ads!G2 = raw_ads!F2
ads!H2 = raw_ads!G2
ads!I2 = raw_ads!H2
ads!J2 = raw_ads!I2
ads!K2 = raw_ads!C2
ads!L2 = raw_ads!A2
ads!M2 = "new"
ads!N2 = "review_case"
ads!O2 = TEXTJOIN(", ",TRUE,IF(B2="","missing_flow_id",""),IF(E2="","missing_part",""),IF(LEN(TRIM(J2))<10,"extra_info_short",""))
```

### consents

```gs
consents!B2 = raw_consents!F2
consents!A2 = IF(B2<>"",IF(LEFT(B2,8)="cpf_flow",SUBSTITUTE(B2,"cpf_flow","cpf_consent"),"cpf_consent_"&B2),"")
consents!C2 = IFERROR(XLOOKUP(B2,persons!B:B,persons!A:A),"")
consents!D2 = IFERROR(XLOOKUP(B2,cars!B:B,cars!A:A),"")
consents!E2 = IFERROR(XLOOKUP(B2,ads!B:B,ads!A:A),"")
consents!F2 = IF(raw_consents!E2="1","yes",IF(raw_consents!M2="yes","yes","no"))
consents!G2 = raw_consents!D2
consents!H2 = raw_consents!C2
consents!I2 = raw_consents!A2
consents!J2 = IF(F2="yes","yes","no")
consents!K2 = TEXTJOIN(", ",TRUE,IF(B2="","missing_flow_id",""),IF(F2<>"yes","missing_consent",""))
```

## Stap 2 — case_view formules

Plak in `case_view!A2`:

```gs
=FILTER(persons!B2:B,persons!B2:B<>"")
```

Plak in `case_view!B2` en kopieer B2:R2 omlaag:

```gs
=IFERROR(XLOOKUP($A2,persons!$B:$B,persons!$A:$A),"")
```

Kolom per kolom:

```gs
B2 = IFERROR(XLOOKUP($A2,persons!$B:$B,persons!$A:$A),"")
C2 = IFERROR(XLOOKUP($A2,cars!$B:$B,cars!$A:$A),"")
D2 = IFERROR(XLOOKUP($A2,ads!$B:$B,ads!$A:$A),"")
E2 = IFERROR(XLOOKUP($A2,consents!$B:$B,consents!$A:$A),"")
F2 = IFERROR(XLOOKUP($A2,persons!$B:$B,persons!$D:$D),"")
G2 = IFERROR(XLOOKUP($A2,persons!$B:$B,persons!$E:$E),"")
H2 = IFERROR(XLOOKUP($A2,persons!$B:$B,persons!$F:$F),"")
I2 = IFERROR(XLOOKUP($A2,cars!$B:$B,cars!$D:$D),"")
J2 = IFERROR(XLOOKUP($A2,cars!$B:$B,cars!$E:$E),"")
K2 = IFERROR(XLOOKUP($A2,cars!$B:$B,cars!$F:$F),"")
L2 = IFERROR(XLOOKUP($A2,ads!$B:$B,ads!$E:$E),"")
M2 = IFERROR(XLOOKUP($A2,ads!$B:$B,ads!$H:$H),"")
N2 = IFERROR(XLOOKUP($A2,consents!$B:$B,consents!$F:$F),"")
O2 = IF(AND($B2<>"",$C2<>"",$D2<>"",$E2<>"",$F2<>"",$G2<>"",$I2<>"",$J2<>"",$K2<>"",$L2<>"",$N2="yes"),"yes","no")
P2 = IF($O2="yes","ready_for_source_check","needs_info")
Q2 = IF($O2="yes","start_source_check","complete_missing_steps")
R2 = TEXTJOIN(", ",TRUE,IF($B2="","missing_person",""),IF($C2="","missing_car",""),IF($D2="","missing_ad",""),IF($E2="","missing_consent",""),IF($G2="","missing_email",""),IF($I2="","missing_make",""),IF($J2="","missing_model",""),IF($K2="","missing_year",""),IF($L2="","missing_part",""),IF($N2<>"yes","missing_or_invalid_consent",""))
```

## Verwachte uitkomst voor huidige testdata

```text
4aLgZgO  -> needs_info
RWR7prp  -> ready_for_source_check
7Xo88NP  -> ready_for_source_check
```

## Locale-opmerking

Als Google Sheets de formules weigert door scheidingstekens, vervang de komma's tussen formuleargumenten door puntkomma's.
