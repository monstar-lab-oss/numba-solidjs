import { createSignal, createRoot } from "solid-js";

function createAppStore() {
  const [enabled, setEnabled] = createSignal(false);

  return { enabled, setEnabled };
}

export const appStore = createRoot(createAppStore);
