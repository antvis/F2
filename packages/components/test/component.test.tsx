import Component from '../src/component';

describe('Base Component', () => {
  it('Base component', () => {
    // @ts-ignore
    expect(Component.prototype.isF2Component).toBe(true);

    const component = new Component({ a: 1 }, { b: 2 });
    expect(component.props).toEqual({ a: 1 });
    expect(component.chart).toEqual({ b: 2 });

    component.update({ c: 3 });
    expect(component.props).toEqual({ c: 3 });
  })
});
