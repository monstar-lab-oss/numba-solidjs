import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Pannel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, []);
  return (
    <div class={clsx({ "flex-1 p-4 first:border-r": true })} {...attributes}>
      {props.children}
    </div>
  );
};
