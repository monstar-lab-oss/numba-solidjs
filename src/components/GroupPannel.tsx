import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { clsx } from "clsx";
import { Button } from "@/components/Button";
import { Pannel } from "@/components/Pannel";
import { GroupTable } from "@/components/GroupTable";

export type Props = {} & JSX.HTMLAttributes<HTMLDivElement>;

export const GroupPannel: Component<Props> = (props) => {
  const [, attributes] = splitProps(props, []);

  // TODO:
  const data = new Array(10).fill(null).map((_, i) => ({
    id: `id${i}`,
    name: `Name${i}`,
  }));

  return (
    <Pannel>
      <div class={clsx({ "grid grid-rows-1 gap-4": true })}>
        <div class={clsx({ "flex justify-end": true })} {...attributes}>
          <Button>Create</Button>
        </div>
        <div>
          <GroupTable data={data} />
        </div>
      </div>
    </Pannel>
  );
};
