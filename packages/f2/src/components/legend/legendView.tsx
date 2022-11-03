import { isFunction } from '@antv/util';
import { jsx } from '../../index';

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
    valuePrefix,
  } = props;

  const formatValue = (value, valuePrefix = ': ') => {
    return `${valuePrefix}${value}`;
  };

  return (
    <group
      style={{
        display: 'flex',
        ...style,
      }}
    >
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
              //TODO: padding改为’12px‘ 就和原来一致了
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
