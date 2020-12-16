export default (container, style: any, props: any) => {
  container.addShape('rect', {
    attrs: {
      ...style,
    }, 
    ...props,
  });
}