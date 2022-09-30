import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { lazy } from "solid-js";
import { capitalize } from "../lib/utils/capitalize";
import css from "./Icon.module.css";

export const ICON_NAMES = [
  "create",
  "delete",
  "help",
  "search",
  "textDelete",
] as const;

export type Icon = typeof ICON_NAMES[number];

export type Props = {
  name: "create" | "delete" | "textDelete" | "help" | "search";
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 24;

export const Icon: Component<Props> = (props) => {
  const LazyComponent = lazy(
    () => import(`./Icons/${capitalize(props.name)}.tsx`)
  );

  return (
    // FIXME Need refactor I wanna change button role to ButtonIcon
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
        <LazyComponent />;
      </svg>
    </a>
  );
};
