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

function selectPerDart() {
  fireEvent.click(screen.getByRole('button', { name: 'Per Dart' }));
}

function addNumberedDart(hitType: 'Single' | 'Double' | 'Triple', notation: string) {
  fireEvent.click(screen.getByRole('button', { name: hitType }));
  fireEvent.click(screen.getByRole('button', { name: `Add ${notation}` }));
}

function addS20T20D20() {
  addNumberedDart('Single', 'S20');
  addNumberedDart('Triple', 'T20');
  addNumberedDart('Double', 'D20');
}

describe('Snapshot flow integration (CameraPanel -> onCreateSnapshot -> TurnHistory)', () => {
  beforeEach(() => {
    mockCapture.mockReset();
    vi.mocked(fetchRtspSnapshot).mockReset();
  });

  it('attaches a browser-camera snapshot to a Quick Total turn and shows it in Turn History', () => {
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
    expect(screen.queryByText(/^Darts:/)).not.toBeInTheDocument();
  });

  it('attaches a browser-camera snapshot to a Per Dart turn', () => {
    mockCapture.mockReturnValue('data:image/jpeg;base64,PER_DART_BROWSER');
    render(<HomePage />);

    startDefaultMatch();
    selectPerDart();
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    addS20T20D20();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm turn' }));

    expect(screen.getByText('Darts: S20 · T20 · D20')).toBeInTheDocument();
    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,PER_DART_BROWSER');
    expect(screen.getAllByText('After: 381').length).toBeGreaterThan(0);
  });

  it('attaches an IP-camera (RTSP) snapshot to a Quick Total turn', async () => {
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

  it('attaches an IP-camera (RTSP) snapshot to a Per Dart turn', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: true,
      dataUrl: 'data:image/jpeg;base64,PER_DART_RTSP',
    });
    render(<HomePage />);

    startDefaultMatch();
    selectPerDart();
    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(screen.getByText(/IP camera image captured for the next confirmed score\./i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add MISS' }));
    addNumberedDart('Single', 'S5');
    addNumberedDart('Double', 'D10');
    fireEvent.click(screen.getByRole('button', { name: 'Confirm turn' }));

    expect(screen.getByText('Darts: MISS · S5 · D10')).toBeInTheDocument();
    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,PER_DART_RTSP');
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

    mockCapture.mockReturnValue('data:image/jpeg;base64,TURN_1_PLAYER_1');
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    confirmScore('60');

    confirmScore('45');

    mockCapture.mockReturnValue('data:image/jpeg;base64,TURN_3_PLAYER_1');
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    confirmScore('20');

    expect(screen.getByText('3 turns')).toBeInTheDocument();
    expect((screen.getByAltText('Turn 1 snapshot') as HTMLImageElement).src).toBe(
      'data:image/jpeg;base64,TURN_1_PLAYER_1',
    );
    expect(screen.queryByAltText('Turn 2 snapshot')).not.toBeInTheDocument();
    expect((screen.getByAltText('Turn 3 snapshot') as HTMLImageElement).src).toBe(
      'data:image/jpeg;base64,TURN_3_PLAYER_1',
    );
  });

  it('lets the operator confirm a Quick Total score when the IP camera capture fails', async () => {
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

    confirmScore('60');

    expect(screen.getByText('Turn #1')).toBeInTheDocument();
    expect(screen.getAllByText('After: 441').length).toBeGreaterThan(0);
    expect(screen.queryByAltText('Turn 1 snapshot')).not.toBeInTheDocument();
  });

  it('lets the operator confirm a Per Dart turn when the IP camera capture fails', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: false,
      error: 'Bridge unavailable.',
    });
    render(<HomePage />);

    startDefaultMatch();
    selectPerDart();
    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(screen.getByText('Bridge unavailable.')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add BULL' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm turn' }));

    expect(screen.getByText('Darts: BULL')).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    await waitFor(() => {
      expect(screen.getByText(/IP camera image captured for the next confirmed score\./i)).toBeInTheDocument();
    });

    confirmScore('60');

    const snapshotImage = screen.getByAltText('Turn 1 snapshot') as HTMLImageElement;
    expect(snapshotImage.src).toBe('data:image/jpeg;base64,RECOVERED');
  });

  it('preserves Per Dart undo and converts total correction to Quick Total', () => {
    render(<HomePage />);
    startDefaultMatch();
    selectPerDart();

    addNumberedDart('Triple', 'T20');
    addNumberedDart('Triple', 'T20');
    addNumberedDart('Triple', 'T20');
    fireEvent.click(screen.getByRole('button', { name: 'Confirm turn' }));

    expect(screen.getByText('Darts: T20 · T20 · T20')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('New score for last turn'), { target: { value: '140' } });
    fireEvent.click(screen.getByRole('button', { name: 'Correct score' }));

    expect(screen.getByText('Last turn corrected from 180 to 140.')).toBeInTheDocument();
    expect(screen.queryByText('Darts: T20 · T20 · T20')).not.toBeInTheDocument();
    expect(screen.queryByText(/^Darts:/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Undo last turn' }));
    expect(screen.getByText('Last turn was undone.')).toBeInTheDocument();
    expect(screen.queryByText('Turn #1')).not.toBeInTheDocument();
  });

  it('resets a finished match without reloading and starts a clean second match', () => {
    mockCapture.mockReturnValue('data:image/jpeg;base64,FIRST_MATCH');
    render(<HomePage />);

    fireEvent.change(screen.getByLabelText('Player 1'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Player 2'), { target: { value: 'Bob' } });
    fireEvent.click(screen.getByRole('button', { name: '301' }));
    startDefaultMatch();

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    confirmScore('180');
    confirmScore('0');
    confirmScore('121');

    expect(screen.getByText('Game Shot')).toBeInTheDocument();
    expect(screen.getByText('Alice Wins!')).toBeInTheDocument();
    expect(screen.getByAltText('Turn 1 snapshot')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('New score for last turn'), { target: { value: '120' } });
    fireEvent.click(screen.getByRole('button', { name: 'Correct score' }));
    expect(screen.queryByText('Game Shot')).not.toBeInTheDocument();
    expect(screen.getByText('Last turn corrected from 121 to 120.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Undo last turn' }));
    expect(screen.getByText('Last turn was undone.')).toBeInTheDocument();
    confirmScore('121');
    expect(screen.getByText('Alice Wins!')).toBeInTheDocument();

    mockCapture.mockReturnValue('data:image/jpeg;base64,PENDING_AFTER_FINISH');
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
    expect(screen.getByText('Camera image captured for the next confirmed score.')).toBeInTheDocument();
    expect(screen.getByText(/^Pending image: snap-/)).toBeInTheDocument();

    const originalWindow = window;
    const reload = vi.fn();
    const locationProxy = new Proxy(originalWindow.location, {
      get(target, property) {
        return property === 'reload' ? reload : Reflect.get(target, property, target);
      },
    });
    const windowProxy = new Proxy(originalWindow, {
      get(target, property) {
        return property === 'location' ? locationProxy : Reflect.get(target, property, target);
      },
    });

    vi.stubGlobal('window', windowProxy);
    try {
      fireEvent.click(screen.getByRole('button', { name: 'Start New Match' }));
      expect(reload).not.toHaveBeenCalled();
    } finally {
      vi.stubGlobal('window', originalWindow);
    }

    expect(screen.getByRole('button', { name: /Let's Play Darts/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Player 1')).toHaveValue('Player 1');
    expect(screen.getByLabelText('Player 2')).toHaveValue('Player 2');
    expect(screen.queryByText('Alice Wins!')).not.toBeInTheDocument();
    expect(screen.queryByText('Camera image captured for the next confirmed score.')).not.toBeInTheDocument();
    expect(screen.queryByText('Turn #1')).not.toBeInTheDocument();

    startDefaultMatch();

    expect(screen.getByRole('heading', { name: '501 Live Scoreboard' })).toBeInTheDocument();
    expect(screen.getAllByText('501').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('No turns entered yet.')).toBeInTheDocument();
    expect(screen.getByText('Pending image: -')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo last turn' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Correct score' })).toBeDisabled();
    expect(screen.queryByAltText('Turn 1 snapshot')).not.toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Per Dart' }));
    expect(screen.getByText('Live total: 0')).toBeInTheDocument();
    expect(screen.getAllByText('Empty')).toHaveLength(3);
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
  });
});
