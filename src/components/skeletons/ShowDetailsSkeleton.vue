<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

import ShowDetailsImageSkeleton from '@/components/skeletons/ShowDetailsImageSkeleton.vue'
</script>

<template>
  <div class="space-y-6">
    <!-- Title Skeleton -->
    <NSkeleton text :repeat="1" height="48px" width="50%" />

    <div class="flex flex-col sm:flex-row gap-6">
      <!-- Image Skeleton -->
      <div class="sm:w-1/3">
        <ShowDetailsImageSkeleton />
      </div>

      <div class="space-y-2 flex-1">
        <!-- Language Skeleton -->
        <div>
          <NSkeleton text :repeat="1" height="20px" width="30%" />
        </div>
        <!-- Premiered Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="30%" /></div>
        <!-- Ended Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="30%" /></div>
        <!-- Genres Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="50%" /></div>
        <!-- Runtime Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="30%" /></div>
        <!-- Schedule Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="40%" /></div>
        <!-- Status Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="20%" /></div>
        <!-- Rating Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="20%" /></div>
        <!-- Network Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="30%" /></div>
        <!-- Official Site Skeleton -->
        <div><NSkeleton text :repeat="1" height="20px" width="50%" /></div>
      </div>
    </div>

    <div>
      <NSkeleton text :repeat="6" height="20px" width="100%" class="mb-2" />
    </div>
  </div>
</template>
