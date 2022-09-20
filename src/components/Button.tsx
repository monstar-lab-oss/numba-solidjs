import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "./Button.module.css";
import type { Color } from "@/types/Colors";

export type Props = {
  use?: Color;
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
        [css.secondary]: props.use === "secondary",
        [css.primaryOutline]: props.use === "primaryOutline",
        [css.dangerOutline]: props.use === "dangerOutline",
        [css.secondaryOutline]: props.use === "secondaryOutline",
      })}
      {...attributes}
    >
      {props.children}
    </button>
  );
};
