import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "./Checkbox.module.css";

export type CheckBoxColor = "primary" | "danger" | "secondary";

export type Props = {
  // color?: Color;
  // NOTE: in the future we might add color based on types/Colors.
  color?: CheckBoxColor;
  // FIXME: indeterminate must be in HTMLInputElement but we've got error when this component called because it is bug. ref. https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24723#pullrequestreview-111452742
  indeterminate?: boolean;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["color"]);
  return (
    <input
      class={clsx({
        [css.style]: true,
        [css.primary]: props.color === "primary" || !props.color,
        [css.danger]: props.color === "danger",
        [css.secondary]: props.color === "secondary",
        // NOTE: so far we not consider white checkbox.
        // [css.white]: props.color === "white",
        // NOTE: checkbox outline color dose not supported
        // [css.primaryOutline]: props.color === "primaryOutline",
        // [css.dangerOutline]: props.color === "dangerOutline",
        // [css.secondaryOutline]: props.color === "secondaryOutline",
      })}
      type="checkbox"
      {...attributes}
    />
  );
};
