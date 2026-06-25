# SOP — Manual Sourcing

## Doel

Deze SOP beschrijft hoe een tester een `ready_for_source_check` case handmatig onderzoekt zonder te overbouwen en zonder betaling te testen.

## Input

Een case uit `case_view` met:

```text
case_complete = yes
status = ready_for_source_check
next_action = start_source_check
```

## Output

Per case:

```text
lead_found: yes/no
lead_quality_score: 1-5
best_lead_url_or_contact:
missing_information:
recommended_next_action:
time_spent_minutes:
```

## Stap 1 — Case voorbereiden

Kopieer uit `case_view`:

- `flow_id`
- merk
- model
- bouwjaar
- gezocht onderdeel
- urgentie
- extra informatie indien beschikbaar

Maak daarna een korte case-summary:

```text
Ik zoek [onderdeel] voor [merk] [model] uit [bouwjaar/periode]. Belangrijke details: [partnummer/foto/staat/variant].
```

## Stap 2 — Missing info check

Controleer vóór zoeken:

| Check | OK? | Actie als niet OK |
|---|---|---|
| merk bekend | ja/nee | vraag aanvulling |
| model bekend | ja/nee | vraag aanvulling |
| bouwjaar/periode bekend | ja/nee | vraag aanvulling |
| onderdeel concreet genoeg | ja/nee | vraag partnummer/foto |
| conditie/origineel/repro bekend | ja/nee | noteer als onzeker |
| toestemming aanwezig | ja/nee | niet sourcen zonder consent |

## Stap 3 — Zoektermen maken

Maak minimaal 8 zoektermen:

```text
[merk] [model] [bouwjaar] [onderdeel]
[merk] [model] [onderdeel] te koop
[merk] [model] [onderdeel] tweedehands
[merk] [model] [onderdeel] original
[merk] [model] [onderdeel] used
[merk] [model] [onderdeel] NOS
[onderdeel Engels] [merk] [model]
[onderdeel Duits/Frans indien relevant] [merk] [model]
```

## Stap 4 — Kanalen doorlopen

Per case minimaal 5 kanaalpogingen:

1. Google brede search.
2. Marktplaats/2dehands/eBay.
3. Facebook/community.
4. Forum/club.
5. Specialist/leverancier.

Optioneel:

6. Sloper/breaker.
7. Internationaal platform.
8. Event/autojumble.

## Stap 5 — Lead beoordelen

Score elke lead 1–5:

| Score | Betekenis |
|---|---|
| 1 | niet relevant |
| 2 | mogelijk, maar te vaag |
| 3 | relevant, maar onzeker |
| 4 | waarschijnlijk passend |
| 5 | sterk passend, met foto/partnummer/prijs/contact |

## Stap 6 — Contact leggen

Gebruik templates uit:

```text
04-templates/message-templates.md
```

Deel geen persoonsgegevens van de aanvrager. Gebruik alleen case-informatie die nodig is om het onderdeel te identificeren.

## Stap 7 — Loggen

Elke poging wordt gelogd in:

```text
05-testplan/sourcing-log-template.csv
```

Minimaal loggen:

- datum;
- flow_id;
- kanaal;
- zoekterm;
- URL/contact;
- gevonden ja/nee;
- lead score;
- reactie;
- volgende stap;
- tijd besteed.

## Stap 8 — Case afsluiten

Mogelijke uitkomsten:

```text
lead_found
needs_more_info
no_match_after_manual_search
escalate_to_specialist
candidate_for_automation
```

## Stopregels

Stop met actief zoeken wanneer één van deze gebeurt:

- lead score 4 of 5 gevonden;
- 5 kanalen doorlopen zonder bruikbaar resultaat;
- ontbrekende info blokkeert verder zoeken;
- maximale actieve zoektijd bereikt;
- privacy/toestemming onduidelijk.

## Maximale tijd per case

Voor Spike04:

```text
max_active_search_time: 90 minuten per case
follow_up_window: 48-72 uur
```

Als het binnen die tijd niet lukt, is dat waardevolle validatie: het onderdeel of de aanvraag is moeilijker dan de MVP aankan.
