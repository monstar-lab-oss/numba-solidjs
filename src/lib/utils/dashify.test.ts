import { dashify } from "./dashify";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("dashify", () => {
  assert.type(dashify, "function");
  assert.is(dashify("fooBar"), "foo-bar");
  assert.is(dashify("FooBar"), "foo-bar");
  assert.is(dashify("foobar"), "foobar");
});
test.run();
