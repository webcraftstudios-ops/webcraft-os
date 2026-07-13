/**
 * Focused tests for the RTSP snapshot bridge's HTTP behavior (Sprint 2.7
 * review follow-up): CORS headers and the localhost-only default binding.
 *
 * Uses Node's built-in test runner (`node --test`) so this tool keeps its
 * "no dependency on Next.js, React, or the app's build" property - no new
 * package is added just to test a few HTTP responses.
 *
 * Real ffmpeg/RTSP capture is not exercised here (no camera in CI); instead
 * `createRequestHandler` accepts an injected capture function so these tests
 * can assert on response headers/status without spawning ffmpeg.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

// Requiring server.js must not attempt to start listening or exit the
// process just because RTSP_URL isn't set in this test environment - that
// startup behavior is guarded behind `require.main === module` in server.js.
const { buildCorsHeaders, createRequestHandler, ALLOWED_ORIGIN, HOST } = require('./server');

test('defaults the allowed CORS origin to the app\'s local dev origin', () => {
  assert.equal(ALLOWED_ORIGIN, 'http://localhost:3000');
});

test('defaults the bind address to localhost-only (127.0.0.1)', () => {
  assert.equal(HOST, '127.0.0.1');
});

test('buildCorsHeaders exposes the configured allowed origin and restricts the method', () => {
  const headers = buildCorsHeaders();
  assert.equal(headers['Access-Control-Allow-Origin'], ALLOWED_ORIGIN);
  assert.equal(headers['Access-Control-Allow-Methods'], 'GET');
});

test('a successful /snapshot response includes the CORS allow-origin header', async () => {
  const fakeCapture = async () => Buffer.from('fake-jpeg-bytes');
  const server = http.createServer(createRequestHandler(fakeCapture));

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    const response = await getWithDrainedBody(`http://127.0.0.1:${port}/snapshot`);
    assert.equal(response.statusCode, 200);
    assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:3000');
    assert.equal(response.headers['content-type'], 'image/jpeg');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('an error /snapshot response (camera/ffmpeg failure) still includes the CORS header', async () => {
  const failingCapture = async () => {
    throw new Error('camera offline');
  };
  const server = http.createServer(createRequestHandler(failingCapture));

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    const response = await getWithDrainedBody(`http://127.0.0.1:${port}/snapshot`);
    assert.equal(response.statusCode, 502);
    assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:3000');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('an unknown route still includes the CORS header (404)', async () => {
  const fakeCapture = async () => Buffer.from('unused');
  const server = http.createServer(createRequestHandler(fakeCapture));

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    const response = await getWithDrainedBody(`http://127.0.0.1:${port}/not-a-real-route`);
    assert.equal(response.statusCode, 404);
    assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:3000');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

function getWithDrainedBody(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        response.on('data', () => {});
        response.on('end', () => resolve(response));
      })
      .on('error', reject);
  });
}
