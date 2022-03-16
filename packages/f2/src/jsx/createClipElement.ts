import { upperFirst } from '@antv/util';
import { Shape } from '@antv/f2-graphic';

function createClipElement(type: string, config) {
  return new Shape[upperFirst(type)](config);
}

export default createClipElement;
