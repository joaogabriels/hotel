<template>
  <div class="row items-start q-gutter-x-xs" :class="{ 'rating-section': hasAmenities }">
    <span>{{ stars }}</span>
    <q-rating :model-value="Number(stars)" size="xs" readonly />
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
</style>