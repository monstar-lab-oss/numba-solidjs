import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";

export type Props = {
  title: string;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export const Button: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["title"]);

  return (
    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      {...attributes}
    >
      {props.title}
    </button>
  );
};
