import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { IconButton } from "@/components/IconButton";
import { Pannel } from "@/components/Pannel";

export type Props = {
  createButtonDisabled: boolean;
  onCreateClick: () => void;
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupPannel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, [
    "onCreateClick",
    "createButtonDisabled",
    "children",
  ]);

  return (
    <Pannel>
      <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
        <div class={clsx({ "flex  justify-between": true })} {...attributes}>
          <div class="self-center text-[12px] font-bold">Groups</div>
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
    </Pannel>
  );
};
