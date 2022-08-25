import type { Action } from "@/types/Actions";

export function dispatch({ type, payload }: Action) {
  type.startsWith("UI")
    ? figma.ui.postMessage({ type, payload })
    : parent.postMessage(
        {
          pluginMessage: {
            type,
            payload,
          },
        },
        "*"
      );
}
