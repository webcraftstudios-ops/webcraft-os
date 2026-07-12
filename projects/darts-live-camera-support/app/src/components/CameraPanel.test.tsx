import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { forwardRef, useImperativeHandle } from 'react';
import { CameraPanel } from './CameraPanel';
import { fetchRtspSnapshot } from '@/vision/rtspCameraSource';

// `CameraPreview` owns getUserMedia + canvas capture, which are not reliably
// testable in jsdom (no real camera, no real canvas 2d context). CameraPanel's
// own responsibility -- mode switching, wiring the capture result to
// onCreateSnapshot, and the RTSP fetch/error flow -- is tested here against a
// lightweight stand-in that exposes a controllable `capture()` ref.
const mockCapture = vi.fn<[], string | null>();

vi.mock('@/components/CameraPreview', () => ({
  CameraPreview: forwardRef<{ capture: () => string | null }, { isLive?: boolean; snapshotUrl?: string | null }>(
    ({ isLive, snapshotUrl }, ref) => {
      useImperativeHandle(ref, () => ({ capture: mockCapture }));
      return (
        <div
          data-testid="camera-preview-mock"
          data-is-live={String(!!isLive)}
          data-snapshot-url={snapshotUrl ?? ''}
        />
      );
    }
  ),
}));

vi.mock('@/vision/rtspCameraSource', () => ({
  fetchRtspSnapshot: vi.fn(),
}));

describe('CameraPanel', () => {
  beforeEach(() => {
    mockCapture.mockReset();
    vi.mocked(fetchRtspSnapshot).mockReset();
  });

  it('defaults to Browser Camera mode with the browser preview visible', () => {
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={vi.fn()} onClearSnapshot={vi.fn()} />);

    expect(screen.getByTestId('camera-preview-mock')).toBeInTheDocument();
  });

  it('switches to IP Camera mode and shows the capture prompt instead of the browser preview', () => {
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={vi.fn()} onClearSnapshot={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));

    expect(screen.queryByTestId('camera-preview-mock')).not.toBeInTheDocument();
    expect(screen.getByText(/pull a fresh frame from the IP camera bridge/i)).toBeInTheDocument();
  });

  it('captures a browser snapshot and reports it with source "camera"', () => {
    mockCapture.mockReturnValue('data:image/jpeg;base64,AAA');
    const onCreateSnapshot = vi.fn();
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    expect(onCreateSnapshot).toHaveBeenCalledWith('data:image/jpeg;base64,AAA', 'camera');
  });

  it('does not report a snapshot when the browser capture yields nothing', () => {
    mockCapture.mockReturnValue(null);
    const onCreateSnapshot = vi.fn();
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    expect(onCreateSnapshot).not.toHaveBeenCalled();
  });

  it('fetches a snapshot from the IP camera bridge and reports it with source "rtsp"', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: true,
      dataUrl: 'data:image/jpeg;base64,BBB',
    });
    const onCreateSnapshot = vi.fn();
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(onCreateSnapshot).toHaveBeenCalledWith('data:image/jpeg;base64,BBB', 'rtsp');
    });
  });

  it('shows an error message and does not report a snapshot when the IP camera fetch fails', async () => {
    vi.mocked(fetchRtspSnapshot).mockResolvedValue({
      success: false,
      error: 'Could not reach the IP camera bridge. Is it running on the local network?',
    });
    const onCreateSnapshot = vi.fn();
    render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

    await waitFor(() => {
      expect(screen.getByText('Could not reach the IP camera bridge. Is it running on the local network?')).toBeInTheDocument();
    });
    expect(onCreateSnapshot).not.toHaveBeenCalled();
  });

  it('disables mode switching and capture while a snapshot is pending, but allows discarding it', () => {
    const onClearSnapshot = vi.fn();
    render(
      <CameraPanel
        pendingSnapshotUrl="data:image/jpeg;base64,PENDING"
        onCreateSnapshot={vi.fn()}
        onClearSnapshot={onClearSnapshot}
      />
    );

    expect(screen.getByRole('button', { name: 'Browser Camera' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /IP Camera/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Capture Snapshot' })).toBeDisabled();

    const discardButton = screen.getByRole('button', { name: 'Discard Image' });
    expect(discardButton).not.toBeDisabled();

    fireEvent.click(discardButton);
    expect(onClearSnapshot).toHaveBeenCalledTimes(1);
  });

  describe('network failure recovery', () => {
    it('shows "Fetching..." while the request is in flight, then recovers to a clickable state on failure', async () => {
      let resolveFetch!: (value: { success: false; error: string }) => void;
      vi.mocked(fetchRtspSnapshot).mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
      );
      render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={vi.fn()} onClearSnapshot={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      const captureButton = screen.getByRole('button', { name: 'Fetching...' });
      expect(captureButton).toBeDisabled();

      resolveFetch({ success: false, error: 'Could not reach the IP camera bridge.' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Capture Snapshot' })).not.toBeDisabled();
      });
      expect(screen.queryByRole('button', { name: 'Fetching...' })).not.toBeInTheDocument();
    });

    it('allows a successful retry immediately after a failed capture attempt', async () => {
      vi.mocked(fetchRtspSnapshot)
        .mockResolvedValueOnce({ success: false, error: 'Could not reach the IP camera bridge.' })
        .mockResolvedValueOnce({ success: true, dataUrl: 'data:image/jpeg;base64,RETRY_OK' });
      const onCreateSnapshot = vi.fn();
      render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      await waitFor(() => {
        expect(screen.getByText('Could not reach the IP camera bridge.')).toBeInTheDocument();
      });
      expect(onCreateSnapshot).not.toHaveBeenCalled();

      // Retry without leaving IP Camera mode.
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      await waitFor(() => {
        expect(onCreateSnapshot).toHaveBeenCalledWith('data:image/jpeg;base64,RETRY_OK', 'rtsp');
      });
    });

    it('clears a previous error message when switching camera mode away and back', async () => {
      vi.mocked(fetchRtspSnapshot).mockResolvedValue({ success: false, error: 'Bridge unreachable.' });
      render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={vi.fn()} onClearSnapshot={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));
      await waitFor(() => {
        expect(screen.getByText('Bridge unreachable.')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Browser Camera' }));
      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));

      expect(screen.queryByText('Bridge unreachable.')).not.toBeInTheDocument();
      expect(screen.getByText(/pull a fresh frame from the IP camera bridge/i)).toBeInTheDocument();
    });

    it('recovers to a clickable state and shows a fallback message if the fetch call itself unexpectedly throws', async () => {
      vi.mocked(fetchRtspSnapshot).mockRejectedValue(new Error('unexpected'));
      const onCreateSnapshot = vi.fn();
      render(<CameraPanel pendingSnapshotUrl={null} onCreateSnapshot={onCreateSnapshot} onClearSnapshot={vi.fn()} />);

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      await waitFor(() => {
        expect(screen.getByText('Unexpected error while capturing from the IP camera.')).toBeInTheDocument();
      });
      expect(screen.getByRole('button', { name: 'Capture Snapshot' })).not.toBeDisabled();
      expect(onCreateSnapshot).not.toHaveBeenCalled();
    });
  });

  describe('last snapshot visibility after score confirmation', () => {
    it('keeps the last confirmed snapshot visible in IP Camera mode once the pending snapshot is cleared', () => {
      render(
        <CameraPanel
          pendingSnapshotUrl={null}
          lastSnapshotUrl="data:image/jpeg;base64,LAST_CONFIRMED"
          onCreateSnapshot={vi.fn()}
          onClearSnapshot={vi.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));

      // Must NOT fall back to the "press Capture Snapshot" placeholder when a
      // last confirmed image already exists.
      expect(screen.queryByText(/pull a fresh frame from the IP camera bridge/i)).not.toBeInTheDocument();
      expect(screen.getByTestId('camera-preview-mock')).toHaveAttribute(
        'data-snapshot-url',
        'data:image/jpeg;base64,LAST_CONFIRMED'
      );
    });

    it('still shows the placeholder in IP Camera mode when there is neither a pending nor a last snapshot', () => {
      render(
        <CameraPanel pendingSnapshotUrl={null} lastSnapshotUrl={null} onCreateSnapshot={vi.fn()} onClearSnapshot={vi.fn()} />
      );

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));

      expect(screen.getByText(/pull a fresh frame from the IP camera bridge/i)).toBeInTheDocument();
    });
  });

  describe('capture/confirm race condition', () => {
    it('discards a snapshot that arrives after a new turn was confirmed while the fetch was in flight', async () => {
      let resolveFetch!: (value: { success: true; dataUrl: string }) => void;
      vi.mocked(fetchRtspSnapshot).mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
      );
      const onCreateSnapshot = vi.fn();
      const { rerender } = render(
        <CameraPanel
          pendingSnapshotUrl={null}
          turnCount={0}
          onCreateSnapshot={onCreateSnapshot}
          onClearSnapshot={vi.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      // Simulate the score being confirmed (turn advances) while the RTSP
      // fetch triggered above is still in flight.
      rerender(
        <CameraPanel
          pendingSnapshotUrl={null}
          turnCount={1}
          onCreateSnapshot={onCreateSnapshot}
          onClearSnapshot={vi.fn()}
        />
      );

      resolveFetch({ success: true, dataUrl: 'data:image/jpeg;base64,STALE' });

      await waitFor(() => {
        expect(screen.getByText(/snapshot discarded/i)).toBeInTheDocument();
      });
      expect(onCreateSnapshot).not.toHaveBeenCalled();
    });

    it('still attaches the snapshot normally when no turn was confirmed while fetching', async () => {
      vi.mocked(fetchRtspSnapshot).mockResolvedValue({
        success: true,
        dataUrl: 'data:image/jpeg;base64,OK',
      });
      const onCreateSnapshot = vi.fn();
      render(
        <CameraPanel
          pendingSnapshotUrl={null}
          turnCount={0}
          onCreateSnapshot={onCreateSnapshot}
          onClearSnapshot={vi.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /IP Camera/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Capture Snapshot' }));

      await waitFor(() => {
        expect(onCreateSnapshot).toHaveBeenCalledWith('data:image/jpeg;base64,OK', 'rtsp');
      });
    });
  });
});
