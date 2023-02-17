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
import css from "@/components/BadgeTable.module.css";
import { Checkbox } from "@/components/Checkbox";
import { Confirm, ConfirmOptions } from "@/components/Confirm";
import { IconButton } from "@/components/IconButton";
import { Text } from "@/components/Text";
import type { UseStoreType } from "@/lib/hooks/useStore";
import type { Badge } from "@/types/Badge";

export type Props = {
  data: Badge[];
  useStore: () => UseStoreType;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgeTable: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["data"]);

  const [_, { removeBadge, selectedGroupId, setSelectedBadgeID }] =
    props.useStore();

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
    if (isIndeterminate()) {
      // FIXME: After false to indeterminate checkbox's check never changed. So this is workaround.
      props.data.forEach((x) => x.setSelected(true));
      props.data.forEach((x) => x.setSelected(false));
      return;
    }

    const toggle = isIndeterminate() || isSelectAll();
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

  const isIndeterminate = () =>
    selectedItems().length > 0 && props.data.length !== selectedItems().length;

  const BadgeCard = ({ item }: { item: Badge }) => {
    const [clicked, setClicked] = createSignal(false);
    const [prevInterval, setPrevInterval] = createSignal<number | null>(null);

    const onRowClicked = () => {
      const prev = prevInterval();
      if (prev) clearInterval(prev);
      setClicked(true);
      setPrevInterval(setTimeout(() => setClicked(false), 1000));
    };

    return (
      <tr
        class={clsx({ [css.item]: true, [css.clicked]: clicked() })}
        onClick={onRowClicked}
      >
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
        <th colSpan={2} scope="row" onClick={() => setSelectedBadgeID(item.id)}>
          <div class={clsx({ [css.textWrapper]: true })}>
            <Text class={clsx({ [css.text]: true })} size="sizeMedium">
              {item.name}
            </Text>
          </div>
        </th>
      </tr>
    );
  };

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
              <th colSpan={2} scope="col" class="py-2 pr-2 pl-4">
                {/* TODO need split as checkbox component */}
                <div class="flex items-center">
                  <Checkbox
                    id="checkbox-all-search"
                    checked={isSelectAll()}
                    onChange={() => onToggleAllClick()}
                    indeterminate={isIndeterminate() || isSelectAll()}
                  />
                  <label for="checkbox-all-search" class="ml-2">
                    <Text size="sizeSmall" weight="weightRegular">
                      {selectedItems().length > 0
                        ? `${selectedItems().length} Selected`
                        : "Select All"}
                    </Text>
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
                  <Text color="darkGray" size="sizeSmall">
                    No numbers here yet.
                  </Text>
                  <Text color="darkGray" size="sizeSmall">
                    Click an object on the canvas and you get a number !
                  </Text>
                </td>
              </tr>
            )}
          >
            <For each={props.data}>{(item) => <BadgeCard item={item} />}</For>
          </Show>
        </tbody>
      </table>
    </div>
  );
};
