import css from "@/components/Icon.module.css";
import { capitalize } from "@/lib/utils/capitalize";
import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { lazy } from "solid-js";

export const ICON_NAMES = [
  "create",
  "delete",
  "help",
  "search",
  "textDelete",
  "arrow",
] as const;

export type IconName = typeof ICON_NAMES[number];

export type Props = {
  name: IconName;
  color: Color;
  size?: number;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 24;

export const Icon: Component<Props> = (props) => {
  const LazyComponent = lazy(
    () => import(`@/components/Icons/${capitalize(props.name)}.tsx`)
  );
  return (
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
        // FIXME this is for IconButton Component so we need handle the color inside of IconButton
        [css.white]: props.color === "white",
        [css.primaryOutline]: props.color === "primaryOutline",
        [css.dangerOutline]: props.color === "dangerOutline",
        [css.secondaryOutline]: props.color === "secondaryOutline",
      })}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <LazyComponent />
    </svg>
  );
};
