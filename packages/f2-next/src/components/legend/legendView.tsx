import { jsx } from '../../jsx';

export default props => {
  const { items, layout, position, maxItemWidth, coord } = props;
  const { left, top, right, bottom, width, height } = layout;

  const legendStyle: any = {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: [0, '6px', '20px', 0],
  };

  const isVertical = position === 'left' || position === 'right';

  if (isVertical) {
    legendStyle.width = maxItemWidth;
  }

  if (position === 'left' || position === 'top') {
    legendStyle.top = top;
    legendStyle.left = left;
  }

  if (position === 'right') {
    legendStyle.top = top;
    legendStyle.left = right - maxItemWidth;
  }

  if (position === 'bottom') {
    legendStyle.top = bottom - maxItemWidth;
    legendStyle.left = left;
  }

  return (
    <group style={legendStyle}>
      {items.map(item => {
        const { color, name, value } = item;
        return (
          <group
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: ['6px', 0, 0, '6px'],
            }}
          >
            <circle
              style={{
                width: '20px',
                height: '20px',
                marginRight: '6px',
              }}
              attrs={{
                fill: color,
                r: '6px',
              }}
            />
            <text
              attrs={{
                fill: 'black',
                text: name,
              }}
            />
            {value ? (
              <text
                attrs={{
                  fill: 'black',
                  text: `: ${value}`,
                }}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
