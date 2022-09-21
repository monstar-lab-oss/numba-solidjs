import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import css from "./Icon.module.css";

export type Props = {
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const TextDelete: Component<Props> = (props) => {
  const DEFAULT_SIZE = 24;
  return (
    <a onClick={props.onClick} role="button">
      <svg
        style={{
          width: props.size || DEFAULT_SIZE,
          height: props.size || DEFAULT_SIZE,
        }}
        class={clsx({
          [css.style]: true,
          [css.disabled]: props.color === "disabled",
          [css.primary]: props.color === "primary",
          [css.danger]: props.color === "danger",
          [css.secondary]: props.color === "secondary",
          [css.primaryOutline]: props.color === "primaryOutline",
          [css.dangerOutline]: props.color === "dangerOutline",
          [css.secondaryOutline]: props.color === "secondaryOutline",
        })}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z"
        />
      </svg>
    </a>
  );
};
