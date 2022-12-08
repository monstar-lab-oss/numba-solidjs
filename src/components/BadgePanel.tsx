import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { clsx } from "clsx";
import { Icon } from "@/components/Icon";
import { Panel } from "@/components/Panel";
import { Text } from "@/components/Text";
import type { UseStoreType } from "@/lib/hooks/useStore";
import type { Group } from "@/types/Group";

export type Props = {
  children: JSX.Element;
  useStore: () => UseStoreType;
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
  const [_, { groups, selectedGroupId }] = props.useStore();
  return (
    <Panel>
      <Show
        when={groups().length > 0}
        fallback={() => (
          <div class="m-4 flex">
            <div class="flex self-center">
              <Icon name="arrowLeft" color="darkGray" />
            </div>
            <div class="flex self-center">
              <Text color="darkGray" size="sizeSmall">
                You select a group and click "Create button" first.
              </Text>
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
            <Text
              size="sizeLarge"
              weight="weightBold"
              class="w-full self-center truncate pl-3"
            >
              {getSelectedGroupName(groups(), selectedGroupId())}
            </Text>
          </div>
          <div>{props.children}</div>
        </div>
      </Show>
    </Panel>
  );
};
