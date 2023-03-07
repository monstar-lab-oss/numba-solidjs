import type { Accessor, Setter } from "solid-js";

type BadgeId = string;
type NodeId = string;

export type Badge = {
  index: number;
  id: BadgeId;
  name: string;
  color: "RED" | "BLUE";
  targetId: NodeId;
  selected: Accessor<boolean>;
  setSelected: Setter<boolean>;
};

export type BadgeRaw = Omit<Badge, "selected" | "setSelected">;
