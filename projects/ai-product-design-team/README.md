# AI Product Design Team

## Doel

Dit is een herbruikbaar AI-team om een nieuw app-idee systematisch te onderzoeken, ontwerpen en klaar te maken voor bouw.

Het team voorkomt dat één algemene AI tegelijk productstrategie, UX, architectuur en technische beslissingen probeert te nemen. Elke rol werkt vanuit een eigen vakgebied en levert een afgebakende output.

## Kernprincipe

**Eerst probleem en betaalreden, dan gebruik, dan techniek, dan code.**

Een app is pas klaar om gebouwd te worden wanneer het team voldoende duidelijkheid heeft over:

- welk probleem wordt opgelost;
- voor wie;
- waarom iemand ervoor zou betalen of het actief zou gebruiken;
- wat de kleinste verkoopbare/bruikbare versie is;
- hoe de gebruiker door de oplossing beweegt;
- welke functionele regels gelden;
- welke technische architectuur minimaal nodig is;
- welke risico's en testgevallen vooraf bekend zijn.

## Rollen

1. `01-product-strategist.md` — probleem, doelgroep, waarde, betaalreden en MVP-scope
2. `02-functional-analyst.md` — processen, requirements, business rules en uitzonderingen
3. `03-ux-researcher.md` — gebruikers, context, behoeften en aannames
4. `04-ux-designer.md` — user flows, interactie en wireframes
5. `05-product-designer.md` — schermstructuur, componenten en informatiehiërarchie
6. `06-solution-architect.md` — technische architectuur, data, API's, auth en integraties
7. `07-ai-automation-architect.md` — AI, agents, RAG en automation alleen waar ze aantoonbaar waarde toevoegen
8. `08-qa-risk-analyst.md` — edge cases, fouten, privacy, security en testscenario's
9. `09-tech-lead.md` — kleinste bouwbare technische slice, epics en implementatievolgorde
10. `10-product-critic.md` — onafhankelijke kritiek, scope-reductie en zwakke aannames

## Gedeelde bestanden

- `project-brief.md` — centrale projectwaarheid; alle agents lezen dit eerst
- `workflow.md` — volgorde, gates en overdrachten tussen rollen
- `decisions.md` — beslissingen en afgewezen alternatieven
- `agent-guardrails.md` — grenzen voor alle agents

## Werkregel

Elke agent:

1. leest eerst `project-brief.md`, `decisions.md` en relevante eerdere outputs;
2. blijft binnen zijn rol;
3. maakt aannames expliciet;
4. onderscheidt feiten, hypotheses en keuzes;
5. levert concrete output die de volgende rol kan gebruiken;
6. overschrijft geen beslissingen van een andere rol zonder dit als conflict te markeren.

De Product Strategist bewaakt de productlogica. De gebruiker/eigenaar beslist over belangrijke productgates.

## Start

Vul eerst `project-brief.md` zo ver mogelijk in. Laat daarna `01-product-strategist.md` de eerste productgate uitvoeren.
