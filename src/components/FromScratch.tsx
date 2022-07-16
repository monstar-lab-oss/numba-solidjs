import { Component, JSX, splitProps } from "solid-js";
import { appStore } from "@/lib/store";

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: JSX.Element;
};
const Button: Component<ButtonProps> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);
  return (
    // disabled={props.disabled} onClick={props.onClick}
    <button {...attributes}>{props.children}</button>
  );
};

export const FromScratch: Component = () => {
  const { enabled, setEnabled } = appStore;

  window.onmessage = ({ data }: { data: { pluginMessage: any } }) => {
    const { type, payload } = data.pluginMessage;
    switch (type) {
      case "SELECTION_CHANGE":
        setEnabled(payload);
        return;
      case "RUN":
        return;
      default:
        return;
    }
  };

  const onClick = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "CREATE_INDEX",
          data: "CREATE_INDEX_DATA",
        },
      },
      "*"
    );
  };

  return (
    <>
      <Button disabled={!enabled()} onClick={onClick}>
        Create
      </Button>
    </>
  );
};
