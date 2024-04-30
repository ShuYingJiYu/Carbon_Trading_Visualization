import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/VisualTrade.vue"),
    },
    {
      path: "/view", 
      component: () => import("../views/VisualView.vue"),
    }
  ],
});

export default router;
