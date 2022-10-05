import { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Button } from "./Button";
import { Icon, IconColor, IconName } from "./Icon";
import css from "./IconButton.module.css";

export type Props = {
  children?: JSX.Element;
  disabled?: boolean;
  buttonColor?: Color;
  onClick?: ((e: MouseEvent) => void) | (() => void);
  link?: boolean;
  iconName: IconName;
  IconColor: IconColor;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, buttonAttributes, iconAttributes] = splitProps(
    props,
    ["children"],
    ["link", "onClick", "disabled"]
  );

  return (
    <Button {...buttonAttributes} color={props.buttonColor}>
      <div class={clsx({ [css.style]: true })}>
        <div>
          <Icon
            size={20}
            name={iconAttributes.iconName}
            color={iconAttributes.IconColor}
          />
        </div>
        <Show when={!!local.children}>
          <div class={clsx({ [css.text]: true })}>{local.children}</div>
        </Show>
      </div>
    </Button>
  );
};
