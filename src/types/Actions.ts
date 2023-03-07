import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";

type NodeId = string;

export type UpdateStorePayload = {
  selectedGroupID?: string;
  numberingGroups: Group[];
  numberingbadgeGroups: Record<string, Badge[]>;
};

// refs. https://github.com/redux-utilities/flux-standard-action
export type Action =
  | {
      type: "UI/UPDATE_STORE";
      payload: UpdateStorePayload;
    }
  | {
      type: "UI/TOGGLE_CREATE_GROUP_BUTTON";
      payload: boolean;
    }
  | {
      type: "UI/SHOULD_MAKE_BADGE";
      payload: {
        groupId: string | undefined;
        targetId: string;
      };
    }
  | {
      type: "APP/SELECT_GROUP";
      payload: NodeId | null;
    }
  | {
      type: "APP/SELECT_BADGE";
      payload: NodeId | null;
    }
  | {
      type: "APP/CREATE_GROUP";
      payload: null;
    }
  | {
      type: "APP/REMOVE_GROUP";
      payload: Group["id"];
    }
  | {
      type: "APP/CREATE_BADGE";
      payload: Group["id"];
    }
  | {
      type: "APP/APPEND_BADGE";
      payload: {
        parentId: Group["id"];
        index: number;
      };
    }
  | {
      type: "APP/REMOVE_BADGES";
      payload: {
        groupID: Group["id"];
        badges: Group["id"][];
      };
    }
  | {
      type: "UI/FOCUS_GROUP";
      payload: NodeId;
    }
  | {
      type: "UI/SHOW_TUTORIAL";
      payload: undefined;
    };
