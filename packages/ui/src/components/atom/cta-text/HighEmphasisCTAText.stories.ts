import type { Meta, StoryObj } from "@storybook/vue3";
import CTAText from "./CTAText.vue";

const meta: Meta<typeof CTAText> = {
  title: "Atoms/CTA/Text/High Emphasis",
  component: CTAText,
};

export default meta;
type Story = StoryObj<typeof CTAText>;

export const Button = {
  args: {
    emphasis: "high",
    type: "button",
    default: "button",
  },
} satisfies Story;

export const DisabledButton = {
  args: {
    ...Button.args,
    disabled: true,
  },
} satisfies Story;

export const Link = {
  args: {
    emphasis: "high",
    href: "/",
    default: "link",
  },
} satisfies Story;

export const DisabledLink = {
  args: {
    ...Link.args,
    disabled: true,
  },
} satisfies Story;
