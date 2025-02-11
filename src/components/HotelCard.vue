<template>
  <q-card class="hotel-card" flat>
    <div class="row full-width" :class="{ 'gt-sm': !$q.screen.lt.md }">
      <div :class="$q.screen.lt.md ? 'col-12' : 'col-4'">
        <HotelImagesCarousel :images="hotel.images" :height="$q.screen.lt.md ? '256px' : '320px'" :arrows="true" />
      </div>

      <div :class="$q.screen.lt.md ? 'col-12' : 'col-5'">
        <q-card-section>
          <h2 class="text-h5 q-ma-none">{{ hotel.name }}</h2>
          <h3 class="text-subtitle1 q-ma-none">{{ hotel.address.fullAddress }}</h3>

          <div class="row items-center q-gutter-x-md q-mt-md">
            <div class="row items-center q-gutter-x-xs">
              <span>{{ hotel.stars }}</span>
              <q-rating :model-value="Number(hotel.stars)" size="xs" readonly />
            </div>

            <HotelAmenities :amenities="hotel.amenities || []" />
          </div>

          <div class="q-mt-md">
            <q-chip :label="hotel.hasRefundableRoom ? 'Reembolsável' : 'Não Reembolsável'" color="grey-6"
              text-color="grey-1" dense class="no-shadow rounded-borders q-pa-md" />
          </div>
        </q-card-section>
      </div>

      <div :class="$q.screen.lt.md ? 'col-12' : 'col-3'" class="price-section">
        <q-card-section class="column full-height">
          <div>
            <p class="text-caption q-ma-none">A partir de</p>
            <p class="text-caption q-mb-sm">
              R$
              <span class="text-h5">{{ hotel.price }}</span>
            </p>
            <p class="text-caption q-ma-none">Impostos inclusos</p>
          </div>

          <q-btn :class="$q.screen.lt.md ? 'full-width q-mt-md' : 'q-mt-xl'" no-caps color="primary" label="Selecionar"
            rounded @click="$emit('select', hotel)" />
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import HotelAmenities from './HotelAmenities.vue';
import HotelImagesCarousel from './HotelImagesCarousel.vue';
import type { Hotel } from './models';

const $q = useQuasar();

defineProps<{
  hotel: Hotel
}>();

defineEmits<{
  select: [hotel: Hotel]
}>();
</script>

<style lang="scss">
.hotel-card {
  border-radius: 12px;

  .hotel-carousel {
    border-radius: 12px 0 0 12px;

    @media (max-width: 1023px) {
      border-radius: 12px 12px 0 0;
    }
  }

  .price-section {
    border-left: 1px solid rgba(0, 0, 0, 0.12);

    @media (max-width: 1023px) {
      border-left: none;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
