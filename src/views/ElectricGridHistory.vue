<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { electricGridInfoAPI } from "@/apis/enterprise/historySubmit";
import { ElectricGridInfo } from "@/types/general/electricGridInfo";
const historyList = ref<ElectricGridInfo[]>();
const getHistory = async () => {
  const res = await electricGridInfoAPI();
  historyList.value = res.data;
  console.log(historyList.value);
};
onMounted(() => {
  getHistory();
});
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="contain">
        <div class="text"></div>
      </div>
      <div class="contain">
        <div class="text"></div>
      </div>
    </div>
    <div class="body">
      <div class="list">
        <div class="item">
          <div>电厂上网电量</div>
          <div>自外省输入电量</div>
          <div>向外省输出电量</div>
          <div>售电量</div>
          <div>输配电量</div>
          <div>退休设备总容量</div>
          <div>退休设备总回收量</div>
          <div>修理设备总容量</div>
          <div>修理设备总回收量</div>
          <div>提交时间</div>
          <div>总碳消耗量</div>
          <div>提交状态</div>
        </div>
        <div class="item" v-for="item in historyList" :key="item.id">
          <div>
            {{ item.PPGCP }}
          </div>
          <div>
            {{ item.IIE }}
          </div>
          <div>
            {{ item.IEE }}
          </div>
          <div>
            {{ item.electricity_sales }}
          </div>
          <div>
            {{ item.transmission_distribution }}
          </div>
          <div>
            {{ item.retirement_capacity }}
          </div>
          <div>
            {{ item.retirement_recovery }}
          </div>
          <div>
            {{ item.fix_capacity }}
          </div>
          <div>
            {{ item.fix_recovery }}
          </div>
          <div>
            {{ item.create_date }}
          </div>
          <div>
            {{ item.consumption }}
          </div>
          <div>
            {{ item.status }}
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
        grid-template-columns: repeat(12, 1fr);
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
