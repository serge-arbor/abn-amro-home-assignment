<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
  <div class="relative w-full md:w-1/3" style="aspect-ratio: 1250 / 1800">
    <NSkeleton :text="false" class="absolute top-0 left-0 size-full rounded-lg" />
  </div>
</template>
