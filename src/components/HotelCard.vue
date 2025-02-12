<template>
  <q-card class="hotel-card" flat>
    <div class="row full-width">
      <div class="col-12 col-md-4">
        <HotelImagesCarousel :images="hotel.images" :height="$q.screen.lt.md ? '256px' : '320px'" :arrows="true" />
      </div>

      <div class="col-12 col-md-5">
        <q-card-section>
          <h2 class="text-h5 q-ma-none">{{ hotel.name }}</h2>
          <h3 class="text-subtitle1 text-grey-6 q-ma-none">{{ hotel.address.fullAddress }}</h3>

          <div class="row items-center q-gutter-x-md q-mt-md">
            <HotelRating :stars="hotel.stars" :has-amenities="Boolean(hotel.amenities?.length)" />
            <HotelAmenities :amenities="hotel.amenities || []" />
          </div>

          <div class="q-mt-md">
            <q-chip :label="hotel.hasRefundableRoom ? 'Reembolsável' : 'Não Reembolsável'" color="grey-6"
              text-color="grey-1" dense class="no-shadow rounded-borders q-pa-md" />
          </div>
        </q-card-section>
      </div>

      <div class="col-12 col-md-3 price-section">
        <q-card-section class="column full-height">
          <div class="col-auto q-mb-md q-mb-md-none">
            <p class="text-caption q-ma-none">A partir de</p>
            <p class="text-caption q-mb-sm">
              R$
              <span class="text-h5">{{ formatCurrency(hotel.price) }}</span>
            </p>
            <p class="text-caption q-ma-none">Impostos inclusos</p>
          </div>

          <div class="col full-width flex justify-start items-start">
            <q-btn no-caps color="primary" label="Selecionar" rounded @click="$emit('select', hotel)" />
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import HotelAmenities from './HotelAmenities.vue';
import HotelImagesCarousel from './HotelImagesCarousel.vue';
import HotelRating from './HotelRating.vue';
import type { Hotel } from './models';

import formatCurrency from '../utils/formatCurrency';

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

  .q-btn::before {
    box-shadow: none;
  }

  .q-btn {
    width: 70%;
    margin-top: 32px;

    @media (max-width: 1023px) {
      margin-top: 0;
      width: 100%;
    }
  }
}
</style>
