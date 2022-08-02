export function figmaRGBA(rgba: {
  // TODO: use spread operator
  // e.g export const figmaRGBA = ({ r = 0, g = 0, b = 0, a = undefined }) => {
  //   const color = { r: r / 255, g: g / 255, b: b / 255 };
  //   return a ? { ...color, a } : color
  // }
  r: number;
  g: number;
  b: number;
  a?: number;
}) {
  const color = { r: rgba.r / 255, g: rgba.g / 255, b: rgba.b / 255 };
  return color;
}
