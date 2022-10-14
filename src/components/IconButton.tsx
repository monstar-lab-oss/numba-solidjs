import { Button, ButtonColor } from "@/components/Button";
import { Icon, IconName } from "@/components/Icon";
import css from "@/components/IconButton.module.css";
import { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";

export type Props = {
  children?: JSX.Element;
  buttonColor?: Color;
  link?: boolean;
  iconName: IconName;
  iconColor: Color;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonConfig = (link?: boolean, color?: Color): ButtonColor => {
  const res = {
    link: link,
    color: color,
  } as ButtonColor;

  if (link) {
    res.color = undefined;
  }

  return res;
};

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, buttonAttributes, iconAttributes] = splitProps(
    props,
    ["children", "link", "buttonColor"],
    ["onClick", "disabled"]
  );

  return (
    <Button
      {...{
        ...buttonAttributes,
        ...getButtonConfig(local.link, local.buttonColor),
      }}
    >
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
