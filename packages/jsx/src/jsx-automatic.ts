import JSX from './interface';

// 实现jsx-runtime 入口
export default function(type: string | Function, config: any, key?: string): JSX.Element {
  const { ref, ...props } = config || {};
  return {
    key,
    ref,
    type,
    props,
  };
};
