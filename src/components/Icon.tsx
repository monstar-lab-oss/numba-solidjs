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
  "arrowLeft",
  "arrowLeftNUMBA",
  "arrowRight",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export type Props = {
  name: IconName;
  color: Color;
  size?: number;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 20;

export const Icon: Component<Props> = (props) => {
  const LazyComponent = lazy(
    () => import(`./Icons/${capitalize(props.name)}.tsx`)
  );
  return (
    // FIXME Need refactor I wanna change button role to ButtonIcon
    <svg
      style={{
        width: `${props.size || DEFAULT_ICON_SIZE}`,
        height: `${props.size || DEFAULT_ICON_SIZE}`,
      }}
      class={clsx({
        [css.style]: true,
        [css[props.color]]: true,
      })}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <LazyComponent />
    </svg>
  );
};
