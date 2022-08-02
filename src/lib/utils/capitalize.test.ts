import { test } from "uvu";
import * as assert from "uvu/assert";
import { capitalize } from "./capitalize";

test("capitalize", () => {
  assert.type(capitalize, "function");
  assert.is(capitalize("hello"), "Hello");
  assert.is(capitalize("foo bar"), "Foo bar");
});
test.run();
