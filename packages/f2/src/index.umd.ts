// umd 文件

import * as FEngine from '@antv/f-engine';

const global =
  typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : self;
// @ts-ignore
global.FEngine = FEngine;

export * from './index';
