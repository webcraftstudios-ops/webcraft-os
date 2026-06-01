# Webcraft Studios OS

Webcraft Studios OS is de orkestratielaag voor gestructureerde multi-agent ontwikkeling binnen Webcraft Studios.

Deze eerste versie bevat een minimale, testbare Python CLI-runtime. De focus ligt op veilige uitbreiding: klein starten, duidelijke scope, geen verborgen schrijfacties.

## Doel

Deze repository bevat:

- een minimale CLI-runtime met `argparse`
- een console command: `wcsos`
- een no-op sprintcommand: `init-sprint`
- pytest-tests voor dispatch en smoke testing
- repo-level agentregels in `AGENTS.md`
- mappen voor documentatie, voorbeelden en prompts

## Repository-structuur

```text
webcraft-studios-os/
├── AGENTS.md
├── README.md
├── .gitignore
├── pyproject.toml
├── cli/
│   ├── __init__.py
│   ├── __main__.py
│   ├── commands.py
│   └── main.py
├── docs/
│   ├── README.md
│   └── research/
│       └── deep-research-report.md
├── examples/
│   └── README.md
├── prompts/
│   └── README.md
└── tests/
    ├── test_commands.py
    └── test_smoke.py
```

## Vereisten

- Python 3.10 of nieuwer
- `pip`
- Een virtuele omgeving wordt aanbevolen

## Installatie voor lokaal testen

```bash
python -m venv .venv
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1

python -m pip install -e ".[dev]"
```

## Gebruik

Direct vanuit de bronboom:

```bash
python -m cli --help
python -m cli init-sprint --name "CLI scaffold" --goal "Eerste lokale test"
```

Via het geïnstalleerde console script:

```bash
wcsos --help
wcsos init-sprint --name "CLI scaffold" --goal "Eerste lokale test"
```

## Testen

```bash
pytest
pytest tests/test_smoke.py -q
```

## CLI-status

De command `init-sprint` is in v1 bewust een no-op. De command valideert argumenten en toont een gestructureerde payload, maar schrijft nog geen bestanden weg.

## Veilig uitbreiden

- Houd parserlogica in `cli/main.py`.
- Houd commandlogica in `cli/commands.py`.
- Voeg per nieuwe command minstens één unit test toe.
- Werk `README.md` en `AGENTS.md` bij als gedrag of entry points veranderen.
- Vermijd externe dependencies tot er een duidelijke sprintreden is.

## Git upload

```bash
git init
git add pyproject.toml
git add .gitignore
git add cli/__init__.py cli/__main__.py cli/main.py cli/commands.py
git add tests/test_commands.py tests/test_smoke.py
git add README.md AGENTS.md
git add docs/README.md docs/research/deep-research-report.md
git add examples/README.md prompts/README.md
git status
git diff --staged
git commit -m "Add minimal Webcraft Studios OS CLI scaffold"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

Gebruik nooit `git add .` voor deze repo.
