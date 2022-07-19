import type { FigmaMessage } from "@/types/Actions";

export const useDispatch = ({ type, data }: FigmaMessage) =>
  parent.postMessage({ pluginMessage: { type, data } }, "*");
