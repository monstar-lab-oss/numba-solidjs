import { Carousel, Props } from "@/components/Carousel";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import { Meta, Story } from "@storybook/html";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
  "background-color": "white",
};

export default {
  title: "Components/Carousel",
  args: {
    placeholder: "Placeholder",
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as Meta;

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

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Carousel {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log("onclose"),
  contents: contents,
};
