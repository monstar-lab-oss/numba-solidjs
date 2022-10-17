import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import css from "./Checkbox.module.css";

export type Props = {
  color?: Color;
  indeterminate?: boolean;
  label?: string;
  srOnly?: boolean;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["color", "indeterminate", "label"]);
  // let ref: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined =
  //   null;

  // onMount(() => {
  //   ref.indeterminate = !!props.indeterminate;
  // });

  return (
    <div
      class={clsx({
        [css.style]: true,
        // [css.primary]: props.color === "primary",
        // [css.danger]: props.color === "danger",
        // [css.secondary]: props.color === "secondary",
        // [css.primaryOutline]: props.color === "primaryOutline",
        // [css.dangerOutline]: props.color === "dangerOutline",
        // [css.secondaryOutline]: props.color === "secondaryOutline",
      })}
    >
      <input
        id="checkbox"
        type="checkbox"
        class={clsx({
          [css.style]: true,
        })}
        {...attributes}
        // NOTE if I do below it shows error so I use ref
        // indeterminate={!!props.indeterminate}
        ref={(el) => (el.indeterminate = !!props.indeterminate)}
      />
      <label
        for="checkbox"
        class={clsx({
          "sr-only": props.srOnly,
        })}
      >
        {!!props.label ? props.label : "checkbox"}
      </label>
    </div>
  );
};
