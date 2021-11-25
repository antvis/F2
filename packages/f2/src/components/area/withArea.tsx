import withLine from '../line/withLine';

export default (View) => {
  return class Area extends withLine(View) {
    getDefaultCfg() {
      return {
        geomType: 'area',
        // 面积图默认设为从0开始
        startOnZero: true,
        // 点需要排序
        sortable: true,
      };
    }

    mapping() {
      const records = super.mapping();
      // 坐标轴 y0
      const y0 = this.getY0Value();
      const { props, startOnZero: defaultStartOnZero } = this;
      const { coord, startOnZero = defaultStartOnZero } = props;
      let baseY = coord.y[0];
      if (startOnZero) {
        // 零点映射到绝对坐标
        const originCoord = coord.convertPoint({ x: 0, y: y0 });
        baseY = originCoord.y;
      }

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { points, bottomPoints } = child;

          if (bottomPoints && bottomPoints.length) {
            bottomPoints.reverse();
            child.points = points.concat(bottomPoints);
          } else {
            points.push({ x: points[points.length - 1].x, y: baseY });
            points.push({ x: points[0].x, y: baseY });
          }
        }
      }
      return records;
    }
  };
};
