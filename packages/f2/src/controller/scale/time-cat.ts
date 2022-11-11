import { getScale, registerTickMethod } from '../../deps/f2-scale/src';
import CatTick from './cat-tick';

registerTickMethod('time-cat', CatTick);
const TimeCat = getScale('timeCat');

export default TimeCat;
