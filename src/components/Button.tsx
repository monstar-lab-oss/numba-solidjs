import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";

export type Props = {
  use?: "primary" | "danger" | "danger";
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["use", "children"]);

  return (
    <button
      class={clsx({
        "whitespace-no-wrap inline-flex h-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white px-4 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50 focus:shadow-none focus:outline-none":
          true,
        "cursor-not-allowed opacity-40": props.disabled,
        "border-blue-500 bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600":
          props.use === "primary",
        "border-red-500 bg-red-500 text-white hover:border-red-600 hover:bg-red-600":
          props.use === "danger",
      })}
      {...attributes}
    >
      {props.children}
    </button>
  );
};
