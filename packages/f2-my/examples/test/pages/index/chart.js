import { Chart, Interval } from '@antv/f2';
import { jsx as _jsx } from "@antv/f2/jsx-runtime";
export default (props => {
  const {
    data
  } = props;
  return _jsx(Chart, {
    data: data,
    children: _jsx(Interval, {
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
    })
  });
});