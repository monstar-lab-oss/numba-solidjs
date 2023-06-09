import {
  Accessor,
  createContext,
  createMemo,
  createSignal,
  onMount,
  ParentComponent,
  Setter,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { GROUP_NAME } from "@/constants";
import { dispatch } from "@/lib/dispatch";
import type { Action } from "@/types/Actions";
import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";

const Context = createContext();

type Store = {
  groups: Group[];
  badges: Record<string, Badge[]>;
};

type Props = {
  value: Store & { enabled: boolean };
};

export const Provider: ParentComponent<Props> = (props) => {
  const [shouldShowTutorial, setShouldShowTutorial] = createSignal(false);
  const [enabled, setEnabled] = createSignal(props.value.enabled);
  const [selectedGroupId, _setSelectedGroupId] = createSignal<string | null>(
    null
  );

  const [state, setState] = createStore({
    groups: props.value.groups || [],
    badges: props.value.badges || {},
  });
  const groups = createMemo(() =>
    state.groups.map((v) => ({
      ...v,
      name: v.name.replace(GROUP_NAME, ""),
    }))
  );

  const removeGroup = (id: Group["id"]) => {
    setState("groups", (gs) => gs.filter((g) => g.id !== id));
    dispatch({ type: "APP/REMOVE_GROUP", payload: id });
  };

  // badges
  const getBadgeByGroupId = (id?: Group["id"]) => {
    // FIXME: 根本的にはGroup作成時のmain<->storeの仕組みについて見直す必要がありそう
    // Ref. https://github.com/monstar-lab-group/numba/pull/105#discussion_r1007785714
    if (!id || !state.badges[id]) return [];

    return state.badges[id];
  };

  const createBadgeWithSelectedState = (
    groupID: string,
    {
      id,
      name,
      targetId,
      index,
    }: Pick<Badge, "id" | "name" | "targetId" | "index">
  ) => {
    const badge = state.badges[groupID]?.find((v) => v.id === id);
    const [selected, setSelected] = createSignal(!!badge?.selected());

    return {
      id,
      name,
      color: "BLUE",
      targetId,
      index,
      selected,
      setSelected,
    } as Badge;
  };

  const removeBadge = (parentId: Group["id"], ids: Badge["id"][]) => {
    ids.forEach((id) =>
      setState("badges", [parentId], (bx) => bx.filter((b) => b.id !== id))
    );

    if (state.badges[parentId].length <= 0) {
      removeGroup(parentId);
      setSelectedGroupId(null);
    } else {
      dispatch({
        type: "APP/REMOVE_BADGES",
        payload: { badges: ids, groupID: parentId },
      });
    }
  };

  const setSelectedGroupId = (id: string | null) => {
    _setSelectedGroupId(id);
    dispatch({ type: "APP/SELECT_GROUP", payload: id });
  };

  const setSelectedBadgeID = (id: string | null) => {
    dispatch({ type: "APP/SELECT_BADGE", payload: id });
  };

  onMount(() => {
    window.addEventListener(
      "message",
      ({
        data,
      }: MessageEvent<{
        pluginMessage: Action;
      }>) => {
        const { type, payload } = data.pluginMessage;
        switch (type) {
          case "UI/FOCUS_GROUP":
            return _setSelectedGroupId(payload);

          case "UI/SHOW_TUTORIAL":
            return setShouldShowTutorial(true);

          case "UI/UPDATE_STORE": {
            // reduce with selected state
            const badgesRaw = payload.numberingbadgeGroups;
            const badges = Object.keys(badgesRaw).reduce((acc, key) => {
              return Object.assign(acc, {
                [key]: badgesRaw[key].map((x) =>
                  createBadgeWithSelectedState(key, x)
                ),
              });
            }, {});

            // TODO: Because of the very expensive logic, we have to optimize.
            setState(() => ({
              groups: payload.numberingGroups,
              badges,
            }));

            // NOTE: I want to set only UI side if set to Figma side the numbering is going to be wrong place.
            if (payload.selectedGroupID)
              _setSelectedGroupId(payload.selectedGroupID);

            return;
          }

          case "UI/SHOULD_MAKE_BADGE": {
            const { groupId, targetId } = payload;
            // passes if node not managed on plugin side
            if (!groupId) return;

            // if badge already exists
            const hasBadge = state.badges[groupId]?.find(
              (b) => b.targetId === targetId
            );
            if (hasBadge) return;

            // if a badge group already exists
            if (state.badges[groupId].length > 0) {
              dispatch({
                type: "APP/APPEND_BADGE",
                payload: {
                  parentId: groupId,
                  index: state.badges[groupId].length + 1,
                },
              });
              return;
            }
            // create new badge group
            dispatch({ type: "APP/CREATE_BADGE", payload: groupId });
            return;
          }
          case "UI/TOGGLE_CREATE_GROUP_BUTTON":
            setEnabled(payload);
            return;

          default:
            return;
        }
      }
    );
  });

  const store = [
    state,
    {
      enabled,
      shouldShowTutorial,
      setShouldShowTutorial,
      setEnabled,
      selectedGroupId,
      setSelectedGroupId,
      setSelectedBadgeID,
      groups,
      removeGroup,
      getBadgeByGroupId,
      removeBadge,
    },
  ] as const;
  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

// FIXME: Need move to type file.
export type UseStoreType = [
  Store,
  {
    enabled: Accessor<boolean>;
    shouldShowTutorial: Accessor<boolean>;
    setShouldShowTutorial: Setter<boolean>;
    selectedGroupId: Accessor<string | null>;
    setSelectedGroupId: Setter<string | null>;
    setSelectedBadgeID: Setter<string | null>;
    setEnabled: Setter<boolean>;
    groups: Accessor<Group[]>;
    createGroup: ({ id, name }: { id: string; name: string }) => void;
    removeGroup: (id: Group["id"]) => void;
    getBadgeByGroupId: (id?: Group["id"]) => Badge[];
    removeBadge: (parentId: Group["id"], ids: Badge["id"][]) => void;
  }
];

export function useStore(): UseStoreType {
  // TODO: Simplify the return type of useStore.
  return useContext(Context) as UseStoreType;
}
