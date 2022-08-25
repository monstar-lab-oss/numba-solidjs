type GroupId = string;
type NodeId = string;

export type Group = {
  id: GroupId;
  name: string;
  children: NodeId[];
};
