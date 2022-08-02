export function getMissingSerialNumber(arr: number[]) {
  const temp = [...arr];
  temp.sort((a, b) => a - b);

  // TODO: temporal logic, make a simple
  if (!temp.find((x) => x === 1)) return 1;

  const n = temp.find((x, i, a) => Number(x) + 1 !== Number(a[i + 1])) || 0;
  return n + 1;
}
