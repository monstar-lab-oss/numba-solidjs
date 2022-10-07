import { Panel } from "@/components/Panel";
import { useStore } from "@/lib/hooks/useStore";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Icon } from "./Icon";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgePanel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);
  const [_, { groups }] = useStore();
  return (
    <Panel>
      <Show
        when={groups().length > 0}
        fallback={() => (
          <div class="m-4 flex">
            <div>
              <Icon name="arrow" color="secondary" />
            </div>
            <div class="items-center text-xs text-gray-400">
              You select a group and click "Create button" first.
            </div>
          </div>
        )}
      >
        <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
          {/* FIXME: Fixed height only now */}
          <div
            class={clsx({ "flex h-[33.5px] justify-end": true })}
            {...attributes}
          />
          <div>{props.children}</div>
        </div>
      </Show>
    </Panel>
  );
};
