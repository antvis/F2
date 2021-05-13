import Layout from '../canvas/layout';

class Component {
  container: any;
  props: any;
  layout: Layout;

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

  // TODO for TypeScript
  state: any;
  context: any;
  refs: {
    [key: string]: any;
  }

  constructor(props: any) {
    const { animate } = props;
    this.__props = props;
    this.props = props;
    this.animate = animate;
  }
  init({ container, layout }) {
    this.layout = layout;
    this.container = container;
  }
  willMount() {
  }
  mount() {
  }
  // TODO
  setState() {
  }
  update(props: any) {
    this.__props = props;
    this.props = props;
    this.__isDirty = true;
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
