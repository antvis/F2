import { registerTickMethod } from '@antv/scale';

import CatTick from './cat-tick';
import LinearTick from './linear-tick';

// 覆盖0.3.x的 cat 方法
registerTickMethod('cat', CatTick);
registerTickMethod('time-cat', CatTick);
// 覆盖linear 度量的tick算法
registerTickMethod('wilkinson-extended', LinearTick);
