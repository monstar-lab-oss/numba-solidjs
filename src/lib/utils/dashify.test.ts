import { test } from "uvu";
import * as assert from "uvu/assert";
import { dashify } from "./dashify";

test("dashify", () => {
  assert.type(dashify, "function");
  assert.is(dashify("fooBar"), "foo-bar");
  assert.is(dashify("FooBar"), "foo-bar");
  assert.is(dashify("foobar"), "foobar");
});
test.run();
