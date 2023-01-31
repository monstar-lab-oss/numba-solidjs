import type { Component, JSX } from "solid-js";
import { clsx } from "clsx";
import type { Color } from "@/types/Colors";
import { Button } from "./Button";
import css from "./Confirm.module.css";
import { Modal } from "./Modal";
import { Text } from "./Text";

export type ConfirmOptions = {
  onConfirm: () => void;
  onClose?: () => void;
  body: JSX.Element;
  cancelButtonText: string;
  confirmButtonColor: Color;
  confirmButtonText: string;
};

export type Props = ConfirmOptions & JSX.HTMLAttributes<HTMLDivElement>;

export const Confirm: Component<Props> = (props) => {
  return (
    <Modal>
      <div class={clsx({ [css.style]: true })}>
        <div class={clsx({ [css.body]: true })}>
          <div class={clsx({ [css.header]: true })}>
            <div class={clsx({ [css.text]: true })}>{props.body}</div>
          </div>
          <div class={clsx({ [css.footer]: true })}>
            {/* FIXME: Need refactor pass the props like more abstractly. */}
            <Button color="secondaryOutline" onClick={props.onClose}>
              {props.cancelButtonText}
            </Button>
            <Button
              color={`${props.confirmButtonColor}`}
              onClick={props.onConfirm}
            >
              <Text size="sizeMedium">{props.confirmButtonText}</Text>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
