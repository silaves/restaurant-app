import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import RequestOrders from '../views/RequestOrders.vue';
import OrderHistory from "../views/OrderHistory.vue";
import Orders from "../views/Orders.vue";
import Purchase from "../views/Purchase.vue";
import Recipe from "../views/Recipe.vue";
import Warehouse from "../views/Warehouse.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    {
      path: '/home',
      component: Home,
    },
  ],
})

export default router