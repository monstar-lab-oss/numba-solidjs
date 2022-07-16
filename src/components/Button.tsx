import { splitProps, Component, JSX } from "solid-js";

type Props = {
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);
  return <button {...attributes}>{props.children}</button>;
};
