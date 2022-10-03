import { Color } from "@/types/Colors";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { Button, Props as ButtonProps } from "./Button";
import { Icon, Props as IconProps } from "./Icon";

export type Props = {
  children: JSX.Element;
  disabled?: boolean;
  buttonColor?: Color;
  onClick?: () => void;
} & IconProps &
  ButtonProps &
  JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, buttonAttributes, iconAttributes] = splitProps(
    props,
    ["children"],
    ["link", "onClick", "disabled"]
  );

  return (
    <Button {...buttonAttributes} use={props.buttonColor}>
      <div class="flex content-center justify-between space-x-2">
        <div>
          <Icon size={20} {...iconAttributes} />
        </div>
        <div class="self-center">{local.children}</div>
      </div>
    </Button>
  );
};
