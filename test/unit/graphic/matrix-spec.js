import { expect } from 'chai';
import Matrix from '../../../src/graphic/util/matrix';

describe('Matrix Util', function() {
  it('Matrix.multiply(m1, m2)', function() {
    const m1 = [ 1, 100, 0, 1, 100, 1 ];
    const m2 = [ 2, 2, 2, 2, 2, 2 ];
    const result = Matrix.multiply(m1, m2);
    expect(result).to.eql([ 2, 202, 2, 202, 102, 203 ]);
    expect(m1).to.eql([ 1, 100, 0, 1, 100, 1 ]);
    expect(m2).to.eql([ 2, 2, 2, 2, 2, 2 ]);
  });

  it('Matrix.scale(out, m, v)', function() {
    const m = [ 1, 0, 0, 1, 0, 0 ];
    const v = [ 0.1, 1.4 ];
    const out = [];
    const result = Matrix.scale(out, m, v);
    expect(result).to.eql([ 0.1, 0, 0, 1.4, 0, 0 ]);
  });

  it('Matrix.rotate(out, m, radian)', function() {
    const m = [ 1, 0, 0, 1, 0, 0 ];
    const radian = Math.PI;
    const out = [];
    const result = Matrix.rotate(out, m, radian);
    expect(result).to.eql([ -1, 1.2246467991473532e-16, -1.2246467991473532e-16, -1, 0, 0 ]);
  });

  it('Matrix.translate(out, m, v)', function() {
    const m = [ 1, 0, 0, 1, 0, 0 ];
    const v = [ 10, 20 ];
    const out = [];
    const result = Matrix.translate(out, m, v);
    expect(result).to.eql([ 1, 0, 0, 1, 10, 20 ]);
  });

  it('transform(m, actions)', function() {
    const matrix = [ 1, 0, 0, 1, 0, 0 ];
    const scaledMatrix = Matrix.transform(matrix, [
      [ 't', 10, 10 ],
      [ 's', 100, 1 ],
      [ 'r', Math.PI / 4 ],
      [ 't', -10, -10 ]
    ]);

    expect(scaledMatrix).to.eql([ 70.71067811865476, 0.7071067811865475, -70.71067811865474, 0.7071067811865476, 9.999999999999886, -4.14213562373095 ]);
    expect(matrix).to.eql([ 1, 0, 0, 1, 0, 0 ]);
  });
});
