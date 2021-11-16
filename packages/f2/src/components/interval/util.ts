function convertToPoints({ xMin, xMax, yMin, yMax }) {
  return [
    { x: xMin, y: yMin }, // tl
    { x: xMax, y: yMin }, // tr
    { x: xMax, y: yMax }, // br
    { x: xMin, y: yMax }, // bl
  ];
}

export { convertToPoints };
