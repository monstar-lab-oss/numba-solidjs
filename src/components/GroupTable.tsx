import {
  Component,
  createMemo,
  createSignal,
  For,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { clsx } from "clsx";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { TextField } from "@/components/TextField";
import type { UseStoreType } from "@/lib/hooks/useStore";
import type { Group } from "@/types/Group";
import css from "./GroupTable.module.css";

// NOTE: I want to create component as search component.
export type GroupSearchProps = {
  query: () => string;
  setQuery: (_: string) => void;
} & JSX.HTMLAttributes<HTMLFormElement>;

const GroupSearch: Component<GroupSearchProps> = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} class="mb-3">
      <TextField
        id="query"
        value={props.query()}
        type="text"
        placeholder="Search"
        onInput={(e) => props.setQuery(e.currentTarget.value)}
        prefixElement={<Icon name="search" color="disabled" />}
        suffixElement={
          !!props.query().length && (
            <IconButton
              iconName="textDelete"
              iconColor="secondary"
              link
              onClick={() => props.setQuery("")}
            />
          )
        }
      />
    </form>
  );
};

export type Props = {
  data: Group[];
  useStore: () => UseStoreType;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);
  const [query, setQuery] = createSignal("");
  const [_, { selectedGroupId, setSelectedGroupId }] = props.useStore();

  const onSelectClick = (e: MouseEvent, id: string) => {
    setSelectedGroupId(selectedGroupId() !== id ? id : null);
    e.stopImmediatePropagation();
  };

  const filteredData = createMemo(() => {
    if (!query()) return props.data;
    const re = new RegExp(query(), "i");
    return props.data.filter((x) => re.test(x.name));
  });

  return (
    <div class={clsx({ [css.style]: true })} {...attributes}>
      <table class={clsx({ [css.style]: true })}>
        <thead>
          <tr>
            <td>
              <GroupSearch query={query} setQuery={setQuery} />
            </td>
          </tr>
        </thead>
        <Show
          when={props.data.length}
          fallback={() => (
            <span class={clsx({ [css.emptyMessage]: true })}>
              {/* First select a frame/object you want to add numbering to 😄 */}
              No groups in the list.
            </span>
          )}
        >
          <tbody class="border-t">
            <For
              each={filteredData()}
              fallback={() => (
                <tr>
                  <td>Oops! No groups found.</td>
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
                </tr>
              )}
            </For>
          </tbody>
        </Show>
      </table>
    </div>
  );
};
