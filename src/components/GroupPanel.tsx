import { IconButton } from "@/components/IconButton";
import { Panel } from "@/components/Panel";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import css from "./GroupPanel.module.css";

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
        {/* <div class={clsx({ [css.header]: true })} {...attributes}> */}
        {/* FIXME: Fixed height only now */}
        <div
          class={clsx({
            "flex h-[33px] items-center justify-between px-3 pt-3": true,
          })}
          {...attributes}
        >
          <div class={clsx({ [css.title]: true })}>Groups</div>
          <IconButton
            onClick={props.onCreateClick}
            disabled={props.createButtonDisabled}
            iconName="create"
            IconColor="white"
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
