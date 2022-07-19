export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

export function dashify(str: string): string {
  return str.replace(/([a-zA-Z])(?=[A-Z\d])/g, "$1-").toLowerCase();
}
// TODO: use spread operator
// e.g export const figmaRGBA = ({ r = 0, g = 0, b = 0, a = undefined }) => {
//   const color = { r: r / 255, g: g / 255, b: b / 255 };
//   return a ? { ...color, a } : color
// }
export const figmaRGBA = (rgba: {
  r: number;
  g: number;
  b: number;
  a?: number;
}) => {
  const color = { r: rgba.r / 255, g: rgba.g / 255, b: rgba.b / 255 };
  return color;
};
