<template>
  <div v-if="!showLabels" v-for="amenity in amenities" :key="amenity.key"
    class="row items-center amenity-item text-grey-6">
    <q-icon :name="getAmenityIcon(amenity.key)" size="xs" />
  </div>

  <div v-else>
    <div class="row q-col-gutter-md">
      <div v-for="(amenity) in visibleAmenities" :key="amenity.key" class="col-12 col-sm-6 col-md-3">
        <div class="row items-center q-gutter-x-xs text-grey-6">
          <q-icon :name="getAmenityIcon(amenity.key)" size="xs" />
          <span class="q-ml-xs text-caption">{{ amenity.label }}</span>
        </div>
      </div>
    </div>

    <q-slide-transition>
      <div v-show="expanded" class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div v-for="amenity in remainingAmenities" :key="amenity.key" class="col-12 col-sm-6 col-md-3">
            <div class="row items-center q-gutter-x-xs text-grey-6">
              <q-icon :name="getAmenityIcon(amenity.key)" size="xs" />
              <span class="q-ml-xs text-caption">{{ amenity.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </q-slide-transition>

    <div v-if="hasMoreAmenities" class="row justify-center q-mt-md">
      <q-btn outline color="primary" :label="expanded ? 'Ver menos' : 'Ver mais'" size="sm" @click="toggleExpand" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { HotelAmenities } from './models';

const ITEMS_PER_ROW = 4;
const expanded = ref(false);

const props = withDefaults(defineProps<HotelAmenities>(), {
  showLabels: false
});

const visibleAmenities = computed(() => {
  if (!props.showLabels) return props.amenities;
  return props.amenities.slice(0, ITEMS_PER_ROW);
});

const remainingAmenities = computed(() => {
  if (!props.showLabels) return [];
  return props.amenities.slice(ITEMS_PER_ROW);
});

const hasMoreAmenities = computed(() => {
  return props.showLabels && props.amenities.length > ITEMS_PER_ROW;
});

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const getAmenityIcon = (key: string): string => {
  const iconMap: Record<string, string> = {
    'WI_FI': 'wifi',
    'RESTAURANT': 'restaurant',
    'ROOM_SERVICE': 'room_service',
    'PARKING': 'local_parking',
    'MEETING_ROOM': 'meeting_room',
    'LAUNDRY': 'local_laundry_service',
    'PUB': 'sports_bar',
    'POOL': 'pool',
    'STEAM_ROOM': 'hot_tub',
    'PETS': 'pets',
    'AIR_CONDITIONING': 'ac_unit',
    'SAFE': 'lock',
    'BREAKFAST': 'restaurant_menu',
    'FITNESS_CENTER': 'fitness_center'
  };

  return iconMap[key] || 'help_outline';
};
</script>

<style scoped>
.no-wrap {
  white-space: nowrap;
}

.amenities-container {
  flex-wrap: wrap;
}

.amenity-item {
  @media (max-width: 1023px) {
    margin-top: 8px;
  }
}

@media (min-width: 1024px) {
  .amenities-container {
    flex-wrap: nowrap;
  }
}
</style>