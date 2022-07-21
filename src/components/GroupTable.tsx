import { Component, JSX, For } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";

export type Props = {
  data: { id: string; name: string }[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);

  const onSelectClick = (e: MouseEvent, id: string) => {
    console.log("g click", id);
    e.stopImmediatePropagation();
  };

  const onRemoveClick = (e: MouseEvent, id: string) => {
    console.log("g remove", id);
    e.stopImmediatePropagation();
  };

  return (
    <div class={clsx({ "w-full": true })} {...attributes}>
      <table class="w-full text-left text-xs text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-50 text-xs capitalize text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                class="cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="w-48 px-4 font-medium text-gray-900 dark:text-white"
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
