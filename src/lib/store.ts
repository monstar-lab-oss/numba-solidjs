import { createSignal, createRoot, createUniqueId, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import type { Group } from "@/types/Group";
import type { Badge } from "@/types/Badge";

// utils
const omit = (obj: Record<string, any>, key: string) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

type Store = {
  groups: Group[];
  badges: Record<string, Badge[]>;
};

function createAppStore() {
  const [enabled, setEnabled] = createSignal(false);

  const [state, setState] = createStore<Store>({
    groups: [],
    badges: {},
  });

  // groups
  const createGroup = (name: string) => {
    const id = createUniqueId();
    setState("groups", (g) => [...g, { id, name }]);
  };

  const removeGroup = (id: Group["id"]) => {
    setState("groups", (gx) => gx.filter((g) => g.id !== id));
    setState((state) => ({ badges: omit(state.badges, id) }));
  };

  // badges
  const getBadgeByGroupId = (id?: Group["id"]) => {
    return id ? state.badges[id] : [];
  };

  const createBadge = (parentId: Group["id"]) => {
    const id = createUniqueId();
    const b: Badge = { id, color: "BLUE" };
    setState("badges", [parentId], (bx) => (bx ? [...bx, b] : [b]));
  };

  const removeBadge = (parentId: Group["id"], id: Badge["id"]) => {
    setState("badges", [parentId], (bx) => bx.filter((b) => b.id !== id));

    if (getBadgeByGroupId(parentId).length) return;
    removeGroup(parentId);
  };

  const groups = createMemo(() => state.groups);

  return {
    state,
    enabled,
    setEnabled,
    groups,
    createGroup,
    removeGroup,
    getBadgeByGroupId,
    createBadge,
    removeBadge,
  };
}
export const store = createRoot(createAppStore);
