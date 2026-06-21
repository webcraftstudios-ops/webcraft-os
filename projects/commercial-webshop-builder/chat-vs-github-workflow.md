# Chat vs GitHub Workflow

## Kernprincipe

GitHub is de bron van waarheid.

Chat is de stuurlaag voor redenering, keuzes, samenvattingen en gerichte acties.

## Wat hoort in GitHub?

Plaats in GitHub:

- code;
- projectdocumentatie;
- prompts;
- producthypotheses;
- MVP-plannen;
- validatielogs;
- beslissingslogs;
- research briefs;
- agent guardrails;
- technische specificaties;
- scripts en automation flows;
- toekomstige storefront-code.

## Wat hoort in chat?

Toon in chat alleen:

- synthese;
- beslispunten;
- korte uitleg van wijzigingen;
- relevante fragmenten op vraag;
- fouten of risico's die aandacht vragen;
- next actions;
- samenvatting van commits of bestanden.

## Wat niet standaard in chat tonen?

Niet standaard dumpen:

- volledige codebestanden;
- lange markdown-documenten;
- volledige prompts;
- grote research-output;
- technische boilerplate;
- herhaalde bestandsinhoud.

Toon die alleen wanneer de gebruiker er expliciet om vraagt.

## Werkwijze voor agents

Wanneer een agent iets maakt:

1. schrijf of update het in GitHub;
2. geef in chat een korte samenvatting;
3. vermeld welke bestanden zijn aangepast;
4. vermeld het beslispunt of de volgende actie;
5. toon alleen inhoudelijke details die nodig zijn voor controle.

## Codebeleid

Alle projectcode hoort in GitHub, niet primair in chat.

Chat mag code tonen wanneer:

- de gebruiker om review vraagt;
- een bug uitgelegd moet worden;
- een klein fragment nodig is om een beslissing te nemen;
- er een patchvoorstel moet worden besproken.

## Beslisregel

Als iets later opnieuw gebruikt, getest, geversioneerd of door Codex/agents gelezen moet worden, hoort het in GitHub.

Als iets alleen dient om een keuze te maken of snel te begrijpen wat er gebeurd is, hoort het in chat.

## Praktische afspraak

Standaardantwoord na GitHub-acties:

- wat is gedaan;
- waar staat het;
- waarom is het relevant;
- wat is de volgende actie.

Geen volledige code of documenten tonen tenzij gevraagd.