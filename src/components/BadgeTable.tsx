import { Component, JSX, For, createMemo } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import type { Badge } from "@/types/Badge";
import { Button } from "./Button";
import { useStore } from "@/lib/hooks/useStore";

export type Props = {
  data: Badge[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgeTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);

  const [_, { removeBadge, selectedGroupId }] = useStore();

  const isDisabledRemove = createMemo(() =>
    props.data.every((x) => !x.selected())
  );

  const onRemoveClick = (e: MouseEvent) => {
    const selectedBageIds = props.data
      .filter((x) => x.selected())
      .map(({ id }) => id);

    const parentId = selectedGroupId();
    if (!parentId) return;

    removeBadge(parentId, selectedBageIds);
    e.stopImmediatePropagation();
  };

  const onToggleAllClick = () => {
    const toggle = isSelectAll();
    props.data.forEach((x) => x.setSelected(!toggle));
  };

  const onToggleClick = (id: string) => {
    const item = props.data.find((x) => x.id === id);
    if (!item) return;
    item.setSelected(!item.selected());
  };

  const isSelectAll = createMemo(() => props.data.every((x) => x.selected()));

  return (
    <div class={clsx({ "w-full": true })} {...attributes}>
      <table class="w-full text-left text-xs text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={isSelectAll()}
                  onChange={() => onToggleAllClick()}
                  class="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-4"></th>
            <th scope="col" class="px-4 text-right">
              <Button
                use="danger"
                onClick={onRemoveClick}
                disabled={isDisabledRemove()}
              >
                Remove
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.data}>
            {(item) => (
              <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      checked={item.selected()}
                      onChange={() => onToggleClick(item.id)}
                      class="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="w-40 px-4 font-medium text-gray-900 dark:text-white"
                >
                  {item.name}
                </th>
                <td class="flex items-center py-4 px-4" />
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
