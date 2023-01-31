import { Meta, Story } from "@storybook/html";
import { Modal as ModalComponent, Props } from "./Modal";

export default {
  title: "Components/Modal",
  args: {
    children: "Modal",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => (
  <div>
    <ModalComponent>{args.children}</ModalComponent>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div class="w-full h-full bg-red-300 self-center text-center border-2 border-red-700 flex">
      <div class="self-center text-center w-full">This is modal children</div>
    </div>
  ),
};
