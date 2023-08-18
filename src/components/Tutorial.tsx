import { Component } from "solid-js";
import { clsx } from "clsx";
import type { Content } from "@/components/Carousel";
import { Carousel } from "@/components/Carousel";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import css from "@/components/Tutorial.module.css";
import { Icon } from "./Icon";

export type Props = {
  version: string;
  onClose: () => void;
};

export const Tutorial: Component<Props> = (props) => {
  const contents: Content[] = [
    {
      src: "",
      body: (
        <>
          <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
            Select the group you want to assign numbers
          </Text>
          <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
            and click "Create" button.
          </Text>
        </>
      ),
    },
    {
      src: "",
      body: (
        <>
          <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
            To start assigning numbers,
          </Text>
          <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
            click the object on the canvas.
          </Text>
          <Text
            size="sizeSmall"
            color="darkGray"
            class={clsx({ [css.text]: true, [css.textSmall]: true })}
          >
            ※ The number is available up to 999.
          </Text>
        </>
      ),
    },
    {
      src: "",
      body: (
        <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
          To check the assigned numbers, select a group
        </Text>
      ),
    },
    {
      src: "",
      body: (
        <>
          <div class={clsx({ [css.textWithIcon]: true })}>
            <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
              {`Click on the `}
            </Text>
            <Icon name="delete" color="secondary" size={16} />
            <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
              {` to delete the numbers from the`}
            </Text>
          </div>

          <Text size="sizeMedium" class={clsx({ [css.text]: true })}>
            selected group.
          </Text>
        </>
      ),
    },
  ];

  return (
    <Modal bgColor="white">
      <div class={clsx({ [css.style]: true })}>
        <Text
          size="sizeSmall"
          color="darkGray"
          class={clsx({ [css.version]: true })}
        >
          {`v${props.version}`}
        </Text>
        <div class={clsx({ [css.carousel]: true })}>
          <Carousel contents={contents} onClose={props.onClose} />
        </div>
      </div>
    </Modal>
  );
};
