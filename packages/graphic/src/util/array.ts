function remove(arr, obj) {
  if (!arr) {
    return;
  }
  const index = arr.indexOf(obj);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

export { remove };
