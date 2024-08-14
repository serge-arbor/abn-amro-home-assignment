<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

function randomWidth() {
  const avg = 70
  return `${Math.floor(Math.random() * avg) + avg}px`
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <NSkeleton
        v-for="i in 20"
        :key="i"
        :text="false"
        class="rounded-md"
        :width="randomWidth()"
        height="26px"
      />
    </div>
  </div>
</template>
