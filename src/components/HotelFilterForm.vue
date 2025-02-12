<template>
  <q-card flat class="form-card">
    <div class="card-header q-pb-md q-mb-lg">
      <h2 class="text-h5 q-ma-none text-grey-9 q-pt-md q-px-md">Reservar hotel</h2>
    </div>

    <q-form @submit="onSubmit">
      <div class="column q-gutter-y-md q-px-md q-pb-md">
        <div class="input-group">
          <label class="input-label">Destino <span class="text-negative">*</span></label>
          <q-select v-model="selectedPlace" dense borderless use-input hide-selected fill-input input-debounce="0"
            :options="filteredPlaces" @filter="handleFilter"
            :option-label="opt => opt ? `${opt.name}, ${opt.state.shortname}` : ''" class="input-field" clearable>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum resultado encontrado
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:option="{ itemProps, opt }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.name }}, {{ opt.state.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="input-group">
          <label class="input-label">Nome do Hotel</label>
          <q-input v-model="hotelName" borderless dense class="input-field" />
        </div>

        <div class="flex justify-end q-mt-md">
          <q-btn :label="hasSubmitted ? 'Alterar busca' : 'Buscar'" type="submit" color="primary" rounded no-caps />
        </div>
      </div>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Place } from './models';
import filterPlaces from '../utils/filterPlaces';
import { useQueryParams } from '../composables/useQueryParams'
import { useRoute } from 'vue-router';

const places = ref<Place[]>([]);
const selectedPlace = ref<Place | null>(null);
const hotelName = ref('');
const filteredPlaces = ref<Place[]>([]);
const hasSubmitted = ref(false);
const { updateQueryParams } = useQueryParams()
const { query } = useRoute()

const loadPlaces = async () => {
  try {
    const response = await fetch('/place.json');
    places.value = await response.json();
    filteredPlaces.value = places.value;
  } catch (error) {
    console.error('Error loading places:', error);
  }
};

const handleFilter = (val: string, update: (callback: () => void) => void) => {
  update(() => {
    filteredPlaces.value = filterPlaces(places.value, val);
  });
};

const onSubmit = async () => {
  if (selectedPlace.value || hotelName.value) {
    hasSubmitted.value = true;
  } else {
    hasSubmitted.value = false;
  }

  await updateQueryParams({
    location: selectedPlace.value ? `${selectedPlace.value.name}, ${selectedPlace.value.state.shortname}` : '',
    hotelName: hotelName.value || ''
  });
};

onMounted(async () => {
  await loadPlaces();

  if (query.location) {
    selectedPlace.value = places.value.find(place => `${place.name}, ${place.state.shortname}` === query.location) || null;

    hasSubmitted.value = true;
  }

  if (query.hotelName) {
    hotelName.value = query.hotelName as string;

    hasSubmitted.value = true;
  }
});
</script>

<style lang="scss" scoped>
.form-card {
  border-radius: 12px;

  .q-btn::before {
    box-shadow: none;
  }
}

.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding-left: 4px;
}

.input-field {
  :deep(.q-field__control) {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    min-height: 32px;
    padding: 0 12px;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 0, 0, 0.24);
    }

    &:focus-within {
      border-color: var(--q-primary);
    }
  }

  :deep(.q-field__marginal),
  :deep(.q-field__control) {
    height: 32px;
  }

  :deep(.q-field__native),
  :deep(.q-field__input) {
    min-height: 32px;
    padding: 0;
    font-size: 13px;
  }

  :deep(.q-field__bottom) {
    min-height: 12px;
    padding: 2px 8px 0;
    font-size: 11px;
  }
}
</style>