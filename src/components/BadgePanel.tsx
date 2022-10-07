import { Panel } from "@/components/Panel";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgePanel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);

  return (
    <Panel>
      <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
        {/* FIXME: Fixed height only now */}
        <div
          class={clsx({ "flex h-[33px] justify-end": true })}
          {...attributes}
        />
        <div>{props.children}</div>
      </div>
    </Panel>
  );
};
