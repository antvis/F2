import Component from '../component';

class Coord extends Component {
  chart: any;

  mount() {
    const { chart, props } = this;
    chart.coord(props);
  }
  render() {
    return null;
  }
}

export default Coord;
