export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

export function dashify(str: string): string {
  return str.replace(/([a-zA-Z])(?=[A-Z\d])/g, "$1-").toLowerCase();
}

export const figmaRGBA = ({ r = 0, g = 0, b = 0, a = undefined }) => {
  const color = { r: r / 255, g: g / 255, b: b / 255 };
  return a ? { ...color, a } : color;
};
