import { Component, createMemo, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { BadgePanel } from "@/components/BadgePanel";
import { BadgeTable } from "@/components/BadgeTable";
import { GroupPanel } from "@/components/GroupPanel";
import { GroupTable } from "@/components/GroupTable";
import { IconButton } from "@/components/IconButton";
import { Tutorial } from "@/components/Tutorial";
import { UI_HEIGHT } from "@/constants";
import { dispatch } from "@/lib/dispatch";
import { useStore } from "@/lib/hooks/useStore";

export const FromScratch: Component = () => {
  const [
    _,
    {
      shouldShowTutorial,
      setShouldShowTutorial,
      selectedGroupId,
      enabled,
      groups,
      getBadgeByGroupId,
    },
  ] = useStore();

  const onClick = () =>
    dispatch({ type: "APP/CREATE_GROUP", payload: groups().length });

  const badges = createMemo(() => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  });

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class={`flex h-[${UI_HEIGHT}px] items-stretch`}>
        <Show when={shouldShowTutorial()}>
          <Portal>
            <Tutorial
              onClose={() => setShouldShowTutorial(false)}
              version={__APP_VERSION__}
            />
          </Portal>
        </Show>
        <GroupPanel
          createButtonDisabled={!enabled()}
          onCreateClick={onClick}
          useStore={useStore}
        >
          <GroupTable data={groups()} useStore={useStore} />
        </GroupPanel>
        <BadgePanel useStore={useStore}>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} useStore={useStore} />
          </Show>
        </BadgePanel>
        {/* TODO: ラップしている部分の「w-8 h-8」はIconButtonに責務を持たせる必要がある */}
        <div class="absolute bottom-0 left-0 bg-black rounded-full p-1.5 m-4 w-8 h-8">
          <IconButton
            iconName="help"
            iconColor="white"
            buttonColor="secondary"
            link
            onClick={() => setShouldShowTutorial(true)}
          />
        </div>
      </div>
    </>
  );
};
