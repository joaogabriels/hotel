<template>
  <div class="column q-gutter-y-md">
    <template v-if="loading && !hotels.length">
      <q-skeleton v-for="n in 3" :key="`${n}-skeleton`" class="hotel-card-skeleton" height="320px" square />
    </template>

    <template v-else>
      <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteScrollRef">
        <template v-if="hotels.length">
          <div class="column q-gutter-y-md">
            <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" @select="$emit('select', hotel)" />
          </div>
        </template>

        <template v-else>
          <div class="column items-center q-pa-xl">
            <q-icon name="search_off" size="4rem" color="grey-6" />
            <p class="text-h6 text-grey-6">Nenhum hotel encontrado</p>
          </div>
        </template>

        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

      </q-infinite-scroll>

      <div class="row justify-center" v-if="!hasNextPage && hotels.length">
        <p class="text-grey-6 text-subtitle2 text-weight-regular">Não existem mais hotéis para serem exibidos :(</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QInfiniteScroll } from 'quasar'
import HotelCard from './HotelCard.vue'
import { useHotels } from '../composables/useHotels'
import type { Hotel } from './models'

const infiniteScrollRef = ref<QInfiniteScroll>()

const {
  hotels,
  isFetching: loading,
  hasNextPage,
  fetchNextPage,
} = useHotels()

const onLoad = async (index: number, done: () => void) => {
  await fetchNextPage()
  done()
}

defineEmits<{
  select: [hotel: Hotel]
}>()
</script>

<style lang="scss" scoped>
.hotel-card-skeleton {
  border-radius: 12px;
}
</style>