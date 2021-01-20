import JSX from './interface';

// 实现jsx-classic 入口
export default function(type: string | Function, config: any, ...children: any[]): JSX.Element {
  const { key, ref, ...props } = config || {};
  if (children.length) {
    props.children = children;
  }
  return {
    key,
    ref,
    type,
    props,
  };
};
