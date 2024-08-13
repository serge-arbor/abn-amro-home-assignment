<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed } from 'vue'

import { useFetchShowDetails } from '@/composables/useFetchShowDetails'

const props = defineProps<{
  id: string
}>()

const sanitizedSummary = computed(() => {
  return show.value?.summary ? DOMPurify.sanitize(show.value.summary) : ''
})

const { data: show, error, isLoading } = useFetchShowDetails(props.id)
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="isLoading" class="text-center text-gray-500">Loading show details...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
    <div v-if="show" class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800">{{ show.name }}</h1>
      <div class="flex flex-col md:flex-row gap-6">
        <img
          :src="show.image.original"
          :alt="show.name"
          class="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div class="text-lg text-gray-700 flex-1">
          <p><strong>Language:</strong> {{ show.language }}</p>
          <p><strong>Premiered:</strong> {{ show.premiered }}</p>
          <p><strong>Ended:</strong> {{ show.ended || 'Ongoing' }}</p>
          <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
          <p><strong>Runtime:</strong> {{ show.runtime || show.averageRuntime }} minutes</p>
          <p>
            <strong>Schedule:</strong> {{ show.schedule.days.join(', ') }} at
            {{ show.schedule.time }}
          </p>
          <p><strong>Status:</strong> {{ show.status }}</p>
          <p><strong>Rating:</strong> {{ show.rating.average || 'N/A' }}</p>
          <p>
            <strong>Network:</strong> {{ show.network?.name }}
            <span v-if="show.network?.country">({{ show.network.country.name }})</span>
          </p>
          <p v-if="show.officialSite">
            <strong>Official Site:</strong>
            <a :href="show.officialSite" target="_blank" class="text-blue-600 underline ml-1">
              {{ show.officialSite }}
            </a>
          </p>
        </div>
      </div>

      <div class="prose max-w-none" v-html="sanitizedSummary"></div>

      <div v-if="show.externals.imdb" class="mt-4">
        <p>
          <strong>IMDb:</strong>
          <a
            :href="'https://www.imdb.com/title/' + show.externals.imdb"
            target="_blank"
            class="text-blue-600 underline ml-1"
          >
            {{ show.externals.imdb }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
