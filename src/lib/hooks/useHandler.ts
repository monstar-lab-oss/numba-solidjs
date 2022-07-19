import { store } from "@/lib/store";
import { onCleanup } from "solid-js";
// import { useDispatch } from "@/lib/hooks/useDispatch";
import type { PluginMessage } from "@/types/Actions";

export function useHandler() {
  const { setEnabled, syncAll, createGroup, createBadge } = store;

  const messageHandler = ({
    data,
  }: MessageEvent<{ pluginMessage: PluginMessage }>) => {
    const { type, payload } = data.pluginMessage;
    switch (type) {
      case "SELECTION_CHANGE":
        setEnabled(payload);
        return;
      case "GROUP/CREATE":
        createGroup(payload);
        return;
      case "BADGE/CREATE":
        createBadge(payload);
        return;
      case "GROUP/INITIALIZE":
        syncAll(payload);
        return;
      default:
        return;
    }
  };
  window.addEventListener("message", messageHandler);
  onCleanup(() => window.removeEventListener("message", messageHandler));
}
