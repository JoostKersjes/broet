<script lang="ts" setup>
defineProps<{
  legend: string;
}>();
</script>

<template>
  <fieldset class="border-2 rounded-lg p-4">
    <legend class="px-2">{{ legend }}</legend>
    <slot></slot>
  </fieldset>
</template>
