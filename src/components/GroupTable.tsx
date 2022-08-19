import { Component, JSX, For, splitProps } from "solid-js";
import type { Group } from "@/types/Group";
import { clsx } from "clsx";
import css from "./GroupTable.module.css";

export type Props = {
  data: Group[];
  selectedGroup: string | undefined;
  onRemoveClick: (id: Group["id"]) => void;
  onSelectClick: (id: Group["id"]) => void;
  onUnSelectClick: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, [
    "data",
    "selectedGroup",
    "onRemoveClick",
    "onSelectClick",
    "onUnSelectClick",
  ]);

  const onSelectClick = (e: MouseEvent, id: string) => {
    props.selectedGroup === id
      ? props.onUnSelectClick()
      : props.onSelectClick(id);

    e.stopImmediatePropagation();
  };

  const onRemoveClick = (e: MouseEvent, id: string) => {
    props.onRemoveClick(id);
    e.stopImmediatePropagation();
  };

  return (
    <div class={clsx({ "w-full": true })} {...attributes}>
      <table class={clsx({ [css.style]: true })}>
        <thead>
          <tr class="h-12">
            <th scope="col" class="p-4">
              name
            </th>
            <th scope="col" class="px-4"></th>
          </tr>
        </thead>
        <tbody>
          <For each={props.data}>
            {(item) => (
              <tr
                onClick={(e) => onSelectClick(e, item.id)}
                class={clsx({
                  [css.selected_row]: props.selectedGroup === item.id,
                })}
              >
                <th scope="row">{item.name}</th>
                <td>
                  <a href="#" onClick={(e) => onRemoveClick(e, item.id)}>
                    Remove
                  </a>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
