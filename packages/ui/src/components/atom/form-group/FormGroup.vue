<script lang="ts" setup>
defineProps<{
  legend: string;
}>();
</script>

<template>
  <fieldset class="rounded-lg border-2 p-4">
    <legend class="px-2">{{ legend }}</legend>
    <slot></slot>
  </fieldset>
</template>
