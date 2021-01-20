
import { render, renderJSXElement, jsx, Fragment } from '../src';

describe('index', () => {
  it('index', () => {
    expect(!!render).toBe(true);
    expect(!!renderJSXElement).toBe(true);
    expect(!!jsx).toBe(true);
    expect(!!Fragment).toBe(true);
  })
});
