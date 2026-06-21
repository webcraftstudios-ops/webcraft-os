# Agent System — Commercial Webshop Builder

## Doel

Dit is het agentensysteem voor de Commercial Webshop Builder.

Het systeem werkt met één hoofdmanager en meerdere gespecialiseerde subagents.

## Hoofdmanager

- `shop-ceo.md` — Shop CEO / hoofdmanager

De Shop CEO bewaakt richting, winstlogica, validatie, prioriteiten en beslissingen.

## Subagents

- `market-research-agent.md` — markt, concurrentie, bronnen en deep research
- `offer-positioning-agent.md` — aanbod, doelgroep, positionering en belofte
- `unit-economics-agent.md` — prijs, marge, kosten en break-even
- `validation-growth-agent.md` — validatietests, outreach, kanalen en signalen
- `mvp-storefront-agent.md` — minimale store/landingspagina, scope en UX
- `tooling-automation-agent.md` — gratis-first tools, automatisering en integraties
- `copy-trust-agent.md` — productcopy, vertrouwen, bezwaren en claims
- `codex-build-agent.md` — technische bouw, alleen na validatie

## Werkregel

Subagents geven advies en leveren output. De Shop CEO beslist.

Geen subagent mag zelfstandig volledige webshopcode bouwen, betaalproviders implementeren of claims maken zonder bewijs.

## Standaard workflow

1. Shop CEO formuleert de centrale vraag.
2. Relevante subagent krijgt een afgebakende opdracht.
3. Subagent levert korte synthese, risico's en actieadvies.
4. Shop CEO neemt of vraagt een beslissing.
5. Beslissing wordt vastgelegd in `../decisions.md`.
6. Herbruikbare output wordt in GitHub opgeslagen, niet alleen in chat.

## Kernprincipe

Profit before polish.

Eerst bewijs, dan bouwen.