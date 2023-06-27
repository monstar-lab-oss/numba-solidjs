import type { Meta, StoryObj } from "storybook-solidjs";
import { Modal } from "./Modal";

type Story = StoryObj<typeof Modal>;

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    children: "Modal",
  },
  decorators: [
    (Story, args) => {
      return (
        <div style={{ width: "240px" }}>
          <Story {...args} />
        </div>
      );
    },
  ],
};
export default meta;

export const Default: Story = {
  args: {
    children: (
      <div class="w-full h-full bg-red-300 self-center text-center border-2 border-red-700 flex">
        <div class="self-center text-center w-full">This is modal children</div>
      </div>
    ),
  },
};
