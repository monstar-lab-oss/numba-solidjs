/* @refresh reload */
// TODO: uncomment when this branch is merged
import "@/components/index.css";
import { render } from "solid-js/web";
import { FromScratch } from "@/components/FromScratch";
import { Provider } from "@/lib/hooks/useStore";

const defaultValue = {
  enabled: false,
  groups: [],
  badges: {},
};

const App = () => {
  return (
    <Provider value={defaultValue}>
      <FromScratch />
    </Provider>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
