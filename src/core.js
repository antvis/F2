import Global from './global';
import Chart from './chart/chart';
import Shape from './geom/shape/shape';
import * as G from './graphic/index';
import * as Util from './util/common';
import * as Helper from './util/helper';

const track = () => {
  return null;
};

const version = Global.version;

export {
  Global,
  version,
  Chart,
  Shape,
  G,
  Util,
  Helper,
  track
};
