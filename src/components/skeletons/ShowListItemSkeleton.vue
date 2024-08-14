<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
  <div class="border rounded-lg shadow transition-shadow">
    <div class="flex p-4">
      <!-- Image Skeleton -->
      <div class="w-24 h-36 rounded-md overflow-hidden">
        <NSkeleton :text="false" class="size-full" />
      </div>
      <div class="ml-4 flex-1 space-y-2 text-left">
        <!-- Title Skeleton -->
        <NSkeleton text :repeat="1" height="24px" width="30%" class="mb-2" />

        <div class="space-y-1">
          <!-- Language Skeleton -->
          <div><NSkeleton text :repeat="1" height="16px" width="20%" /></div>
          <!-- Premiered Skeleton -->
          <div><NSkeleton text :repeat="1" height="16px" width="30%" /></div>
          <!-- Genres Skeleton -->
          <div><NSkeleton text :repeat="1" height="16px" width="40%" /></div>
          <!-- Rating Skeleton -->
          <div><NSkeleton text :repeat="1" height="16px" width="30%" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
