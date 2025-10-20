import { isFunction } from '@antv/util';
import { jsx } from '@antv/f-engine';

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
          stroke: color,
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
        fill: color,
        fillOpacity: 1,
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
    onClick,
    layoutMode,
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
        const { color, name, value, filtered, tickValue, highlighted } = item;
        const valueText = isFunction(itemFormatter) ? itemFormatter(value, tickValue) : value;
        const highlightStyle = highlighted ? { fill: color, fillOpacity: 0.2, radius: '6px' } : {};
        return (
          <group
            className="legend-item"
            style={{
              ...(layoutMode == 'adaptive' ? {} : { width: itemWidth }),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              //TODO: padding改为’12px‘ 就和原来一致了
              padding: ['6px', '6px', '6px', 0],
              ...(highlighted ? highlightStyle : {}),
              ...itemStyle,
            }}
            data-item={item}
            onClick={onClick}
          >
            {Marker({ color: filtered ? '#bfbfbf' : color, type: item?.marker || marker })}
            {/* <Marker color={filtered ? '#bfbfbf' : color} type={marker} /> */}
            <text
              attrs={{
                fill: filtered ? '#bfbfbf' : '#808080',
                text: name,
                fillOpacity: 1,
                ...nameStyle,
              }}
            />
            {valueText ? (
              <text
                attrs={{
                  fill: '#808080',
                  text: formatValue(valueText, valuePrefix),
                  fillOpacity: 1,
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
