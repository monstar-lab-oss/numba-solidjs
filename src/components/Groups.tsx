import { Component, For } from "solid-js";
import type { Group } from "@/types/Group";

type Props = {
  data: Group[];
  selectedGroup: string | undefined;
  onRemove: (id: Group["id"]) => void;
  onSelect: (id: Group["id"]) => void;
  onUnSelect: () => void;
};

export const Groups: Component<Props> = (props) => {
  return (
    <div>
      <For each={props.data}>
        {(group) => (
          <li
            style={{
              color: props.selectedGroup === group.id ? "blue" : "black",
            }}
          >
            <button onClick={[props.onRemove, group.id]}>✕</button>
            <button
              onClick={() =>
                props.selectedGroup === group.id
                  ? props.onUnSelect()
                  : props.onSelect(group.id)
              }
            >
              ✓
            </button>
            {group.name}
          </li>
        )}
      </For>
    </div>
  );
};
