import type { JSX } from "solid-js";
import { Component, splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "@/components/Text.module.css";

export const FONT_SIZES = ["sizeSmall", "sizeMedium", "sizeLarge"] as const;
export const FONT_WEIGHT = [
  "weightRegular",
  "weightMedium",
  "weightBold",
] as const;

export type Props = {
  size?: typeof FONT_SIZES[number];
  weight?: typeof FONT_WEIGHT[number];
  children: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Text: Component<Props> = (props) => {
  const [_, attributes] = splitProps(props, ["size", "weight", "children"]);

  return (
    <div
      class={clsx({
        [css.style]: true,
        [css[props.size ?? "sizeMedium"]]: true,
        [css[props.weight ?? "weightMedium"]]: true,
      })}
      {...attributes}
    >
      {props.children}
    </div>
  );
};
