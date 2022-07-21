import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { Button } from "@/components/Button";
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
        <div class={clsx({ "flex justify-end": true })} {...attributes}>
          <Button
            onClick={props.onCreateClick}
            disabled={props.createButtonDisabled}
          >
            Create
          </Button>
        </div>
        <div>{props.children}</div>
      </div>
    </Pannel>
  );
};
