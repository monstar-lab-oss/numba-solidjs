import type { Color } from "@/types/Colors";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";

export type Props = {
  color?: Color;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["color"]);

  return (
    <div
    //   class={clsx({
    //     [css.style]: true,
    //     [css.primary]: props.color === "primary",
    //     [css.danger]: props.color === "danger",
    //     [css.secondary]: props.color === "secondary",
    //     [css.primaryOutline]: props.color === "primaryOutline",
    //     [css.dangerOutline]: props.color === "dangerOutline",
    //     [css.secondaryOutline]: props.color === "secondaryOutline",
    //   })}
    >
      <input
        id="checkbox-all-search"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        {...attributes}

        // indeterminate={true}
      />
      <label for="checkbox-all-search" class="sr-only">
        checkbox
      </label>
    </div>
  );
};
