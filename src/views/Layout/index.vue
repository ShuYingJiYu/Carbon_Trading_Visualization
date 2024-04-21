<script lang="ts" setup>
import { onMounted, ref } from "vue";

// import { adminLoginAPI } from '@/apis/admin/login';
import {EnterpriseLoginAPI} from '@/apis/enterprise/login'
import { LoginParams } from '@/types/login';
import {useClientStore} from '@/stores/index';
import {EnterpriseListAPI} from '@/apis/general/enterpriseList'
import {EnterpriseTradeListAPI} from '@/apis/general/tradeList'
const clientStore = useClientStore()
const test = async ()=>{
  const params = ref<LoginParams>()
  params.value = {
    account: '2022117316',
    password: 'j'
  }
  const res = ref<any>()
  res.value = await EnterpriseLoginAPI(params.value);
  
  console.log(res)
  clientStore.setToken(res.value.data.authorization)

  res.value = await EnterpriseListAPI();
  console.log(res.value.data)

  res.value = await EnterpriseTradeListAPI()
  console.log(res.value.data)

  
}
onMounted(()=>{
  test()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
