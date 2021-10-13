import { upperFirst } from '@antv/util';
import Context from "./interaction/context";
import * as defaultInteractions from './interaction/index'

export default class interactionController {
  // 交互事件作用的chart实例
  chart: any;

  // 交互事件共享的上下文
  context: Context;

  // 交互事件集
  interactions: any[];

  constructor(chart: any) {
    this.chart = chart;
    this.interactions = [];
  }


  createInteraction(type, cfg) {
    if (!type) {
      return null
    }
    if (!this.context) {
      this.context = new Context(this.chart);
    }
    const Constructor = defaultInteractions[upperFirst(type)];
    if (!type || !Constructor) {
      return;
    }

    const { chart, context } = this;
    const interaction = new Constructor(cfg, { chart, context });

    this.interactions.push(interaction);
  }


  getInteractionContext() {
    if (!this.context) {
      this.context = new Context(this.chart);
    }
    return this.context;
  }

  init() {
    if (this.context) {
      this.context.init();
    }
  }

}