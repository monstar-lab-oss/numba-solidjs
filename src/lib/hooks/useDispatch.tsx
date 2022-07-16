type DispatchPayload =
  | {
      type: "CREATE_INDEX";
      data: null;
    }
  | {
      type: "CREATE_INDEX2";
      data: "CREATE_INDEX_DATA2";
    };

export const useDispatch = ({ type, data }: DispatchPayload) =>
  parent.postMessage({ pluginMessage: { type, data } }, "*");
