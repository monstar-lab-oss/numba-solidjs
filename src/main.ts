import { UI_WIDTH, UI_HEIGHT, NUMBERING_GROUP_ID } from "@/constants";
import type { FigmaMessage, Action } from "@/types/Actions";
import { store, subscribes, initializeStore, updateStoreUI } from "@/lib/store";
import { dispatch } from "@/lib/dispatch";
import { getMissingSerialNumber } from "@/lib/utils/getMissingSerialNumber";
import {
  scan,
  setGroup,
  getNodesByType,
  getGroupNodeById,
  removeGroupNode,
  removeBadgeNode,
  setIndexNode,
  createGroup,
} from "@/lib/utils/figmaNodeHandle";

// global state
let selectedGroup: GroupNode | undefined;

function isEnableCreategroup(node?: SceneNode) {
  if (!node) return false;

  // Group node
  if (node.getPluginData(NUMBERING_GROUP_ID)) return false;

  // Node already included in the Group node
  if (node.parent && node.parent.getPluginData(NUMBERING_GROUP_ID))
    return false;

  return true;
}

function onSelectionchange() {
  const [currentNode] = figma.currentPage.selection;

  dispatch({
    type: "UI/TOGGLE_CREATE_GROUP_BUTTON",
    payload: isEnableCreategroup(currentNode),
  });

  // SELECTED
  if (!selectedGroup) return;

  const idx = getMissingSerialNumber(
    selectedGroup.children.map((x) => Number(x.name))
  );
  const badgeNode = setIndexNode(idx, currentNode);

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

function onMessage(action: Action) {
  const { type, payload } = action;

  switch (type) {
    case "APP/CREATE_GROUP":
      if (figma.currentPage.selection.length !== 1)
        return figma.notify("Please select a single node.");

      const [currentNode] = figma.currentPage.selection;

      const groupNode = createGroup(currentNode);
      if (!groupNode) return;

      // Add also items in store.
      // TODO: Can we subscribe when there are changes on Figma and effectively reflect them in store?
      store.numberingGroups = [
        ...store.numberingGroups,
        { id: groupNode.id, name: groupNode.name },
      ];
      return;
    case "APP/REMOVE_GROUP":
      removeGroupNode(payload);
      // Remove also items in store.
      // TODO: Can we subscribe when there are changes on Figma and effectively reflect them in store?
      store.numberingGroups = store.numberingGroups.filter(
        (x) => x.id !== payload
      );
      return;
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

  // Initialize store data at startup app
  initializeStore({
    numberingGroups: getNodesByType("GROUP")
      .map(
        (g) => g.getPluginData(NUMBERING_GROUP_ID) && { id: g.id, name: g.name }
      )
      .filter((x) => x) as { id: string; name: string }[],
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
