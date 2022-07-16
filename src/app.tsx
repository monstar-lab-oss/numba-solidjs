/* @refresh reload */
// TODO: uncomment when this branch is merged
// import "@/components/index.css";
import { render } from "solid-js/web";
import { FromScratch } from "@/components/FromScratch";

const App = () => <FromScratch />;

render(() => <App />, document.getElementById("root") as HTMLElement);
