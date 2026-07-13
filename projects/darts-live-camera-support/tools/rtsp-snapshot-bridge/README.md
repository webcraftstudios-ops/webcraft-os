# RTSP Snapshot Bridge

A tiny local companion process for **Sprint 2.7** ([issue #46](https://github.com/webcraftstudios-ops/webcraft-os/issues/46)).

Browsers cannot play RTSP streams directly. This bridge runs on the same local
network as the Darts Live Camera Support app and the IP camera (e.g. a
TP-Link Tapo C110). It pulls one JPEG frame from the camera's RTSP stream on
request and serves it over plain HTTP, so the Next.js app can fetch it like
any other image.

It is intentionally NOT part of the deployed web app:

- it only runs locally, next to the camera, during a pilot/demo;
- it never touches match state, scoring, or the domain model;
- it has no dependency on Next.js, React, or the app's build.

## Requirements

- Node.js (any version supported by the rest of the repo).
- [`ffmpeg`](https://ffmpeg.org/) installed and available on `PATH`.
- The Tapo C110's local "Camera Account" RTSP credentials (set up once in the
  Tapo app under Advanced Settings > Camera Account).

## Configuration

Copy `.env.example` to `.env` and fill in your camera's local RTSP URL. Never
commit the `.env` file — it contains your camera credentials.

```bash
cp .env.example .env
```

```text
# .env
RTSP_URL=rtsp://camera_user:camera_password@192.168.1.50:554/stream2
PORT=8089
ALLOWED_ORIGIN=http://localhost:3000
BRIDGE_HOST=127.0.0.1
```

- `ALLOWED_ORIGIN` (optional): restricts which browser origin may fetch
  `GET /snapshot` (CORS). Defaults to `http://localhost:3000`, the app's local
  dev origin. Only change this if the app is served from a different local
  origin.
- `BRIDGE_HOST` (optional): bind address for the bridge's HTTP server.
  Defaults to `127.0.0.1` (localhost-only), since the current pilot setup
  always runs the bridge on the same machine as the app. Set this to `0.0.0.0`
  **only** if the app and bridge run on two separate devices on the same local
  network — this exposes `/snapshot` (and therefore the camera feed) to that
  whole network, so opt in deliberately and understand the exposure before
  doing so.

## Run

```bash
npm install
npm start
```

The bridge then exposes:

```text
GET /snapshot -> image/jpeg (one fresh frame pulled from the RTSP stream)
```

Every response (success or error) includes an `Access-Control-Allow-Origin`
header restricted to `ALLOWED_ORIGIN`, so the browser is permitted to read it
when the Next.js app (a different origin/port) fetches it directly.

Point the app's `NEXT_PUBLIC_TAPO_BRIDGE_URL` (see `app/.env.example`) at this
bridge's base URL, e.g. `http://localhost:8089`.

## Tests

```bash
npm test
```

Runs Node's built-in test runner (`node --test`) against `server.test.js`,
covering the CORS headers on success/error/unknown-route responses and the
localhost-only default bind address. No new dependency is added for this —
the bridge stays dependency-free by design.

## Out of scope

- No automatic dart/segment detection here — this bridge only ever returns a
  raw frame. Detection stays in the app's own computer-vision track.
- No continuous streaming, recording, or storage of frames.
- No cloud relay — this is a local-network-only tool.
