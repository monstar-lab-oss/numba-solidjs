import {
  BADGE_TARGET_ID,
  GROUP_NAME,
  NUMBA_BADGE_INDEX,
  NUMBA_GROUP_INDEX,
  NUMBERING_BADGE_GROUP_ID,
  NUMBERING_GROUP_ID,
  NUMBERING_GROUP_NAME,
  RELATED_WITH_NUMBA,
} from "@/constants";
import { setColor } from "@/lib/utils/figmaRGBA";
import { UpdateStorePayload } from "@/types/Actions";
import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";
import { NodeType } from "@/types/Node";

export function reduceAllNodes() {
  const groupNodes = getNodesByType("GROUP");

  const numberingbadgeGroups: UpdateStorePayload["numberingbadgeGroups"] = {};
  const numberingGroups: Group[] = [];

  for (const groupNode of groupNodes) {
    const badgeNodes = groupNode.children.find(
      (v) => v.name === NUMBERING_GROUP_NAME
    ) as GroupNode;

    const badges = (
      badgeNodes
        ? badgeNodes.children.map((x) => ({
            index: Number(x.getPluginData(NUMBA_BADGE_INDEX)),
            id: x.id,
            name: x.name,
            color: "BLUE",
            targetId: x.getPluginData(BADGE_TARGET_ID),
          }))
        : []
    ) as Badge[];

    badges.sort((a, b) => a.index - b.index);

    numberingGroups.push({
      index: Number(groupNode.getPluginData(NUMBA_GROUP_INDEX)),
      id: groupNode.id,
      name: groupNode.name,
      children: badges.map((v) => v.id),
    });

    numberingbadgeGroups[groupNode.id] = badges;
  }

  numberingGroups.sort((a, b) => a.index - b.index);
  return {
    numberingGroups,
    numberingbadgeGroups,
  } as UpdateStorePayload;
}
export function getNodesByType<T extends NodeType>(type?: T) {
  // OR https://github.com/figma/plugin-samples/blob/22e12c5406c72f2a88d18810d3a6efb18ece0356/text-search/code.ts#L28-L36

  if (type) {
    return figma.currentPage.findChildren(
      (v) => v.type === type && isRelatedWithNUMBA(v)
    ) as GroupNode[];
  }

  return figma.currentPage.findChildren((v) =>
    isRelatedWithNUMBA(v)
  ) as GroupNode[];
}

export function getNode(id: string, type: NodeType) {
  // NUMBA node
  const nodes = getNodesByType();
  for (const node of nodes) {
    if (node.parent) {
      const n = node.parent
        .findAllWithCriteria({ types: [type] })
        .find((v) => v.id === id);
      if (n) return n as GroupNode;
    }
  }
  throw new Error(`NO ${type} NODE!`);
}

export function getGroupNode(id: string) {
  const node = getNodesByType("GROUP").find((g) => g.id === id);
  if (!node) throw new Error(`NO GROUP NODE!`);
  return node as GroupNode;
}

export function getBadgeNode(groupID: string, badgeID: string) {
  const node = getNodesByType("GROUP").find((v) => v.id === groupID);
  if (!node) throw new Error(`NO GROUP NODE!`);

  const numbering = node.children.find(
    (v) => v.name === NUMBERING_GROUP_NAME
  ) as GroupNode;
  if (!numbering) throw new Error(`NO NUMBERING NODE!`);

  const badge = numbering.children.find((v) => v.id === badgeID);

  if (!badge) throw new Error(`NO BADGE NODE!`);

  return badge as GroupNode;
}

export function setGroup(node: SceneNode, name: string) {
  const group = figma.group([node], figma.currentPage);
  group.name = `numbering_${name}`;

  return group;
}

export function removeGroupNode(id: string) {
  const groupNode = getGroupNode(id);
  const parent = groupNode.parent;
  if (!parent) return;

  // remove badge group
  const badgeGroup = parent
    .findAllWithCriteria({ types: ["GROUP"] })
    .find((x) => x.getPluginData(NUMBERING_BADGE_GROUP_ID));
  badgeGroup && badgeGroup.remove();

  // TODO: should we iterator? is children of group node is only one?
  const i = parent.children.findIndex((x) => groupNode.id === x.id);
  groupNode.children.forEach((x) => {
    x.setPluginData(RELATED_WITH_NUMBA, "");
    parent.insertChild(i, x);
  });
}

export function removeBadgeNode(badgeID: string, groupID: string) {
  const node = getBadgeNode(groupID, badgeID);
  if (!node) throw new Error("NO BADGE NODE!");
  node.remove();
}

export function setIndexNode(index: number, targetNode: SceneNode) {
  if (isRelatedWithNUMBA(targetNode)) return;

  const indexStr = `${index}`;

  const componentNode = figma.createComponent();
  componentNode.name = indexStr;
  componentNode.resize(24, 24);
  componentNode.cornerRadius = 24;
  componentNode.layoutMode = "HORIZONTAL";
  componentNode.strokeAlign = "INSIDE";

  // TODO: Maybe we need a user custom color feature.
  componentNode.strokes = [setColor({ r: 0, g: 0, b: 0 })];
  componentNode.fills = [setColor({ r: 221, g: 221, b: 221 })];

  const textNode = figma.createText();
  textNode.fontSize = 12;
  textNode.characters = indexStr;
  textNode.fills = [setColor({ r: 0, g: 0, b: 0 })];
  textNode.resize(24, 24);
  textNode.textAlignHorizontal = "CENTER";
  textNode.fontName = { family: "Inter", style: "Bold" };
  textNode.lineHeight = { value: 24, unit: "PIXELS" };
  componentNode.appendChild(textNode);

  const instanceNode = componentNode.createInstance();
  instanceNode.setPluginData(BADGE_TARGET_ID, targetNode.id);

  textNode.setPluginData(RELATED_WITH_NUMBA, textNode.id);
  componentNode.setPluginData(RELATED_WITH_NUMBA, componentNode.id);

  // NOTE: maybe we can put together with RELATED_WITH_NUMBA
  textNode.setPluginData(NUMBA_BADGE_INDEX, indexStr);
  instanceNode.setPluginData(NUMBA_BADGE_INDEX, indexStr);

  // refs. https://forum.figma.com/t/known-bug-getting-x-y-coordinates-of-rectangles-within-frames-but-not-groups/7012
  const newNode = targetNode.absoluteTransform;

  instanceNode.x = newNode[0][2] - 8;
  instanceNode.y = newNode[1][2] - 8;

  componentNode.remove();
  return instanceNode;
}

export function createGroup(node: SceneNode, groupIndex: number) {
  if (!node.parent || isRelatedWithNUMBA(node)) return;

  const i = node.parent.children.findIndex((x) => node.id === x.id);
  const group = figma.group([node], node.parent, i);
  group.name = `${GROUP_NAME}${node.name}`;
  group.setPluginData(NUMBERING_GROUP_ID, group.id);
  node.setPluginData(RELATED_WITH_NUMBA, node.id);
  group.setPluginData(NUMBA_GROUP_INDEX, `${groupIndex}`);

  return group;
}

export function createNumberGroup({
  targetNode,
  parentNode,
}: {
  targetNode: SceneNode;
  parentNode: GroupNode;
}) {
  if (isRelatedWithNUMBA(targetNode)) return;

  const badgeNode = setIndexNode(1, targetNode);
  if (!badgeNode) return;

  const group = figma.group([badgeNode], parentNode);

  group.name = NUMBERING_GROUP_NAME;
  group.setPluginData(NUMBERING_BADGE_GROUP_ID, group.id);

  return group;
}

export function isEnableCreateGroup(node?: SceneNode) {
  if (!node) return false;

  // Group node
  if (node.getPluginData(NUMBERING_GROUP_ID)) return false;

  // Node already included in the Group node
  if (node.parent && node.parent.getPluginData(NUMBERING_GROUP_ID))
    return false;

  if (isRelatedWithNUMBA(node)) return false;

  // Check parent has NUMBA node.
  let parent = node.parent;
  while (parent) {
    if (isRelatedWithNUMBA(parent)) return false;
    parent = parent.parent;
  }

  return true;
}

const isRelatedWithNUMBA = (node: SceneNode | (BaseNode & ChildrenMixin)) => {
  return (
    node.getPluginData(NUMBERING_GROUP_ID) !== "" ||
    node.getPluginData(BADGE_TARGET_ID) !== "" ||
    node.getPluginData(RELATED_WITH_NUMBA) !== ""
  );
};

// TODO: 共通化したい
export type NodeWithChildren = BaseNode & ChildrenMixin;
export function getNumberingGroup(
  node: NodeWithChildren
): NodeWithChildren | null {
  if (node.getPluginData(NUMBERING_GROUP_ID)) return node;

  if (!node.parent) return null;

  return getNumberingGroup(node.parent);
}
