const createContext = (title = '') => {
  const canvasEl = document.createElement('canvas');
  const titleEl = document.createElement('p');
  titleEl.innerText = title + ':';
  titleEl.style.fontSize = '12px';
  canvasEl.style.width = '200px';
  canvasEl.style.height = '150px';
  document.body.appendChild(titleEl);
  document.body.appendChild(canvasEl);
  const context = canvasEl.getContext('2d');
  return context;
};

export { createContext };
