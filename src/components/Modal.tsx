import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import css from "./Modal.module.css";

export type Props = {
  children: JSX.Element;
};

export const Modal: Component<Props> = (props) => {
  return (
    <div class={clsx({ [css.style]: true })}>
      <div class={clsx({ [css.inner]: true })}>{props.children}</div>
    </div>
  );
};
