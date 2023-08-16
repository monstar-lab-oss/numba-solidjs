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
    src: "https://fastly.picsum.photos/id/147/300/200.jpg?hmac=ep-bYttkpW9fTVODbQBxJ4BaPvgLlGz72RJbj3A6-wM",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://fastly.picsum.photos/id/221/200/300.jpg?hmac=vFrrajnPFCrr5ttjepVTsUDWzoo-orpnXOsqdqAd0LU",
    body: <div>TEXT HERE</div>,
  },
  {
    src: "https://fastly.picsum.photos/id/375/300/300.jpg?hmac=WPU2pySNBh6hmJVGA1V7vqZEOCpdyMjAZ5RfkBN6VVI",
    body: <div>TEXT HERE</div>,
  },
];

export const Default = {
  args: {
    onClose: () => console.log("onclose"),
    contents: contents,
  },
};
