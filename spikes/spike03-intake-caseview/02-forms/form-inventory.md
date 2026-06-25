# Form Inventory — Tally links en redirects

Vul hier de echte formulierlinks en redirectinstellingen in vóór de test.

## Formulieroverzicht

| Stap | Doel | Tally URL | Redirect naar | Redirect bevat `flow_id` | Status |
|---|---|---|---|---|---|
| 1 | Persoon | todo | Formulier 2 | todo | todo |
| 2 | Auto | todo | Formulier 3 | todo | todo |
| 3 | Onderdeelzoekvraag | todo | Formulier 4 | todo | todo |
| 4 | Toestemming | todo | Eindpagina / bedanking | n.v.t. | todo |

## Verwachte redirectpatronen

### Formulier 1 naar formulier 2

```text
<FORM_2_URL>?flow_id=@flow_id
```

### Formulier 2 naar formulier 3

```text
<FORM_3_URL>?flow_id=@flow_id
```

### Formulier 3 naar formulier 4

```text
<FORM_4_URL>?flow_id=@flow_id
```

### Formulier 4 naar eindpagina

```text
<THANK_YOU_URL>?flow_id=@flow_id
```

De laatste redirect mag ook zonder `flow_id` wanneer de eindpagina niets meer hoeft te verwerken, maar voor debugging is behoud van `flow_id` nuttig.

## Belangrijke keuze

Gebruik alleen `flow_id` als URL-parameter. Stuur geen `person_id`, `car_id`, `ad_id` of `consent_id` via URL. Die worden in Sheets afgeleid.

## Formulier 1 — Persoon

```text
formuliernaam:
Tally URL:
verborgen veld flow_id aanwezig: ja/nee
raw tab:
redirect URL:
issue:
```

## Formulier 2 — Auto

```text
formuliernaam:
Tally URL:
verborgen veld flow_id aanwezig: ja/nee
raw tab:
redirect URL:
issue:
```

## Formulier 3 — Onderdeelzoekvraag

```text
formuliernaam:
Tally URL:
verborgen veld flow_id aanwezig: ja/nee
raw tab:
redirect URL:
issue:
```

## Formulier 4 — Toestemming

```text
formuliernaam:
Tally URL:
verborgen veld flow_id aanwezig: ja/nee
raw tab:
redirect URL:
issue:
```
