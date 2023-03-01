import { Component, createMemo, createSignal, Show } from "solid-js";
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
      selectedGroupId,
      enabled,
      groups,
      getBadgeByGroupId,
      setFirstOpen,
      firstOpen,
    },
  ] = useStore();

  const onClick = () =>
    dispatch({ type: "APP/CREATE_GROUP", payload: groups().length });

  const badges = createMemo(() => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  });

  const [showTutorial, setShowTutorial] = createSignal(false);

  const tutorialOnCLose = () => {
    setFirstOpen(false);
    setShowTutorial(false);
  };

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class={`flex h-[${UI_HEIGHT}px] items-stretch`}>
        <Show when={showTutorial() || firstOpen()}>
          <Portal>
            <Tutorial onClose={tutorialOnCLose} version={__APP_VERSION__} />
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
            onClick={() => setShowTutorial(true)}
          />
        </div>
      </div>
    </>
  );
};
