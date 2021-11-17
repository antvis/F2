import { isFunction, mix } from '@antv/util';
import { jsx } from '../../../jsx';
import { getMiddlePoint } from '../../../util/coord';

const DEFAULT_LABEL_CFG = {
  textBaseline: 'middle',
  fill: '#808080',
};

export default function LabelView(props) {
  const { record, offsetX, offsetY, points, label, guide } = props;
  const { origin, color } = record;

  let labelAttrs, guideAttrs;
  if (isFunction(label)) {
    const point = getMiddlePoint(points[1], points[2]);
    labelAttrs = mix(
      {
        x: point.x + offsetX,
        y: point.y + offsetY,
      },
      DEFAULT_LABEL_CFG,
      label(origin, color)
    );
  }

  if (isFunction(guide)) {
    const point = getMiddlePoint(
      getMiddlePoint(points[0], points[1]),
      getMiddlePoint(points[2], points[3] ?? points[2])
    );
    guideAttrs = mix(
      {
        x: point.x,
        y: point.y,
        textBaseline: 'middle',
        textAlign: 'center',
      },
      DEFAULT_LABEL_CFG,
      guide(origin, color)
    );
  }

  return (
    <group>
      {labelAttrs && <text attrs={labelAttrs} />}
      {guideAttrs && <text attrs={guideAttrs} />}
    </group>
  );
}
