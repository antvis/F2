import { isFunction } from '@antv/util';
import { jsx } from '../../jsx';

const Marker = ({ type, color }) => {
  if (type === 'square') {
    return (
      <rect
        style={{
          width: '12px',
          height: '12px',
          marginRight: '10px',
        }}
        attrs={{
          fill: color,
        }}
      />
    );
  }
  return (
    <circle
      style={{
        width: '12px',
        height: '12px',
        marginRight: '10px',
      }}
      attrs={{
        fill: color,
      }}
    />
  );
};

export default (props) => {
  const {
    items,
    itemWidth,
    itemFormatter,
    style,
    marker = 'circle', // 图例标记默认为 circle
    nameStyle,
    valueStyle,
  } = props;

  const formatValue = (value) => {
    if (isFunction(itemFormatter)) {
      return `: ${itemFormatter(value)}`;
    }
    return `: ${value}`;
  };

  return (
    <group style={style}>
      {items.map((item) => {
        const { color, name, value, filtered } = item;
        return (
          <group
            className="legend-item"
            style={{
              width: itemWidth,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: ['6px', '6px', '6px', 0],
            }}
            data-item={item}
          >
            <Marker color={filtered ? '#bfbfbf' : color} type={marker} />
            <text
              attrs={{
                fill: filtered ? '#bfbfbf' : '#808080',
                text: name,
                ...nameStyle,
              }}
            />
            {value ? (
              <text
                attrs={{
                  fill: '#808080',
                  text: formatValue(value),
                  ...valueStyle,
                }}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
