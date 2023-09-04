import { test } from "uvu";
import * as assert from "uvu/assert";
import { setColor } from "./figmaRGBA";

test("figmaRGBA", () => {
  assert.type(setColor, "function");
  assert.type(setColor({ r: 255, g: 2, b: 3, a: 4 }), "object");

  const result = setColor({ r: 255, g: 255, b: 255, a: 255 });
  assert.is(result.color.r, 1);
  assert.is(result.color.g, 1);
  assert.is(result.color.b, 1);
  assert.is(result.opacity, 255);
});

test("figmaRGBAWithoutOptionalArgs", () => {
  assert.type(setColor, "function");
  assert.type(setColor({ r: 255, g: 2, b: 3, a: 4 }), "object");

  const result = setColor({ r: 255, g: 255, b: 255 });
  assert.is(result.color.r, 1);
  assert.is(result.color.g, 1);
  assert.is(result.color.b, 1);
  assert.is(result.opacity, 1);
});
test.run();

test.run();
