import { Carousel } from "@/components/Carousel";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import type { Meta } from "storybook-solidjs";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
  "background-color": "grey",
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
    src: "https://picsum.photos/300/200",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://picsum.photos/200/300",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://picsum.photos/300/300",
    body: <div>TEXT HERE</div>,
  },
];

export const Default = {
  args: {
    onClose: () => console.log("onclose"),
    contents: contents,
  },
};
