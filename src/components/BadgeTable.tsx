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
import { clsx } from "clsx";
import { Checkbox } from "@/components/Checkbox";
import { Confirm, ConfirmOptions } from "@/components/Confirm";
import { useStore } from "@/lib/hooks/useStore";
import type { Badge } from "@/types/Badge";
import css from "./BadgeTable.module.css";
import { IconButton } from "./IconButton";

export type Props = {
  data: Badge[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgeTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);

  const [_, { removeBadge, selectedGroupId, setSelectedGroupId }] = useStore();

  const isDisabledRemove = createMemo(() =>
    props.data.every((x) => !x.selected())
  );

  const [show, setShow] = createSignal(false);
  const [confirmOptions, setConfirmOptions] = createSignal<ConfirmOptions>(
    {} as ConfirmOptions
  );

  const onRemoveClick = (e: MouseEvent) => {
    const selectedBadgeIds = props.data
      .filter((x) => x.selected())
      .map(({ id }) => id);

    setConfirmOptions({
      onConfirm: () => {
        const parentId = selectedGroupId();
        if (!parentId) return;
        removeBadge(parentId, selectedBadgeIds);
        setSelectedGroupId(null);
        setShow(false);
        e.stopImmediatePropagation();
      },
      onClose: () => setShow(false),
      body: `Delete selected ${selectedBadgeIds.length} numbers?`,
      confirmButtonColor: "dangerOutline",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    setShow(true);
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

  const isSelectAll = createMemo(
    () => !!props.data.length && props.data.every((x) => x.selected())
  );

  const selectedItems = createMemo(() =>
    props.data.filter((v) => v.selected())
  );

  return (
    <div class={clsx({ [css.style]: true })} {...attributes}>
      <Show when={show()}>
        <Portal>
          <Confirm {...confirmOptions()} />
        </Portal>
      </Show>

      <table>
        <thead>
          <tr>
            <Show when={props.data.length}>
              <th colSpan={2} scope="col" class="p-2">
                {/* TODO need split as checkbox component */}
                <div class="flex items-center">
                  <Checkbox
                    id="checkbox-all-search"
                    checked={isSelectAll()}
                    onChange={() => onToggleAllClick()}
                    indeterminate={
                      selectedItems().length > 0 &&
                      props.data.length !== selectedItems().length
                    }
                  />
                  <label
                    for="checkbox-all-search"
                    class="ml-3 font-normal text-numba-black"
                  >
                    {selectedItems().length > 0
                      ? `${selectedItems().length} Selected`
                      : "Select All"}
                  </label>
                </div>
              </th>
              <th scope="col">
                <div class={clsx({ [css.iconContainer]: true })}>
                  <IconButton
                    link={true}
                    iconName="delete"
                    iconColor="secondary"
                    onClick={onRemoveClick}
                    disabled={isDisabledRemove()}
                  />
                </div>
              </th>
            </Show>
          </tr>
        </thead>

        <tbody>
          <Show
            when={props.data.length}
            fallback={() => (
              <tr class={clsx({ [css.fallback]: true })}>
                <td>
                  <div>No numbers here yet.</div>
                  <div>
                    Click an object on the canvas and you get a number !
                  </div>
                </td>
              </tr>
            )}
          >
            <For each={props.data}>
              {(item) => (
                <tr class={clsx({ [css.item]: true })}>
                  <td>
                    <div class="flex items-center">
                      <Checkbox
                        id="checkbox-table-search-1"
                        checked={item.selected()}
                        onChange={() => onToggleClick(item.id)}
                      />
                      {/* FIXME this label with class 'sr-only' occurred unexpected scroll effect.  */}
                      {/* <label for="checkbox-table-search-1">checkbox</label> */}
                    </div>
                  </td>
                  <th colSpan={2} scope="row">
                    {item.name}
                  </th>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
};
