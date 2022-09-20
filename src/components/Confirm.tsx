import type { Component, JSX } from "solid-js";
import { Button } from "./Button";
import { clsx } from "clsx";
import css from "./Confirm.module.css";
import type { Color } from "@/types/Colors";
import { Portal } from "solid-js/web";

export type ConfirmOptions = {
  onConfirm: () => void;
  onClose: () => void;
  body: JSX.Element;
  cancelButtonText: string;
  confirmButtonColor: Color;
  confirmButtonText: string;
};

export type Props = ConfirmOptions & JSX.HTMLAttributes<HTMLDivElement>;

export const Confirm: Component<Props> = (props) => {
  return (
    <Portal>
      <div class={clsx({ [css.modal]: true })}>
        <div class={clsx({ [css.modalInner]: true })}>
          <div class={clsx({ [css.body]: true })}>
            <div class={clsx({ [css.header]: true })}>
              <div class={clsx({ [css.text]: true })}>{props.body}</div>
            </div>
            <div class={clsx({ [css.footer]: true })}>
              <Button use="primaryOutline" onClick={props.onClose}>
                {props.cancelButtonText}
              </Button>
              <Button
                use={`${props.confirmButtonColor}`}
                onClick={props.onConfirm}
              >
                {props.confirmButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
