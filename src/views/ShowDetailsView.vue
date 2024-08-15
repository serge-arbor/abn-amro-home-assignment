<script setup lang="ts">
import { computed } from 'vue'

import ShowDetails from '@/components/ShowDetails.vue'
import { useFetchShowDetails } from '@/composables/useFetchShowDetails'

const props = defineProps<{
  id: string
}>()

const { data: show, error, isLoading } = useFetchShowDetails(computed(() => props.id))
</script>

<template>
  <ShowDetails :show="show" :error="error" :is-loading="isLoading" />
</template>
