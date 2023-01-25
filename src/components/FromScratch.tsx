import { Component, createMemo, createSignal, Show } from "solid-js";
import { BadgeTable } from "@/components/BadgeTable";
import { GroupTable } from "@/components/GroupTable";
import { UI_HEIGHT } from "@/constants";
import { dispatch } from "@/lib/dispatch";
import { useStore } from "@/lib/hooks/useStore";
import { BadgePanel } from "./BadgePanel";
import { GroupPanel } from "./GroupPanel";
import { IconButton } from "./IconButton";
import { Tutorial } from "./Tutorial";

export const FromScratch: Component = () => {
  const [_, { selectedGroupId, enabled, groups, getBadgeByGroupId }] =
    useStore();

  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

  const badges = createMemo(() => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  });

  const [showTutorial, setShowTutorial] = createSignal(false);

  return (
    <>
      <Show when={!showTutorial()}>
        {/* FIXME: Fixed height only now */}
        <div class={`flex h-[${UI_HEIGHT}px] items-stretch`}>
          <GroupPanel createButtonDisabled={!enabled()} onCreateClick={onClick}>
            <GroupTable data={groups()} useStore={useStore} />
          </GroupPanel>
          <BadgePanel useStore={useStore}>
            <Show when={selectedGroupId()}>
              <BadgeTable data={badges() || []} useStore={useStore} />
            </Show>
          </BadgePanel>
        </div>
        <div class="absolute bottom-0 left-0">
          <IconButton
            iconName="help"
            iconColor="secondary"
            onClick={() => setShowTutorial(true)}
          />
        </div>
      </Show>
      <Show when={showTutorial()}>
        <Tutorial onClose={() => setShowTutorial(false)} />
      </Show>
    </>
  );
};
