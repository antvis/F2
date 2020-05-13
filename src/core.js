const Core = {};

import Global from './global';
import Chart from './chart/chart';
import Shape from './geom/shape/shape';
import * as G from './graphic/index';
import * as Util from './util/common';
import * as Helper from './util/helper';

Core.Global = Global;
Core.version = Global.version;
Core.Chart = Chart;
Core.Shape = Shape;
Core.G = G;

Core.Util = Util;
Core.Helper = Helper;

Core.track = () => {
  return null;
};

export default Core;
