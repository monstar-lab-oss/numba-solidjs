import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { IconButton } from "@/components/IconButton";
import { Panel } from "@/components/Panel";
import css from "./GroupPanel.module.css";
import { Text } from "./Text";

export type Props = {
  createButtonDisabled: boolean;
  onCreateClick: () => void;
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupPanel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, [
    "onCreateClick",
    "createButtonDisabled",
    "children",
  ]);

  return (
    <Panel>
      <div class={clsx({ [css.style]: true })}>
        <div class={clsx({ [css.header]: true })} {...attributes}>
          <Text
            size="sizeLarge"
            weight="weightBold"
            class={clsx({ [css.title]: true })}
          >
            Groups
          </Text>
          <IconButton
            onClick={props.onCreateClick}
            disabled={props.createButtonDisabled}
            iconName="create"
            iconColor="white"
            buttonColor="primary"
          >
            Create
          </IconButton>
        </div>

        <div>{props.children}</div>
      </div>
    </Panel>
  );
};
