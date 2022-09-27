import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { JSX } from "solid-js";
import { DEFAULT_ICON_SIZE } from "./constants";
import css from "./base.module.css";

export type Props = {
  icon: "create" | "delete" | "textDelete" | "help" | "search";
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default (props: Props) => {
  return (
    <a onClick={props.onClick} role="button">
      <svg
        style={{
          width: props.size || DEFAULT_ICON_SIZE,
          height: props.size || DEFAULT_ICON_SIZE,
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
          d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
        />
      </svg>
    </a>
  );
};
