<template>
  <q-card flat>
    <q-card-section class="row items-center q-pb-none">
      <p class="text-h6 q-ma-none">{{ hotel.name }}</p>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <p class="text-subtitle1 q-ma-none">{{ hotel.address.fullAddress }}</p>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="column q-gutter-y-md">
        <div class="carousel-container">
          <HotelImagesCarousel :images="hotel.images" :height="$q.screen.lt.md ? '256px' : '320px'" :arrows="true" />
        </div>

        <div class="text-body1">{{ hotel.description }}</div>

        <div v-if="hotel.amenities?.length">
          <div class="text-subtitle2 q-mb-sm">Comodidades</div>
          <HotelAmenities :amenities="hotel.amenities" show-labels />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Hotel } from './models';
import HotelAmenities from './HotelAmenities.vue';
import HotelImagesCarousel from './HotelImagesCarousel.vue';

defineProps<{
  hotel: Hotel;
}>();
</script>

<style>
.carousel-container {
  border-radius: 12px;
}
</style>