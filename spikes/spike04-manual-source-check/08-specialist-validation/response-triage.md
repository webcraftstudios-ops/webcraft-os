# Response Triage — Specialist Validation Sprint

## Doel

Wanneer Alfaholics of Nardi-Personal antwoordt, verwerken we het antwoord objectief en zonder scope creep.

## Input

Een antwoord van:

```text
Alfaholics
Nardi-Personal
```

## Output

```text
response_label:
confirmed_specs:
missing_specs:
new_search_terms:
recommended_next_action:
```

## Labels

| Label | Betekenis | Volgende actie |
|---|---|---|
| confirmed_fitment | Specialist bevestigt hub/boss/adaptor of modelcompatibiliteit. | Refined search opnieuw uitvoeren met bevestigde specs. |
| confirmed_nardi_specs | Specialist bevestigt Nardi diameter/designlijn/PCD/adaptorroute. | Zoektermen en intakevelden aanscherpen. |
| product_or_partnumber_suggested | Specialist noemt concreet product, SKU of partnummer. | Lead score 4-5 evalueren. |
| needs_more_vehicle_info | Specialist vraagt extra voertuiginfo. | Intake aanpassen voor Run 002. |
| needs_more_part_info | Specialist vraagt foto, diameter, variant, conditie. | Intake aanpassen voor Run 002. |
| cannot_help | Specialist kan niet helpen. | Andere route alleen na go/no-go; niet automatisch meer specialisten mailen. |
| no_response_yet | Nog geen antwoord. | Wachten tot follow-upmoment. |

## Scorelogica

```text
confirmed_fitment = source_lead_score 4
confirmed_nardi_specs = source_lead_score 4
product_or_partnumber_suggested = lead_score 4 of 5 afhankelijk van prijs/foto/contact
needs_more_info = intake_gap, geen lead
cannot_help = source_closed
```

## Scopegrenzen

Niet doen op basis van antwoord:

- meteen kopen;
- prijzen onderhandelen;
- klant contacteren met belofte;
- extra platform bouwen;
- automatisch nieuwe specialisten mailen.

## Antwoordverwerking template

```text
source:
date_received:
response_label:
summary:
confirmed_specs:
missing_specs:
new_search_terms:
lead_score:
recommended_next_action:
```
