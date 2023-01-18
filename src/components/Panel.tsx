import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "./Panel.module.css";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Panel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, []);
  return (
    <div class={clsx({ [css.style]: true })} {...attributes}>
      {props.children}
    </div>
  );
};
