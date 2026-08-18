# Sprint 2.7 — Implementation Plan: Real IP Camera Integration (TP-Link Tapo C110)

Tracking issue: [#46](https://github.com/webcraftstudios-ops/webcraft-os/issues/46)
Branch convention: `feature/darts-tapo-rtsp-integration` (do not implement on `feature/darts-opencv-calibration`, which is scoped to #41/#43/#45)

## 1. Objective

Add the TP-Link Tapo C110 (local WiFi RTSP camera) as a second, hardware-based snapshot source next to the existing browser `getUserMedia` webcam (#38), so a pilot location can mount a fixed camera above the board instead of relying on a laptop webcam. No automatic score detection is introduced or changed by this sprint.

## 2. Non-goals (explicit)

- No automatic dart/segment detection on the RTSP feed. The existing OpenCV pipeline (`captureDartTurn` in `dartCaptureService.ts`) is untouched; whether it later also runs on RTSP-sourced images is a separate, future decision.
- No multi-camera support.
- No cloud storage or streaming of footage.
- No changes to scoring, bust, finish, correction or undo logic (`domain/scoring.ts` stays untouched).
- No database — snapshots keep using the existing in-memory `MatchState.snapshots` model.

## 3. Current architecture (files inspected)

- `app/src/domain/types.ts` — `SnapshotSource = 'mock' | 'upload' | 'camera'`, `Snapshot` entity already generic enough to reuse.
- `app/src/components/CameraPreview.tsx` — owns `getUserMedia`, exposes an imperative `capture()` returning a base64 JPEG data URL. RTSP cannot use `getUserMedia` (browsers don't support the RTSP protocol), so this component cannot be reused as-is for the Tapo feed.
- `app/src/components/CameraPanel.tsx` — UI wrapper around `CameraPreview`, calls `onCreateSnapshot(base64Url)`.
- `app/src/vision/dartCaptureService.ts` — consumes any `currentSnapshotUrl` (base64 or URL) regardless of source; already source-agnostic, no change required here.

Conclusion: the cleanest integration point is at the **snapshot acquisition boundary**, not inside the vision pipeline. We add a new acquisition path that produces the same kind of image reference the rest of the app already understands.

## 4. Proposed architecture

```text
Tapo C110 (local WiFi, RTSP)
        |
        v
Local bridge process (outside the Next.js app)
  - pulls one JPEG frame from rtsp://user:pass@<ip>:554/stream2 on request
  - exposes it over plain HTTP on localhost, e.g. GET /snapshot -> image/jpeg
        |
        v
Next.js app (browser)
  - new capture path fetches http://<bridge-host>:<port>/snapshot
  - converts response to the same base64/data-URL shape CameraPreview.capture() already returns
  - creates a Snapshot with source: 'rtsp'
        |
        v
Existing Snapshot / Turn / TurnHistory flow (unchanged)
```

Key principle: the app never speaks RTSP directly. It only ever fetches a plain HTTP JPEG, keeping the browser code identical in shape to the existing mock/browser paths and keeping camera/recognition concerns out of the scoreboard presentation components (per `AGENTS.md` §10).

## 5. Files expected to change / add

| File | Change |
|---|---|
| `app/src/domain/types.ts` | Extend `SnapshotSource` with `'rtsp'` |
| `app/src/vision/rtspCameraSource.ts` (new) | Small client module: `fetchRtspSnapshot(bridgeUrl): Promise<string \| null>`, mirrors the shape of `CameraPreview.capture()` |
| `app/src/components/CameraPanel.tsx` | Add a source toggle (Browser Camera / IP Camera) and wire the new fetch path into the existing `onCreateSnapshot` callback — no change to the callback contract |
| `app/src/components/CameraPreview.tsx` | No change (kept for the browser path); new IP-camera preview reuses the existing snapshot-display branch by passing the fetched image as `snapshotUrl` |
| `app/.env.example` | Add `TAPO_BRIDGE_URL` (and document that RTSP credentials live only in the bridge's own local config, never in the Next.js app or repo) |
| `tools/rtsp-snapshot-bridge/` (new, outside `app/`) | Minimal local bridge (e.g. a small ffmpeg-based script or existing RTSP-to-JPEG tool) that exposes one HTTP endpoint; documented as an optional local companion process, not part of the deployed web app |
| `projects/darts-live-camera-support/app/README.md` | Add a short "IP camera (Tapo C110) setup" section describing the bridge requirement |

Domain/scoring files (`domain/scoring.ts`, `domain/types.ts` beyond the enum extension) are **not** touched, per the game-rule protection rule.

## 6. Step-by-step tasks

1. Extend `SnapshotSource` with `'rtsp'` in `domain/types.ts`.
2. Build/choose the local RTSP→JPEG bridge and document its setup (camera IP, RTSP credentials, port) in a local-only config file, not committed.
3. Add `rtspCameraSource.ts` with a single responsibility: fetch one frame from the bridge and return a data URL, with a clear error string on failure (mirrors `dartCaptureService`'s "never throw, return a result" pattern).
4. Add a source toggle to `CameraPanel.tsx` (Browser / IP Camera). When "IP Camera" is active, call `rtspCameraSource` instead of `previewRef.current.capture()`.
5. Tag created snapshots with `source: 'rtsp'` when using this path.
6. Add empty/error/loading states for the IP-camera path (bridge unreachable, camera offline, timeout) consistent with existing frontend standards (§14).
7. Update `.env.example` and README with the bridge setup instructions.
8. Manual test against a physical Tapo C110 on the local network.

## 7. Validation commands

```bash
cd projects/darts-live-camera-support/app
npm install
npm run build
npx vitest run --coverage
```

Manual regression (per `AGENTS.md` §16), focused on what this sprint could affect:
- mock image reference and browser camera snapshot still work unchanged;
- turn history still shows snapshots correctly for all three sources;
- score entry, bust, exact-zero finish, correction, undo are unaffected (should be — no code path touches them).

New manual checks specific to this sprint:
- IP-camera snapshot can be fetched from a real Tapo C110 and displayed in `CameraPanel`;
- bridge offline/unreachable shows a clear error state instead of a crash;
- no RTSP credentials appear in browser network requests, source, or committed files.

## 8. Risks (carried over from #46)

- Browsers cannot speak RTSP; the local bridge is an extra moving part pilots must run.
- WiFi-only camera may add latency/instability vs. a wired feed.
- Local network setup (camera IP, RTSP credentials) adds friction for a non-technical operator — needs a short setup doc, not just code.

## 9. Definition of done for this sprint

- `SnapshotSource` extended; existing sources unaffected.
- IP-camera snapshot path works end-to-end against a real Tapo C110.
- No automatic detection introduced on this feed.
- No changes to scoring/bust/finish/correction/undo behavior.
- Build and existing tests pass; new manual checks above are executed and reported.
- `.env.example` and app README updated; no secrets committed.
