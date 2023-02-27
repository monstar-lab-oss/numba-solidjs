import {
  BADGE_TARGET_ID,
  GROUP_NAME,
  NUMBERING_BADGE_GROUP_ID,
  NUMBERING_GROUP_ID,
  NUMBERING_GROUP_NAME,
  RELATED_WITH_NUMBA,
} from "@/constants";
import { setColor } from "@/lib/utils/figmaRGBA";
import { UpdateStorePayload } from "@/types/Actions";
import { NodeType } from "@/types/Node";

export function reduceAllNodes() {
  // TODO: need refactor, replace any to type
  const nodes = getNodesByType("GROUP");

  const acc: any = {};
  const numberingGroups: any[] = [];

  console.log(nodes.length);
  for (const node of nodes) {
    const n: any = node;
    const numbering = n.children.find(
      (v: any) => v.name === "(NUMBA)numbering"
    );
    const c = numbering.children.map((x: any) => ({
      id: x.id,
      name: x.name,
      color: "BLUE",
      targetId: x.getPluginData(BADGE_TARGET_ID),
    }));
    numberingGroups.push({
      id: node.id,
      name: node.name,
      children: c,
    });
    acc[`${node.id}`] = c;
  }
  const numberingbadgeGroups = acc;

  return {
    numberingGroups,
    numberingbadgeGroups,
  } as UpdateStorePayload;
}
export function getNodesByType<T extends NodeType>(type: T) {
  // OR https://github.com/figma/plugin-samples/blob/22e12c5406c72f2a88d18810d3a6efb18ece0356/text-search/code.ts#L28-L36
  return figma.currentPage.findChildren(
    (v) => v.type === type && isRelatedWithNUMBA(v)
  );
}

export function getNode(id: string, type: NodeType) {
  const node = getNodesByType(type).find((g) => g.id === id);
  if (!node) throw new Error(`NO ${type} NODE!`);
  return node as GroupNode;
}

export function getGroupNode(id: string) {
  // TODO: need refactor, replace any to type
  const node: any = getNodesByType("GROUP").find((g) => g.id === id);
  if (!node) throw new Error(`NO GROUP NODE!`);
  return node as GroupNode;
}

export function getBadgeNode(groupID: string, badgeID: string) {
  // TODO: need refactor, replace any to type
  const node: any = getNodesByType("GROUP").find((v) => v.id === groupID);
  if (!node) throw new Error(`NO GROUP NODE!`);

  const numbering = node.children.find(
    (v: any) => v.name === "(NUMBA)numbering"
  );
  if (!numbering) throw new Error(`NO NUMBERING NODE!`);

  const badge = numbering.children.find((v: any) => v.id === badgeID);

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

  const componentNode = figma.createComponent();
  componentNode.name = `${index}`;
  componentNode.resize(24, 24);
  componentNode.cornerRadius = 24;
  componentNode.layoutMode = "HORIZONTAL";
  componentNode.strokeAlign = "INSIDE";

  // TODO: Maybe we need a user custom color feature.
  componentNode.strokes = [setColor({ r: 0, g: 0, b: 0 })];
  componentNode.fills = [setColor({ r: 221, g: 221, b: 221 })];

  const textNode = figma.createText();
  textNode.fontSize = 12;
  textNode.characters = `${index}`;
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

  // refs. https://forum.figma.com/t/known-bug-getting-x-y-coordinates-of-rectangles-within-frames-but-not-groups/7012
  const newNode = targetNode.absoluteTransform;

  instanceNode.x = newNode[0][2] - 8;
  instanceNode.y = newNode[1][2] - 8;

  componentNode.remove();
  return instanceNode;
}

export function createGroup(node: SceneNode) {
  if (!node.parent || isRelatedWithNUMBA(node)) return;

  const i = node.parent.children.findIndex((x) => node.id === x.id);
  const group = figma.group([node], node.parent, i);
  group.name = `${GROUP_NAME}${node.name}`;
  group.setPluginData(NUMBERING_GROUP_ID, group.id);
  node.setPluginData(RELATED_WITH_NUMBA, node.id);

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
