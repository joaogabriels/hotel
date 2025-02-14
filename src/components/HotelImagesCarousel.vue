<template>
  <q-carousel animated v-model="currentSlide" infinite :height="height" class="hotel-carousel" ref="carouselRef"
    :padding="false">
    <q-carousel-slide v-for="(image, index) in images" :name="index" :key="index">
      <img :src="image" @error="onImageError" class="full-width full-height fit" />
    </q-carousel-slide>

    <template v-slot:control>
      <q-carousel-control position="left" class="carousel-nav-btn" :offset="[16, middleOffset]">
        <q-btn round dense color="white" text-color="black" icon="arrow_back" @click="carouselRef?.previous()"
          class="carousel-nav-btn" size="12px" />
      </q-carousel-control>

      <q-carousel-control position="right" class="carousel-nav-btn" :offset="[16, middleOffset]">
        <q-btn round dense color="white" text-color="black" icon="arrow_forward" @click="carouselRef?.next()"
          class="carousel-nav-btn" size="12px" />
      </q-carousel-control>

      <q-carousel-control v-if="showCounter" position="bottom" class="slide-counter-container">
        <div class="slide-counter">
          {{ currentSlide + 1 }}/{{ images.length }}
        </div>
      </q-carousel-control>
    </template>
  </q-carousel>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QCarousel } from 'quasar';

const currentSlide = ref(0);
const carouselRef = ref<QCarousel>();

const props = defineProps<{
  images: string[];
  height?: string;
  arrows?: boolean;
  showCounter?: boolean;
}>();
const middleOffset = computed(() => {
  const heightNum = parseInt((props.height ?? '0').replace('px', ''));

  return heightNum / 2;
});

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/600x400?text=Imagem+não+encontrada';
};
</script>

<style lang="scss" scoped>
.hotel-carousel {
  border-radius: inherit;
  position: relative;

  .q-carousel__slide {
    @media screen and (max-width: 768px) {
      padding: 16px;
    }
  }

  .carousel-nav-btn {
    opacity: 0.9;
    transition: opacity 0.3s ease;
    margin-top: 0;

    &:hover {
      opacity: 1;
    }
  }

  .slide-counter-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .slide-counter {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border-radius: 1000px;
      font-size: 12px;
      padding: 4px 8px;
    }
  }

  img {
    object-fit: cover;
  }

  :deep(.q-carousel__slide) {
    padding: 0;
  }

  :deep(.q-panel) {
    overflow: hidden;
  }
}
</style>