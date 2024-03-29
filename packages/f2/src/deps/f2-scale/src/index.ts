import Scale from './base';
import Category from './category/base';
import TimeCat from './category/time';
import Linear from './continuous/linear';
import Log from './continuous/log';
import Pow from './continuous/pow';
import Time from './continuous/time';
import Quantize from './continuous/quantize';
import Quantile from './continuous/quantile';
import { getScale, registerScale } from './factory';
import Identity from './identity/index';
import { getTickMethod, registerTickMethod } from './tick-method/index';
import { ScaleConfig, Tick } from './types';

export {
  Category,
  Identity,
  Linear,
  Log,
  Pow,
  Time,
  TimeCat,
  Quantile,
  Quantize,
  Scale,
  getScale,
  registerScale,
  ScaleConfig,
  Tick,
  getTickMethod,
  registerTickMethod,
};
