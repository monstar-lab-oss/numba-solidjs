import { Button } from "@/components/Button";
import { Icon, Props as IconProps } from "@/components/Icon";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";

export type Props = {
  onClick?: () => void;
} & IconProps &
  JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, attributes] = splitProps(props, ["onClick"]);

  return (
    <Button onClick={local.onClick}>
      <Icon {...attributes} />
    </Button>
  );
};
