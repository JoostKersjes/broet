import type { Meta, StoryObj } from "@storybook/vue3";
import CTAText from "./CTAText.vue";
import {
  Button as HighEmphasisButton,
  Link as HighEmphasisLink,
} from "./HighEmphasisCTAText.stories";

const meta: Meta<typeof CTAText> = {
  title: "Atoms/CTA/Text/Low Emphasis",
  component: CTAText,
};

export default meta;
type Story = StoryObj<typeof CTAText>;

export const Button = {
  args: {
    ...HighEmphasisButton.args,
    emphasis: "low",
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
    ...HighEmphasisLink.args,
    emphasis: "low",
  },
} satisfies Story;

export const DisabledLink = {
  args: {
    ...Link.args,
    disabled: true,
  },
} satisfies Story;
