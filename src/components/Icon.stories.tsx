import type { Meta, StoryObj } from "storybook-solidjs";
import { COLOR } from "./constants";
import { Icon as IconComponent, ICON_NAMES } from "./Icon";

type Story = StoryObj<typeof IconComponent>;

const meta: Meta<typeof IconComponent> = {
  title: "Components/Icon",
  component: IconComponent,
  tags: ["autodocs"],
  args: {
    children: "Icon",
    name: "create",
    color: "primary",
  },
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
    color: {
      options: COLOR,
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default: Story = {
  args: {},
};

export const Icon: Story = {};

export const Icons: Story = {
  args: {
    size: 24,
    color: "primary",
  },
};
Icons.decorators = [
  (_, { args }) => {
    return ICON_NAMES.map((name) => (
      <>
        <IconComponent {...args} name={name} />
        <br />
      </>
    ));
  },
];

export const Colors: Story = {
  args: {
    size: 24,
    name: "create",
  },
};
Colors.decorators = [
  (_, { args }) => {
    return COLOR.map((color) => (
      <>
        <IconComponent {...args} color={color} />
        <br />
      </>
    ));
  },
];

// FIXME For now chromatic dose not support for lazy load components test.
// export const IconClick = Template.bind({});

// IconClick.args = baseData;
// IconClick.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   // FIXME: WorkAround wait for component until rendered.
//   await sleep(5000);
//   await userEvent.click(canvas.getByRole("button"));
// };
