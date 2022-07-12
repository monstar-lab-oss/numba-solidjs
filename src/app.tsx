/* @refresh reload */
import "@/components/index.css";
import { render } from "solid-js/web";
import { Button } from "@/components/Button";

const App = () => {
  let inputRef: HTMLInputElement | undefined;

  const onCreate = () => {
    const count = Number(inputRef?.value || 0);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <h2>Rectangle Creator</h2>
      </header>
      <section>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="input">
          Count
        </label>
        <input
          id="input"
          type="number"
          min="0"
          ref={inputRef}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>
      <footer>
        <Button title="Create" onClick={onCreate} />
        <Button title="Cancel" onClick={onCancel} />
      </footer>
    </main>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
