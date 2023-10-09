<script setup lang="ts">
defineProps<{
  emphasis: "high" | "low" | "zero";
  type?: "button" | "submit" | "reset";
  href?: string;
  disabled?: boolean;
}>();

const emphasisClassList = {
  high: "border-current bg-primary-400 disabled:bg-neutral-200",
  low: "border-current bg-white disabled:bg-neutral-200",
  zero: "border-transparent bg-transparent",
} as const;
</script>

<template>
  <button
    v-if="!href?.length"
    :type="type ?? 'button'"
    :disabled="disabled"
    class="relative inline-block h-12 whitespace-nowrap rounded-lg border-2 px-6 font-mono font-semibold uppercase leading-[2.75rem] tracking-wider text-black focus:outline focus:outline-2 focus:outline-offset-[-6px] focus:outline-current disabled:cursor-not-allowed disabled:text-neutral-700"
    :class="emphasisClassList[emphasis]"
  >
    <slot></slot>
  </button>
  <a
    v-else-if="!disabled"
    :href="href"
    class="relative inline-block h-12 whitespace-nowrap rounded-lg border-2 px-6 font-mono font-semibold uppercase leading-[2.75rem] tracking-wider text-black focus:outline focus:outline-2 focus:outline-offset-[-6px] focus:outline-current"
    :class="emphasisClassList[emphasis]"
  >
    <slot></slot>
  </a>
  <span
    v-else
    class="relative inline-block h-12 cursor-not-allowed whitespace-nowrap rounded-lg border-2 px-6 font-mono font-semibold uppercase leading-[2.75rem] tracking-wider text-neutral-700"
    :class="
      emphasis === 'zero'
        ? 'border-transparent bg-transparent'
        : 'border-neutral-700 bg-neutral-200'
    "
  >
    <slot></slot>
  </span>
</template>
