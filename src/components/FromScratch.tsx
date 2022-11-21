import { BadgeTable } from "@/components/BadgeTable";
import { GroupTable } from "@/components/GroupTable";
import { dispatch } from "@/lib/dispatch";
import { useStore } from "@/lib/hooks/useStore";
import { Component, Show } from "solid-js";
import { BadgePanel } from "./BadgePanel";
import { GroupPanel } from "./GroupPanel";

export const FromScratch: Component = () => {
  const [_, { selectedGroupId, enabled, groups, getBadgeByGroupId }] =
    useStore();

  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

  const badges = () => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  }

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class="flex h-[424px] items-stretch">
        <GroupPanel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} />
        </GroupPanel>
        <BadgePanel>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []}/>
          </Show>
        </BadgePanel>
      </div>
    </>
  );
};
