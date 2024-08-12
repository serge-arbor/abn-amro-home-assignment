<script setup>
import { useFetchShows } from "@/composables/useFetchShows";
import ShowList from "@/components/ShowList.vue";

const { data, error, isLoading } = useFetchShows();
</script>
<template>
  <ShowList 
    :data="data" 
    :error="error" 
    :isLoading="isLoading" 
  />
</template>
