import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { JSX } from "solid-js";
import { DEFAULT_ICON_SIZE } from "./constants";
import css from "./base.module.css";

export type Props = {
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
          d="M10.0002 7C9.6313 7 9.30776 7.19922 9.13335 7.50073C8.85681 7.97879 8.24508 8.14215 7.76702 7.86561C7.28896 7.58906 7.1256 6.97733 7.40214 6.49927C7.91934 5.60518 8.8885 5 10.0002 5C11.657 5 13.0002 6.34315 13.0002 8C13.0002 9.30622 12.1654 10.4175 11.0002 10.8293V11C11.0002 11.5523 10.5525 12 10.0002 12C9.4479 12 9.00018 11.5523 9.00018 11V10C9.00018 9.44772 9.4479 9 10.0002 9C10.5525 9 11.0002 8.55228 11.0002 8C11.0002 7.44772 10.5525 7 10.0002 7ZM10.0002 15C10.5525 15 11.0002 14.5523 11.0002 14C11.0002 13.4477 10.5525 13 10.0002 13C9.44788 13 9.00017 13.4477 9.00017 14C9.00017 14.5523 9.44788 15 10.0002 15Z"
        />
      </svg>
    </a>
  );
};
