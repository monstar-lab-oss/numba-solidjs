import type { Color } from "@/types/Colors";
import type { Component, JSX } from "solid-js";
import { lazy, splitProps } from "solid-js";

export type Icon = "create" | "delete" | "help" | "search" | "textDelete";
export type Props = {
  name: string;
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Icon: Component<Props> = (props) => {
  const [local, attributes] = splitProps(props, ["name"]);
  const LazyComponent = lazy(() => import(`./icons/${local.name}.tsx`));
  return <LazyComponent {...attributes} />;
};
