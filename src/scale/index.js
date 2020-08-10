import { Scale, getScale, registerTickMethod } from '@antv/scale';
import TimeCatTick from './timecat-tick';
import LinearTick from './linear-tick';

const Linear = getScale('linear');
const Identity = getScale('identity');
const Category = getScale('category');
const TimeCat = getScale('timeCat');

// 覆盖0.3.x的 timecat scale算法
registerTickMethod('time-cat', TimeCatTick);
// 覆盖linear 度量的tick算法
registerTickMethod('wilkinson-extended', LinearTick);

Scale.Linear = Linear;
Scale.Identity = Identity;
Scale.Category = Category;
Scale.Cat = Category;
Scale.TimeCat = TimeCat;

export default Scale;
