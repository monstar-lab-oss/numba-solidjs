import { Component, For } from "solid-js";
import type { Badge } from "@/types/Badge";

type Props = {
  data: Badge[];
  onCreate: () => void;
  onRemove: (id: Badge["id"]) => void;
};

export const Badges: Component<Props> = (props) => {
  return (
    <div>
      <button onClick={props.onCreate}>+</button>
      <For each={props.data}>
        {(badge) => (
          <li>
            <button onClick={[props.onRemove, badge.id]}>✕</button>
            {badge.id}
          </li>
        )}
      </For>
    </div>
  );
};
