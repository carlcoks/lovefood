import trimStr from '@/utils/trimStr'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMobileOrTablet: false,
    isTablet: false,
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | 'lounge' | null
    // deliveryLocations: [],
    // pickupLocations: [],
    conditions: [], // точки доставки
    zones: [], // зоны доставки
    pickups: [], // точки самовывоза
    selectedLocation: null, // выбранная локация

    isShowReceiptModal: false,
    isShowAuthModal: false,
    isShowSettingsModal: false,
    isShowAcceptCityModal: false,
    isShowDeliveryTypeModal: false,
    isShowAcceptModal: false,

    missedProductsModal: null, // null | { type, location }
  }),

  actions: {
    async getPickups () {
      const { data } = await useFetch('/api/wp-json/systeminfo/v1/shipping_methods')

      this.pickups = data?.value || []
    },

    async getDelivery () {
      const data = await Promise.allSettled([
        useFetch('/api/wp-json/systeminfo/v1/delivery'),
        useFetch('/api/wp-json/system/map')
      ])

      const delivery = data[0]?.value?.data?.value || null
      const zones = data[1]?.value?.data?.value || null

      if (delivery) {
        this.conditions = delivery?.conditions || []
      }

      if (zones) {
        const features = zones?.map?.features || []

        this.zones = features.map(item => {
          if (item.geometry.type === 'Point') {
            return false
          }

          const options = {
            fillColor: item.properties.fill,
            fillOpacity: item.properties['fill-opacity'],
            strokeColor: item.properties.stroke,
            strokeOpacity: item.properties['stroke-opacity'],
            strokeWidth: item.properties['stroke-width'],
          }

          const zone = item.properties.description.split('#cid=')

          return {
            id: item.id.toString(),
            geometry: item.geometry,
            options,
            zone: zone && zone[1] || '',
          }
        }).filter(item => item)
      }
    },

    setDeliveryType (value) {
      this.deliveryType = value
    },

    setLocation (value) {
      this.selectedLocation = value
    },

    toggleShowReceiptModal (value) {
      this.isShowReceiptModal = value
    },

    toggleShowAuthModal (value) {
      this.isShowAuthModal = value
    },

    toggleShowSettingsModal (value) {
      this.isShowSettingsModal = value
    },

    toggleShowAcceptCityModal (value) {
      this.isShowAcceptCityModal = value
    },

    toggleShowDeliveryTypeModal (value) {
      this.isShowDeliveryTypeModal = value
    },

    toggleShowAcceptModal (value) {
      this.isShowAcceptModal = value
    },

    setMissedProductsModal (value) {
      this.missedProductsModal = value
    }
  },

  getters: {
    pickupLocations: (state) => {
      const array = state.pickups.find(item => item.id === 'local_pickup')?.pickup_locations || []

      return array.map(item => {
        return {
          ...item,
          id: item.id.toString(),
          coordinates: trimStr(item.coord).split(',').reverse().map(item => item * 1)
        }
      })
    }
  },

  persist: {
    paths: ['deliveryType', 'selectedLocation']
  },
})