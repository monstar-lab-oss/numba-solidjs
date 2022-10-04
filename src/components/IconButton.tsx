import { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Button } from "./Button";
import { Icon, IconColor, IconName } from "./Icon";
import css from "./IconButton.module.css";

export type Props = {
  children?: JSX.Element;
  buttonColor?: Color;
  link?: boolean;
  iconName: IconName;
  iconColor: IconColor;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, buttonAttributes, iconAttributes] = splitProps(
    props,
    ["children"],
    ["link", "onClick", "disabled"]
  );

  return (
    <Button {...buttonAttributes} use={props.buttonColor}>
      <div class={clsx({ [css.style]: true })}>
        <div>
          <Icon
            size={20}
            name={iconAttributes.iconName}
            color={iconAttributes.iconColor}
          />
        </div>
        <Show when={!!local.children}>
          <div class={clsx({ [css.text]: true })}>{local.children}</div>
        </Show>
      </div>
    </Button>
  );
};
