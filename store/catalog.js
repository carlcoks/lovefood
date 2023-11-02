export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    catalog: [],
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
  },

  getters: {
    categories: (state) => {
      return state.catalog.map(item => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    }
  },
})
