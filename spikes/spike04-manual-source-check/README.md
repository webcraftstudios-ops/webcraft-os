# Spike04 — Manual Source Check

## Synthese

Spike04 test of de technisch complete cases uit Spike03 ook praktisch waarde opleveren: kunnen we met de beschikbare aanvraagdata handmatig bruikbare onderdeel-leads vinden?

Spike04 test nog steeds geen betaling, geen prijsmodel en geen automatische matching.

## Doel

Bewijzen dat een sourcing-ready aanvraag kan worden omgezet naar één of meer concrete leads via handmatig zoeken in bronnen zoals:

- clubs en forums;
- Facebook-groepen en communitykanalen;
- online marktplaatsen;
- internationale zoekkanalen;
- specialisten en leveranciers;
- slopers/breakers;
- evenementen/autojumbles;
- betaalde brokers alleen als later escalatiepad, niet als eerste test.

## Startcases

```text
RWR7prp  -> Ford Mustang 1969, onderdeel: test 12
7Xo88NP  -> Alfa Romeo Spider 1990, onderdeel: Nardi Stuurwiel
```

`4aLgZgO` blijft bewust buiten sourcing, want die case is `needs_info`.

## Scope

In scope:

- handmatig sourcen voor 2 tot 5 cases;
- zoekkanalen documenteren;
- leads loggen;
- reactietijd meten;
- matchkwaliteit beoordelen;
- templates voor berichten gebruiken;
- zoekvragen verfijnen op basis van community/specialist/source-info;
- terugvallen naar eerdere kanalen met verfijnde zoektermen;
- go/no-go naar Spike05 voorbereiden.

Niet in scope:

- betaling;
- commissie;
- checkout;
- automatische scraping;
- accountsysteem;
- publieke marktplaats;
- claims richting klant dat een onderdeel zeker gevonden wordt.

## Specification refinement loop

Spike04 is geen lineair kanaalpad. Wanneer een kanaal betere specificatie oplevert, keren we bewust terug naar eerdere kanalen.

```text
originele aanvraag -> kanaalronde -> nieuwe specificatie -> refined search -> betere leadbeoordeling
```

## Definition of done

Spike04 is klaar wanneer:

- minimaal 2 sourcing-ready cases zijn doorzocht;
- per case minimaal 5 kanaalpogingen zijn gelogd;
- per poging zoekterm, bron, resultaat en vervolgactie zijn genoteerd;
- nieuwe specificaties zijn vastgelegd wanneer ze gevonden worden;
- minstens één refined search is uitgevoerd wanneer de oorspronkelijke zoekvraag aantoonbaar verbeterd werd;
- er minstens één bruikbare lead of duidelijk bewijs van non-match is gevonden;
- er een go/no-go-beslissing ligt voor Spike05.

## Werkbestanden

```text
01-scope/spike04-scope.md
02-research/source-channel-matrix.md
03-process/manual-sourcing-sop.md
03-process/specification-refinement-loop.md
04-templates/message-templates.md
05-testplan/testcases.md
05-testplan/sourcing-log-template.csv
06-results/findings-log.md
07-decision/go-no-go.md
```
