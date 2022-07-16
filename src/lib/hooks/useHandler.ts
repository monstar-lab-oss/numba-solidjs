import { appStore } from "@/lib/store";
import { onCleanup } from "solid-js";

type PluginMessage = {
  type: string;
  payload: any;
};

export function useHandler() {
  const { setEnabled } = appStore;

  const messageHandler = ({
    data,
  }: MessageEvent<{ pluginMessage: PluginMessage }>) => {
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
  window.addEventListener("message", messageHandler);
  onCleanup(() => window.removeEventListener("message", messageHandler));
}
