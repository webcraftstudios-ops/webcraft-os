# Validation Log — Commercial Webshop Builder

Gebruik dit bestand om commerciële experimenten bij te houden.

## Validatieprincipe

Niet vragen of mensen het idee leuk vinden. Testen of ze gedrag tonen dat commerciële waarde heeft.

Sterke signalen:

- klik naar aanbod;
- e-mailadres achterlaten;
- DM of vraag stellen;
- offerte of prijs vragen;
- pre-order plaatsen;
- betalen;
- herhaalde interesse tonen;
- doorverwijzen naar anderen.

Zwakke signalen:

- complimenten;
- likes zonder klik;
- vage interesse;
- vrienden die zeggen dat het goed klinkt;
- verkeer zonder actie.

## Spike03 — Classic Parts Finder Intakeflow & Case View

- Datum: Juli 2026
- Doel: Aantonen dat we via no-code tools (Tally en Google Sheets) een betrouwbare meervoudige intakeflow kunnen afhandelen voor de 'Classic Parts Finder', die alle benodigde componenten verbindt tot één `case_view`.
- Opzet: Contactformulier → Autoformulier → Onderdeelformulier → Toestemmingsformulier. Google Sheets aggregeert data op basis van `flow_id`.
- Testflow bewijs (E2E testcases `012` t/m `014`):
  - `4aLgZgO`: Incompleet. Alleen contact aanwezig. `case_complete=no`, `status=needs_info`.
  - `RWR7prp`: Compleet. Alle vier de formulieren ingevuld. `case_complete=yes`, `status=ready_for_source_check`.
  - `7Xo88NP`: Compleet. Alle vier de formulieren ingevuld. `case_complete=yes`, `status=ready_for_source_check`.

### Interpretatie
- **Wat werkte?** Het Tally redirect mechanisme dat de hidden parameters doorgeeft aan elk volgend formulier werkt uitstekend. De Sheets JOIN/formules bepalen correct de finale status van de aanvraag.
- **Wat was de initiële blokker?** Het eerste formulier bevatte geen unieke parameter van buitenaf. De fix was het injecteren van Tally's `Submission ID` in de redirect URL als de initiële `flow_id` voor de volgende stappen.
- **Is dit voldoende bewijs?** Ja, technisch is de Spike geslaagd. De data-opslag is solide genoeg om naar de volgende testfase over te gaan.

### Volgende actie
- Gaan we door? Ja, besluit: `go_source_check` (Richting Spike04).
- Doel Spike04: Handmatige validatie (Manual Source Check) uitvoeren op echte intake-data om te bepalen of het sourcing-proces haalbaar is, zonder inzet van software voor "automatische matching" en zonder focus op betalingslogica.

## Experiment 001 — Agency Quick-Start Automation Pack

- Datum: nog in te vullen
- Hypothese: AI-automation agencies, n8n consultants en automation freelancers willen betalen voor klantklare n8n templates wanneer die hen sneller laten leveren aan klanten.
- Doelgroep: builders die n8n/AI-workflows bouwen voor klanten.
- Kanaal: LinkedIn outreach, n8n-community, relevante AI-automation groepen, bestaande Webcraft-kanalen.
- Aanbod: kleine bundel met 3 tot 5 klantklare workflowtemplates plus setup-notes en white-label documentatie.
- Call to action: “Ik wil early access” of “Stuur mij de template-preview”.
- Verwacht signaal: e-mailadres, DM, preview-aanvraag, pre-orderintentie of concrete vraag naar één specifieke workflow.
- Meetperiode: 7 dagen na publicatie.
- Kosten: 0 euro advertentiebudget.

### Voorstel testopzet

1. Schrijf één productpagina of tekstmockup.
2. Maak één korte LinkedIn-post rond het probleem: agencies bouwen te veel basisflows opnieuw.
3. Stuur 20 gerichte DM's naar automation freelancers/agencyprofielen.
4. Vraag niet “vind je dit goed?”, maar bied preview/early access aan.
5. Meet alleen gedrag: klikken, antwoorden, preview-aanvragen, pre-orderbereidheid.

### Resultaten

- Bereik:
- Bezoekers:
- Kliks:
- Antwoorden:
- Preview-aanvragen:
- Leads:
- Orders/pre-orders:
- Omzet:
- Kosten:
- Marge:
- Conversie:

### Interpretatie

- Wat werkte?
- Wat werkte niet?
- Wat is onzeker?
- Is dit voldoende bewijs?

### Besluit

Kies één:

- doorgaan;
- aanbod versmallen;
- andere doelgroep testen;
- andere workflowbundel testen;
- stoppen.

### Volgende actie

- Actie: productpagina-copy schrijven voor de eerste bundel.
- Deadline: nog in te vullen.
- Eigenaar: Maarten / Webcraft Studios.

## Experiment template

### Experiment 002 — naam

- Datum:
- Hypothese:
- Doelgroep:
- Kanaal:
- Aanbod:
- Call to action:
- Verwacht signaal:
- Meetperiode:
- Kosten:

### Resultaten

- Bereik:
- Bezoekers:
- Kliks:
- Aanvragen:
- Leads:
- Orders:
- Omzet:
- Kosten:
- Marge:
- Conversie:

### Interpretatie

- Wat werkte?
- Wat werkte niet?
- Wat is onzeker?
- Is dit voldoende bewijs?

### Besluit

Kies één:

- doorgaan;
- aanpassen;
- opnieuw testen;
- stoppen.

### Volgende actie

- Actie:
- Deadline:
- Eigenaar:
