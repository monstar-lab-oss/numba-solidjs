import { Meta, Story } from "@storybook/html";
import { COLOR } from "./constants";
import { ICON_NAMES } from "./Icon";
import { IconButton as IconButtonComponent, Props } from "./IconButton";

export default {
  title: "Components/IconButton",
  args: {
    children: "IconButton",
  },
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
      defaultValue: "create",
    },
    color: {
      options: COLOR,
      control: { type: "select" },
      defaultValue: "primary",
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <IconButtonComponent {...args} />;

export const IconButton = Template.bind({});
IconButton.args;

// FIXME For now chromatic dose not support for lazy load components test.
// export const IconClick = Template.bind({});

// IconClick.args = baseData;
// IconClick.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   // FIXME: WorkAround wait for component until rendered.
//   await sleep(5000);
//   await userEvent.click(canvas.getByRole("button"));
// };
