function createUpdater(canvas) {
  const setStateQueue = [];
  const renderQueue = [];

  function process() {
    let item;
    let component;
    while ((item = setStateQueue.shift())) {
      const { state, component } = item;

      // 如果没有prevState，则将当前的state作为初始的prevState
      if (!component.prevState) {
        component.prevState = Object.assign({}, component.state);
      }

      // 如果stateChange是一个方法，也就是setState的第二种形式
      if (typeof state === 'function') {
        Object.assign(
          component.state,
          state(component.prevState, component.props)
        );
      } else {
        // 如果stateChange是一个对象，则直接合并到setState中
        Object.assign(component.state, state);
      }

      component.prevState = component.state;
    }
    console.log(renderQueue);
    const renderComponents = [].concat(renderQueue);
    canvas.renderComponents(renderComponents);
    // 清空
    renderQueue.length = 0;
  }

  function enqueueSetState(component, state) {
    if (setStateQueue.length === 0) {
      setTimeout(process, 0);
    }
    setStateQueue.push({
      component,
      state
    });
    if (renderQueue.indexOf(component) < 0) {
      renderQueue.push(component);
    }
  }

  const updater = {
    // isMounted: function(publicInstance) {
    //   return false;
    // },
    enqueueForceUpdate: enqueueSetState,
    // enqueueReplaceState: function(publicInstance, completeState) {
    // },
    enqueueSetState
  };

  return updater;
}

export { createUpdater };
