import Matrix from './util/matrix';
import Vector2 from './util/vector2';

import { Canvas, Group, Shape } from './engine';

const engines = {};
function registerEngine(name, engine) {
  engines[name] = engine;
}
function getEngine(name) {
  const G = engines[name];
  if (G) {
    return G;
  }
  return { Canvas, Group, Shape };
}

function createCanvas(cfg) {
  const { renderer } = cfg;
  const G = getEngine(renderer);
  return new G.Canvas(cfg);
}

export {
  registerEngine,
  getEngine,
  createCanvas,
  Canvas,
  Group,
  Shape,
  Matrix,
  Vector2
};
