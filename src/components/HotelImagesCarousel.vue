<template>
  <q-carousel animated v-model="currentSlide" :arrows="arrows" infinite :height="height" class="hotel-carousel">
    <q-carousel-slide v-for="(image, index) in images" :name="index" :key="index" :img-src="image" />
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentSlide = ref(0);

defineProps<{
  images: string[];
  height?: string;
  arrows?: boolean;
}>();
</script>

<style lang="scss" scoped>
.hotel-carousel {
  border-radius: inherit;
}
</style>