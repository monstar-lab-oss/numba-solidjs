import type { Component, JSX } from "solid-js";
import { clsx } from "clsx";
import css from "./Modal.module.css";

export type Props = {
  children: JSX.Element;
  bgColor?: "transparent" | "white";
};

export const Modal: Component<Props> = (props) => {
  return (
    <div
      class={clsx({
        [css.style]: true,
        [css[props.bgColor || "transparent"]]: true,
      })}
    >
      <div class={clsx({ [css.inner]: true })}>{props.children}</div>
    </div>
  );
};
