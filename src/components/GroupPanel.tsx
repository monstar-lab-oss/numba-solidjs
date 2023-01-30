import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "@/components/GroupPanel.module.css";
import { IconButton } from "@/components/IconButton";
import { Panel } from "@/components/Panel";
import { Text } from "@/components/Text";
import type { UseStoreType } from "@/lib/hooks/useStore";

export type Props = {
  createButtonDisabled: boolean;
  onCreateClick: () => void;
  children: JSX.Element;
  useStore: () => UseStoreType;
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
          <Text size="sizeLarge" weight="weightBold">
            Groups
          </Text>
          <IconButton
            onClick={props.onCreateClick}
            disabled={props.createButtonDisabled}
            iconName="create"
            iconColor="white"
            iconDisabledColor="white"
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
