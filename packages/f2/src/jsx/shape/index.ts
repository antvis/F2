import rect from './rect';
import line from './line';
import text from './text';
import circle from './circle';
import marker from './marker';

const map = {
  rect,
  line,
  text,
  circle,
  marker,
  group: rect,
};

export default (type: string, layout) => {
  if (!layout) return null;
  const fn = map[type] || rect;
  return fn(layout);
};
