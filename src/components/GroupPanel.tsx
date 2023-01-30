import type { Component, JSX } from "solid-js";
import { createSignal, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import { clsx } from "clsx";
import { IconButton } from "@/components/IconButton";
import { Panel } from "@/components/Panel";
import { Tutorial } from "@/components/Tutorial";
import type { UseStoreType } from "@/lib/hooks/useStore";
import css from "./GroupPanel.module.css";
import { Text } from "./Text";

export type Props = {
  createButtonDisabled: boolean;
  onCreateClick: () => void;
  children: JSX.Element;
  useStore: () => UseStoreType;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupPanel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, [
    "onCreateClick",
    "createButtonDisabled",
    "children",
  ]);
  const [_, { setFirstOpen, firstOpen }] = props.useStore();
  const [showTutorial, setShowTutorial] = createSignal(false);

  const tutorialOnCLose = () => {
    setFirstOpen(false);
    setShowTutorial(false);
  };

  return (
    <Panel>
      <Show when={showTutorial() || firstOpen()}>
        <Portal>
          <Tutorial onClose={tutorialOnCLose} />
        </Portal>
      </Show>

      <div class={clsx({ [css.style]: true })}>
        <div class={clsx({ [css.header]: true })} {...attributes}>
          <Text size="sizeLarge" weight="weightBold">
            Groups
          </Text>
          <IconButton
            onClick={props.onCreateClick}
            disabled={props.createButtonDisabled}
            iconName="create"
            iconColor="white"
            iconDisabledColor="white"
            buttonColor="primary"
          >
            Create
          </IconButton>
        </div>

        <div>{props.children}</div>
      </div>
      {/* TODO: need refactor */}
      <div class="absolute bottom-0 left-0 bg-black rounded-full p-1.5 m-4 w-8 h-8">
        <IconButton
          iconName="help"
          iconColor="white"
          buttonColor="secondary"
          link
          onClick={() => setShowTutorial(true)}
        />
      </div>
    </Panel>
  );
};
