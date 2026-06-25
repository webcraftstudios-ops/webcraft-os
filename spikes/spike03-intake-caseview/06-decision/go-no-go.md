# Go / No-Go — Spike03

## Beslissing

```text
status: pending
datum:
beslisser:
```

## Go-criteria

Er is een go naar de volgende fase wanneer alle onderstaande criteria waar zijn:

- Minstens drie testflows zijn uitgevoerd.
- Minstens één volledige flow komt correct binnen als `case_complete=yes`.
- Incomplete flows worden correct gemarkeerd als `case_complete=no`.
- `flow_id` gaat nergens verloren in de volledige flow.
- `case_view` toont één operationele regel per flow.
- `status` en `next_action` zijn correct.
- Ontbrekende velden zijn zichtbaar.
- Er zijn geen open blockers of high-impact dataflowproblemen.

## No-go criteria

Er is no-go wanneer één van deze punten optreedt:

- `flow_id` verdwijnt in één van de redirects.
- Raw tabs bevatten losse records zonder bruikbare case-koppeling.
- `case_view` koppelt verkeerde objecten aan elkaar.
- Cases worden compleet genoemd terwijl essentiële data ontbreekt.
- Duplicaten verstoren de operationele opvolging.
- De aanvraag is technisch compleet, maar onvoldoende concreet om een onderdeel te zoeken.

## Mogelijke beslissingen

| Beslissing | Betekenis |
|---|---|
| go_source_check | Start handmatige sourcingfase |
| fix_and_retest | Eerst issues herstellen, daarna opnieuw testen |
| narrow_scope | Formulieren of datavelden versmallen |
| stop_spike | Spike levert onvoldoende basis op |

## Aanbevolen volgende fase bij go

Start `Spike04 — Manual Source Check`.

Doel van Spike04:

- 5 echte of realistische aanvragen gebruiken;
- per aanvraag minstens 5 bronnen controleren;
- leveranciers/specialisten/fora documenteren;
- matchkans beoordelen;
- opvolgtijd meten;
- nog steeds geen betaling testen.

## Eindbeslissing

```text
beslissing:
reden:
belangrijkste bewijs:
open risico's:
volgende actie:
```
