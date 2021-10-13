function createUpdater(canvas) {
  const setStateQueue = [];
  const renderQueue = [];

  function process() {
    let item;
    let component;
    let shouldRender = false;
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

    while ((component = renderQueue.shift())) {
      component.__shouldRender = true;
      component.render();
      shouldRender = true;
    }

    if (shouldRender) {
      canvas.draw();
    }
  }

  function enqueueSetState(component, state) {
    if (setStateQueue.length === 0) {
      setTimeout(process, 0);
    }
    setStateQueue.push({
      component,
      state,
    });
    if (renderQueue.indexOf(component) < 0) {
      renderQueue.push(component);
    }
  }

  const updater = {
    // isMounted: function(publicInstance) {
    //   return false;
    // },
    // enqueueForceUpdate: function(publicInstance) {
    // },
    // enqueueReplaceState: function(publicInstance, completeState) {
    // },
    enqueueSetState,
  };

  return updater;
}

export { createUpdater };
