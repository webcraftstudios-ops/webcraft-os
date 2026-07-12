import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { forwardRef, useImperativeHandle } from 'react';
import HomePage from './page';
import { fetchRtspSnapshot } from '@/vision/rtspCameraSource';

/**
 * End-to-end integration test for the full assisted-scoring snapshot flow:
 *
 *   MatchSetup (start match)
 *     -> CameraPanel (capture a snapshot, browser or IP camera)
 *     -> onCreateSnapshot (page.tsx wiring, tags the source)
 *     -> ScoreInput (confirm the turn)
 *     -> TurnHistory (snapshot is attached to the confirmed turn)
 *
 * `CameraPreview` owns getUserMedia + canvas capture, which are not reliably
 * testable in jsdom, so it is replaced with a lightweight stand-in that
 * exposes a controllable `capture()` ref - exactly like in CameraPanel.test.tsx.
 * Everything above and below it (MatchSetup, ScoreInput, scoring, TurnHistory)
 * is the real implementation, so this test exercises the actual data flow
 * between them.
 */
const mockCapture = vi.fn<[], string | null>();

vi.mock('@/components/CameraPreview', () => ({
  CameraPreview: forwardRef<{ capture: () => string | null }, { isLive?: boolean; snapshotUrl?: string | null }>(
    (_props, ref) => {
      useImperativeHandle(ref, () => ({ capture: mockCapture }));
      return <div data-testid="camera-preview-mock" />;
    }
  ),
}));

vi.mock('@/vision/rtspCameraSource', () => ({
  fetchRtspSnapshot: vi.fn(),
}));

function startDefaultMatch() {
  fireEvent.click(screen.getByRole('button', { name: /Let's Play Darts/i }));
}

function confirmScore(score: string) {
  fireEvent.change(screen.getByPlaceholderText('Turn score'), { target: { value: score } });
  fireEvent.click(screen.getByRole('button', { name: 'Confirm score' }));
}

describe('Snapshot flow integration (CameraPanel -> onCreateSnapshot -> TurnHistory)', () => {
  beforeEach(() => {
    mockCapture.mockReset();
    vi.mocked(fetchRtspSnapshot).mockReset();
  });

  it('attaches a browser-camera snapshot to the confirmed turn and shows it in Turn History', () => {
    mockCapture.mockReturnValue('data:image/jpeg;base64,BROWSER_SNAPSHOT');
    render(<HomePage />);

    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    expect(screen.getByText(/Camera image captured for the next confirmed score\./i)).toBeInTheDocument();

    confirmScore('60');

    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,BROWSER_SNAPSHOT');
    expect(screen.getByText('Turn #1')).toBeInTheDocument();
    expect(screen.getAllByText('After: 441').length).toBeGreaterThan(0);
  });

  it('attaches an IP-camera (RTSP) snapshot to the confirmed turn and shows it in Turn History', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: true,
      dataUrl: 'data:image/jpeg;base64,RTSP_SNAPSHOT',
    });
    render(<HomePage />);

    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(screen.getByText(/IP camera image captured for the next confirmed score\./i)).toBeInTheDocument();
    });

    confirmScore('45');

    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,RTSP_SNAPSHOT');
  });

  it('does not attach a snapshot to the turn when the pending image is discarded first', () => {
    mockCapture.mockReturnValue('data:image/jpeg;base64,DISCARDED');
    render(<HomePage />);

    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    fireEvent.click(screen.getByRole('button', { name: 'Discard Image' }));

    confirmScore('60');

    expect(screen.getByText('Turn #1')).toBeInTheDocument();
    expect(screen.queryByAltText('Turn 1 snapshot')).not.toBeInTheDocument();
  });

  it('keeps each player\'s snapshot correctly attached to their own turn across a multi-turn sequence', () => {
    render(<HomePage />);

    startDefaultMatch();

    // Turn 1: Player 1 with a captured snapshot.
    mockCapture.mockReturnValue('data:image/jpeg;base64,TURN_1_PLAYER_1');
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    confirmScore('60'); // Player 1: 501 -> 441

    // Turn 2: Player 2, no snapshot captured this time.
    confirmScore('45'); // Player 2: 501 -> 456

    // Turn 3: Player 1 again, with a new, different snapshot.
    mockCapture.mockReturnValue('data:image/jpeg;base64,TURN_3_PLAYER_1');
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    confirmScore('20'); // Player 1: 441 -> 421

    expect(screen.getByText('3 turns')).toBeInTheDocument();

    const turn1Image = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(turn1Image.src).toBe('data:image/jpeg;base64,TURN_1_PLAYER_1');

    expect(screen.queryByAltText('Turn 2 snapshot')).not.toBeInTheDocument();

    const turn3Image = screen.getByAltText('Turn 3 snapshot') as HTMLImageElement;
    expect(turn3Image.src).toBe('data:image/jpeg;base64,TURN_3_PLAYER_1');
  });

  it('lets the operator confirm the score manually when the IP camera capture fails (no snapshot blocks the flow)', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: false,
      error: 'Could not reach the IP camera bridge. Is it running on the local network?',
    });
    render(<HomePage />);

    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(
        screen.getByText('Could not reach the IP camera bridge. Is it running on the local network?')
      ).toBeInTheDocument();
    });

    // Human-confirmed fallback: the operator can still enter the score by hand.
    confirmScore('60');

    expect(screen.getByText('Turn #1')).toBeInTheDocument();
    expect(screen.getAllByText('After: 441').length).toBeGreaterThan(0);
    expect(screen.queryByAltText('Turn 1 snapshot')).not.toBeInTheDocument();
  });

  it('recovers from a failed IP camera capture and successfully attaches a snapshot on retry', async () => {
    vi.mocked(fetchRtspSnapshot)
      .mockResolvedValueOnce({ success: false, error: 'Bridge unreachable.' })
      .mockResolvedValueOnce({ success: true, dataUrl: 'data:image/jpeg;base64,RECOVERED' });
    render(<HomePage />);

    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    await waitFor(() => {
      expect(screen.getByText('Bridge unreachable.')).toBeInTheDocument();
    });

    // Retry the capture (same turn, no score confirmed yet).
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    await waitFor(() => {
      expect(screen.getByText(/IP camera image captured for the next confirmed score\./i)).toBeInTheDocument();
    });

    confirmScore('60');

    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,RECOVERED');
  });
});
