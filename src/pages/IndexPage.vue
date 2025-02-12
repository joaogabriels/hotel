<template>
  <q-page :class="{ blurred: rightDrawerOpen }" class="bg-grey-2">
    <div class="container-wrapper">
      <div class="row q-col-gutter-md justify-center">
        <div :class="containerClass">
          <HotelFilterForm class="q-mb-md" />

          <div class="q-mb-md row justify-end">
            <HotelSortSelect />
          </div>

          <div class="column q-gutter-y-md">
            <template v-if="loading">
              <q-skeleton v-for="n in 3" :key="`${n}-skeleton`" class="hotel-card-skeleton" height="320px" square />
            </template>

            <template v-else-if="hotels.length">
              <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" @select="openHotelDetails" />
            </template>

            <div v-else class="column items-center q-pa-xl">
              <q-icon name="search_off" size="4rem" color="grey-6" />
              <p class="text-h6 text-grey-6">Nenhum hotel encontrado</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="rightDrawerOpen && !isMobile" class="drawer-overlay" @click="closeDrawer" />
  </q-page>

  <q-drawer v-model="rightDrawerOpen" :width="drawerWidth" side="right" bordered overlay
    :behavior="$q.screen.lt.md ? 'mobile' : 'desktop'" :breakpoint="0" @hide="selectedHotel = null" :full-height="true">
    <DrawerDetails v-if="selectedHotel" :hotel="selectedHotel" @close="closeDrawer" />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import HotelCard from 'components/HotelCard.vue'
import type { Hotel } from 'components/models'
import DrawerDetails from 'components/DrawerDetails.vue'
import HotelFilterForm from 'components/HotelFilterForm.vue'
import HotelSortSelect from 'components/HotelSortSelect.vue'
import { useHotels } from '../composables/useHotels'

const $q = useQuasar()
const rightDrawerOpen = ref(false)
const selectedHotel = ref<Hotel | null>(null)
const currentSlide = ref(0)

const isMobile = computed(() => $q.screen.lt.md)
const drawerWidth = computed(() => isMobile.value ? window.innerWidth : 900)

const containerClass = computed(() => {
  if ($q.screen.gt.lg) return 'col-9'
  if ($q.screen.gt.md) return 'col-10'
  if ($q.screen.gt.sm) return 'col-11'
  return 'col-12'
})

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(rightDrawerOpen, (val) => {
  if (val) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

onBeforeUnmount(() => {
  unlockScroll()
})

const openHotelDetails = (hotel: Hotel) => {
  selectedHotel.value = hotel
  currentSlide.value = 0
  rightDrawerOpen.value = true
}

const closeDrawer = () => {
  rightDrawerOpen.value = false
  selectedHotel.value = null
}

const {
  hotels,
  isFetching: loading,
  // hasNextPage,
  // fetchNextPage
} = useHotels()
</script>

<style lang="scss" scoped>
.container-wrapper {
  padding: 24px;

  @media (min-width: 1024px) {
    padding: 32px;
  }

  @media (min-width: 1440px) {
    padding: 48px;
  }
}

.hotel-card-skeleton {
  border-radius: 12px;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}

.blurred {
  filter: blur(5px);
  transition: filter 0.3s ease-in-out;
}
</style>
