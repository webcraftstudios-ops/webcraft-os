# Agent Guardrails — Commercial Webshop Builder

Deze regels zijn bedoeld voor ChatGPT, Codex of andere agents die later in dit project werken.

## Hoofdregel

Niet coderen vóór de commerciële hypothese en validatietest scherp zijn.

## Toegestane taken in fase 1

Agents mogen:

- onderzoek structureren;
- productpagina-copy schrijven;
- outreachteksten verbeteren;
- validatieresultaten samenvatten;
- beslissingen documenteren;
- tooling vergelijken op basis van actuele bronnen;
- MVP-scope aanscherpen.

## Niet toegestaan in fase 1

Agents mogen nog niet:

- een volledige webshop bouwen;
- een catalogusstructuur ontwerpen;
- custom checkout-code schrijven;
- automatisering bouwen zonder gekozen proces;
- betaalproviders implementeren zonder actuele controle;
- testimonials verzinnen;
- marktvraag aannemen zonder validatie;
- claims maken over tijdwinst zonder bewijs.

## Wanneer bouwen mag

Bouwen mag pas wanneer `validation-log.md` minstens één sterk signaal bevat:

- concrete preview-aanvragen;
- pre-orderintentie;
- betaalbereidheid;
- meerdere doelgroepreacties op hetzelfde probleem;
- duidelijke vraag naar één specifieke workflow.

## Eerste bouwscope, later

Als validatie positief is, mag de eerste technische scope maximaal zijn:

- één productpagina;
- één checkout of aanvraagflow;
- protected download of handmatige levering;
- klantmail na aanvraag/betaling;
- eenvoudige analytics.

Geen volledige marketplace.