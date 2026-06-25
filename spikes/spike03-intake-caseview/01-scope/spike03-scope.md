# Spike03 Scope — Intakeflow & case_view

## Synthese

Spike03 is een technische validatiespike voor Classic Parts Finder. De spike moet bewijzen dat één onderdeelzoekvraag betrouwbaar door de intakeflow loopt en als bruikbare case beschikbaar komt.

## Probleem

Een sourcingservice voor oldtimeronderdelen is pas verkoopbaar wanneer de intake betrouwbaar genoeg is. Een onvolledige aanvraag leidt tot tijdverlies, fout zoeken en slechte opvolging.

## Doel

Een aanvraag moet na het invullen van de formulieren uitkomen als één volledige `case_view`-regel met:

- persoon;
- auto;
- onderdeelzoekertje;
- toestemming;
- status;
- next action;
- ontbrekende velden indien onvolledig.

## Niet-doel

Deze spike test niet of mensen willen betalen. Deze spike test ook niet of matching al automatisch werkt. De volgende fase mag pas starten wanneer de intake betrouwbaar genoeg is om handmatig mee te sourcen.

## Verwachte output

- Gecontroleerde Tally-redirects.
- Documentatie van Google Sheet-tabbladen.
- Formules voor ID-afleiding en case-status.
- E2E-testplan.
- Testlogboek.
- Go/no-go-beslissing.

## Primaire risico's

1. `flow_id` komt niet mee in één van de formulieren.
2. Er ontstaan losse records zonder case-koppeling.
3. Historische testdata vervuilt de analyse.
4. `case_view` toont cases als compleet terwijl essentiële data ontbreekt.
5. De aanvraag is technisch compleet maar commercieel niet bruikbaar voor sourcing.

## Definition of Done

Spike03 is klaar wanneer:

- testcases 012, 013 en 014 zijn uitgevoerd;
- resultaten zijn vastgelegd;
- `case_view` correct onderscheid maakt tussen complete en incomplete cases;
- één go/no-go-beslissing is genomen voor handmatige source-checks.
