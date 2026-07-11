# Decisions — Commercial Webshop Builder

Gebruik dit bestand als beslissingslogboek.

## Beslissingsregels

Elke belangrijke beslissing moet terug te voeren zijn op:

1. commercieel bewijs;
2. kostenimpact;
3. uitvoerbaarheid;
4. risico;
5. volgende test.

## Voorlopige beslissingen

### Decision 000 — eerst valideren, dan bouwen

- Datum: initial setup
- Beslissing: geen volledige webshop bouwen vóór er een commerciële hypothese en validatietest is.
- Context: doel is winstgevend concept met minimale opstartkosten.
- Waarom: bouwen zonder bewijs vergroot kans op tijdverlies en complexiteit.
- Gevolg: eerst research, MVP-plan en validatie-log gebruiken.

### Decision 001 — Go/No-go Spike03 Classic Parts Finder

- Datum: Juli 2026
- Beslissing: Go voor overgang naar Spike04 (Manual Source Check). Spike03 is afgerond.
- Context: Spike03 moest bewijzen of we met Tally en Google Sheets op een betrouwbare en goedkope manier een meerstaps-intakeflow konden bouwen inclusief een `case_view` met actiestatus.
- Alternatieven: Een custom webapplicatie bouwen om dit op te vangen. Dit is afgewezen wegens te hoge ontwikkeltijd en kosten in dit MVP-stadium.
- Waarom deze keuze: De Tally redirects (met `flow_id` en `Submission ID`) gecombineerd met de Sheets JOIN-formules leveren exact de data en statusindicatie (`ready_for_source_check`) die we nodig hebben.
- Bewijs of bron: Testcases in Spike03 (`4aLgZgO`, `RWR7prp`, `7Xo88NP`) die aantonen dat incomplete flows en complete flows correct worden gelabeld.
- Risico (Blockers/Uitdagingen voor Spike04): 
  - **Datavervuiling**: Sheets moet oude/duplicaat testdata negeren om dubbel werk te voorkomen.
  - **Handmatig proces**: Sourcing is nog niet geautomatiseerd, dus het tijdsbeslag per case in Spike04 is onbekend.
  - **Abandonment**: Geen opvolgingsproces voor klanten die na het contactformulier afhaken (`case_complete=no`).
- Gevolg: We starten Spike04 door handmatig Source Checks uit te voeren op verse testaanvragen met status `ready_for_source_check`. Nog steeds géén betalingslogica bouwen.
- Herzien wanneer: Als de handmatige Source Check te lang duurt (>2 uur per request) of we systematisch te weinig data uit Tally krijgen om de onderdelen te kunnen vinden.

## Decision template

### Decision 00X — titel

- Datum:
- Beslissing:
- Context:
- Alternatieven:
- Waarom deze keuze:
- Bewijs of bron:
- Risico:
- Gevolg:
- Herzien wanneer:
