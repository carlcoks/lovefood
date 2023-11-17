<template>
  <div v-if="!isLoading">
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

      <yandex-map-marker
        v-for="(item, i) in markers"
        :key="i"
        :settings="{
          coordinates: item.coordinates,
          id: item.id,
        }"
      >
        <div class="modal-receipt-map-marker">
          <UIIcon
            name="metka"
            class="modal-receipt-map-marker__icon"
          />
        </div>
      </yandex-map-marker>
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
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
const zoom = ref(11)
const isLoading = ref(true)

const markers = ref([])

onMounted(() => {
  console.log('VueYandexMaps', VueYandexMaps)

  const array = props.locations.map((item, i) => {
    return {
      id: `id_${item.id}`,
      coordinates: trimStr(item.coord).split(',').reverse()
    }
  })

  markers.value = array

  // setTimeout(() => {
  //   isLoading.value = false 
  // }, 1000)
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
  margin-top: -50px;
  margin-left: -25px;

  &__icon {
    ::v-deep svg {
      width: 50px;
      height: 50px;

      path {
        fill: $blackText;
      }
    }
  }
}
</style>