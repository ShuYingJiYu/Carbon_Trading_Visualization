<script lang="ts" setup>
import { useClientStore } from "@/stores";
import GenerateElectricityHistory from "@/views/GenerateElectricityHistory.vue";
import ElectricGridHistory from "@/views/ElectricGridHistory.vue";
const clientStore = useClientStore();
</script>

<template>
  <div style="position: relative; top: 0; left: 0; width: 100%; height: 100%">
    <GenerateElectricityHistory
      v-if="clientStore.type === '发电'"
    ></GenerateElectricityHistory>
    <ElectricGridHistory
      v-if="clientStore.type === '电网'"
    ></ElectricGridHistory>
  </div>
</template>

<style scoped></style>
