import Chart from '../register';
import Pan from './pan';
import Pinch from './pinch';

// 注册交互
Chart.registerInteraction('pan', Pan);
Chart.registerInteraction('pinch', Pinch);
