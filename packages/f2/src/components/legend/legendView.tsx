import { isFunction, mix } from '@antv/util';
import { jsx } from '../../jsx';

const Marker = ({ type, color }) => {
  if (type === 'square') {
    return (
      <rect
        style={{
          width: '20px',
          height: '20px',
          marginRight: '6px',
          marginTop: '6px',
        }}
        attrs={{
          fill: color,
          width: '14px',
          height: '14px',
        }}
      />
    );
  }
  return (
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
  );
};

export default (props) => {
  const {
    items,
    layout,
    position,
    maxItemWidth,
    coord,
    itemFormatter,
    style,
    marker = 'circle', // 图例标记默认为 circle
  } = props;
  const { left, top, right, bottom, width, height } = layout;

  const legendStyle = {
    // default style
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: [0, '6px', '20px', 0],
    justifyContent: 'center',
    // custom style
    ...style,
  };

  const isVertical = position === 'left' || position === 'right';

  const formatValue = (value) => {
    if (isFunction(itemFormatter)) {
      return `: ${itemFormatter(value)}`;
    }
    return `: ${value}`;
  };

  if (isVertical) {
    legendStyle.width = maxItemWidth;
    legendStyle.flexDirection = 'column';
    legendStyle.alignItems = 'flex-start';
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
      {items.map((item) => {
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
            <Marker color={color} type={marker} />
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
                  text: formatValue(value),
                }}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
