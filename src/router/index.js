import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import RequestOrders from '../views/RequestOrders.vue';
import Product from '../views/Product.vue';
import OrderHistory from "../views/OrderHistory.vue";
import Orders from "../views/Orders.vue";
import Purchase from "../views/Purchase.vue";
import Recipe from "../views/Recipe.vue";
import Warehouse from "../views/Warehouse.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/product',
      component: Product,
    },
    {
      path: '/request-order',
      component: RequestOrders,
    },
    {
      path: '/warehouse',
      component: Warehouse,
    },
    {
      path: '/orders',
      component: Orders,
    },
    {
      path: '/purchases',
      component: Purchase,
    },
    {
      path: '/recipe',
      component: Recipe,
    },
    {
      path: '/order-history',
      component: OrderHistory,
    },
  ],
})

export default router