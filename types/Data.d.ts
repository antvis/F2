import { ScaleProps } from './Scale';

/**
 * 数据记录。
 */
export type DataRecord = Record<any, any>;

/**
 * 数据值。
 */
export type DataValue<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> = TRecord[TField];

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
export type DataFieldScale<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> = ScaleProps<TRecord, TField>;

/**
 * 数据记录的度量。
 */
export type DataRecordScale<TRecord extends DataRecord> = {
  [Field in keyof TRecord]?: DataFieldScale<TRecord, Field>;
};
