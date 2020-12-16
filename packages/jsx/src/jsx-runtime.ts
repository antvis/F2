// 参考
// - https://www.typescriptlang.org/docs/handbook/compiler-options.html
// - https://mariusschulz.com/blog/per-file-jsx-factories-in-typescript
// - https://www.meziantou.net/write-your-own-dom-element-factory-for-typescript.htm

import JSX from './interface';
import { isArray, batch2hd } from './util';

// 展开数组
function extendArray(arr: any[]) {
  if (!arr) {
    return arr;
  }
  if (!isArray(arr)) {
    return [ arr ];
  }
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (isArray(element)) {
      newArray = newArray.concat(extendArray(element));
    } else {
      newArray.push(element);
    }
  }
  return newArray;
}

function jsx(type: string | Function, props: any, key?: string) {
  const { style, children } = props;
  const stylehd = batch2hd(style);
  const newChildren = extendArray(children);


  return {
    type,
    props,
    style: stylehd,
    children: newChildren
  } as JSX.Element;
}

export {
  jsx,
  jsx as jsxs
};
