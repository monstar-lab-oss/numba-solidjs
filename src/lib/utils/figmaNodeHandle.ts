import { setColor } from "@/lib/utils/figmaRGBA";
import {
  BADGE_TARGET_ID,
  GROUP_NAME,
  NUMBERING_BADGE_GROUP_ID,
  NUMBERING_GROUP_ID,
} from "@/constants";

export function reduceAllNodes() {
  const numberingbadgeGroups = getNodesByType("GROUP")
    .map((g) => g.getPluginData(NUMBERING_BADGE_GROUP_ID) && (g as GroupNode))
    .filter((x) => x)
    .reduce((acc, cur) => {
      if (!cur) return acc;
      if (!cur.parent) return acc;

      return Object.assign(acc, {
        [cur.parent.id]: cur.children.map((x) => ({
          id: x.id,
          name: x.name,
          color: "BLUE",
          targetId: x.getPluginData(BADGE_TARGET_ID),
        })),
      });
    }, {});

  const numberingGroups = getNodesByType("GROUP")
    .map(
      (g) =>
        g.getPluginData(NUMBERING_GROUP_ID) && {
          id: g.id,
          name: g.name,
          children: g.children.map(({ id }) => id),
        }
    )
    .filter((x) => x) as { id: string; name: string; children: string[] }[];

  return {
    numberingGroups,
    numberingbadgeGroups,
  };
}
export function getNodesByType<T extends "INSTANCE" | "GROUP">(type: T) {
  // Currently using `findAllWithCriteria`, should I use `findChildren` ?
  // OR https://github.com/figma/plugin-samples/blob/22e12c5406c72f2a88d18810d3a6efb18ece0356/text-search/code.ts#L28-L36
  return figma.currentPage.findAllWithCriteria({
    types: [type],
  });
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
  const groupNode = getGroupNodeById(id);
  const parent = groupNode.parent;
  if (!parent) return;

  // remove badge group
  const badgeGroup = parent
    .findAllWithCriteria({ types: ["GROUP"] })
    .find((x) => x.getPluginData(NUMBERING_BADGE_GROUP_ID));
  badgeGroup && badgeGroup.remove();

  // TODO: should we iterator? is children of group node is only one?
  const i = parent.children.findIndex((x) => groupNode.id === x.id);
  groupNode.children.forEach((x) => parent.insertChild(i, x));
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
  instanceNode.setPluginData(BADGE_TARGET_ID, targetNode.id);

  // refs. https://forum.figma.com/t/known-bug-getting-x-y-coordinates-of-rectangles-within-frames-but-not-groups/7012
  const newNode = targetNode.absoluteTransform;

  instanceNode.x = newNode[0][2] - 8;
  instanceNode.y = newNode[1][2] - 8;

  componentNode.remove();
  return instanceNode;
}

export function createGroup(node: SceneNode) {
  if (!node.parent) return;

  const i = node.parent.children.findIndex((x) => node.id === x.id);
  const group = figma.group([node], node.parent, i);
  group.name = `${GROUP_NAME}_${node.name}`;
  group.setPluginData(NUMBERING_GROUP_ID, group.id);

  return group;
}

export function createNumberGroup({
  targetNode,
  parentNode,
}: {
  targetNode: SceneNode;
  parentNode: GroupNode;
}) {
  const badgeNode = setIndexNode(1, targetNode);
  const group = figma.group([badgeNode], parentNode);
  // TODO: temporary code Removal
  group.name = parentNode.name
    .split("○")
    .filter((x) => x)
    .join("numbering");

  group.setPluginData(NUMBERING_BADGE_GROUP_ID, group.id);

  return group;
}

export function isEnableCreategroup(node?: SceneNode) {
  if (!node) return false;

  // Group node
  if (node.getPluginData(NUMBERING_GROUP_ID)) return false;

  // Node already included in the Group node
  if (node.parent && node.parent.getPluginData(NUMBERING_GROUP_ID))
    return false;

  return true;
}
