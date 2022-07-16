import { Component } from "solid-js";
import { appStore } from "@/lib/store";
import { Button } from "@/components/Button";
import { useDispatch } from "@/lib/hooks/useDispatch";

export const FromScratch: Component = () => {
  const { enabled } = appStore;

  const onClick = () => useDispatch({ type: "CREATE_INDEX", data: null });

  return (
    <>
      <Button disabled={!enabled()} onClick={onClick}>
        Create
      </Button>
    </>
  );
};
