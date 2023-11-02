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
</template>

<script setup lang="ts">
import { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'

const map = ref<null | YMap>(null)
const center = ref<[number, number]>([37.6231313266754, 55.75254426140658])
const zoom = ref(9)

const markers = ref([
  {
    id: '1',
    coordinates: [37.6231313266754, 55.75254426140658],
  },
])
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