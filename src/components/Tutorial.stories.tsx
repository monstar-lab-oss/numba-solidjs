import { Props, Tutorial } from "@/components/Tutorial";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import { Meta, Story } from "@storybook/html";


const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
  "background-color": "white",
};


export default {
  title: "Components/Tutorial",
  args: {
    placeholder: "Placeholder",
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Tutorial {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log("onclose"),
  version: "999"
};
