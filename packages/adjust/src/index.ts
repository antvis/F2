import { getAdjust, registerAdjust } from './factory';

import Adjust from './adjusts/adjust';

import Dodge from './adjusts/dodge';
import Jitter from './adjusts/jitter';
import Stack from './adjusts/stack';
import Symmetric from './adjusts/symmetric';

// 注册内置的 adjust
registerAdjust('Dodge', Dodge);
registerAdjust('Jitter', Jitter);
registerAdjust('Stack', Stack);
registerAdjust('Symmetric', Symmetric);

// 最终暴露给外部的方法
export { getAdjust, registerAdjust, Adjust };

export * from './interface';
