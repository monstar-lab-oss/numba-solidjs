import {
  MAX_BADGE_ALLOWED,
  NUMBERING_BADGE_GROUP_ID,
  NUMBERING_GROUP_ID,
  UI_HEIGHT,
  UI_WIDTH,
} from "@/constants";
import { dispatch } from "@/lib/dispatch";
import {
  createGroup,
  createNumberGroup,
  getNode,
  isEnableCreateGroup,
  reduceAllNodes,
  removeBadgeNode,
  removeGroupNode,
  setIndexNode,
} from "@/lib/utils/figmaNodeHandle";
import { getMissingSerialNumber } from "@/lib/utils/getMissingSerialNumber";
import type { Action } from "@/types/Actions";

function shouldMakeBadge(
  node: BaseNode
): ((node: BaseNode) => string | void) | string | void {
  if (!node || !node.parent) return;
  // node is numbering child
  if (node.getPluginData(NUMBERING_BADGE_GROUP_ID)) return;
  // node is group child (normal node)
  if (node.parent.getPluginData(NUMBERING_GROUP_ID)) return node.parent.id;
  // node is nest group
  if (node.getPluginData(NUMBERING_GROUP_ID)) return;
  // or recall own self
  return shouldMakeBadge(node.parent);
}

function onSelectionchange() {
  const [currentNode] = figma.currentPage.selection;

  // Reflected in Store when operated at the Figma panel
  // TODO: Very expensive logic, see useStore.tsx L115
  // badge selected state
  dispatch({
    type: "UI/UPDATE_STORE",
    payload: reduceAllNodes(),
  });

  dispatch({
    type: "UI/TOGGLE_CREATE_GROUP_BUTTON",
    payload: isEnableCreateGroup(currentNode),
  });

  if (!currentNode) return;

  dispatch({
    type: "UI/SHOULD_MAKE_BADGE",
    payload: {
      groupId: shouldMakeBadge(currentNode) as string | undefined,
      targetId: currentNode.id,
    },
  });
}

function onMessage(action: Action) {
  const { type, payload } = action;

  switch (type) {
    case "APP/SELECT_GROUP":
      if (!payload) return (figma.currentPage.selection = []);

      figma.currentPage.selection = [
        // FIXME: We can aggregate these argument
        getNode(payload, "GROUP"),
      ];
      figma.viewport.scrollAndZoomIntoView([getNode(payload, "GROUP")]);
      return;
    case "APP/SELECT_BADGE":
      if (!payload) return (figma.currentPage.selection = []);

      figma.currentPage.selection = [
        // FIXME: We can aggregate these argument
        getNode(payload, "INSTANCE"),
      ];
      figma.viewport.scrollAndZoomIntoView([getNode(payload, "INSTANCE")]);
      return;
    case "APP/CREATE_GROUP": {
      const [currentNode, ...rest] = figma.currentPage.selection;

      if (!currentNode || rest.length)
        return figma.notify("Please select a single node.");

      const group = createGroup(currentNode);
      if (!group) return;

      // FIXME: If I use spread syntax I got `Unexpected token ...` so I do this for now.
      const res = reduceAllNodes();
      res["selectedGroupID"] = group.id;

      figma.currentPage.selection = [currentNode];
      dispatch({
        type: "UI/UPDATE_STORE",
        payload: res,
      });
      return;
    }

    case "APP/REMOVE_GROUP":
      return removeGroupNode(payload);

    case "APP/CREATE_BADGE": {
      const [currentNode] = figma.currentPage.selection;
      if (!currentNode) return;

      createNumberGroup({
        targetNode: currentNode,
        parentNode: getNode(payload, "GROUP"),
      });

      dispatch({
        type: "UI/UPDATE_STORE",
        payload: reduceAllNodes(),
      });

      return;
    }

    case "APP/APPEND_BADGE": {
      const [currentNode] = figma.currentPage.selection;
      if (!currentNode) return;

      const badgeGroup = getNode(payload.parentId, "GROUP")
        .findAllWithCriteria({
          types: ["GROUP"],
        })
        .find((x) => x.getPluginData(NUMBERING_BADGE_GROUP_ID)) as GroupNode;

      if (badgeGroup.children.length + 1 > MAX_BADGE_ALLOWED) {
        figma.notify(
          `Sorry we were unavailable to use the number over ${MAX_BADGE_ALLOWED}.`,
          {
            error: true,
          }
        );
        return;
      }

      const idx = getMissingSerialNumber(
        badgeGroup.children.map((x) => Number(x.name))
      );
      const badgeNode = setIndexNode(idx, currentNode);
      if (!badgeNode) return;
      badgeGroup.insertChild(0, badgeNode);

      dispatch({
        type: "UI/UPDATE_STORE",
        payload: reduceAllNodes(),
      });

      return;
    }
    // TODO: select badge or group, scroll view
    // figma.viewport.scrollAndZoomIntoView([badgeNode]);

    case "APP/REMOVE_BADGES": {
      payload.forEach((id) => removeBadgeNode(id));
      return;
    }
    default:
      return;
  }
}

async function onRun() {
  console.clear();

  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  figma.showUI(__html__, {
    // NOTE: In the future we need implement dark mode style.
    themeColors: false,
    width: UI_WIDTH,
    height: UI_HEIGHT,
  });

  // Initialize store data at startup app
  dispatch({
    type: "UI/UPDATE_STORE",
    payload: reduceAllNodes(),
  });

  const [currentNode] = figma.currentPage.selection;

  dispatch({
    type: "UI/TOGGLE_CREATE_GROUP_BUTTON",
    payload: isEnableCreateGroup(currentNode),
  });
}

function main() {
  figma.on("run", onRun);
  figma.on("selectionchange", onSelectionchange);

  figma.ui.onmessage = onMessage;
}
main();
