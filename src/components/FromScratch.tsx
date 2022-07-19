import {
  Component,
  createMemo,
  createUniqueId,
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
  const {
    enabled,
    groups,
    createGroup,
    removeGroup,
    getBadgeByGroupId,
    createBadge,
    removeBadge,
  } = store;

  const onClick = () => useDispatch({ type: "CREATE_INDEX", data: null });
  const [selectedGroup, setSelectedGroup] = createSignal<string>();

  const onSelectGroup = (id: Group["id"]) => setSelectedGroup(id);

  const badges = createMemo(() => getBadgeByGroupId(selectedGroup()));

  const onCreateGroup = () => createGroup(`G ${createUniqueId()}`);

  const onCreateBadge = () => {
    const groupId = selectedGroup();
    if (!groupId) return;

    createBadge(groupId);
  };

  const onRemoveBadge = (id: Badge["id"]) => {
    const groupId = selectedGroup();
    if (!groupId) return;

    removeBadge(groupId, id);
  };

  return (
    <>
      <Button disabled={!enabled()} onClick={onClick}>
        Create
      </Button>
      <div style={{ display: "flex" }}>
        <Groups
          data={groups()}
          onCreate={onCreateGroup}
          onSelect={onSelectGroup}
          onRemove={removeGroup}
        />
        <Show when={selectedGroup()}>
          <Badges
            data={badges()}
            onCreate={onCreateBadge}
            onRemove={onRemoveBadge}
          />
        </Show>
      </div>
    </>
  );
};
