const createContext = () => {
  const canvasEl = document.createElement('canvas');
  canvasEl.style.width = '359px';
  canvasEl.style.height = '400px';
  document.body.appendChild(canvasEl);
  const context = canvasEl.getContext('2d');
  return context;
}

export { createContext };