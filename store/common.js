export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | null
  }),
})