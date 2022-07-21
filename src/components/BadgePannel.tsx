import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { Button } from "@/components/Button";
import { Pannel } from "@/components/Pannel";
import { BadgeTable } from "@/components/BadgeTable";

export type Props = {} & JSX.HTMLAttributes<HTMLDivElement>;

export const BadgePannel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, []);

  // TODO:
  const data = new Array(10).fill(null).map((_, i) => ({
    id: `id${i}`,
    name: `${i + 1}`,
  }));

  return (
    <Pannel>
      <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
        {/* FIXME: Fixed height only now */}
        <div class={clsx({ "flex h-8 justify-end": true })} {...attributes} />
        <div>
          <BadgeTable data={data} />
        </div>
      </div>
    </Pannel>
  );
};
