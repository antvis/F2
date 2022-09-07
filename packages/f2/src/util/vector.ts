/**
 *  expand Vec2
 */
import { angle as vec2Angle } from 'gl-matrix/vec2';

const vec2Direction = (v1, v2) => {
  return v1[0] * v2[1] - v2[0] * v1[1];
};

const vec2Zero = (v) => {
  return v[0] === 0 && v[1] === 0;
};

const vec2AngleTo = (v1, v2, direction) => {
  const angle = vec2Angle(v1, v2);
  const angleLargeThanPI = vec2Direction(v1, v2) >= 0;
  if (direction) {
    if (angleLargeThanPI) {
      return Math.PI * 2 - angle;
    }

    return angle;
  }

  if (angleLargeThanPI) {
    return angle;
  }
  return Math.PI * 2 - angle;
};

export { vec2Zero, vec2AngleTo };
