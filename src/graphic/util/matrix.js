const Matrix = {
  /**
   * 两个矩阵相乘
   * @param  {Array} m1 左矩阵
   * @param  {Array} m2 右矩阵
   * @return {Array}    返回结果
   */
  multiply(m1, m2) {
    const m11 = m1[0] * m2[0] + m1[2] * m2[1];
    const m12 = m1[1] * m2[0] + m1[3] * m2[1];

    const m21 = m1[0] * m2[2] + m1[2] * m2[3];
    const m22 = m1[1] * m2[2] + m1[3] * m2[3];

    const dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    const dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

    return [ m11, m12, m21, m22, dx, dy ];
  },
  /**
   * 矩阵反转
   * @param  {Array} m 参数
   * @return {Array}   返回结果
   */
  // invert(m) {
  //   const d = 1 / (m[0] * m[3] - m[1] * m[2]);
  //   const m0 = m[3] * d;
  //   const m1 = -m[1] * d;
  //   const m2 = -m[2] * d;
  //   const m3 = m[0] * d;
  //   const m4 = d * (m[2] * m[5] - m[3] * m[4]);
  //   const m5 = d * (m[1] * m[4] - m[0] * m[5]);
  //   return [ m0, m1, m2, m3, m4, m5 ];
  // },
  scale(out, m, v) {
    out[0] = m[0] * v[0];
    out[1] = m[1] * v[0];
    out[2] = m[2] * v[1];
    out[3] = m[3] * v[1];
    out[4] = m[4];
    out[5] = m[5];

    return out;
  },
  rotate(out, m, radian) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const m11 = m[0] * c + m[2] * s;
    const m12 = m[1] * c + m[3] * s;
    const m21 = m[0] * -s + m[2] * c;
    const m22 = m[1] * -s + m[3] * c;
    out[0] = m11;
    out[1] = m12;
    out[2] = m21;
    out[3] = m22;
    out[4] = m[4];
    out[5] = m[5];

    return out;
  },
  translate(out, m, v) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
    out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
    return out;
  },
  transform(m, actions) {
    const out = [].concat(m);
    for (let i = 0, len = actions.length; i < len; i++) {
      const action = actions[i];
      switch (action[0]) {
        case 't':
          Matrix.translate(out, out, [ action[1], action[2] ]);
          break;
        case 's':
          Matrix.scale(out, out, [ action[1], action[2] ]);
          break;
        case 'r':
          Matrix.rotate(out, out, action[1]);
          break;
        default:
          break;
      }
    }

    return out;
  }
};

module.exports = Matrix;
