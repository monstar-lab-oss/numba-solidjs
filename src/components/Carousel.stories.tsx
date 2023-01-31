import page1 from "@/asset/tutorial/page-1.png";
import page2 from "@/asset/tutorial/page-2.png";
import page3 from "@/asset/tutorial/page-3.png";
import page4 from "@/asset/tutorial/page-4.png";
import { Carousel, Props } from "@/components/Carousel";
import { Text } from "@/components/Text";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import { Meta, Story } from "@storybook/html";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
  "background-color": "white",
};

export default {
  title: "Components/Carousel",
  args: {
    placeholder: "Placeholder",
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as Meta;

const contents = [
  {
    src: page1,
    body: (
      <>
        <Text class="text-center">
          Select the group you want to assign numbers
        </Text>
        <Text class="text-center"> and click "Create" button.</Text>
      </>
    ),
  },
  {
    src: page2,
    body: (
      <>
        <Text class="text-center">To start assigning numbers,</Text>
        <Text class="text-center">click the object on the canvas.</Text>
        <Text size="sizeSmall" color="darkGray" class="text-center">
          ※ The number is available up to 999.
        </Text>
      </>
    ),
  },
  {
    src: page3,
    body: (
      <Text class="text-center">
        To check the assigned numbers, select a group
      </Text>
    ),
  },
  {
    src: page4,
    body: (
      <>
        <Text class="text-center">
          Click on the 🗑 to delete the numbers from the
        </Text>
        <Text class="text-center">selected group.</Text>
      </>
    ),
  },
];

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Carousel {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log("onclose"),
  contents: contents,
};
