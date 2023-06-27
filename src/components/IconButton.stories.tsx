import { COLOR } from "@/components/constants";
import { ICON_NAMES } from "@/components/Icon";
import { IconButton as IconButtonComponent } from "@/components/IconButton";
import type { Meta, StoryObj } from "storybook-solidjs";

type Story = StoryObj<typeof IconButtonComponent>;

const meta: Meta<typeof IconButtonComponent> = {
  title: "Components/IconButton",
  component: IconButtonComponent,
  tags: ["autodocs"],
  args: {
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
  args: {
    iconName: "create",
    iconColor: "primary",
  },
};

export const Link: Story = {
  args: {
    iconName: "create",
    iconColor: "primary",
    link: true,
  },
};

export const Disabled: Story = {
  args: {
    iconName: "create",
    iconColor: "primary",
    link: true,
    disabled: true,
    buttonColor: "white",
  },
};

export const WithText: Story = {
  args: {
    iconName: "create",
    iconColor: "primary",
    children: "With text",
  },
};

// FIXME For now chromatic dose not support for lazy load components test.
// export const IconClick = Template.bind({});

// IconClick.args = baseData;
// IconClick.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   // FIXME: WorkAround wait for component until rendered.
//   await sleep(5000);
//   await userEvent.click(canvas.getByRole("button"));
// };
