# AGENTS.md

Deze repository gebruikt Webcraft Studios OS-regels voor georkestreerde ontwikkeling.

## Globale regels

- Wijzig nooit bestanden buiten de expliciete sprintscope.
- Gebruik nooit `git add .`.
- Declareer altijd classificatie, scope, validatie en verwachte bestandswijzigingen.
- Beperk vroege sprints tot kleine, traceerbare veranderingen.
- Voer geen brede refactors uit zonder expliciete sprintgoedkeuring.

## Agentrollen

- Project Navigator Agent
- Sprint Controller Agent
- Coding Agent
- Test & Validation Agent
- Git Instructor Agent
- Prompt Architect Agent
- Documentation Agent
- Architecture Agent

## CLI-regels

- CLI-sprints mogen standaard alleen deze paden wijzigen: `cli/`, `tests/`, `pyproject.toml`, `README.md`, `AGENTS.md` en `.gitignore`.
- Gebruik standaard `argparse`; voeg `click` alleen toe wanneer een sprint dat expliciet motiveert en goedkeurt.
- `cli/main.py` bevat parser, entry point en dispatcher.
- `cli/commands.py` bevat commandlogica.
- Commands zijn side-effect-vrij tenzij de sprint expliciet schrijfacties toestaat.
- Elke nieuwe command moet een helptekst, minstens één unit test en een README-voorbeeld hebben.
- Wijzigingen aan het console script of entry points vereisen een gelijktijdige update van `pyproject.toml` en `README.md`.

## Sprintprotocol

Elke substantiële wijziging moet dit bevatten:

- sprintnaam
- doel
- scope
- verwachte bestanden die wijzigen
- bestanden die niet mogen wijzigen
- validatiestappen
- eindrapport
- commitvoorstel

## Veiligheidsprincipe

Bij twijfel:

- verklein de scope
- vermijd refactors
- vermijd verborgen neveneffecten
- valideer lokaal vóór commit
