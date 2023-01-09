import { mount } from '@vue/test-utils';

const createContext = (app: unknown, title = '', { width = 300, height = 225 } = {}) =>
  mount(app, {
    attrs: {
      title,
      width,
      height,
    },
  })
    .find('canvas')
    .element.getContext('2d');

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export { createContext, delay };
