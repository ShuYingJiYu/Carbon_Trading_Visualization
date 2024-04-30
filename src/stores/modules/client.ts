import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useClientStore = defineStore(
  "client",
  () => {
    const token = ref<string>("1");
    return {
      token
    };
  },
  {
    persist: true,
  },
);
