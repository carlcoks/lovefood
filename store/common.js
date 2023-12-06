import trimStr from '@/utils/trimStr'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMobileOrTablet: false,
    isTablet: false,
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | 'lounge' | null
    // deliveryLocations: [],
    // pickupLocations: [],
    locations: [],
    selectedLocation: null, // выбранная локация

    isShowReceiptModal: false,
    isShowAuthModal: false,
    isShowSettingsModal: false,
    isShowAcceptCityModal: false,
    isShowDeliveryTypeModal: false,
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

    toggleShowDeliveryTypeModal (value) {
      this.isShowDeliveryTypeModal = value
    },
  },

  getters: {
    pickupLocations: (state) => {
      const array = state.locations.find(item => item.id === 'local_pickup')?.pickup_locations || []

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