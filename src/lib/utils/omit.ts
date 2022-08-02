function omit<T extends Record<string, any>>(o: T, keys: Array<keyof T>) {
  return Object.keys(o).reduce((ac, key) => {
    if (keys.includes(key)) return ac;
    return { ...ac, [key]: o[key] };
  }, {});
}
export { omit };
