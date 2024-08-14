<script setup lang="ts">
import ClearIcon from '@/components/icons/ClearIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

const query = defineModel({
  type: String,
  default: ''
})
</script>

<template>
  <div class="relative">
    <input
      v-model="query"
      type="text"
      placeholder="Type a title to search..."
      class="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />

    <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

    <button
      v-if="query"
      class="absolute right-2 top-1/2 -translate-y-1/2 size-7 z-10 rounded-full hover:bg-gray-100 p-1"
      @click="query = ''"
    >
      <ClearIcon class="text-gray-400" />
    </button>
  </div>
</template>
