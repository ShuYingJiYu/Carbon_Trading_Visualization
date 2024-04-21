import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useClientStore = defineStore(
  "client",
  () => {
    const token = ref();
    const setToken = (val: string) => {
      token.value = val;
    };
    const clearToken = () => {
      clearIdentity
    };

    const identity = ref<string>();
    const setIdentity = (val: string) => {
      identity.value = val;
    }
    const clearIdentity = () => {
      identity.value = undefined;
    }

    const type = ref<string>();
    const setType = (val: string) => {
      type.value = val;
    }
    const clearType = () => {
      type.value = undefined;
    }
    return {
      token,
      setToken,
      clearToken,
      identity,
      setIdentity,
      clearIdentity,
      type,
      setType,
      clearType,
    };
  },
  {
    persist: true,
  },
);
