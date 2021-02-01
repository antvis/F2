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
}

export default (type: string, layout) => {
  const fn = map[type] || rect;
  return fn(layout);
}
