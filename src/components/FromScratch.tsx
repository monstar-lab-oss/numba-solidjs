import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  Show,
} from "solid-js";
import { store } from "@/lib/store";
import { Button } from "@/components/Button";
import { useDispatch } from "@/lib/hooks/useDispatch";
import { Groups } from "@/components/Groups";
import { Badges } from "@/components/Badges";
import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";

export const FromScratch: Component = () => {
  const { enabled, groups, removeGroup, getBadgeByGroupId, removeBadge } =
    store;

  const onClick = () => useDispatch({ type: "CREATE_INDEX", data: null });

  const [selectedGroup, setSelectedGroup] = createSignal<string>();

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
      <Button disabled={!enabled()} onClick={onClick}>
        Create
      </Button>
      <div style={{ display: "flex" }}>
        <Groups
          data={groups()}
          onSelect={onSelectGroup}
          onRemove={onRemoveGroup}
        />
        <Show when={selectedGroup()}>
          <Badges data={badges()} onRemove={onRemoveBadge} />
        </Show>
      </div>
    </>
  );
};
