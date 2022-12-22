import { Component, createMemo, Show } from "solid-js";
import { BadgeTable } from "@/components/BadgeTable";
import { GroupTable } from "@/components/GroupTable";
import { UI_HEIGHT } from "@/constants";
import { dispatch } from "@/lib/dispatch";
import { useStore } from "@/lib/hooks/useStore";
import { BadgePanel } from "./BadgePanel";
import { GroupPanel } from "./GroupPanel";

export const FromScratch: Component = () => {
  const [_, { selectedGroupId, enabled, groups, getBadgeByGroupId }] =
    useStore();

  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

  const badges = createMemo(() => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  });

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class={`flex h-[${UI_HEIGHT}px] items-stretch`}>
        <GroupPanel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} useStore={useStore} />
        </GroupPanel>
        <BadgePanel useStore={useStore} badges={badges() || []}>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} useStore={useStore} />
          </Show>
        </BadgePanel>
      </div>
    </>
  );
};
