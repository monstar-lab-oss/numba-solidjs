import { Component, JSX, For } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import type { Badge } from "@/types/Badge";
import { Button } from "./Button";

export type Props = {
  data: Badge[];
  onRemove: (id: Badge["id"]) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgeTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data", "onRemove"]);

  const onRemoveClick = (e: MouseEvent, id: string) => {
    props.onRemove(id);
    e.stopImmediatePropagation();
  };

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
                  class="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-4"></th>
            <th scope="col" class="px-4 text-right">
              <Button use="danger">R</Button>
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
                <td class="flex items-center py-4 px-4">
                  <a
                    href="#"
                    onClick={(e) => onRemoveClick(e, item.id)}
                    class="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
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
