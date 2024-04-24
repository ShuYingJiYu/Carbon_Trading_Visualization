<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { enterpriseListAPI } from "../apis/general/enterpriseList";
import { EnterpriseInfo } from "../types/general/enterprise";
const enterpriseList = ref<EnterpriseInfo[]>();
const getList = async () => {
  const res = await enterpriseListAPI();
  enterpriseList.value = res.data;
};
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="contain">
        <div class="text">总企业数: {{ enterpriseList?.length }}</div>
      </div>
      <div class="contain">
        <div class="text"> </div>
      </div>
    </div>
    <div class="body">
      <div class="list">
        <div class="item">
          <div>企业名称</div>
          <div>企业类型</div>
          <div>碳币数量</div>
          <div>创建时间</div>
          <div>交易次数</div>
          <div>提交次数</div>
        </div>
        <div
          class="item"
          v-for="(item) in enterpriseList"
          :key="item.id"
        >
          <div>
            {{ item.name }}
          </div>
          <div>
            {{ item.type }}
          </div>
          <div>
            {{ item.carbon_coin }}
          </div>
          <div>
            {{ item.create_time }}
          </div>
          <div>
            {{ item.trade_count }}
          </div>
          <div>
            {{ item.submit_count }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.main {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 4fr;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  padding: 0.7rem 5rem;
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.25rem;
    .contain {
      position: relative;
      height: 100%;
      width: 100%;
      display: grid;
      justify-items: center;
      align-items: center;
      border-radius: 1.25rem;
      background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
      .text {
        font-size: 1.25rem;
      }
    }
  }
  .body {
    grid-template-columns: 1fr;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    border-radius: 0.625rem;
    padding: 1rem 1.5rem;
    .list {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 0.3rem;
      .item {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: minmax(3rem, auto);
        align-items: center;
        background-color: white;
        border-radius: 0.3125rem;
        div {
          text-align: center;
        }
      }
    }
  }
}
</style>
