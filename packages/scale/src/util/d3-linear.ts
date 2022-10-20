import { ScaleConfig } from '../types';

export default function d3Linear(cfg: ScaleConfig): number[] {
  const { min, max, nice, tickCount } = cfg;
  const linear = new D3Linear();
  linear.domain([min, max]);
  if (nice) {
    linear.nice(tickCount);
  }
  return linear.ticks(tickCount);
}

const DEFAULT_COUNT = 5;
const e10 = Math.sqrt(50);
const e5 = Math.sqrt(10);
const e2 = Math.sqrt(2);

// https://github.com/d3/d3-scale
export class D3Linear {
  private _domain: number[] = [0, 1];

  public domain(domain?: number[]): D3Linear | number[] {
    if (domain) {
      this._domain = Array.from(domain, Number);
      return this;
    }
    return this._domain.slice();
  }

  public nice(count = DEFAULT_COUNT) {
    const d = this._domain.slice();
    let i0 = 0;
    let i1 = this._domain.length - 1;
    let start = this._domain[i0];
    let stop = this._domain[i1];
    let step;

    if (stop < start) {
      [start, stop] = [stop, start];
      [i0, i1] = [i1, i0];
    }
    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      this.domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      this.domain(d);
    }

    return this;
  }

  public ticks(count = DEFAULT_COUNT): number[] {
    return d3ArrayTicks(this._domain[0], this._domain[this._domain.length - 1], count || DEFAULT_COUNT);
  }
}

function d3ArrayTicks(start: number, stop: number, count: number): number[] {
  let reverse;
  let i = -1;
  let n;
  let ticks;
  let step;

  (stop = +stop), (start = +start), (count = +count);
  if (start === stop && count > 0) {
    return [start];
  }
  // tslint:disable-next-line
  if ((reverse = stop < start)) {
    (n = start), (start = stop), (stop = n);
  }
  // tslint:disable-next-line
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) {
    return [];
  }

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));
    while (++i < n) {
      ticks[i] = (start + i) * step;
    }
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array((n = Math.ceil(start - stop + 1)));
    while (++i < n) {
      ticks[i] = (start - i) / step;
    }
  }

  if (reverse) {
    ticks.reverse();
  }

  return ticks;
}

function tickIncrement(start: number, stop: number, count: number): number {
  const step = (stop - start) / Math.max(0, count);
  const power = Math.floor(Math.log(step) / Math.LN10);
  const error = step / Math.pow(10, power);

  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
    : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
