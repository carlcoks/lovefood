export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    catalog: [],
    product: null, // select product for modal
  }),

  actions: {
    async getCatalog () {
      const { data } = await useMyFetch('/wp-content/uploads/app_sync/prodcat.json')

      const catalog = (data?.value || []).map(item => {
        const products = item.products.filter(product => product)

        return {
          id: item.id,
          name: item.name,
          products,
        }
      }).filter(item => item?.products?.length)

      this.catalog = catalog
    },

    setProduct (data) {
      this.product = data
    }
  },

  getters: {
    categories: (state) => {
      return state.catalog.map(item => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    },

    isShowProductModal: (state) => {
      return !!state.product
    },
  },
})
