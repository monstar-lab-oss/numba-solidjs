import { setColor } from "@/lib/utils/figmaRGBA";
import { BADGE_ID } from "@/constants";

// TODO: remove scan function
export function scan() {
  // Currently using `findAllWithCriteria`, should I use `findChildren` ?
  // OR https://github.com/figma/plugin-samples/blob/22e12c5406c72f2a88d18810d3a6efb18ece0356/text-search/code.ts#L28-L36
  const instances = getNodesByType("INSTANCE") as InstanceNode[];

  const badgeNodes = instances.filter(
    // Badge has its own ID that we specify
    (i) => i.mainComponent && i.mainComponent.description === BADGE_ID
  );

  const parentIds = badgeNodes.map((b) => b.parent && b.parent.id);
  const groupIds = parentIds.filter((v, i, a) => a.indexOf(v) === i);

  const groups = groupIds.map((id) => {
    const node = getNodesByType("GROUP").find((g) => g.id === id);
    if (!node) return;
    return {
      id,
      name: node.name,
    };
  });

  const parentNodes = badgeNodes.map((b) => b.parent as GroupNode);

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

export function getGroupNodeById(id: string) {
  const node = getNodesByType("GROUP").find((g) => g.id === id);
  if (!node) throw new Error("NO GROUP NODE!");
  return node as GroupNode;
}

export function setGroup(node: SceneNode, name: string) {
  const group = figma.group([node], figma.currentPage);
  group.name = `numbering_${name}`;

  return group;
}

export function removeGroupNode(id: string) {
  const node = getGroupNodeById(id);
  node.remove();
}

export function removeBadgeNode(id: string) {
  const node = getNodesByType("INSTANCE").find((g) => g.id === id);
  if (!node) throw new Error("NO BADGE NODE!");

  node.remove();
}

export function setIndexNode(index: number, targetNode: SceneNode) {
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
