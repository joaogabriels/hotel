<template>
  <q-scroll-area class="fit">
    <div class="q-pa-md">
      <div class="row items-start justify-between q-mb-md">
        <div class="col">
          <HotelRating :stars="hotel.stars" />

          <p class="text-h5 q-ma-none text-grey-9 q-mt-sm">{{ hotel.name }}</p>

          <p class="text-subtitle2 text-grey-6 q-ma-none text-weight-regular">{{ hotel.address.fullAddress }}</p>
        </div>

        <q-btn v-if="$q.screen.lt.md" flat color="grey-6" icon="close" @click="$emit('close')" class="q-pa-none" />
      </div>

      <div class="carousel-container q-mb-md">
        <HotelImagesCarousel :images="hotel.images" :height="$q.screen.lt.md ? '256px' : '420px'" :arrows="true"
          :show-counter="true" />
      </div>

      <template v-if="hotel.amenities?.length">
        <div class="drawer-section-title q-mb-md">Facilidades do hotel</div>

        <div class="amenities-section q-mb-md">
          <HotelAmenities :amenities="hotel.amenities" show-labels />
        </div>
      </template>

      <template v-if="Boolean(hotel.description)">
        <div class="drawer-section-title q-mb-md">Conheça um pouco mais</div>

        <div class="text-grey-6">{{ hotel.description }}</div>
      </template>
    </div>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { Hotel } from './models';
import HotelAmenities from './HotelAmenities.vue';
import HotelImagesCarousel from './HotelImagesCarousel.vue';
import HotelRating from './HotelRating.vue';

const $q = useQuasar();

defineProps<{
  hotel: Hotel;
}>();

defineEmits<{
  close: [];
}>();
</script>

<style lang="scss" scoped>
.carousel-container {
  border-radius: 12px;
}

.drawer-section-title {
  font-size: 24px;
  line-height: 32px;
  color: $grey-9;
}

.amenities-section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 16px 0;
}
</style>