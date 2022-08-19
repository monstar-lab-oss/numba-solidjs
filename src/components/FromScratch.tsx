import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  Show,
} from "solid-js";
import { useDispatch } from "@/lib/hooks/useDispatch";
import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";
import { GroupPannel } from "./GroupPannel";
import { BadgePannel } from "./BadgePannel";
import { GroupTable } from "@/components/GroupTable";
import { BadgeTable } from "@/components/BadgeTable";
import { useStore } from "@/lib/hooks/useStore";
import { dispatch } from "@/lib/dispatch";

export const FromScratch: Component = () => {
  const [_, { enabled, groups, removeGroup, getBadgeByGroupId, removeBadge }] =
    useStore();

  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

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

  const badges = createMemo(() => getBadgeByGroupId(selectedGroup()) || []);

  const onRemoveBadge = (ids: Badge["id"][]) => {
    const groupId = selectedGroup();
    if (!groupId) return;

    useDispatch({ type: "REMOVE_BADGE", data: ids });
    // TODO: Synchronize them in one action
    removeBadge(groupId, ids);
  };

  const onRemoveGroup = (id: string) => {
    dispatch({ type: "APP/REMOVE_GROUP", payload: id });
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
            <BadgeTable
              data={badges()}
              onRemove={onRemoveBadge}
              onUnSelectGroup={onUnSelectGroup}
            />
          </Show>
        </BadgePannel>
      </div>
    </>
  );
};
