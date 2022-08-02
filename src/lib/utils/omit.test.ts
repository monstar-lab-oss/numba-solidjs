import { test } from "uvu";
import * as assert from "uvu/assert";
import { omit } from "./omit";

test("omit", () => {
  assert.type(omit, "function");
  assert.equal(omit({ a: 1, b: "2" }, ["b"]), { a: 1 });
});

test.run();
