import { GeometryKind } from './Geometry';

/**
 * 形状。
 */
export const Shape: {
  /**
   * 注册形状。
   *
   * @param geomKind 几何类型
   * @param shapeName 形状名称
   * @param shapeDescriptor 形状描述
   *
   * @todo 细化参数 shapeDescriptor 的类型
   */
  registerShape(
    geomKind: GeometryKind,
    shapeName: string,
    shapeDescriptor: any,
  ): void;
};
