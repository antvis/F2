// @ts-nocheck
import F2 from '@antv/f2';
import ComponentFactory from './componentFactory';
import { render } from '../../jsx/src/index';

class Chart extends F2.Chart {
  constructor(config, components?: any[]) {
    super(config);
    this.set('components', components);
  }

  init() {
    super.init();
    // 1. 实例化组件
    this._initComponent();

    this.on('aftergeomdraw', () => {
      const { components } = this;

      
      for (let i = 0, len = components.length; i < len; i++) {
        const component = components[i];
        render(component.render(), component.container);
      }

      console.log(this);
    })
  }

  _initComponent() {
    const componentsSchema = this.get('components');
    const canvas = this.get('canvas');
    const components = componentsSchema.map(schema => {
      const component = ComponentFactory.create(this, schema);
      component.setState = function(state) {
        component.state = state;
        component.container.clear();
        render(component.render(), component.container);
        canvas.draw();
      }
      return component;
    }).filter(component => !!component);
    this.components = components;
  }


}

export default Chart;
