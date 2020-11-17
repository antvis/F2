import { expect } from 'chai';
import Geom from '../../../src/geom/base';
import { Canvas } from '../../../src/graphic/engine/index';

const dom = document.createElement('canvas');
dom.width = 500;
dom.height = 500;
document.body.appendChild(dom);

const canvas = new Canvas({
  el: dom,
  width: 500,
  height: 500
});

describe('Geom enhance', function() {
  it('visible', function() {
    const geom = new Geom({
      container: canvas.addGroup()
    });
    expect(geom.get('visible')).to.be.true;
    const container = geom.get('container');

    geom.hide();
    expect(geom.get('visible')).to.be.false;
    expect(container.get('visible')).to.be.false;

    geom.show();
    expect(geom.get('visible')).to.be.true;
    expect(container.get('visible')).to.be.true;
  });
});
