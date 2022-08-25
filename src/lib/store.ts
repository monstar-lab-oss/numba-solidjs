//FIXME: because unused, remove this file

import equal from "fast-deep-equal";
import { dispatch } from "@/lib/dispatch";
import { Store } from "@/types/Store";

export const subscribes: ((_: Store, __?: Store) => void)[] = [];

export const store = new Proxy<Store>(
  {
    numberingGroups: [],
  },
  {
    // refs. https://shorturl.at/BDGNO, https://blog.logrocket.com/how-to-use-keyof-operator-typescript/
    set: <T extends Store, K extends keyof T>(
      state: T,
      key: K,
      value: T[K]
    ) => {
      // TODO: use spread operator
      const prev = Object.assign({}, state);
      state[key] = value;
      subscribes.forEach((callback) => callback(state, prev));

      return true;
    },
  }
);

// subscribers
export function updateStoreUI(state: Store, prevState?: Store) {
  if (equal(state, prevState)) return;
  // @ts-ignore
  dispatch({ type: "UI/UPDATE_STORE", payload: state.numberingGroups });
}
subscribes.push(updateStoreUI);

export function initializeStore({ numberingGroups }: Store) {
  store.numberingGroups = numberingGroups;
}
