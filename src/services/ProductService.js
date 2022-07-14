import Api from './Api';

export default {

  getProducts (query = null) {
    return Api().get('/api/product/', {
      params: {
        word: query
      }
    })
  },
  getRecipes (query = null) {
    return Api().get('/api/recipe/')
  },
  getRecipesFilter (query = null) {
    return Api().get('/api/recipe/product-filter/',{
      params: {
        word: query
      }
    })
  },
  purchaseMarket (productId){
    return Api().post(`/api/purchase/farmers-market/product/${productId}`)
  },
  createProduct (name, code) {
    return Api().post('/api/product/create/',{
      name: name,
      code: code,
    })
  },
  createRecipe (product, details) {
    return Api().post('/api/recipe/create/',{
      product: product,
      details: details,
    })
  }
}