declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png";

declare const __APP_VERSION__: string;
