// Shared minimal typing for the OpenCV.js global (`window.cv`). OpenCV.js is
// loaded client-side via a <Script> tag (see app/layout.tsx) and attaches
// itself to `window.cv`. We avoid pulling in @techstark/opencv-js types to
// keep this dependency-free; only the handful of APIs the vision modules
// actually use are declared here, in one place, to avoid conflicting global
// augmentations across files.

export type CVMat = {
  delete: () => void;
  clone: () => CVMat;
  rows: number;
  cols: number;
};

export type CVMatVector = {
  size: () => number;
  get: (index: number) => CVMat;
  delete: () => void;
};

export type CVRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CVPoint = {
  x: number;
  y: number;
};

export type CVStatic = {
  // Perspective transform (Spike 4.1)
  matFromArray: (rows: number, cols: number, type: number, array: number[]) => CVMat;
  getPerspectiveTransform: (src: CVMat, dst: CVMat) => CVMat;
  warpPerspective: (
    src: CVMat,
    dst: CVMat,
    m: CVMat,
    dsize: { width: number; height: number },
    flags: number,
    borderMode: number,
    borderValue: unknown,
  ) => void;

  // Image IO
  imread: (canvasOrImg: HTMLCanvasElement | HTMLImageElement | string) => CVMat;
  imshow: (canvasIdOrElement: HTMLCanvasElement | string, mat: CVMat) => void;

  // Dart detection (Spike 4.2)
  cvtColor: (src: CVMat, dst: CVMat, code: number) => void;
  GaussianBlur: (
    src: CVMat,
    dst: CVMat,
    ksize: { width: number; height: number },
    sigmaX: number,
    sigmaY: number,
    borderType: number,
  ) => void;
  absdiff: (src1: CVMat, src2: CVMat, dst: CVMat) => void;
  threshold: (src: CVMat, dst: CVMat, thresh: number, maxval: number, type: number) => number;
  findContours: (
    src: CVMat,
    contours: CVMatVector,
    hierarchy: CVMat,
    mode: number,
    method: number,
  ) => void;
  contourArea: (contour: CVMat) => number;
  boundingRect: (contour: CVMat) => CVRect;

  // Constructors / constants
  Mat: new () => CVMat;
  MatVector: new () => CVMatVector;
  Size: new (width: number, height: number) => { width: number; height: number };
  Scalar: new () => unknown;
  CV_32FC2: number;
  COLOR_RGBA2GRAY: number;
  THRESH_BINARY: number;
  RETR_EXTERNAL: number;
  CHAIN_APPROX_SIMPLE: number;
  INTER_LINEAR: number;
  BORDER_CONSTANT: number;
  BORDER_DEFAULT: number;
};

declare global {
  interface Window {
    cv?: CVStatic;
  }
}

export class OpenCvNotReadyError extends Error {
  constructor() {
    super('OpenCV.js is not loaded yet. Ensure window.cv is initialized before calling vision utilities.');
    this.name = 'OpenCvNotReadyError';
  }
}

export function getCv(): CVStatic {
  if (typeof window === 'undefined' || !window.cv) {
    throw new OpenCvNotReadyError();
  }
  return window.cv;
}

/**
 * Checks whether OpenCV.js has finished loading and initializing in the browser.
 * Use this before invoking any other vision utility to fail gracefully instead
 * of throwing, per the "never block manual score entry" requirement.
 */
export function isOpenCvReady(): boolean {
  return typeof window !== 'undefined' && typeof window.cv !== 'undefined';
}