# Workflow — AI Product Design Team

## Doel

Van ruw app-idee naar een onderbouwde en bouwbare productblauwdruk, met HackMD als live workspace en afzonderlijke AI-rollen als specialisten.

## 0. Project Hub

Elke app start met één HackMD **Project Hub**.

De Hub bevat:

- één-zinsprobleem;
- primaire doelgroep/gebruiker;
- huidige workaround;
- gewenste uitkomst;
- huidige producthypothese;
- belangrijkste bewijs/signalen;
- grootste onzekerheden;
- huidige MVP-scope;
- gate-status;
- links naar gespecialiseerde notes;
- open beslispunten.

De Hub is een index en dashboard, geen mega-document.

## 1. Product / User / Functional loop

Deze drie disciplines mogen itereren totdat de kern voldoende scherp is.

### Product Strategist

Beantwoordt:

- welk probleem is waardevol genoeg;
- voor wie;
- waarom iemand zou betalen/adopteren;
- welke aanname eerst bewezen moet worden;
- wat de kleinste verkoopbare/bruikbare versie kan zijn.

### UX Researcher

Beantwoordt:

- wat de gebruiker vandaag werkelijk doet;
- in welke context het probleem ontstaat;
- welke jobs-to-be-done en barrières relevant zijn;
- welke aannames nog echte gebruikersdata vereisen.

### Functional Analyst

Beantwoordt:

- welke actors en rollen bestaan;
- welke kernflow end-to-end moet werken;
- welke business rules gelden;
- welke uitzonderingen en statussen bestaan;
- welke functionele requirements nodig zijn.

### Product gate

Ga pas verder wanneer:

- het probleem concreet genoeg is;
- doelgroep en gebruikscontext begrijpelijk zijn;
- de kerngebruikerstaak benoemd is;
- de belangrijkste aannames zichtbaar zijn;
- er een voorlopige kleinste versie is.

Bij grote twijfel: Product Critic inzetten en/of valideren vóór verdere uitwerking.

## 2. Interaction loop

### UX Designer

Ontwerpt:

- primary flow;
- alternatieve/error flows;
- navigatie;
- systeemfeedback;
- herstelpaden;
- schermdoelen.

### Product Designer

Verfijnt:

- schermhiërarchie;
- componenten;
- formulieren/lijsten/tabellen;
- empty/loading/error/success states;
- responsive gedrag;
- toegankelijkheid.

### Interaction gate

De kerngebruiker moet de hoofdtaak begrijpelijk kunnen doorlopen zonder technische kennis of onnodige stappen.

Gebruik waar nuttig flowdiagrammen direct in de HackMD User Flows-note. Diagram en tekst moeten naar dezelfde requirements verwijzen.

Wanneer de flow nieuwe functionele vragen blootlegt, ga terug naar de Functional Analyst. Dat is normale iteratie, geen fout.

## 3. Architecture / AI loop

### Solution Architect

Ontwerpt de minimale betrouwbare systeemstructuur:

- system context;
- frontend/backend-grenzen;
- datastromen;
- data-eigenaarschap;
- API's/integraties;
- auth/rechten;
- security/privacy;
- deployment/operations.

### AI & Automation Architect

Beoordeelt per kandidaatonderdeel:

1. kan dit eenvoudiger deterministisch;
2. waarom zou AI/automation beter zijn;
3. wat kost een fout;
4. hoe meten we kwaliteit;
5. welke context/tools zijn nodig;
6. waar is menselijke approval nodig;
7. wat is de fallback.

### Architecture gate

Ga pas naar build planning wanneer:

- de architectuur de afgesproken scope ondersteunt;
- belangrijke datastromen en integraties bekend zijn;
- security/privacy niet als latere toevoeging worden behandeld;
- AI/no-AI keuzes expliciet zijn;
- kritieke technische onzekerheden als concrete spikes zijn gemarkeerd.

Bij overengineering: Product Critic inschakelen.

## 4. Risk / Build loop

### QA & Risk Analyst

Probeert het ontwerp te breken via:

- acceptance criteria;
- edge cases;
- misuse cases;
- failure modes;
- privacy/security-risico's;
- AI-specifieke failure modes;
- release blockers.

### Tech Lead

Maakt daarna:

- kleinste verticale end-to-end slice;
- epics/stories;
- dependencies;
- Definition of Done;
- noodzakelijke spikes;
- expliciete non-scope.

### Build gate

Code mag starten wanneer:

- de eerste verticale slice een echte gebruikersuitkomst bewijst;
- kritieke requirements niet meer conflicteren;
- relevante risico's een control/fallback hebben;
- open technische onzekerheden bewust geaccepteerd of getest zijn;
- de eigenaar de scope heeft goedgekeurd.

## 5. Product Critic als challenge-lane

De Product Critic is geen verplichte laatste fase. Zet hem in wanneer:

- productwaarde onzeker blijft;
- scope groeit;
- een flow complex wordt;
- architectuur zwaarder wordt;
- AI wordt toegevoegd;
- de buildscope te groot aanvoelt;
- een belangrijke investering of beslissing nadert.

De Critic geeft `GO`, `REVISE` of `STOP`, maar beslist niet zelfstandig.

## 6. Product Design Lead als orchestrator

De Product Design Lead:

- leest de Project Hub;
- bepaalt welke onzekerheid nu het belangrijkst is;
- kiest de juiste specialist;
- formuleert een afgebakende opdracht;
- bewaakt gates en conflicten;
- voorkomt dubbel werk;
- laat de Hubstatus actualiseren;
- vraagt een menselijke beslissing wanneer nodig.

De Lead doet niet zelf het specialistische werk van alle rollen.

## 7. HackMD handoff-regel

Na elke relevante agentrun wordt alleen de juiste HackMD-note bijgewerkt.

Elke handoff bevat:

- gewijzigde inzichten;
- geraakte requirements/beslissingen;
- open vragen/conflicten;
- voorgestelde volgende rol;
- links naar relevante notes/secties.

Geen kopieën van live appdocumentatie in deze GitHub-map.

## 8. Itereren op verandering

Bij nieuwe gebruikersfeedback, validatiedata of technische feiten herhaal je niet automatisch het hele proces.

Ga terug naar de vroegste loop waarvan een aanname daadwerkelijk veranderd is. Laat afhankelijke notes daarna gericht hercontroleren.

## 9. Eindresultaat vóór code

Een voldoende volwassen HackMD-blauwdruk bevat minimaal:

- producthypothese + bewijsstatus;
- kernrequirements en business rules;
- primary user flow + relevante errors;
- schermblauwdruk voor de kernflow;
- minimale solution architecture;
- expliciete AI/no-AI keuzes;
- belangrijkste risico's + acceptance criteria;
- eerste verticale buildslice;
- decision log voor keuzes die latere bouw beïnvloeden.