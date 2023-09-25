import type { Meta, StoryObj } from "@storybook/vue3";
import FormGroup from "./FormGroup.vue";

const meta: Meta<typeof FormGroup> = {
  title: "Atoms/Form/Group",
  component: FormGroup,
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default = {
  args: {
    legend: "Group of form elements",
    default: "some contents",
  },
} satisfies Story;
