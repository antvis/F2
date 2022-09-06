import * as F2 from '@antv/f2';
import { toRawView } from './util';

export const withLine = (View: Function) => F2.withLine(toRawView(View));
export const withArea = (View: Function) => F2.withArea(toRawView(View));
export const withInterval = (View: Function) => F2.withInterval(toRawView(View));
export const withPoint = (View: Function) => F2.withPoint(toRawView(View));
export const withAxis = (View: Function) => F2.withAxis(toRawView(View));
export const withLegend = (View: Function) => F2.withLegend(toRawView(View));
export const withGuide = (View: Function) => F2.withGuide(toRawView(View));
export const withTooltip = (View: Function) => F2.withTooltip(toRawView(View));
export const withTreemap = (View: Function) => F2.withTreemap(toRawView(View));
export const withSunburst = (View: Function) => F2.withSunburst(toRawView(View));
export const withPieLabel = (View: Function) => F2.withPieLabel(toRawView(View));
export const withGauge = (View: Function) => F2.withGauge(toRawView(View));
export const withScrollBar = (View: Function) => F2.withScrollBar(toRawView(View));
