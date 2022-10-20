import { getScale, registerTickMethod } from '@antv/f2-scale';
import CatTick from './cat-tick';

registerTickMethod('time-cat', CatTick);
const TimeCat = getScale('timeCat');

export default TimeCat;
