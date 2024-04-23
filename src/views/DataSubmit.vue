<script lang="ts" setup>
import { useClientStore } from "@/stores";
import GenerateElectricity from "@/views/GenerateElectricity.vue";
import ElectricGrid from "@/views/ElectricGrid.vue";
const clientStore = useClientStore();
</script>

<template>
  <div style="position: relative; top: 0; left: 0; width: 100%; height: 100%">
    <GenerateElectricity
      v-if="clientStore.type === '发电'"
    ></GenerateElectricity>
    <ElectricGrid v-if="clientStore.type === '电网'"></ElectricGrid>
  </div>
</template>

<style scoped></style>
