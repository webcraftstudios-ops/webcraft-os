/**
 * Minimal local RTSP-to-JPEG bridge (Sprint 2.7 / issue #46).
 *
 * Exposes `GET /snapshot` and returns one fresh JPEG frame pulled from the
 * configured RTSP camera via `ffmpeg`. No dependencies beyond Node's built-in
 * `http` module and a locally installed `ffmpeg` binary.
 *
 * This process never touches match/scoring state and is not part of the
 * deployed Next.js app - it is a small local companion tool for pilots that
 * mount a real IP camera (e.g. TP-Link Tapo C110 / C100) above the board.
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

loadDotEnvIfPresent();

const RTSP_URL = process.env.RTSP_URL;
const PORT = Number(process.env.PORT) || 8089;

/**
 * Only the app running on this origin is allowed to fetch /snapshot from the
 * browser. Defaults to the app's local dev origin. Override via ALLOWED_ORIGIN
 * if the app is served from a different local origin (e.g. a LAN IP during a
 * pilot demo on a shared screen).
 */
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

/**
 * Bind address for the bridge's HTTP server. Defaults to 127.0.0.1
 * (localhost-only) because the current pilot setup always runs the bridge on
 * the same machine as the Next.js app. Set BRIDGE_HOST=0.0.0.0 explicitly
 * only if the app and bridge run on two separate devices on the same local
 * network - this exposes the /snapshot endpoint (and therefore the camera
 * feed) to that whole network, so opt in deliberately.
 */
const HOST = process.env.BRIDGE_HOST || '127.0.0.1';

/** CORS headers applied to every response, success or error. */
function buildCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET',
    Vary: 'Origin',
  };
}

/**
 * Builds the HTTP request handler. `captureFrameFn` is injected so tests can
 * exercise the request/response/CORS behavior without invoking real ffmpeg.
 */
function createRequestHandler(captureFrameFn) {
  return (req, res) => {
    const corsHeaders = buildCorsHeaders();

    if (req.method !== 'GET' || req.url !== '/snapshot') {
      res.writeHead(404, { 'Content-Type': 'text/plain', ...corsHeaders });
      res.end('Not found. Use GET /snapshot.');
      return;
    }

    captureFrameFn(RTSP_URL)
      .then((jpegBuffer) => {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': jpegBuffer.length,
          ...corsHeaders,
        });
        res.end(jpegBuffer);
      })
      .catch((err) => {
        console.error('Snapshot capture failed:', err.message);
        res.writeHead(502, { 'Content-Type': 'text/plain', ...corsHeaders });
        res.end('Could not capture a frame from the camera.');
      });
  };
}

const server = http.createServer(createRequestHandler(captureFrame));

if (require.main === module) {
  if (!RTSP_URL) {
    console.error('Missing RTSP_URL. Copy .env.example to .env and set your camera\'s RTSP URL.');
    process.exit(1);
  }

  server.listen(PORT, HOST, () => {
    console.log(`RTSP snapshot bridge listening on http://${HOST}:${PORT}`);
    console.log(`GET /snapshot -> one JPEG frame from the configured RTSP camera (CORS allowed origin: ${ALLOWED_ORIGIN})`);
  });
}

/**
 * Pulls exactly one JPEG frame from the RTSP stream using ffmpeg and
 * resolves with the raw JPEG bytes.
 */
function captureFrame(rtspUrl) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-rtsp_transport', 'tcp',
      '-i', rtspUrl,
      '-frames:v', '1',
      '-f', 'image2pipe',
      '-vcodec', 'mjpeg',
      'pipe:1',
    ]);

    const chunks = [];
    let stderr = '';

    ffmpeg.stdout.on('data', (chunk) => chunks.push(chunk));
    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on('error', (err) => {
      reject(new Error(`Failed to start ffmpeg (is it installed and on PATH?): ${err.message}`));
    });

    ffmpeg.on('close', (code) => {
      const jpegBuffer = Buffer.concat(chunks);
      if (code !== 0 || jpegBuffer.length === 0) {
        reject(new Error(`ffmpeg exited with code ${code}. ${stderr.slice(-300)}`));
        return;
      }
      resolve(jpegBuffer);
    });
  });
}

/** Tiny dependency-free .env loader so this tool needs no npm install step. */
function loadDotEnvIfPresent() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

module.exports = {
  buildCorsHeaders,
  createRequestHandler,
  ALLOWED_ORIGIN,
  HOST,
  PORT,
  server,
};
