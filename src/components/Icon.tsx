import type { Component, JSX } from "solid-js";
import { lazy } from "solid-js";
import { clsx } from "clsx";
import type { Color } from "@/types/Colors";
import { capitalize } from "../lib/utils/capitalize";
import css from "./Icon.module.css";

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
    () => import(`./Icons/${capitalize(props.name)}.tsx`)
  );
  const adjustPosition = (icon: IconName): string => {
    // FIXME: arrow svg data not in center. So I need adjust in view box.
    if (icon === "arrow") return "0 -2 20 20";

    return "0 0 20 20";
  };
  return (
    // FIXME Need refactor I wanna change button role to ButtonIcon
    <svg
      style={{
        width: props.size || DEFAULT_ICON_SIZE,
        height: props.size || DEFAULT_ICON_SIZE,
      }}
      class={clsx({
        [css.style]: true,
        [css[props.color]]: true,
      })}
      viewBox={adjustPosition(props.name)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <LazyComponent />
    </svg>
  );
};
