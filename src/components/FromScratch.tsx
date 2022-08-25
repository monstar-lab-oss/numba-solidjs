import { Component, createEffect, createMemo, Show } from "solid-js";
import type { Badge } from "@/types/Badge";
import { GroupPannel } from "./GroupPannel";
import { BadgePannel } from "./BadgePannel";
import { GroupTable } from "@/components/GroupTable";
import { BadgeTable } from "@/components/BadgeTable";
import { useStore } from "@/lib/hooks/useStore";
import { dispatch } from "@/lib/dispatch";

export const FromScratch: Component = () => {
  const [_, { selectedGroupId, enabled, groups, getBadgeByGroupId }] =
    useStore();

  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

  createEffect(() => {
    // TODO: make sure later
    // const gx = groups();
    // const lastIdx = gx.length - 1;
    // if (lastIdx < 0) return;
    // onSelectGroup(gx[lastIdx].id);
  });

  const badges = createMemo(() => {
    const groupId = selectedGroupId();
    if (!groupId) return [];
    return getBadgeByGroupId(groupId);
  });

  const onRemoveBadge = (ids: Badge["id"][]) => {
    // const groupId = selectedGroup();
    // if (!groupId) return;
    // useDispatch({ type: "REMOVE_BADGE", data: ids });
    // // TODO: Synchronize them in one action
    // removeBadge(groupId, ids);
  };

  return (
    <>
      {/* FIXME: Fixed height only now */}
      <div class="flex h-[424px] items-stretch">
        <GroupPannel createButtonDisabled={!enabled()} onCreateClick={onClick}>
          <GroupTable data={groups()} />
        </GroupPannel>
        <BadgePannel>
          <Show when={selectedGroupId()}>
            <BadgeTable data={badges() || []} onRemove={onRemoveBadge} />
          </Show>
        </BadgePannel>
      </div>
    </>
  );
};
