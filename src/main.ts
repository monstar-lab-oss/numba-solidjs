import { figmaRGBA } from "@/lib/utils";
import type { FigmaMessage } from "@/types/Actions";

const BADGE_ID = "BADGE_,d7e*jKXL}fCF3KiLxzs";

function setColor({ r = 0, g = 0, b = 0, a = 1 }) {
  return <SolidPaint>{
    type: "SOLID",
    color: figmaRGBA({ r, g, b, a }),
    opacity: a,
  };
}

function scan() {
  // Currently using `findAllWithCriteria`, should I use `findChildren` ?
  // OR https://github.com/figma/plugin-samples/blob/22e12c5406c72f2a88d18810d3a6efb18ece0356/text-search/code.ts#L28-L36
  const instances = getNodesByType("INSTANCE") as InstanceNode[];

  const badgeNodes = instances.filter(
    // Badge has its own ID that we specify
    (i) => i.mainComponent && i.mainComponent.description === BADGE_ID
  );
  const parentNodes = badgeNodes.map((b) => b.parent as GroupNode);

  const groups = parentNodes.map((x) => ({ id: x.id, name: x.name }));

  const badges = parentNodes.reduce((acc, cur) => {
    return Object.assign(acc, {
      [cur.id]: cur.children.map((x) => ({
        id: x.id,
        name: x.name,
        color: "BLUE",
      })),
    });
  }, {});

  return [groups, badges];
}

function getNodesByType(type: "INSTANCE" | "GROUP") {
  const nodes: SceneNode[] = figma.currentPage.findAllWithCriteria({
    types: [type],
  });
  return nodes;
}

function setGroup(node: SceneNode, name: string) {
  const group = figma.group([node], figma.currentPage);
  group.name = `numbering_${name}`;

  return group;
}

function removeGroupNode(id: string) {
  const node = getNodesByType("GROUP").find((g) => g.id === id);
  if (!node) throw new Error("NO GROUP NODE!");

  node.remove();
}

function removeBadgeNode(id: string) {
  const node = getNodesByType("INSTANCE").find((g) => g.id === id);
  if (!node) throw new Error("NO BADGE NODE!");

  node.remove();
}

function setIndexNode(index: number, targetNode: SceneNode) {
  const componentNode = figma.createComponent();
  componentNode.name = `${index}`;
  componentNode.resize(24, 24);
  componentNode.cornerRadius = 24;
  componentNode.layoutMode = "HORIZONTAL";
  // TODO: user custom color
  componentNode.fills = [setColor({ r: 24, g: 160, b: 251 })];
  // TODO: use by id when reload file
  componentNode.description = BADGE_ID;

  const textNode = figma.createText();
  textNode.fontSize = 12;
  textNode.characters = `${index}`;
  textNode.fills = [setColor({ r: 255, g: 255, b: 255 })];
  textNode.resize(24, 24);
  textNode.textAlignHorizontal = "CENTER";
  textNode.fontName = { family: "Inter", style: "Bold" };
  textNode.lineHeight = { value: 24, unit: "PIXELS" };
  componentNode.appendChild(textNode);

  const instanceNode = componentNode.createInstance();

  // refs. https://forum.figma.com/t/known-bug-getting-x-y-coordinates-of-rectangles-within-frames-but-not-groups/7012
  const newNode = targetNode.absoluteTransform;

  instanceNode.x = newNode[0][2] - 8;
  instanceNode.y = newNode[1][2] - 8;

  componentNode.remove();
  return instanceNode;
}

/**
 *
 */
figma.showUI(__html__, { themeColors: true, width: 450, height: 300 });

/**
 * Messages
 */
figma.on("selectionchange", () => {
  scan();

  const current = figma.currentPage.selection;

  // REMOVE OR NO SELECT
  if (!current.length) {
    figma.ui.postMessage({
      type: "GROUP/INITIALIZE",
      // FIXME: Change: replacing all items in the Store does not seem to be very good from a performance standpoint.
      payload: scan(),
    });
    return;
  }

  figma.ui.postMessage({ type: "SELECTION_CHANGE", payload: !!current.length });
});

figma.on("run", async () => {
  console.clear();

  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  figma.ui.postMessage({
    type: "GROUP/INITIALIZE",
    // FIXME: Change: replacing all items in the Store does not seem to be very good from a performance standpoint.
    payload: scan(),
  });
});

/**
 *
 */
figma.ui.onmessage = (msg: FigmaMessage) => {
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
    case "REMOVE_GROUP":
      removeGroupNode(data);
      return;
    case "REMOVE_BADGE":
      removeBadgeNode(data);
      return;
    default:
      return;
  }
  //FIXME: prevent close in developing
  // figma.closePlugin();
};

export {};
