import {
  createSignal,
  createContext,
  useContext,
  createEffect,
  ParentComponent,
  Accessor,
  onMount,
  createMemo,
  Setter,
} from "solid-js";
import type { Group } from "@/types/Group";
import type { Badge } from "@/types/Badge";
import { createStore } from "solid-js/store";
import type { PluginMessage } from "@/types/Actions";
import { omit } from "@/lib/utils/omit";

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

  const [state, setState] = createStore({
    groups: props.value.groups || [],
    badges: props.value.badges || {},
  });
  const groups = createMemo(() => state.groups);

  // groups
  const createGroup = ({ id, name }: { id: string; name: string }) => {
    setState("groups", (g) => [...g, { id, name }]);
  };

  const removeGroup = (id: Group["id"]) => {
    setState("groups", (gx) => gx.filter((g) => g.id !== id));
    setState((state) => ({ badges: omit(state.badges, [id]) }));
  };

  // badges
  const getBadgeByGroupId = (id?: Group["id"]) => {
    return id ? state.badges[id] : [];
  };

  const createBadgeWithSelectedState = ({
    id,
    name,
  }: Pick<Badge, "id" | "name">) => {
    const [selected, setSelected] = createSignal(false);
    const b: Badge = { id, name, color: "BLUE", selected, setSelected };
    return b;
  };

  const createBadge = ({
    parentId,
    id,
    name,
  }: {
    parentId: Group["id"];
    id: Badge["id"];
    name: Badge["name"];
  }) => {
    const b: Badge = createBadgeWithSelectedState({ id, name });
    setState("badges", [parentId], (bx) => (bx ? [...bx, b] : [b]));
  };

  const removeBadge = (parentId: Group["id"], ids: Badge["id"][]) => {
    ids.forEach((id) =>
      setState("badges", [parentId], (bx) => bx.filter((b) => b.id !== id))
    );

    if (getBadgeByGroupId(parentId).length) return;
    removeGroup(parentId);
  };

  // TODO: check unnecessary properties e.g. Symbol(solid-proxy)
  const syncAll = (payload: [Group[], Record<string, Badge[]>]) => {
    const [groups, badgesRaw] = payload;

    const badges = Object.keys(badgesRaw).reduce((acc, key) => {
      return Object.assign(acc, {
        [key]: badgesRaw[key].map((x) => createBadgeWithSelectedState(x)),
      });
    }, {});
    setState(() => ({ groups, badges }));
  };

  onMount(() => {
    window.addEventListener(
      "message",
      ({
        data,
      }: MessageEvent<{
        pluginMessage: PluginMessage;
      }>) => {
        const { type, payload } = data.pluginMessage;
        switch (type) {
          case "GROUP/ENABLE":
            setEnabled(payload);
            return;
          case "GROUP/CREATE":
            createGroup(payload);
            return;
          case "BADGE/CREATE":
            createBadge(payload);
            return;
          case "GROUP/INITIALIZE":
            syncAll(payload);
            return;
          default:
            return;
        }
      }
    );
  });

  createEffect(() => {
    // TODO: not yet implemented
  });

  const store = [
    state,
    {
      syncAll,
      enabled,
      setEnabled,
      groups,
      createGroup,
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
      syncAll: (payload: [Group[], Record<string, Badge[]>]) => void;
      enabled: Accessor<boolean>;
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
