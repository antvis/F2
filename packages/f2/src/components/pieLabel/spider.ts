export const adjustPosition = (half, showSide, props, labelWidth) => {
  const { coord, sidePadding, adjustOffset } = props;
  const { left: coordLeft, right: coordRight } = coord;
  const labels = [];
  let lastY = 0;
  let delta;

  half.forEach((label) => {
    const { anchor, inflection, y, height } = label;

    const points = [anchor, inflection];
    const endX = showSide === 'left' ? coordLeft + sidePadding : coordRight - sidePadding;
    let endY = y;

    delta = y - lastY - (lastY === 0 ? 0.5 * height : height);

    if (delta < 0) {
      // 文本调整下去了 需要添加折线
      endY = y - delta;
      const point2 = {
        x:
          showSide === 'left' ? endX + labelWidth + adjustOffset : endX - labelWidth - adjustOffset,
        y: inflection.y,
      };
      const point3 = {
        x: showSide === 'left' ? endX + labelWidth : endX - labelWidth,
        y: endY,
      };

      if (
        Math.abs(delta) < height * props.adjustRatio ||
        (showSide === 'right' && point2.x < inflection.x) ||
        (showSide === 'left' && point2.x > inflection.x)
      ) {
        // 根据锚点位置计算拐点
        const bendPoint = {
          x: anchor.x + (point3.x - anchor.x) * 0.5,
          y: endY,
        };
        points[1] = bendPoint;
      } else {
        points.push(point2);
        points.push(point3);
      }
    }
    // 文本结束点
    const labelEnd = { x: endX, y: endY };
    lastY = delta < 0 ? y - delta : y;

    points.push(labelEnd);

    label.points = points;
    label.side = showSide;

    labels.push(label);
  });
  return labels;
};
