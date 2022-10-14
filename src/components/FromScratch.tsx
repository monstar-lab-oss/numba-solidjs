import { Component, createMemo, Show } from "solid-js";
import { GroupPanel } from "@/components/GroupPanel";
import { BadgePanel } from "@/components/BadgePanel";
import { GroupTable } from "@/components/GroupTable";
import { BadgeTable } from "@/components/BadgeTable";
import { useStore } from "@/lib/hooks/useStore";
import { dispatch } from "@/lib/dispatch";

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
      <div class="flex h-[424px] items-stretch">
        <GroupPanel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} />
        </GroupPanel>
        <BadgePanel>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} />
          </Show>
        </BadgePanel>
      </div>
    </>
  );
};
