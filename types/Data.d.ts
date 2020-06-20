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
