import { ScaleProps } from './Scale';

/**
 * 数据记录。
 */
export type DataRecord = Record<any, any>;

/**
 * 数据字段。
 */
export type DataField<TRecord extends DataRecord> = keyof TRecord;

/**
 * 数据。
 */
export type Data<TRecord extends DataRecord> = TRecord[];

/**
 * 数据字段的度量。
 */
export type DataFieldScale = ScaleProps;

/**
 * 数据记录的度量。
 */
export type DataRecordScale<TRecord extends DataRecord> = Partial<
  Record<DataField<TRecord>, DataFieldScale>
>;
