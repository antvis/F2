const ALIAS_ATTRS_MAP = {
  left: 'x',
  top: 'y',
  width: 'width',
  height: 'height',
  backgroundColor: 'fill',
  font: 'font',
  fontSize: 'fontSize',
  fontFamily: 'fontFamily',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  fontVariant: 'fontVariant',
  color: 'fill',
  textAlign: 'textAlign',
  verticalAlign: 'textBaseline',
  shadow: 'shadow',
  shadowBlur: 'shadowBlur',
  shadowColor: 'shadowColor',
  shadowOffsetX: 'shadowOffsetX',
  shadowOffsetY: 'shadowOffsetY',
  opacity: 'fillOpacity',
  borderColor: 'stroke',
  borderWidth: 'lineWidth',
  borderDash: 'lineDash',
  borderOpacity: 'strokeOpacity',
  radius: 'radius',
};

function pickAttrs(style) {
  if (!style) return null;
  const attrs = {};
  Object.keys(style).forEach((key) => {
    const attrKey = ALIAS_ATTRS_MAP[key];
    if (!attrKey) {
      return;
    }
    attrs[attrKey] = style[key];
  });
  return attrs;
}

export { pickAttrs };
