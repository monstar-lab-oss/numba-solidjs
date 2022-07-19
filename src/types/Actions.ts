export type PluginMessage =
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
    }
  | {
      type: "SELECTION_CHANGE";
      payload: any;
    }
  | {
      type: "RUN";
      payload: any;
    };

export type FigmaMessage =
  | {
      type: "CREATE_INDEX";
      data: null;
    }
  | {
      type: "REMOVE_GROUP";
      data: string;
    }
  | {
      type: "REMOVE_BADGE";
      data: string;
    };
