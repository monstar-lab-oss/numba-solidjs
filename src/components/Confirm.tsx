import type { Component, JSX } from "solid-js";
import { Show } from "solid-js";
import { ConfirmOptions } from "@/types/Confirm";
import { Button } from "./Button";
import { clsx } from "clsx";
import css from "./Confirm.module.css";

export type Props = {
  options: ConfirmOptions;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Confirm: Component<Props> = (props) => {
  return (
    // FIXME: When use "Show" component , storybook got an error.
    <div class={clsx({ hidden: !props.options.show })}>
      <div class={clsx({ [css.modal]: true })}>
        <div class={clsx({ [css.modal_inner]: true })}>
          <div class={clsx({ [css.body]: true })}>
            <div class={clsx({ [css.header]: true })}>
              <div class={clsx({ [css.text]: true })}>{props.options.body}</div>
            </div>
            <div class={clsx({ [css.footer]: true })}>
              <Button use="secondaryOutline" onClick={props.options.onClose}>
                {props.options.cancelButtonText}
              </Button>
              <Button
                use={`${props.options.confirmButtonColor}`}
                onClick={props.options.onConfirm}
              >
                {props.options.confirmButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
