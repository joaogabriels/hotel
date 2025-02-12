<template>
  <div class="row items-center text-grey-8">
    <span class="text-body2">Organizar por</span>
    <q-btn-dropdown flat dense no-caps :label="selectedOption?.label" class="q-ml-sm text-primary text-weight-medium">
      <q-list>
        <q-item v-for="option in sortOptions" :key="option.value" clickable v-close-popup @click="handleSelect(option)">
          <q-item-section>
            <q-item-label>{{ option.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQueryParams } from '../composables/useQueryParams';
import { useRoute } from 'vue-router';

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: 'Recomendados', value: 'recommended' },
  { label: 'Melhor avaliados', value: 'best_rated' }
];

const selectedOption = ref(sortOptions[0]);
const { updateQueryParams } = useQueryParams();
const { query } = useRoute();

const handleSelect = async (option: SortOption) => {
  selectedOption.value = option;
  await updateQueryParams({ sortBy: option.value });
};

onMounted(() => {
  if (query.sortBy) {
    selectedOption.value = sortOptions.find(option => option.value === query.sortBy) || sortOptions[0];
  }
});
</script>