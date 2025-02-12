<template>
  <div class="row items-start q-gutter-x-xs" :class="{ 'rating-section': hasAmenities }">
    <span>{{ stars }}</span>
    <q-rating :model-value="Number(stars)" size="xs" readonly color="orange-4" class="rating" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stars: string;
  hasAmenities?: boolean;
}>();
</script>

<style lang="scss" scoped>
.rating-section {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  padding-right: 16px;
}

.rating {
  :deep(.q-rating__icon) {
    text-shadow: none;
  }
}
</style>