<script setup>
import { icons } from './icons.js'

defineProps({
  name: { type: String, required: true },
  stroke: { type: [Number, String], default: 1.8 },
})
</script>

<template>
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="stroke" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" :d="icons[name]" />
  </svg>
</template>
