import type { Badge } from "@/types/Badge";
import type { Group } from "@/types/Group";

export type PluginMessage =
  | {
      type: "GROUP/ENABLE";
      payload: boolean;
    }
  | {
      type: "GROUP/INITIALIZE";
      payload: [Group[], Record<string, Badge[]>];
    }
  | {
      type: "GROUP/CREATE";
      payload: {
        id: string;
        name: string;
      };
    }
  | {
      type: "BADGE/CREATE";
      payload: {
        parentId: string;
        id: string;
        name: string;
      };
    };

export type FigmaMessage =
  | {
      type: "CREATE_INDEX";
      data: null;
    }
  | {
      type: "SELECT_GROUP";
      data: string | undefined;
    }
  | {
      type: "REMOVE_GROUP";
      data: string;
    }
  | {
      type: "REMOVE_BADGE";
      data: Badge["id"][];
    };

// refs. https://github.com/redux-utilities/flux-standard-action
export type Action =
  | {
      type: "UI/UPDATE_STORE";
      payload: {};
    }
  | {
      type: "APP/CREATE_GROUP";
      payload: null;
    }
  | {
      type: "APP/REMOVE_GROUP";
      payload: Group["id"];
    };
