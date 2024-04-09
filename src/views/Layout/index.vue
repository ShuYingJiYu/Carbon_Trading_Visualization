<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';

// import { adminLoginAPI } from '@/apis/admin/login';
import {EnterpriseLoginAPI} from '@/apis/enterprise/login'
import { LoginParams } from '@/types/login';

const test = async ()=>{
  const params = ref<LoginParams>()
  params.value = {
    account: '2022117316',
    password: 'j'
  }
  const res = await EnterpriseLoginAPI(params.value);
  console.log(res)
}
onMounted(()=>{
  test()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>