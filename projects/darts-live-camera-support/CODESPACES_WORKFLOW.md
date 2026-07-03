# Codespaces Workflow — Darts Live Camera Support

## Doel

Deze workflow maakt het mogelijk om het darts scoreboard project online te openen, te bouwen en te testen zonder lokale ontwikkelomgeving.

Dit is vooral handig voor werken via gsm, tablet, Chromebook of een tijdelijke computer.

## Openen via GitHub Codespaces

1. Ga naar de GitHub repository.
2. Selecteer branch:

```text
project/darts-live-camera-support
```

3. Klik op:

```text
Code → Codespaces → Create codespace on project/darts-live-camera-support
```

4. Wacht tot Codespaces klaar is.

De devcontainer installeert automatisch dependencies voor de darts app.

## App starten

Als de app niet automatisch start, open een terminal in Codespaces en voer uit:

```bash
cd projects/darts-live-camera-support/app
npm install
npm run dev -- --hostname 0.0.0.0
```

Daarna opent Codespaces normaal een preview voor poort 3000.

## Build controleren

Gebruik:

```bash
cd projects/darts-live-camera-support/app
npm run build
```

## GitHub Actions buildcheck

De workflow staat in:

```text
.github/workflows/darts-scoreboard-build.yml
```

Deze build draait automatisch bij wijzigingen aan:

```text
projects/darts-live-camera-support/app/**
```

En kan ook handmatig gestart worden via:

```text
Actions → Darts Scoreboard Build → Run workflow
```

## Aanbevolen workflow via gsm

Voor kleine checks of snelle aanpassingen:

1. Open GitHub app of browser.
2. Open Codespaces.
3. Start of gebruik de preview.
4. Doe kleine codewijziging.
5. Commit naar dezelfde branch.
6. Controleer GitHub Actions build.

## Niet ideaal via gsm

Gebruik liever pc/laptop voor:

- grote refactors;
- layout debugging;
- responsive testing;
- complexe Git-conflicten;
- visuele polish op groot scherm.

## Volgende infrastructuurstap

Wanneer de demo visueel sterker is:

- Vercel project koppelen;
- automatische preview deployments activeren;
- publieke demo-URL maken voor cafés en dartclubs.
