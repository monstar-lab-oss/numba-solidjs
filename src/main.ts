import { getMissingSerialNumber } from "@/lib/utils/getMissingSerialNumber";
import type { FigmaMessage } from "@/types/Actions";
import {
  scan,
  setGroup,
  getGroupNodeById,
  removeGroupNode,
  removeBadgeNode,
  setIndexNode,
} from "@/lib/utils/figmaNodeHandle";
import { UI_WIDTH, UI_HEIGHT } from "@/constants";

// global state
let selectedGroup: GroupNode | undefined;

function onSelectionchange() {
  scan();

  const [current] = figma.currentPage.selection;

  figma.ui.postMessage({ type: "GROUP/ENABLE", payload: !!current });

  // REMOVE OR NO SELECT
  if (!current) {
    figma.ui.postMessage({
      type: "GROUP/INITIALIZE",
      // FIXME: Change: replacing all items in the Store does not seem to be very good from a performance standpoint.
      payload: scan(),
    });
    return;
  }

  // SELECTED
  if (!selectedGroup) return;

  const idx = getMissingSerialNumber(
    selectedGroup.children.map((x) => Number(x.name))
  );
  const badgeNode = setIndexNode(idx, current);

  selectedGroup.appendChild(badgeNode);

  figma.ui.postMessage({
    type: "BADGE/CREATE",
    payload: {
      parentId: selectedGroup.id,
      id: badgeNode.id,
      name: badgeNode.name,
    },
  });
}

function onMessage(msg: FigmaMessage) {
  const { type, data } = msg;
  switch (type) {
    case "CREATE_INDEX":
      // Currently creating index badge for single object. should we need to support multiple?
      const [current] = figma.currentPage.selection;

      const node = setIndexNode(1, current);
      const group = setGroup(node, current.name);

      figma.ui.postMessage({
        type: "GROUP/CREATE",
        payload: {
          id: group.id,
          name: group.name,
        },
      });

      figma.ui.postMessage({
        type: "BADGE/CREATE",
        payload: {
          parentId: group.id,
          id: node.id,
          name: node.name,
        },
      });
      // TODO:
      // figma.viewport.scrollAndZoomIntoView([indexNode]);
      // figma.currentPage.appendChild(indexNode);
      return;
    case "SELECT_GROUP":
      selectedGroup = data ? getGroupNodeById(data) : undefined;
      return;
    case "REMOVE_GROUP":
      removeGroupNode(data);
      selectedGroup = undefined;
      return;
    case "REMOVE_BADGE":
      data.forEach((badge) => removeBadgeNode(badge));
      return;
    default:
      return;
  }
  //FIXME: prevent close in developing
  // figma.closePlugin();
}

async function onRun() {
  console.clear();

  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  figma.showUI(__html__, {
    themeColors: true,
    width: UI_WIDTH,
    height: UI_HEIGHT,
  });

  const current = figma.currentPage.selection;
  figma.ui.postMessage({ type: "GROUP/ENABLE", payload: !!current.length });

  figma.ui.postMessage({
    type: "GROUP/INITIALIZE",
    // FIXME: Change: replacing all items in the Store does not seem to be very good from a performance standpoint.
    payload: scan(),
  });
}

function main() {
  figma.on("run", onRun);
  figma.on("selectionchange", onSelectionchange);

  figma.ui.onmessage = onMessage;
}
main();
