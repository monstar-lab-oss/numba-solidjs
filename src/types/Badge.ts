import type { Accessor, Setter } from "solid-js";

type BadgeId = string;

export type Badge = {
  id: BadgeId;
  name: string;
  color: "RED" | "BLUE";
  selected: Accessor<boolean>;
  setSelected: Setter<boolean>;
};
