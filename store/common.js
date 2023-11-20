export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | null
    deliveryLocations: [],
    pickupLocations: [],
    selectedLocation: null, // выбранная локация
  }),

  actions: {
    async getLocations () {
      const { data } = await useMyFetch('/wp-json/systeminfo/v1/shipping_methods')

      const locations = data?.value || []

      locations.forEach(item => {
        if (item.id === 'local_pickup') {
          this.pickupLocations = item.pickup_locations
        }
      })
    },

    setDeliveryType (value) {
      this.deliveryType = value
    },

    setLocation (value) {
      this.selectedLocation = value
    }
  }
})