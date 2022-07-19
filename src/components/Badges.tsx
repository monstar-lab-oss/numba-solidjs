import { Component, For } from "solid-js";
import type { Badge } from "@/types/Badge";

type Props = {
  data: Badge[];
  onRemove: (id: Badge["id"]) => void;
};

export const Badges: Component<Props> = (props) => {
  return (
    <div>
      <For each={props.data}>
        {(badge) => (
          <li>
            <button onClick={[props.onRemove, badge.id]}>✕</button>
            {badge.name}
          </li>
        )}
      </For>
    </div>
  );
};
