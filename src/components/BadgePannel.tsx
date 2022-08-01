import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { Pannel } from "@/components/Pannel";

export type Props = {
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgePannel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, ["children"]);

  return (
    <Pannel>
      <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
        {/* FIXME: Fixed height only now */}
        <div class={clsx({ "flex h-8 justify-end": true })} {...attributes} />
        <div>{props.children}</div>
      </div>
    </Pannel>
  );
};