import { Modal as ModalComponent } from "./Modal";
import type { Meta, StoryObj } from "storybook-solidjs";

type Story = StoryObj<typeof ModalComponent>;

const meta: Meta<typeof ModalComponent> = {
  title: "Components/Modal",
  component: ModalComponent,
  args: {
    children: "Modal",
  },
} ;

export const Default: Story = {
  args: {
    children: (
      <div class="w-full h-full bg-red-300 self-center text-center border-2 border-red-700 flex">
        <div class="self-center text-center w-full">This is modal children</div>
      </div>
    ),
  }
};

export default meta
