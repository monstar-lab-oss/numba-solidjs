/* @refresh reload */
// TODO: uncomment when this branch is merged
// import "@/components/index.css";
import { render } from "solid-js/web";
import { FromScratch } from "@/components/FromScratch";
import { onMount } from "solid-js";
import { useHandler } from "@/lib/hooks/useHandler";

const App = () => {
  onMount(() => useHandler());
  return <FromScratch />;
};

render(() => <App />, document.getElementById("root") as HTMLElement);
