# Intake Form v0 — Run 002 Prototype

## Doel

Een minimale intake testen die breed genoeg is voor meerdere onderdeeltypes, zonder het formulier zwaar te maken.

## Formulieropbouw

### Stap 1 — Voertuig

```text
Merk: verplicht
Model: verplicht
Bouwjaar of periode: verplicht
Uitvoering/body style: optioneel
```

### Stap 2 — Gezocht onderdeel

```text
Onderdeelomschrijving: verplicht
Onderdeelcategorie: verplicht
Foto of partnummer: sterk aanbevolen
Origineel / repro / gebruikt / maakt niet uit: verplicht
Compatibiliteit onzeker: ja / nee / onbekend
```

### Stap 3 — Categorie-specifieke details

Eén tekstveld:

```text
category_specific_details
```

De helpertekst verandert afhankelijk van `onderdeelcategorie`.

## Onderdeelcategorieën voor dropdown

```text
Stuur / bediening
Interieur / bekleding
Carrosserie / exterieur
Verlichting / elektrisch
Motor / brandstof
Remmen / ophanging
Transmissie / aandrijving
Rubbers / seals
Chroom / sierlijsten
Dashboard / instrumenten
Anders / weet ik niet
```

## Helpertekst per categorie

### Stuur / bediening

```text
Weet je merk/model van het stuur, diameter, naaf/boss/adaptor, claxonknop, boutpatroon of kolomtype? Vermeld alles wat je weet.
```

### Interieur / bekleding

```text
Gaat het om links/rechts, voor/achter, materiaal, kleur, patroon, complete zetel of alleen bekleding? Heb je een foto van het bestaande interieur?
```

### Carrosserie / exterieur

```text
Gaat het om links/rechts, voor/achter, volledig paneel of reparatiestuk, chroom of lak, en zijn bevestigingspunten/beugels nodig?
```

### Verlichting / elektrisch

```text
Zoek je alleen de lens/het glas, de reflector/behuizing, of de volledige koplamp/unit? Staat er een merk of partnummer op het bestaande onderdeel? Is het links/rechts, voor/achter, 6V/12V, welk lamptype, EU/US of LHD/RHD?
```

### Motor / brandstof

```text
Ken je motorcode, cilinderinhoud, carburateurmerk/type, injectie/carb, complete unit of revisieset, en zijn pakkingen/spruitstuk/kabels nodig?
```

### Remmen / ophanging

```text
Gaat het om voor/achter, links/rechts, schijf/trommel, diameter/maat, merk, kit of enkel onderdeel? Is het veiligheidskritisch?
```

### Transmissie / aandrijving

```text
Ken je type bak, aantal versnellingen, differentieelverhouding, spline count, koppelingdiameter, of gaat het om complete unit/interne onderdelen?
```

### Rubbers / seals

```text
Waar zit het rubber precies? Volledige set of één stuk? Heb je een foto van profielvorm, bochten of eindstukken?
```

### Chroom / sierlijsten

```text
Waar zit de sierlijst of het chroomdeel? Links/rechts, voor/achter, lengte, clips/bevestiging nodig, complete set of enkel stuk?
```

### Dashboard / instrumenten

```text
Merk van instrument, schaal/eenheden, kleur wijzerplaat, partnummer achterzijde, connector/montage, werkend of cosmetisch?
```

### Anders / weet ik niet

```text
Beschrijf zo concreet mogelijk waar het onderdeel zit, wat het doet, wat kapot/ontbrekend is, en voeg liefst een foto of oud onderdeelnummer toe.
```

## Run 002 update — lighting_electrical

Run 002 toonde dat de vorige helper voor `Verlichting / elektrisch` nog te breed was. De helper moet expliciet onderscheid maken tussen:

```text
lens/glas
reflector/behuizing
complete koplamp/unit
partnummer/merk
links/rechts en voor/achter
6V/12V
lamptype
EU/US of LHD/RHD
```

## UX-regel

Toon maar één categorie-specifieke helper tegelijk.

```text
Geen stuurwieldiameter vragen bij bekleding.
Geen bekledingskleur vragen bij remmen.
Geen carburateurtype vragen bij koplampglas.
```

## Copy voor categorieveld

Vraagtekst:

```text
In welke categorie valt het onderdeel ongeveer?
```

Helptekst:

```text
Kies wat het dichtst in de buurt komt. Twijfel je? Kies 'Anders / weet ik niet'.
```

## Copy voor category_specific_details

Vraagtekst:

```text
Welke extra details ken je over dit onderdeel?
```

Helptekst:

```text
Vul alleen in wat je weet. Een foto, nummer, links/rechts, maat, kleur, merk of uitvoering kan al genoeg zijn om gerichter te zoeken.
```

## Verplichte versus optionele velden

Verplicht voor Run 002:

```text
merk
model
bouwjaar_of_periode
onderdeel_omschrijving
onderdeel_categorie
origineel_repro_used
compatibiliteit_onzeker
```

Sterk aanbevolen:

```text
foto_of_partnummer
category_specific_details
```

Optioneel:

```text
uitvoering/body style
extra_context
urgentie
```
