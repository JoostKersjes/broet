<script lang="ts" setup>
defineProps<{
  legend: string;
}>();
</script>

<template>
  <fieldset class="rounded-xl border-2 p-4">
    <legend class="border-2 bg-accent-200 px-2 py-1 text-black shadow-sm">
      {{ legend }}
    </legend>
    <slot></slot>
  </fieldset>
</template>
