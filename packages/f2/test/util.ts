const createContext = (
  title = '',
  { height = '225px', width = '300px' }: any = {}
) => {
  const canvasEl = document.createElement('canvas');
  const titleEl = document.createElement('p');
  titleEl.innerText = title + ':';
  titleEl.style.fontSize = '12px';
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  document.body.appendChild(titleEl);
  document.body.appendChild(canvasEl);
  const context = canvasEl.getContext('2d');
  return context;
};

export { createContext };
