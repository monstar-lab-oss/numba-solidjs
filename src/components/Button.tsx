import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import css from "./Button.module.css";

export type Props = {
  color?: Color;
  link?: boolean;
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonColor = (props: Props) => {
  if (props.disabled) return "coloredDisabled";
  return props.color || "";
};

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["color", "children"]);

  return (
    <button
      class={clsx({
        [css.style]: true,
        [css.link]: props.link,
        [css.disabled]: props.disabled,
        [css[getButtonColor(props)]]: true,
      })}
      {...attributes}
    >
      {props.children}
    </button>
  );
};
