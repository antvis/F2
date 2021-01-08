function create(chart: any, componentsSchema: any[]) {
  const components = componentsSchema.map((item) => {
    const { type, props } = item;
    // 实例化组件
    const component = new type(props, chart);
    return component;
  });
  return components;
}

export default {
  create,
}