import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "./Button.module.css";

export type Props = {
  use?: "primary" | "danger" | "danger";
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["use", "children"]);

  return (
    <button
      class={clsx({
        [css.style]: true,
        [css.primary]: props.use === "primary",
        [css.danger]: props.use === "danger",
        [css.disabled]: props.disabled,
      })}
      {...attributes}
    >
      {props.children}
    </button>
  );
};
