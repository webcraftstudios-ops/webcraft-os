## Probleemstelling
Om de Classic Parts Finder levensvatbaar te maken, moeten we bewijzen dat we daadwerkelijk onderdelen kunnen vinden op basis van de ingevoerde Tally-data. Zonder betrouwbare *sourcing* heeft het platform geen commerciële waarde, ongeacht hoe goed de formulieren werken.

## Doel van Spike04
Bewijzen dat we op basis van de no-code intakeflow (Spike03) de gevraagde auto-onderdelen handmatig kunnen vinden binnen een acceptabele tijd en met een positieve (geschatte) marge.

## Scope
**In scope:**
- Handmatig sourcen van 5 uitdagende/realistische test-aanvragen.
- Loggen van zoektijd, inkoop/verkoopprijs en missende data.
- Klant e-mailen met het resultaat (handmatige conversie-check).
- Documenteren in `validation-log.md`.

**Out of scope:**
- Geen automatische matching of software/API integraties.
- Geen betalingslogica of webshop-functionaliteit bouwen.

## Acceptatiecriteria
- Er zijn 5 realistische cases gegenereerd in Tally/Sheets met de status `ready_for_source_check`.
- Elke case heeft max 30 minuten zoektijd gehad.
- Minimaal 3 van de 5 aanvragen zijn succesvol gesourced met een positieve marge.
- `validation-log.md` is bijgewerkt met de executie log-tabel en de beslissing voor Spike05.

## Risico's en Dependencies
- **Datavervuiling:** Zorg dat je start met schone/gefilterde testdata (geen duplicaten uit Spike03).
- **Handmatig proces:** Sourcing hangt volledig af van je eigen kennis en de beschikbaarheid op marktplaatsen/leveranciers.
- **Abandonment:** Aanvragen die in Spike03 zijn blijven hangen op `case_complete=no` vallen voorlopig buiten deze sourcings-test.