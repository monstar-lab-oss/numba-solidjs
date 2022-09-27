import type { Color } from "@/types/Colors";
import type { Component, JSX } from "solid-js";
import { lazy, splitProps } from "solid-js";
import { capitalize } from "../lib/utils/capitalize";

export const ICON_NAMES = [
  "create",
  "delete",
  "help",
  "search",
  "textDelete",
] as const;

export type Icon = typeof ICON_NAMES[number];

export type Props = {
  name: string;
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Icon: Component<Props> = (props) => {
  const [local, attributes] = splitProps(props, ["name"]);

  const LazyComponent = lazy(
    () => import(`./icons/${capitalize(local.name)}.tsx`)
  );

  return <LazyComponent {...attributes} />;
};
