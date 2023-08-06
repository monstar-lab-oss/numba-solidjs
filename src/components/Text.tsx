import type { JSX } from "solid-js";
import { Component, splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "@/components/Text.module.css";

export const FONT_COLOR = ["primary", "darkGray"] as const;
export const FONT_SIZES = ["sizeSmall", "sizeMedium", "sizeLarge"] as const;
export const FONT_WEIGHT = [
  "weightRegular",
  "weightMedium",
  "weightBold",
] as const;

export type Props = {
  size?: (typeof FONT_SIZES)[number];
  weight?: (typeof FONT_WEIGHT)[number];
  color?: (typeof FONT_COLOR)[number];
  children: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Text: Component<Props> = (props) => {
  const [_, attributes] = splitProps(props, [
    "size",
    "weight",
    "children",
    "color",
    "class",
  ]);

  return (
    <div
      class={clsx({
        [css[props.size ?? ""]]: true,
        [css[props.weight ?? ""]]: true,
        [css[props.color ?? ""]]: true,
        [props.class || ""]: true,
      })}
      {...attributes}
    >
      {props.children}
    </div>
  );
};
