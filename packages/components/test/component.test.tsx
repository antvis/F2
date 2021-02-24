import { Component } from '../src';

describe('Base Component', () => {
  it('Base component', () => {
    // @ts-ignore
    expect(Component.prototype.isF2Component).toBe(true);

    const component = new Component({ a: 1 });
    // @ts-ignore
    component.init({ chart: { b: 2}, container: { c: 3 } });
    expect(component.props).toEqual({ a: 1 });
    expect(component.chart).toEqual({ b: 2 });
    expect(component.container).toEqual({ c: 3 });

    component.update({ c: 3 });
    expect(component.props).toEqual({ c: 3 });
  })
});
