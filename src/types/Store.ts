import type { Group } from "@/types/Group";
import type { BadgeRaw } from "@/types/Badge";

export type Store = {
  numberingGroups: Group[];
  badges: Record<Group["id"], BadgeRaw>;
};
