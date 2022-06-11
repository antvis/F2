import { Vector2, Matrix } from '@antv/f2-graphic';

export interface AnimationConfig {
  property: string[];
  start?: any;
  end?: any;
}

export type Effect = (coord, attrs) => AnimationConfig;

function fadeIn() {
  return {
    property: ['fillOpacity', 'strokeOpacity'],
    start: {
      fillOpacity: 0,
      strokeOpacity: 0,
    },
  };
}

function fadeOut() {
  return {
    property: ['fillOpacity', 'strokeOpacity'],
    end: {
      fillOpacity: 0,
      strokeOpacity: 0,
    },
  };
}

function waveIn() {}

function waveOut() {}

function scaleIn(coord, attrs) {
  return {
    property: ['matrix'],
    start: {
      matrix: Matrix.transform(matrix, [
        ['t', x, y],
        ['s', 100, 100],
        ['t', x, -y],
      ]),
    },
  };
}

function scaleOut(x: number, y: number, matrix: number[] = Matrix.generateDefault()) {
  return {
    property: ['matrix'],
    start: {
      matrix: Matrix.transform(matrix, [
        ['t', x, y],
        ['s', 0.01, 0.01],
        ['t', x, -y],
      ]),
    },
  };
}

export { fadeIn, fadeOut, waveIn, waveOut, scaleIn, scaleOut };
