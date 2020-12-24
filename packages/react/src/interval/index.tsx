
export default (props) => {
  const { chart, position } = props;
  const geom = chart.interval();
  geom.position(position);
  console.log('interval props:', props);
  return null;
}

// export default class Interval {
//   render() {
//     return null;
//   }
// }

