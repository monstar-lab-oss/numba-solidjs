import {
  createSignal,
  createContext,
  useContext,
  ParentComponent,
  Accessor,
  onMount,
  createMemo,
  Setter,
} from "solid-js";
import type { Group } from "@/types/Group";
import type { Badge } from "@/types/Badge";
import { createStore } from "solid-js/store";
import type { Action } from "@/types/Actions";
import { dispatch } from "@/lib/dispatch";

const Context = createContext();

type Store = {
  groups: Group[];
  badges: Record<string, Badge[]>;
};

type Props = {
  value: Store & { enabled: boolean };
};

export const Provider: ParentComponent<Props> = (props) => {
  const [enabled, setEnabled] = createSignal(props.value.enabled);
  const [selectedGroupId, _setSelectedGroupId] = createSignal<string | null>(
    null
  );

  const [state, setState] = createStore({
    groups: props.value.groups || [],
    badges: props.value.badges || {},
  });
  const groups = createMemo(() => state.groups);

  const removeGroup = (id: Group["id"]) => {
    setState("groups", (gs) => gs.filter((g) => g.id !== id));
    dispatch({ type: "APP/REMOVE_GROUP", payload: id });
  };

  // badges
  const getBadgeByGroupId = (id?: Group["id"]) => {
    return id ? state.badges[id] : [];
  };

  const createBadgeWithSelectedState = ({
    id,
    name,
    targetId,
  }: Pick<Badge, "id" | "name" | "targetId">) => {
    const [selected, setSelected] = createSignal(false);
    return {
      id,
      name,
      color: "BLUE",
      targetId,
      selected,
      setSelected,
    } as Badge;
  };

  const createBadge = ({
    parentId,
    id,
    name,
    targetId,
  }: {
    parentId: Group["id"];
    id: Badge["id"];
    name: Badge["name"];
    targetId: string;
  }) => {
    const b: Badge = createBadgeWithSelectedState({ id, name, targetId });
    setState("badges", [parentId], (bx) => (bx ? [...bx, b] : [b]));
  };

  const removeBadge = (parentId: Group["id"], ids: Badge["id"][]) => {
    ids.forEach((id) =>
      setState("badges", [parentId], (bx) => bx.filter((b) => b.id !== id))
    );
    dispatch({ type: "APP/REMOVE_BADGES", payload: ids });
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
          case "UI/UPDATE_STORE":
            // reduce with selected state
            const badgesRaw = payload.numberingbadgeGroups;
            const badges = Object.keys(badgesRaw).reduce((acc, key) => {
              return Object.assign(acc, {
                [key]: badgesRaw[key].map((x) =>
                  createBadgeWithSelectedState(x)
                ),
              });
            }, {});

            // TODO: Because of the very expensive logic, we have to optimize.
            setState(() => ({
              groups: payload.numberingGroups,
              badges,
            }));
            return;
          case "UI/SELECT_GROUP":
            if (!payload) _setSelectedGroupId(null);
            const groupId = state.groups.find((x) => x.id === payload)?.id;
            if (!groupId) return;
            _setSelectedGroupId(groupId);
            return;
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
            if (state.badges[groupId]) {
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
      setEnabled,
      selectedGroupId,
      setSelectedGroupId: (id: string | null) => {
        _setSelectedGroupId(id);
        dispatch({ type: "APP/SELECT_NODE", payload: id });
      },
      groups,
      removeGroup,
      getBadgeByGroupId,
      createBadge,
      removeBadge,
    },
  ] as const;
  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export function useStore() {
  // TODO: Simplify the return type of useStore.
  return useContext(Context) as [
    Store,
    {
      enabled: Accessor<boolean>;
      selectedGroupId: Accessor<string | null>;
      setSelectedGroupId: Setter<string | null>;
      setEnabled: Setter<boolean>;
      groups: Accessor<Group[]>;
      createGroup: ({ id, name }: { id: string; name: string }) => void;
      removeGroup: (id: Group["id"]) => void;
      getBadgeByGroupId: (id?: Group["id"]) => Badge[];
      createBadge: ({
        parentId,
        id,
        name,
      }: {
        parentId: Group["id"];
        id: Badge["id"];
        name: Badge["name"];
      }) => void;
      removeBadge: (parentId: Group["id"], ids: Badge["id"][]) => void;
    }
  ];
}
