import { render } from "@solidjs/testing-library";
import { Counter } from "./MyComponent";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom"; // 👈 this is imported in order to use the jest-dom matchers

describe("App", () => {
  it("should render the app", () => {
    const { getByText } = render(() => <Counter />);
    // @ts-expect-error Skip for now
    expect(getByText("foo")).toBeInTheDocument();
  });
});
