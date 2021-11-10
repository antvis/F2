import { getScale, registerTickMethod } from '@antv/scale';
import CatTick from './cat-tick';

registerTickMethod('time-cat', CatTick);
const TimeCat = getScale('timeCat');

export default TimeCat;
