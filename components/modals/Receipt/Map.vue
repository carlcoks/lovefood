<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center,
        zoom,
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
import type { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
  VueYandexMaps
} from 'vue-yandex-maps'

import trimStr from '@/utils/trimStr'

const props = defineProps({
  locations: {
    type: Array,
    default: () => ([]),
  },
})

const map = shallowRef<null | YMap>(null)
const center = ref<[number, number]>([61.419145, 55.166572])
const zoom = shallowRef(12)

const markers = ref([])

watch(VueYandexMaps.isLoaded, (value) => {
  if (value) {
    setMarkers()
  }
})

const setMarkers = () => {
  const array = props.locations.map((item, i) => {
    return {
      id: `id_${item.id}`,
      coordinates: trimStr(item.coord).split(',').reverse()
    }
  })

  markers.value = array
}

onMounted(async () => {
  if (VueYandexMaps.isLoaded.value) {
    setMarkers()
  }
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