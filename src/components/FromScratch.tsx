import { Component, createMemo, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { GroupPannel } from "./GroupPannel";
import { BadgePannel } from "./BadgePannel";
import { GroupTable } from "@/components/GroupTable";
import { BadgeTable } from "@/components/BadgeTable";
import { Confirm } from "@/components/Confirm";
import { useStore } from "@/lib/hooks/useStore";
import { dispatch } from "@/lib/dispatch";

export const FromScratch: Component = () => {
  const [
    _,
    { selectedGroupId, enabled, groups, getBadgeByGroupId, confirmOptions },
  ] = useStore();

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
        <Portal>
          <Confirm options={confirmOptions()} />
        </Portal>
        <GroupPannel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} />
        </GroupPannel>
        <BadgePannel>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} />
          </Show>
        </BadgePannel>
      </div>
    </>
  );
};
