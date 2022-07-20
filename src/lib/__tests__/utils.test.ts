import { test } from "uvu";
import * as assert from "uvu/assert";
import * as utils from "@/lib/utils";

test("capitalize", () => {
  assert.type(utils.capitalize, "function");
  assert.is(utils.capitalize("hello"), "Hello");
  assert.is(utils.capitalize("foo bar"), "Foo bar");
});

test("dashify", () => {
  assert.type(utils.dashify, "function");
  assert.is(utils.dashify("fooBar"), "foo-bar");
  assert.is(utils.dashify("FooBar"), "foo-bar");
  assert.is(utils.dashify("foobar"), "foobar");
});

test("getMissingSerialNumber", () => {
  assert.type(utils.getMissingSerialNumber, "function");
  assert.is(utils.getMissingSerialNumber([1, 2, 3, 4]), 5);
  assert.is(utils.getMissingSerialNumber([1, 5]), 2);
  assert.is(utils.getMissingSerialNumber([1, 2, 5, 10]), 3);
});

test.run();
