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

    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-marker
      v-for="(item, i) in markers"
      :key="i"
      :settings="{
        coordinates: item.coordinates,
        id: item.id,
      }"
    >
      <div
        class="modal-receipt-map-marker"
        @click="map?.setLocation({
          center: item.coordinates,
          zoom: 17,
          duration: 400
        })"
      >
        <UIIcon
          name="metka-red"
          class="modal-receipt-map-marker__icon"
        />
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
})

const map = shallowRef<null | YMap>(null)
const center = ref<Coordinates>([61.419145, 55.166572])
const zoom = shallowRef<number>(12)

const markers = ref<Marker[]>([])

// Watch
watch(() => props.deliveryType, () => {
  setMarkers()
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

const setMarkers = () => {
  const array = currentLocations.value.map((item, i) => {
    return {
      id: `id_${item.id}`,
      coordinates: trimStr(item.coord).split(',').reverse().map(item => item * 1)
    }
  })

  markers.value = array

  setCenter()
}

const setCenter = () => {
  // const obj = {}

  // if (markers.value.length > 1) {
  //   obj.bounds = markers.value.map(item => {
  //     return [
  //       item.coordinates[0] * 1,
  //       item.coordinates[1] * 1
  //     ]
  //   })
  //   console.log('b', obj.bounds)
  //   // obj.zoom = 1
  //   obj.duration = 400
  // } else if (markers.value.length === 1) {
  //   obj.center = markers.value[0].coordinates
  //   // obj.zoom = zoom.value
  //   obj.duration = 400
  // }

  // const bounds = markers.value.map(item => {
  //   return [
  //     item.coordinates[0] * 1,
  //     item.coordinates[1] * 1
  //   ]
  // })

  // map.value?.setLocation(obj)

  const bounds = map.value?.bounds

  map.value?.setLocation({
    bounds,
    zoom: 15,
    duration: 400
  })
}

onMounted(async () => {
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
  transform: translate(-50%, calc(-50% - 25px));

  &__icon {
    ::v-deep svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>