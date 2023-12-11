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
    <yandex-map-default-features-layer />
    <yandex-map-default-scheme-layer />
    <yandex-map-listener
      :settings="{
        onClick: onMapClick,
      }"
    />

    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-feature
      v-for="item in zones"
      :key="item.id"
      :settings="item"
    />

    <yandex-map-collection>
      <yandex-map-marker
        v-if="deliveryMarker"
        :settings="{
          coordinates: deliveryMarker.coordinates,
          id: deliveryMarker.id,
        }"
      >
        <div
          class="modal-receipt-map-marker modal-receipt-map-marker--delivery"
        >
          <UIIcon
            name="metka"
            class="modal-receipt-map-marker__icon"
          />
        </div>
      </yandex-map-marker>

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
            name="metka"
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
    </yandex-map-collection>
  </yandex-map>
</template>

<script setup lang="ts">
import type { YMap, YMapFeatureProps } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapCollection,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
  YandexMapListener,
  YandexMapFeature,
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

  deliveryCoords: {
    type: Array,
    default: null,
  },
})

const emits = defineEmits(['update', 'setDeliveryCoords', 'setDeliveryZone'])

const map = shallowRef<null | YMap>(null)
const center = ref([61.402554, 55.159902])
const zoom = shallowRef<number>(12)
const deliveryMarker = ref(null)
const currentMarker = ref(null)

const markers = ref([])

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

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    deliveryMarker.value.coordinates = data

    map.value?.setLocation({
      center: data,
      zoom: 17,
      duration: 400
    })

    // const zns = zones.value

    // let zone = null

    // for (const key in zns) {
    //   console.log('k', zns[key].geometry.coordinates)

    //   // if (zns[key].geometry.coordinates.contains(data)) {
    //   //   zone = zns[key]
    //   // }
    // }

    // console.log('z', zone)
  }
})

// Computed
const pickupLocations = computed(() => commonStore.pickupLocations)
const zones = computed(() => {
  if (props.deliveryType === 'delivery') {
    // console.log('zones', commonStore.zones)
    return commonStore.zones
  }
  return []
})

// <!-- Methods -->
const onMapClick = (obj, e) => {
  currentMarker.value = null

  if (e && props.deliveryType === 'delivery') {
    const coords = e.coordinates
    let zone = null

    deliveryMarker.value.coordinates = coords

    if (obj && obj.type && obj.type === 'feature') {
      zone = obj.entity._props.zone
    }

    emits('setDeliveryCoords', coords)
    emits('setDeliveryZone', zone)
  }
}

const goToMarker = (item) => {
  currentMarker.value = item

  map.value?.setLocation({
    center: item.coordinates,
    zoom: 17,
    duration: 400
  })
}

const setMarkers = () => {
  markers.value = []
  deliveryMarker.value = null

  if (props.deliveryType === 'delivery') {
    deliveryMarker.value = {
      id: '999',
      coordinates: center.value
    }
  } else if (props.deliveryType === 'pickup') {
    markers.value = pickupLocations.value

    setCenter()
  }
}

const setCenter = () => {
  const bounds = map.value?.bounds || [center.value, center.value]

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

  &--delivery {
    .modal-receipt-map-marker {
      &__icon {
        ::v-deep svg {
          path {
            fill: $blackText;
          }
        }
      }
    }
  }

  &__icon {
    ::v-deep svg {
      width: 50px;
      height: 50px;

      path {
        fill: $orange;
      }
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