/* @refresh reload */
import "@/components/index.css";
import { render } from "solid-js/web";
import { Button } from "@/components/Button";

const App = () => {
  return (
    <main>
      <Button title="Hello" />
    </main>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
