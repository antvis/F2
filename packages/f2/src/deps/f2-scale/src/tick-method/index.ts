import cat from './cat';
import d3Linear from './d3-linear';
import linear from './linear';
import log from './log';
import pow from './pow';
import quantile from './quantile';
import rPretty from './r-prettry';
import { getTickMethod, registerTickMethod } from './register';
import time from './time';
import timeCat from './time-cat';
import timePretty from './time-pretty';

registerTickMethod('cat', cat);
registerTickMethod('time-cat', timeCat);
registerTickMethod('wilkinson-extended', linear);
registerTickMethod('r-pretty', rPretty);
registerTickMethod('time', time);
registerTickMethod('time-pretty', timePretty);
registerTickMethod('log', log);
registerTickMethod('pow', pow);
registerTickMethod('quantile', quantile);
registerTickMethod('d3-linear', d3Linear);

export { getTickMethod, registerTickMethod };
