import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { clsx } from "clsx";
import { Panel } from "@/components/Panel";
import { useStore } from "@/lib/hooks/useStore";
import type { Group } from "@/types/Group";
import { Icon } from "./Icon";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

const getSelectedGroupName = (
  data: Group[],
  selected: string | null
): string => {
  if (!selected) return "";

  return data.find((v) => v.id === selected)?.name || "";
};

export const BadgePanel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);
  const [_, { groups, selectedGroupId }] = useStore();
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
        <div class={clsx({ "grid grid-rows-1": true })}>
          {/* FIXME: Fixed height only now */}
          <div
            class={clsx({
              "flex h-[49.5px] overflow-hidden": true,
            })}
            {...attributes}
          >
            <div class="w-full self-center truncate pl-3">
              {getSelectedGroupName(groups(), selectedGroupId())}
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </Show>
    </Panel>
  );
};
