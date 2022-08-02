import { test } from "uvu";
import * as assert from "uvu/assert";
import { getMissingSerialNumber } from "./getMissingSerialNumber";

test("getMissingSerialNumber", () => {
  assert.type(getMissingSerialNumber, "function");
  assert.is(getMissingSerialNumber([1, 5]), 2);
  assert.is(getMissingSerialNumber([1, 2, 5]), 3);
  assert.is(getMissingSerialNumber([2, 5, 3]), 1);
  assert.is(getMissingSerialNumber([2, 5, 3, 1]), 4);
});
test.run();
