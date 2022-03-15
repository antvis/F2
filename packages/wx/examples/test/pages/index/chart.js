import { Chart, Interval, Axis } from '@antv/f2';
import { jsx as _jsx } from "@antv/f2/jsx-runtime";
import { jsxs as _jsxs } from "@antv/f2/jsx-runtime";
export default (props => {
  const {
    data
  } = props;
  return _jsxs(Chart, {
    data: data,
    children: [_jsx(Axis, {
      field: "genre"
    }), _jsx(Axis, {
      field: "sold"
    }), _jsx(Interval, {
      x: "genre",
      y: "sold",
      color: "genre",
      selection: {
        selectedStyle: {
          fillOpacity: 1
        },
        unSelectedStyle: {
          fillOpacity: 0.4
        }
      }
    })]
  });
});