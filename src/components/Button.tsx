import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";

export type Props = {
  title?: string;
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["title", "children"]);

  return (
    <button
      class="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
      {...attributes}
    >
      {props.children}
    </button>
  );
};
