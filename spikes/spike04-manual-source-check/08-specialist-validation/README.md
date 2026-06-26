# Specialist Validation Sprint — Spike04

## Status

```text
status: prepared
flow_id: 7Xo88NP
case: Alfa Romeo Spider 1990 — Nardi Stuurwiel
scope: Spike04 only
```

## Synthese

Run 001 vond geen harde productlead binnen 90 minuten. Wel is de zoekvraag professioneel verfijnd naar:

```text
Nardi steering wheel + hub/boss/adaptor + Alfa Romeo Spider Series 4 / 105-115 + 70 mm PCD
```

Daarom is de volgende stap een specialist-validatie, niet extra bouwen of monetisatie.

## Hypothese

Als de juiste specialisten de hub/boss/adaptor en Nardi-variant kunnen bevestigen, kan de volgende refined search veel scherper worden uitgevoerd en kan de intake voor volgende cases concreter worden gemaakt.

## Targets

| Target | Rol | Waarom relevant | Gewenste output |
|---|---|---|---|
| Alfaholics | Alfa-specialist | Heeft expliciete S4 Spider / 105-115 fitmentcontext en product `STE1030` voor Nardi/Momo hub adaptor. | Bevestiging hub/boss/adaptor + compatibiliteit. |
| Nardi-Personal | Nardi-fabrikant/specialist | Heeft officiële Nardi steering wheels, diameters, designlijnen, hubs en adapters. | Bevestiging Nardi-lijn, diameter, PCD/adaptorroute. |

## Vragen die beantwoord moeten worden

```text
1. Past Alfaholics STE1030 of een equivalent op een Alfa Romeo Spider 1990 / S4 / 105-115?
2. Is 105/115 Spider of Series 4 de juiste compatibiliteitsreferentie?
3. Welke Nardi diameter is logisch voor dit model?
4. Welke Nardi designlijn/variant is relevant: Classic, Personal, Classico, andere?
5. Is een complete steering wheel + hub/boss/adaptor combinatie leverbaar?
6. Welke partnummers of zoektermen moeten in vervolgsearches gebruikt worden?
```

## Procedure

1. Verstuur of simuleer specialistvraag aan Alfaholics.
2. Verstuur of simuleer specialistvraag aan Nardi-Personal.
3. Log datum, kanaal, vraag, status en reactie in `specialist-contact-log.csv`.
4. Als reactie binnenkomt: verwerk nieuwe specificatie in Run 001 en intake-field-delta.
5. Alleen bij bevestigde nieuwe specs: voer een nieuwe refined search uit.

## Stopregels

Stop deze sprint wanneer:

- één specialist exact bevestigt welke hub/boss/adaptor nodig is;
- beide specialisten extra intakegegevens vragen;
- er na follow-up geen reactie komt;
- de vraag buiten Spike04 valt, bijvoorbeeld betaling of aankoop.

## Output

```text
specialist_validation_result:
confirmed_specs:
missing_specs:
recommended_intake_changes:
recommended_next_action:
```

## Voorlopig verwachte beslissing

```text
No-go Spike05.
Eerst specialistvalidatie en intakeverbetering.
```
