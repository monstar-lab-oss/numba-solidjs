/* @refresh reload */
import { render } from "solid-js/web";

const App = () => {
  return (
    <main>
      <p>hello</p>
    </main>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
