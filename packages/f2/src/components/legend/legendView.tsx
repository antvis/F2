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
  if (type === 'line') {
    return (
      <line
        style={{
          width: '19px',
          marginRight: '10px',
        }}
        attrs={{
          strokeStyle: color,
          lineCap: 'round',
          lineWidth: '4px',
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
    itemStyle,
    nameStyle,
    valueStyle,
    valuePrefix,
  } = props;

  const formatValue = (value, valuePrefix = ': ') => {
    return `${valuePrefix}${value}`;
  };

  return (
    <group style={style}>
      {items.map((item) => {
        const { color, name, value, filtered, tickValue } = item;
        const valueText = isFunction(itemFormatter) ? itemFormatter(value, tickValue) : value;
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
              ...itemStyle,
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
            {valueText ? (
              <text
                attrs={{
                  fill: '#808080',
                  text: formatValue(valueText, valuePrefix),
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
