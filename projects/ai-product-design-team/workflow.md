# Workflow — AI Product Design Team

## Doel

Van ruw app-idee naar een onderbouwde, testbare en bouwbare productblauwdruk zonder rollen door elkaar te halen.

## Fase 0 — Intake

Bron: `project-brief.md`

Vul minimaal in:

- probleem;
- doelgroep;
- huidige workaround;
- gewenste uitkomst;
- bekende beperkingen;
- eerste idee van succes.

Onbekende zaken mogen expliciet `onbekend` blijven.

---

## Fase 1 — Product Gate

**Agent:** Product Strategist

Vragen:

- Is het probleem scherp genoeg?
- Voor wie is het urgent?
- Waarom zou iemand betalen of overstappen?
- Welke aannames zijn het riskantst?
- Wat is de kleinste verkoopbare/bruikbare versie?

Output:

- product thesis;
- doelgroep;
- waardepropositie;
- MVP-hypothese;
- validatievraag;
- kill/continue-advies.

**Gate:** geen uitgebreide UX of architectuur als het kernprobleem nog fundamenteel onduidelijk is.

---

## Fase 2 — Functional Gate

**Agent:** Functional Analyst

Output:

- actors/rollen;
- kernproces;
- use cases;
- business rules;
- happy path;
- uitzonderingen;
- functionele requirements;
- non-functional requirements die al bekend zijn.

**Gate:** de kerngebruikerstaak moet end-to-end beschrijfbaar zijn.

---

## Fase 3 — User Gate

**Agent:** UX Researcher

Output:

- gebruikerscontext;
- jobs-to-be-done;
- pijnpunten;
- informatiebehoeften;
- aannames die met echte gebruikers getest moeten worden;
- onderzoeks-/validatievragen.

**Gate:** ontwerpkeuzes mogen niet uitsluitend op interne aannames rusten wanneer gebruikersonzekerheid groot is.

---

## Fase 4 — Interaction Gate

**Agent:** UX Designer

Output:

- primary user flow;
- alternatieve/error flows;
- navigatiestructuur;
- wireframe-beschrijvingen;
- states en feedbackmomenten.

Daarna verfijnt de **Product Designer**:

- schermhiërarchie;
- componenten;
- formulieren;
- tabellen/lijsten;
- empty/loading/error/success states;
- responsiviteit en toegankelijkheid.

**Gate:** de gebruiker moet de kerntaak kunnen doorlopen zonder technische architectuur te hoeven begrijpen.

---

## Fase 5 — Architecture Gate

**Agent:** Solution Architect

Output:

- system context;
- frontend/backend-grenzen;
- datamodel op hoofdlijnen;
- API/integratiegrenzen;
- auth/rechten;
- security/privacy-impact;
- deploymentkeuzes;
- technische onzekerheden.

De architect kiest de eenvoudigste architectuur die het geval betrouwbaar ondersteunt.

---

## Fase 6 — AI/Automation Gate

**Agent:** AI & Automation Architect

Voor elk kandidaatonderdeel:

1. Kan dit deterministisch eenvoudiger?
2. Wat voegt AI/automation concreet toe?
3. Wat is de foutkost?
4. Hoe meten we kwaliteit?
5. Welke menselijke controle is nodig?
6. Wat is de fallback?

Output:

- AI/automation feature map;
- model/context/tool-behoefte;
- evaluatiecriteria;
- guardrails;
- human-in-the-loop momenten;
- onderdelen waar expliciet géén AI gebruikt moet worden.

---

## Fase 7 — Risk Gate

**Agent:** QA & Risk Analyst

Output:

- acceptance criteria;
- edge cases;
- misuse cases;
- privacy/security-risico's;
- failure modes;
- testmatrix;
- release blockers.

---

## Fase 8 — Build Gate

**Agent:** Tech Lead

Output:

- verticale slices;
- eerste end-to-end slice;
- epics/stories;
- dependencyvolgorde;
- definition of done;
- technische spikes alleen voor echte onzekerheden;
- expliciete zaken die nog niet gebouwd worden.

De eerste slice moet zo klein mogelijk zijn maar daadwerkelijk end-to-end werken.

---

## Fase 9 — Challenge Gate

**Agent:** Product Critic

De criticus krijgt de volledige huidige blauwdruk en zoekt actief naar:

- overbouw;
- onbewijsbare aannames;
- feature creep;
- zwakke betaalreden;
- UX-complexiteit;
- technische overengineering;
- AI waar eenvoudiger regels volstaan;
- risico's die de andere rollen onderschatten.

Output:

- top 5 bezwaren;
- wat geschrapt kan worden;
- wat eerst bewezen moet worden;
- go / revise / stop advies.

---

## Fase 10 — Synthese

**Eigenaar:** Product Strategist + gebruiker/eigenaar

Werk bij:

- `project-brief.md`;
- `decisions.md`;
- MVP-scope;
- succescriteria;
- eerstvolgende validatie- of bouwactie.

Geen stille wijzigingen: belangrijke scope-, architectuur- en risicobeslissingen worden gelogd.

## Iteraties

Na gebruikersfeedback, testresultaten of nieuwe feiten wordt niet automatisch het hele proces herhaald. Start opnieuw bij de vroegste fase waarvan de aannames veranderd zijn.
