import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import css from "./Button.module.css";

export type Props = {
  // NOTE Changing the name of argument to `color` could be better than current name of argument `use`.
  use?: Color;
  link?: boolean;
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["use", "children"]);

  return (
    <button
      class={clsx({
        [css.style]: true,
        [css.link]: props.link,
        [css.disabled]: props.disabled,
        [css.coloredDisabled]: !props.link && props.disabled,
        [css.primary]: !props.disabled && props.use === "primary",
        [css.danger]: !props.disabled && props.use === "danger",
        [css.secondary]: !props.disabled && props.use === "secondary",
        [css.primaryOutline]: !props.disabled && props.use === "primaryOutline",
        [css.dangerOutline]: !props.disabled && props.use === "dangerOutline",
        [css.secondaryOutline]:
          !props.disabled && props.use === "secondaryOutline",
      })}
      {...attributes}
    >
      {props.children}
    </button>
  );
};
