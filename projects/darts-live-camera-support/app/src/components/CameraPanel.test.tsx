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
    (_props, ref) => {
      useImperativeHandle(ref, () => ({ capture: mockCapture }));
      return <div data-testid="camera-preview-mock" />;
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
});
