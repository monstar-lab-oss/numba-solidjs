import { Carousel } from "@/components/Carousel";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import type { Meta } from "storybook-solidjs";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
  "background-color": "white",
};

const meta = {
  component: Carousel,
  title: "Components/Carousel",
  args: {},
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} satisfies Meta<typeof Carousel>;
export default meta;

const contents = [
  {
    src: "https://placehold.jp/300x200.png",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://placehold.jp/300x200.png",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://placehold.jp/300x200.png",
    body: <div>TEXT HERE</div>,
  },
];

export const Default = {
  args: {
    onClose: () => console.log("onclose"),
    contents: contents,
  },
};
