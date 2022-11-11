export interface AdjustCfg {
  readonly adjustNames?: string[];
  readonly xField?: string;
  readonly yField?: string;

  readonly dodgeBy?: string;
  readonly marginRatio?: number;
  readonly dodgeRatio?: number;

  readonly size?: number;
  readonly height?: number;
  readonly reverseOrder?: boolean;
}

export interface DodgeCfg {
  readonly adjustNames?: string[];
  readonly xField: string;
  readonly yField?: string;
  readonly marginRatio?: number;
  readonly dodgeRatio?: number;
  readonly dodgeBy?: string;
  readonly intervalPadding?: number;
  readonly dodgePadding?: number;
  readonly xDimensionLength?: number;
  readonly groupNum?: number;
  readonly defaultSize?: number;
  readonly maxColumnWidth?: number;
  readonly minColumnWidth?: number;
  readonly columnWidthRatio?: number;
  readonly customOffset?: ((data: any, range: any) => number) | number;
}

export interface StackCfg {
  readonly adjustNames?: string[];
  readonly xField: string;
  readonly yField?: string;

  readonly height?: number;
  readonly size?: number;
  readonly reverseOrder?: boolean;
}

export interface Data {
  [key: string]: any;
}

export interface Range {
  pre: number;
  next: number;
}
