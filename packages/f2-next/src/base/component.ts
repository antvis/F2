import Layout from './layout';

class Component {
  props: any;
  state: any;
  context: any;
  refs: {
    [key: string]: any;
  }
  container: any;
  layout: Layout;
  updater: any;

  animate: boolean;

  /**
   * @private
   */
  // 上一次render生成的jsx element
  __lastElement: any;
  __shape: any;
  __props: any;
  __mounted = false;
  // 表示是否需要调用render渲染
  __shouldRender = true;
  // actions: any;

  constructor(props: any, context?, updater?) {
    const { animate } = props;
    this.__props = props;
    this.props = props;
    this.context = context;
    this.updater = updater;
    this.state = {};
    this.animate = animate;
  }
  init({ container, layout }) {
    this.layout = layout;
    this.container = container;
  }
  // TODO beforeMount
  willMount() {
  }
  // TODO mounted
  mount() {
  }
  setState(partialState) {
    this.updater.enqueueSetState(this, partialState);
  }
  beforeUpdate() {
  }
  // TODO updated
  update(props: any) {
    this.__props = props;
    this.props = props;
  }
  // TODO
  forceUpdate() {
  }
  render(): JSX.Element {
    return null;
  }
  destroy() {
    const { container } = this;
    container.clear();
  }
}

// 标识是否是组件
// @ts-ignore
Component.prototype.isF2Component = true;

export default Component;
