import { Component, For } from "solid-js";
import type { Group } from "@/types/Group";

type Props = {
  data: Group[];
  onRemove: (id: Group["id"]) => void;
  onSelect: (id: Group["id"]) => void;
};

export const Groups: Component<Props> = (props) => {
  return (
    <div>
      <For each={props.data}>
        {(group) => (
          <li>
            <button onClick={[props.onRemove, group.id]}>✕</button>
            <button onClick={[props.onSelect, group.id]}>✓</button>
            {group.name}
          </li>
        )}
      </For>
    </div>
  );
};
