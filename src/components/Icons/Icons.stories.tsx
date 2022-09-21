import { Meta, Story } from "@storybook/html";
import { Create } from "./Create";
import { Delete } from "./Delete";
import { Help } from "./Help";
import { Search } from "./Search";
import { TextDelete } from "./TextDelete";

export default {
  title: "Components/Icons",
  args: {
    children: "Icons",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<any> = (args) => {
  return (
    <div>
      <Create {...args} />
      <Delete {...args} />
      <Help {...args} />
      <Search {...args} />
      <TextDelete {...args} />
    </div>
  );
};
export const Icons = Template.bind({});
Icons.args = {
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};
