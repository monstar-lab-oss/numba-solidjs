import { Confirm, ConfirmOptions } from "@/components/Confirm";
import { useStore } from "@/lib/hooks/useStore";
import type { Group } from "@/types/Group";
import { clsx } from "clsx";
import {
  Component,
  createMemo,
  createSignal,
  For,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { Portal } from "solid-js/web";
import css from "./GroupTable.module.css";

export type GroupSearchProps = {
  query: () => string;
  setQuery: (_: string) => void;
} & JSX.HTMLAttributes<HTMLFormElement>;
const GroupSearch: Component<GroupSearchProps> = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-600 shadow-sm focus:outline-none"
        id="query"
        value={props.query()}
        type="text"
        placeholder="Search"
        onInput={(e) => {
          props.setQuery(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export type Props = {
  data: Group[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);
  const [query, setQuery] = createSignal("");
  const [show, setShow] = createSignal(false);
  const [confirmOptions, setConfirmOptions] = createSignal<ConfirmOptions>(
    {} as ConfirmOptions
  );
  const [_, { selectedGroupId, setSelectedGroupId, removeGroup }] = useStore();

  const onSelectClick = (e: MouseEvent, id: string) => {
    setSelectedGroupId(selectedGroupId() !== id ? id : null);
    e.stopImmediatePropagation();
  };

  const onRemoveClick = (e: MouseEvent, id: string) => {
    setConfirmOptions({
      onConfirm: () => {
        removeGroup(id);
        setShow(false);
        e.stopImmediatePropagation();
      },
      onClose: () => setShow(false),
      body: `Delete this group?`,
      confirmButtonColor: "dangerOutline",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    setShow(true);
  };

  const filteredData = createMemo(() => {
    if (!query()) return props.data;
    const re = new RegExp(query(), "i");
    return props.data.filter((x) => re.test(x.name));
  });

  return (
    <div class={clsx({ "w-full": true })} {...attributes}>
      <Show when={show()}>
        <Portal>
          <Confirm {...confirmOptions()} />
        </Portal>
      </Show>
      <Show
        when={props.data.length}
        fallback={() => (
          <span class="inline-block rounded bg-gray-100 px-4 py-2 text-xs text-gray-400">
            First select a frame/object you want to add numbering to 😄
          </span>
        )}
      >
        <GroupSearch query={query} setQuery={setQuery} />
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
            <For
              each={filteredData()}
              fallback={() => (
                <tr>
                  <td>Sorry, no matches found</td>
                </tr>
              )}
            >
              {(item) => (
                <tr
                  onClick={(e) => onSelectClick(e, item.id)}
                  class={clsx({
                    [css.selected_row]: selectedGroupId() === item.id,
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
      </Show>
    </div>
  );
};
