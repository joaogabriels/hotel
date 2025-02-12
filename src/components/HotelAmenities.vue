<template>
  <div v-if="!showLabels" v-for="amenity in filteredAmenities" :key="amenity.key"
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
      <q-btn outline color="light-blue-5" :label="expanded ? 'Ver menos' : 'Mostrar todas as facilidades'" size="sm"
        rounded @click="toggleExpand" />
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

const filteredAmenities = computed(() => {
  const uniqueAmenities = new Map();
  props.amenities
    .filter(amenity => amenity?.key && amenity?.label)
    .forEach(amenity => {
      if (!uniqueAmenities.has(amenity.key)) {
        uniqueAmenities.set(amenity.key, amenity);
      }
    });

  return Array.from(uniqueAmenities.values());
});

const visibleAmenities = computed(() => {
  if (!props.showLabels) return filteredAmenities.value;
  return filteredAmenities.value.slice(0, ITEMS_PER_ROW);
});

const remainingAmenities = computed(() => {
  if (!props.showLabels) return [];
  return filteredAmenities.value.slice(ITEMS_PER_ROW);
});

const hasMoreAmenities = computed(() => {
  return props.showLabels && filteredAmenities.value.length > ITEMS_PER_ROW;
});

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const getAmenityIcon = (key: string): string => {
  const iconMap: Record<string, string> = {
    'WI_FI': 'wifi',
    'PARKING': 'local_parking',
    'POOL': 'pool',
    'AIR_CONDITIONING': 'ac_unit',
    'RESTAURANT': 'restaurant',
    'BAR': 'local_bar',
    'PUB': 'local_bar',
    'ROOM_SERVICE': 'room_service',
    'MEETING_ROOM': 'meeting_room',
    'LAUNDRY': 'local_laundry_service',
    'SPA': 'spa',
    'SAFE': 'lock',
    'BREAKFAST': 'restaurant_menu',
    'GYM': 'fitness_center',
    'BEACH_SERVICE': 'beach_access',
    'BUSINESS_CENTER': 'business_center',
    'GAMES_ROOM': 'sports_esports',
    'PLAYGROUND': 'toys',
    'TENNIS_COURT': 'sports_tennis',
    'SAUNA': 'hot_tub',
    'ELEVATOR': 'elevator',
    'PET_FRIENDLY': 'pets',
    'DISABLED_ACCESS': 'accessible',
    'TRANSFER': 'airport_shuttle',
    'MASSAGE': 'spa',
    'GARDEN': 'park',
    'TERRACE': 'deck',
    'STEAM_ROOM': 'hot_tub',
    'JACUZZI': 'hot_tub',
    'CONCIERGE': 'concierge',
    'VALET_PARKING': 'local_parking',
    'BIKE_RENTAL': 'pedal_bike',
    'LUGGAGE_STORAGE': 'luggage',
    'SECURITY': 'security',
    'RECEPTION_24_HOURS': 'schedule',
    '24H_FRONT_DESK': 'schedule',
    'MULTILINGUAL_STAFF': 'translate',
    'CURRENCY_EXCHANGE': 'currency_exchange',
    'GIFT_SHOP': 'store',
    'MEDICAL_SERVICE': 'medical_services',
    'LIBRARY': 'local_library',
    'GOLF_COURSE': 'golf_course',
    'WATER_SPORTS': 'surfing',
    'KIDS_CLUB': 'child_care',
    'CONFERENCE_ROOM': 'meeting_room',
    'ROOM_TV': 'tv',
    'STAGE': 'theater_comedy',
    'AUDITORIUM': 'theaters'
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