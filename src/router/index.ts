import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/LayoutIndex.vue"),
      children: [
        {
          path:'/info_view',
          component:()=>import('../views/InfoView.vue')
        },
        {
          path:'/data_submit',
          component:()=>import('../views/DataSubmit.vue')
        },
        {
          path:'/data_history',
          component:()=>import('../views/DataHistory.vue')
        },
        {
          path:'/trade_apply',
          component:()=>import('../views/TradeApply.vue')
        },
        {
          path:'/trade_apply',
          component:()=>import('../views/TradeApply.vue')
        },
        {
          path:'/trade_history',
          component:()=>import('../views/TradeHistory.vue')
        }
      ],
    },
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
    }
  ],
});

export default router;
