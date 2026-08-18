# AI Product Design Team

## Doel

Een herbruikbaar team van gespecialiseerde AI-rollen om een nieuw app-idee te onderzoeken, ontwerpen, challengen en bouwklaar te maken.

Het team voorkomt dat één algemene AI tegelijk productstrategie, requirements, UX, architectuur en implementatie beslist.

## Source-of-truth model

### HackMD = live product workspace

Voor elke echte app leeft de actuele productdocumentatie in HackMD:

- probleem en producthypothese;
- validatie en bewijs;
- requirements en business rules;
- user flows en schermlogica;
- architectuur- en AI-flows;
- risico's en testcases;
- beslissingen;
- build plan.

HackMD is tijdens discovery en design de enige actuele waarheid. Agents schrijven dus niet parallel dezelfde projectinformatie naar GitHub.

### GitHub = reusable system + code

Deze GitHub-map bevat alleen:

- herbruikbare agentrollen;
- gedeelde guardrails;
- de workflow/gates;
- HackMD-templates;
- instructies voor handoffs.

Wanneer development start, leeft applicatiecode uiteraard ook in GitHub. Een snapshot van stabiele documentatie mag later bewust naar de app-repository worden geëxporteerd, maar niet als tweede levende bron.

## Team

0. `00-product-design-lead.md` — coördinatie, context, gates en delegatie
1. `01-product-strategist.md` — probleem, doelgroep, waarde, betaalreden en kleinste verkoopbare versie
2. `02-functional-analyst.md` — processen, requirements, business rules en uitzonderingen
3. `03-ux-researcher.md` — gebruikers, context, gedrag en onbewezen aannames
4. `04-ux-designer.md` — user flows, interactie, navigatie en recovery
5. `05-product-designer.md` — schermstructuur, componenten en informatiehiërarchie
6. `06-solution-architect.md` — technische architectuur, data, API's, auth en integraties
7. `07-ai-automation-architect.md` — AI, agents, RAG en automatisering waar dit aantoonbaar nuttig is
8. `08-qa-risk-analyst.md` — edge cases, failure modes, privacy, security en teststrategie
9. `09-tech-lead.md` — verticale bouwslices en implementatievolgorde
10. `10-product-critic.md` — onafhankelijke challenge, scope-reductie en zwakke aannames

## HackMD workspace per app

Gebruik één centrale **Project Hub**-note als index en link daaruit naar aparte notes:

1. Product & Validation
2. Functional Model
3. User Research
4. User Flows & UX
5. Screen Blueprint
6. Solution Architecture
7. AI & Automation
8. QA & Risks
9. Build Plan
10. Decision Log

De Hub bevat alleen de actuele status, links, belangrijkste open vragen en gates. Detail hoort in de gespecialiseerde notes.

Voor flows en architectuur mogen diagrammen direct in HackMD naast de tekstuele uitleg staan. Houd ieder diagram gekoppeld aan de requirements of beslissingen die het representeert.

## Geen waterval

De rollen lopen niet simpelweg één keer van 1 tot 10.

Werk in lussen:

- **Product / User / Functional loop** — probleem, gedrag en requirements aanscherpen;
- **Interaction loop** — user flow en schermstructuur testen en vereenvoudigen;
- **Architecture / AI loop** — minimale technische oplossing en automatisering ontwerpen;
- **Risk / Build loop** — failure modes afdekken en kleinste verticale slice bepalen.

De Product Critic kan op elke belangrijke gate worden ingezet. De Product Design Lead bepaalt welke specialist nodig is; de eigenaar neemt belangrijke product-, scope- en risicobeslissingen.

## Agent handoff

Elke specialist eindigt met vijf dingen:

1. **Wat is veranderd?**
2. **Welke hypothese of beslissing is geraakt?**
3. **Welke conflicts/open vragen bestaan nog?**
4. **Welke HackMD-note/sectie moet worden bijgewerkt?**
5. **Welke rol moet nu verder en met welke afgebakende vraag?**

Geen agent mag stilletjes een beslissing van een andere rol overschrijven.

## Start

1. Maak in HackMD een Project Hub op basis van `templates/hackmd-project-hub.md`.
2. Maak alleen de notes aan die je op dat moment nodig hebt.
3. Geef de Project Hub aan `00-product-design-lead.md`.
4. Laat die de eerste onzekerheid en juiste specialist bepalen.
5. Werk vanuit bewijs en gates naar de kleinste bruikbare/verkoopbare oplossing.

Kernprincipe: **eerst probleem en bewijs, dan gebruik, dan techniek, dan code.**