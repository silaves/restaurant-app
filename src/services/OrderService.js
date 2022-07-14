import Api from './Api';

export default {
  getOrders() {
      return Api().get(
        '/api/order/'
      )
  },
  createSimpleOrder(table, qty) {
    return Api().post(
      '/api/order/simple-create/',
      {
        table: table,
        qty: qty,
      }
    )
  },
  createCustomOrder(table, details) {
    return Api().post(
      '/api/order/create/',
      {
        table: table,
        details: details,
      }
    )
  },
  getOrdersRequested(status = null) {
    const statusQuery = status ? `?status=${status}` : ''
    return Api().get(
      `/api/order${statusQuery}`
    )
  },
  markOrderDetailAsReceivd(orderDetailId) {
    return Api().post(`/api/order/received-detail/${orderDetailId}`)
  },
  finalizeOrder(orderId) {
    return Api().post(`/api/order/finalize/${orderId}`)
  }
}