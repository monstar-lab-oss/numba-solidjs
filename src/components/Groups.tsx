import { Component, For } from "solid-js";
import type { Group } from "@/types/Group";

type Props = {
  data: Group[];
  onCreate: () => void;
  onRemove: (id: Group["id"]) => void;
  onSelect: (id: Group["id"]) => void;
};

export const Groups: Component<Props> = (props) => {
  return (
    <div>
      <button onClick={props.onCreate}>+</button>
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
