import {
  MAX_BADGE_ALLOWED,
  NUMBA_BADGE_INDEX,
  NUMBA_BADGE_THROTTLING,
  NUMBA_IS_OPEND_TUTORIAL,
  NUMBA_LAST_BADGED_AT,
  NUMBA_SELECTED_GROUP,
  NUMBERING_BADGE_GROUP_ID,
  NUMBERING_GROUP_ID,
  UI_HEIGHT,
  UI_WIDTH,
} from "@/constants";
import { dispatch } from "@/lib/dispatch";
import type { NodeWithChildren } from "@/lib/utils/figmaNodeHandle";
import {
  createGroup,
  createNumberGroup,
  getNode,
  getNumberingGroup,
  isEnableCreateGroup,
  isRelatedWithNUMBA,
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

async function onSelectionchange() {
  const [currentNode] = figma.currentPage.selection;

  // If the node is related with NUMBA which mean, you don't need any process to run

  if (!currentNode || isRelatedWithNUMBA(currentNode)) {
    const groupNode = currentNode
      ? getNumberingGroup(currentNode as NodeWithChildren)
      : null;

    dispatch({
      type: "UI/FOCUS_GROUP",
      payload: groupNode ? groupNode.id : "",
    });
    return;
  }

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

  const groupID = shouldMakeBadge(currentNode) as string | undefined;

  if (groupID) {
    figma.clientStorage.setAsync(NUMBA_SELECTED_GROUP, groupID);
    const now = Date.now();
    const prev = await figma.clientStorage.getAsync(NUMBA_LAST_BADGED_AT);

    // FIXME: サイドバーからバッジを付与すると選択されているオブジェクトがシフトして再度バッジが付与されてしまうので時間で制御
    // FIXME: 詳細 https://github.com/monstar-lab-group/numba/pull/181#discussion_r1098304731
    if (now - prev <= NUMBA_BADGE_THROTTLING) return;

    // NOTE: https://github.com/monstar-lab-group/numba/issues/156#issuecomment-1422071421
    // NOTE: 実際に使ってみてから検討
    // const currentGroupID = await figma.clientStorage.getAsync(
    //   NUMBA_SELECTED_GROUP
    // );
    // if (currentGroupID === groupID) return;

    await figma.clientStorage.setAsync(NUMBA_LAST_BADGED_AT, now);
    dispatch({
      type: "UI/SHOULD_MAKE_BADGE",
      payload: {
        groupId: groupID,
        targetId: currentNode.id,
      },
    });
  }

  const groupNode = getNumberingGroup(currentNode as NodeWithChildren);
  dispatch({
    type: "UI/FOCUS_GROUP",
    payload: groupNode ? groupNode.id : "",
  });
}

async function onMessage(action: Action) {
  const { type, payload } = action;

  switch (type) {
    case "APP/SELECT_GROUP":
      if (!payload) return (figma.currentPage.selection = []);

      figma.currentPage.selection = [
        // FIXME: We can aggregate these argument
        getNode(payload, "GROUP"),
      ];
      figma.viewport.scrollAndZoomIntoView([getNode(payload, "GROUP")]);
      await figma.clientStorage.setAsync(NUMBA_SELECTED_GROUP, payload);
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

      const group = createGroup(currentNode, payload);
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

      const badgeGroup = getNode(payload.parentId, "GROUP").findChild(
        (x) => !!x.getPluginData(NUMBERING_BADGE_GROUP_ID)
      ) as GroupNode;


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
        badgeGroup.children.map((v) =>
          Number(v.getPluginData(NUMBA_BADGE_INDEX))
        )
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
      payload.badges.forEach((id) => removeBadgeNode(id, payload.groupID));
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

  const payload = reduceAllNodes();

  // 初めてNUMBAを起動したユーザーの場合のみ、チュートリアルを表示する
  if (!(await figma.clientStorage.getAsync(NUMBA_IS_OPEND_TUTORIAL))) {
    dispatch({
      type: "UI/SHOW_TUTORIAL",
      payload: undefined,
    });

    figma.clientStorage.setAsync(NUMBA_IS_OPEND_TUTORIAL, true);
  }

  // Initialize store data at startup app
  dispatch({
    type: "UI/UPDATE_STORE",
    payload,
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
