# Testcases — Spike04

## Doel

Met deze testcases bewijzen we of sourcing-ready cases uit `case_view` bruikbaar zijn voor handmatige sourcing.

## Testcase 04-A — Incomplete case als controle

```text
flow_id: 4aLgZgO
status: needs_info
verwachte actie: niet sourcen
```

### Verwachte uitkomst

```text
resultaat: blocked_by_missing_info
reden: car_id, ad_id en consent_id ontbreken
```

Deze case wordt niet actief gezocht. Ze bewijst dat incomplete aanvragen niet onterecht naar sourcing gaan.

---

## Testcase 04-B — Ford Mustang 1969

```text
flow_id: RWR7prp
auto: Ford Mustang
model: Mustang
bouwjaar: 1969
onderdeel: test 12
status: ready_for_source_check
```

### Diagnose

De case is technisch compleet maar inhoudelijk zwak, want `test 12` is geen echt onderdeel.

### Verwachte uitkomst

```text
resultaat: needs_more_info
reden: onderdeelomschrijving onvoldoende concreet
```

### Te testen

- Detecteert de SOP dat een technisch complete case inhoudelijk onbruikbaar kan zijn?
- Wordt dit gelogd als datakwaliteitsprobleem?
- Wordt de case niet verspild in echte sourcing?

---

## Testcase 04-C — Alfa Romeo Spider Nardi stuurwiel

```text
flow_id: 7Xo88NP
auto: Alfa Romeo Spider
model: Spider
bouwjaar: 1990
onderdeel: Nardi Stuurwiel
status: ready_for_source_check
```

### Diagnose

Dit is de primaire Spike04 sourcingcase. De aanvraag is herkenbaar genoeg om handmatig te zoeken.

### Verwachte uitkomst

Minstens één van deze:

```text
lead_found
specialist_found
community_source_found
marketplace_candidate_found
no_match_after_manual_search
```

### Minimale kanaalpogingen

1. Google brede search.
2. eBay/Marktplaats/2dehands.
3. Alfa Romeo community/forum.
4. Facebookgroep of marketplace.
5. Specialist/leverancier voor Nardi/Alfa Romeo classic parts.

### Te loggen

- zoekterm;
- kanaal;
- URL/contact;
- resultaat;
- lead score;
- tijd besteed;
- vervolgactie.

---

## Acceptatiecriteria

Spike04-test is voldoende uitgevoerd wanneer:

```text
4aLgZgO -> niet gesourced, correct geblokkeerd
RWR7prp -> inhoudelijk geblokkeerd of om extra info gevraagd
7Xo88NP -> minimaal 5 sourcingpogingen gelogd
```

## Uitbreiding na eerste run

Als `7Xo88NP` te snel of te makkelijk blijkt, voeg dan 2 echte cases toe met:

- concreet onderdeel;
- merk/model/bouwjaar;
- voorkeur origineel/repro/gebruikt;
- minstens één foto of partnummer indien mogelijk.
