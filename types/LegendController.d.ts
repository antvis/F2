import { LegendParams, LegendItem } from './Legend';
import { SetRequired } from 'type-fest';

export interface LegendControllerLegend extends SetRequired<LegendParams> {
  moveTo(x: number, y: number): void;
  setItems(items: LegendItem[]): void;
  setTitle(title: string | number): void;
  clearItems(): void;
  getWidth(): number;
  getHeight(): number;
  show(): void;
  hide(): void;
  clear(): void;
}

export type LegendControllerLegends = {
  [Position in Exclude<
    LegendParams['position'],
    undefined
  >]?: LegendControllerLegend[];
};

export interface LegendController {
  legends: LegendControllerLegends;
}
