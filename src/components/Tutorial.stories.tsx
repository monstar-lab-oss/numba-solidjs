import type { Meta, StoryObj } from "storybook-solidjs";
import { Tutorial } from "@/components/Tutorial";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
};

type Story = StoryObj<typeof Tutorial>;

const meta: Meta<typeof Tutorial> = {
  title: "Components/Tutorial",
  component: Tutorial,
  tags: ["autodocs"],
  decorators: [
    (Story, args) => {
      return (
        <div style={styles}>
          <Story {...args} />
        </div>
      );
    },
  ],
};
export default meta;

export const Default: Story = {
  args: {
    onClose: () => console.log("onclose"),
    version: "999",
  },
};
