<script setup lang="ts">
import { sanitizeUrl } from '@braintree/sanitize-url'
import { UseImage } from '@vueuse/components'
import DOMPurify from 'dompurify'
import { computed } from 'vue'

import ShowDetailsImageSkeleton from '@/components/skeletons/ShowDetailsImageSkeleton.vue'
import ShowDetailsSkeleton from '@/components/skeletons/ShowDetailsSkeleton.vue'
import type { Show } from '@/entities/show.entity'

const props = defineProps<{
  show: Show | undefined
  error: Error | null
  isLoading: boolean
}>()

const sanitizedSummary = computed(() => {
  return props.show?.summary ? DOMPurify.sanitize(props.show.summary) : ''
})

const sanitizedOfficialSite = computed(() => {
  return props.show?.officialSite ? sanitizeUrl(props.show.officialSite) : ''
})

const sanitizedImdb = computed(() => {
  return props.show?.externals?.imdb
    ? sanitizeUrl(`https://www.imdb.com/title/${props.show.externals.imdb}`)
    : ''
})
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <ShowDetailsSkeleton v-if="isLoading" />

    <div v-else-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

    <div v-else-if="show" class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800">{{ show.name }}</h1>
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="sm:w-1/3">
          <UseImage class="rounded-lg shadow-md" :src="show.image?.original">
            <template #loading>
              <ShowDetailsImageSkeleton />
            </template>

            <template #error>
              <div class="rounded-lg bg-gray-100 h-full"></div>
            </template>
          </UseImage>
        </div>

        <div class="text-md text-gray-700 flex-1 gap-3">
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

          <p v-if="sanitizedOfficialSite">
            <strong>Official Site:</strong>
            <a :href="sanitizedOfficialSite" target="_blank" class="text-blue-600 underline ml-1">
              {{ show.officialSite }}
            </a>
          </p>

          <div v-if="sanitizedImdb">
            <p>
              <strong>IMDb:</strong>
              <a :href="sanitizedImdb" target="_blank" class="text-blue-600 underline ml-1">
                {{ show.externals.imdb }}
              </a>
            </p>
          </div>

          <div class="prose max-w-none mt-4" v-html="sanitizedSummary"></div>
        </div>
      </div>
    </div>
  </div>
</template>
