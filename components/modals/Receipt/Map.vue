<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center,
        zoom
      }
    }"
    class="modal-receipt-map"
  >
    <yandex-map-default-features-layer/>
    <yandex-map-default-scheme-layer/>
    <yandex-map-listener
      :settings="{
        onClick: () => currentMarker = null
      }"
    />

    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-marker
      v-for="item in markers"
      :key="item.id"
      :settings="{
        coordinates: item.coordinates,
        id: item.id,
        onClick: () => {emits('update', item)},
      }"
    >
      <div
        class="modal-receipt-map-marker"
      >
        <UIIcon
          name="metka-red"
          class="modal-receipt-map-marker__icon"
        />

        <div
          v-if="currentMarker?.id === item.id"
          class="modal-receipt-map-popup"
        >
          <p class="modal-receipt-map-popup__title">
            {{ item.name }}
          </p>
          <p class="modal-receipt-map-popup__address">
            {{ item.address }}
          </p>
          <p class="modal-receipt-map-popup__time">
            <UIIcon
              name="clock-filled"
              class="modal-receipt-map-popup__icon"
            />
            <span v-html="item.working_time" />
          </p>
        </div>
      </div>
    </yandex-map-marker>
  </yandex-map>
</template>

<script setup lang="ts">
type Coordinates = Array<String | Number>

interface Marker {
  id: string;
  coordinates: Coordinates
}

import type { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
  YandexMapListener,
  VueYandexMaps,
} from 'vue-yandex-maps'

import { useCommonStore } from '@/store/common'
import trimStr from '@/utils/trimStr'

const commonStore = useCommonStore()

const props = defineProps({
  deliveryType: {
    type: String,
    default: 'delivery',
  },

  currentAddress: {
    type: undefined,
    default: null,
  },
})

const emits = defineEmits(['update'])

const map = shallowRef<null | YMap>(null)
const center = ref<Coordinates>([61.419145, 55.166572])
const zoom = shallowRef<number>(12)
const currentMarker = ref(null)

const markers = ref<Marker[]>([])

// Watch
watch(() => props.deliveryType, () => {
  setMarkers()
})

watch(() => props.currentAddress, (data) => {
  if (data) {
    goToMarker(data)
  } else {
    setCenter()
  }
})

// Computed
const pickupLocations = computed(() => commonStore.pickupLocations)

const currentLocations = computed(() => {
  switch (props.deliveryType) {
    case 'pickup':
      return pickupLocations.value
    default:
      return []
  }
})

// <!-- Methods -->
const goToMarker = (item) => {
  currentMarker.value = item

  map.value?.setLocation({
    center: item.coordinates,
    zoom: 17,
    duration: 400
  })
}

const setMarkers = () => {
  markers.value = currentLocations.value

  setCenter()
}

const setCenter = () => {
  const bounds = map.value?.bounds

  map.value?.setLocation({
    bounds,
    duration: 400
  })
}

onMounted(() => {
  setMarkers()
})
</script>

<style lang="scss" scoped>
.modal-receipt-map {
  width: 100%;
  height: 100%;

  border-radius: 0 40px 40px 0;
  overflow: hidden;
}

.modal-receipt-map-marker {
  position: relative;

  transform: translate(-50%, calc(-50% - 25px));

  &__icon {
    ::v-deep svg {
      width: 50px;
      height: 50px;
    }
  }
}

.modal-receipt-map-popup {
  position: absolute;

  left: 0;
  top: calc(100% + 8px);

  width: 260px;

  display: grid;
  grid-gap: 6px;

  padding: 10px 25px;

  background: $white;
  border-radius: 20px;

  &__title {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
    color: $black;
  }

  &__address {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    @include text_mini;
    color: $grayText;
  }
}
</style>