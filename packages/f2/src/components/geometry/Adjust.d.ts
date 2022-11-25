/**
 * 几何标记对象的数据调整类型。
 */
export type AdjustType =
  // 堆叠
  | 'stack'
  // 分组
  | 'dodge'
  // 对称
  | 'symmetric';

export interface AdjustCommonProps<TAdjustType extends AdjustType> {
  /**
   * 调整类型。
   */
  type: TAdjustType;

  readonly adjustNames?: string[];
  readonly xField?: string;
  readonly yField?: string;
}

export type StackAdjustProps = AdjustCommonProps<'stack'>;

export interface DodgeAdjustProps extends AdjustCommonProps<'dodge'> {
  readonly marginRatio?: number;
  readonly dodgeRatio?: number;
}

export type SymmetricAdjustProps = AdjustCommonProps<'symmetric'>;

export type AdjustProps = StackAdjustProps | DodgeAdjustProps | SymmetricAdjustProps;
