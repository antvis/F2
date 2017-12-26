module.exports = {
  multiply(m1, m2) {
    const m11 = m1[0] * m2[0] + m1[2] * m2[1];
    const m12 = m1[1] * m2[0] + m1[3] * m2[1];

    const m21 = m1[0] * m2[2] + m1[2] * m2[3];
    const m22 = m1[1] * m2[2] + m1[3] * m2[3];

    const dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    const dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

    return [ m11, m12, m21, m22, dx, dy ];
  },
  invert(m) {
    const d = 1 / (m[0] * m[3] - m[1] * m[2]);
    const m0 = m[3] * d;
    const m1 = -m[1] * d;
    const m2 = -m[2] * d;
    const m3 = m[0] * d;
    const m4 = d * (m[2] * m[5] - m[3] * m[4]);
    const m5 = d * (m[1] * m[4] - m[0] * m[5]);
    return [ m0, m1, m2, m3, m4, m5 ];
  }
};
