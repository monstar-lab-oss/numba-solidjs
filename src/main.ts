import { figmaRGBA } from "@/lib/utils";
import type { FigmaMessage } from "@/types/Actions";

function setColor({ r = 0, g = 0, b = 0, a = 1 }) {
  return <SolidPaint>{
    type: "SOLID",
    color: figmaRGBA({ r, g, b, a }),
    opacity: a,
  };
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
  componentNode.description = "COMPONENT_ID";

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
  const current = figma.currentPage.selection;
  figma.ui.postMessage({ type: "SELECTION_CHANGE", payload: !!current.length });
});

figma.on("run", async () => {
  console.clear();

  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  figma.ui.postMessage({
    type: "RUN",
    payload: null,
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
