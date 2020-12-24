const ComponentMap = {};

function register(name: string, ComponentConstructor) {
  ComponentMap[name] = ComponentConstructor;
}

function create(chart, componentSchema) {
  const { name } = componentSchema;
  const ComponentConstructor = ComponentMap[name];
  if (!ComponentConstructor) return;
  return new ComponentConstructor(chart, componentSchema);
}

export default {
  register,
  create,
}