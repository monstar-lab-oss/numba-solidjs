import { Show } from "solid-js";
import { BadgeTable } from "@/components/BadgeTable";
import { GroupTable } from "@/components/GroupTable";
// import { useStore } from "@/lib/hooks/useStore";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import type { UseStoreType } from "@/lib/hooks/useStore";
import type { Action } from "@/types/Actions";
import { Meta, Story } from "@storybook/html";
import { BadgePanel } from "./BadgePanel";
import { Props } from "./Confirm";
import { GroupPanel } from "./GroupPanel";

export default {
  title: "Components/FromScratch",
  args: {
    children: "FromScratch",
  },
} as Meta;

const useStore = (): UseStoreType => {
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups: () => [],
      enabled: () => true,
      selectedGroupId: () => "",
      // @ts-expect-error FIXME: Should pass tslint.
      getBadgeByGroupId: () => "",
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => console.log("removeGroup"),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};

const dispatch = ({ type, payload }: Action) => {
  console.log("dispatch fired, ------> type: ", type, " payload : ", payload);
};

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  const [_, { selectedGroupId, enabled, groups }] = useStore();
  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });
  const badges = () => [];

  return (
    <div
      style={{
        width: `${UI_WIDTH}px`,
        height: `${UI_HEIGHT}px`,
        "background-color": "white",
      }}
    >
      {/* FIXME: Fixed height only now */}
      <div class="flex h-[424px] items-stretch">
        <GroupPanel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} useStore={useStore} />
        </GroupPanel>
        <BadgePanel useStore={useStore}>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} useStore={useStore} />
          </Show>
        </BadgePanel>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
