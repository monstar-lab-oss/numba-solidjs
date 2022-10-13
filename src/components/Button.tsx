import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import type { Color } from "@/types/Colors";
import css from "./Button.module.css";

type Link = {
  link: true;
  color?: undefined;
};

type Colored = {
  link?: false;
  color: Color;
};

export type ButtonColor = Link | Colored;

export type Props = {
  children: JSX.Element;
} & ButtonColor &
  JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonColor = (props: Props) => {
  if (!props.link && props.disabled) return "coloredDisabled";

  // NOTE: for now you can't choose the color when link is true
  if (props.link) return "";

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
