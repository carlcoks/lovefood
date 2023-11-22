export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMobileOrTablet: false,
    isTablet: false,
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | null
    // deliveryLocations: [],
    // pickupLocations: [],
    locations: [],
    selectedLocation: null, // выбранная локация

    isShowReceiptModal: false,
    isShowAuthModal: false,
    isShowSettingsModal: false,
    isShowAcceptCityModal: false,
  }),

  actions: {
    async getLocations () {
      const { data } = await useMyFetch('/wp-json/systeminfo/v1/shipping_methods')

      this.locations = data?.value || []
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
  },

  getters: {
    pickupLocations: (state) => {
      return state.locations.find(item => item.id === 'local_pickup')?.pickup_locations || []
    }
  },
})