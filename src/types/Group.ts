type GroupId = string;
type NodeId = string;

export type Group = {
  index: number;
  id: GroupId;
  name: string;
  children: NodeId[];
};
