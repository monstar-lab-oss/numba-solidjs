import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  Show,
} from "solid-js";
import { store } from "@/lib/store";
import { useDispatch } from "@/lib/hooks/useDispatch";
import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";
import { GroupPannel } from "./GroupPannel";
import { BadgePannel } from "./BadgePannel";
import { GroupTable } from "@/components/GroupTable";
import { BadgeTable } from "@/components/BadgeTable";

export const FromScratch: Component = () => {
  const { enabled, groups, removeGroup, getBadgeByGroupId, removeBadge } =
    store;

  const onClick = () => useDispatch({ type: "CREATE_INDEX", data: null });

  const [selectedGroup, setSelectedGroup] = createSignal<string | undefined>();

  const onUnSelectGroup = () => {
    setSelectedGroup(undefined);
    useDispatch({ type: "SELECT_GROUP", data: undefined });
  };

  const onSelectGroup = (id: Group["id"]) => {
    setSelectedGroup(id);
    useDispatch({ type: "SELECT_GROUP", data: id });
  };

  createEffect(() => {
    const gx = groups();
    const lastIdx = gx.length - 1;
    if (lastIdx < 0) return;

    onSelectGroup(gx[lastIdx].id);
  });

  const badges = createMemo(() => getBadgeByGroupId(selectedGroup()));

  const onRemoveBadge = (id: Badge["id"]) => {
    const groupId = selectedGroup();
    if (!groupId) return;

    useDispatch({ type: "REMOVE_BADGE", data: id });
    // TODO: Synchronize them in one action
    removeBadge(groupId, id);
  };

  const onRemoveGroup = (id: string) => {
    useDispatch({ type: "REMOVE_GROUP", data: id });
    // TODO: Synchronize them in one action
    removeGroup(id);
  };

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class="flex h-[424px] items-stretch">
        <GroupPannel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable
            selectedGroup={selectedGroup()}
            data={groups()}
            onSelectClick={onSelectGroup}
            onUnSelectClick={onUnSelectGroup}
            onRemoveClick={onRemoveGroup}
          />
        </GroupPannel>
        <BadgePannel>
          <Show when={selectedGroup()}>
            <BadgeTable data={badges()} onRemove={onRemoveBadge} />
          </Show>
        </BadgePannel>
      </div>
    </>
  );
};
