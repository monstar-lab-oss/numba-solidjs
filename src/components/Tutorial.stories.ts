import type { Meta, StoryObj } from "storybook-solidjs";
import { Tutorial } from "./Tutorial";

type Story = StoryObj<typeof Tutorial>;

const meta: Meta<typeof Tutorial> = {
  title: "Components/Tutorial",
  component: Tutorial,
  args: {
    version: "1.0.0",
  },
};
export default meta;

export const Default: Story = {};
