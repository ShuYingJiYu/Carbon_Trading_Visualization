<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { enterpriseTradeListAPI } from "@/apis/general/tradeList";
import type { TradeInfo } from "@/types/general/tradeInfo";
import { ElMessageBox } from "element-plus";

const tradeList = ref<TradeInfo[]>()
const getTradeList = async() => {
  const res = await enterpriseTradeListAPI()
  tradeList.value = res.data
}

onMounted(() => {
  getTradeList()
});

const detail = (index: number) => {
  ElMessageBox.alert(tradeList.value?.at(index)?.content, "内容详细", {
    confirmButtonText: "OK",
  });
};

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
          <div>发起者账号</div>
          <div>接收者账号</div>
          <div>发起者用户名</div>
          <div>接收者用户名</div>
          <div>交易内容</div>
          <div>交易碳币</div>
          <div>交易发起时间</div>
          <div>交易状态</div>
          <div></div>
        </div>
        <div class="item" v-for="(item, index) in tradeList" :key="item.id">
          <div>
            {{ item.initiator_account }}
          </div>
          <div>
            {{ item.receiver_account }}
          </div>
          <div>
            {{ item.initiator_name }}
          </div>
          <div>
            {{ item.receiver_name }}
          </div>
          <div>
            {{ item.content.slice(0, 10) }}
            {{ item.content.length > 10 ? "..." : "" }}
          </div>
          <div>
            {{ item.pay_coin }}
          </div>
          <div>
            {{ item.create_date }}
          </div>
          <div>
            {{ item.status }}
          </div>
          <div>
            <el-button
              type="warning"
              style="width: 6rem"
              @click="detail(index)"
            >
              内容详细
            </el-button>
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
        grid-template-columns: repeat(9, 1fr);
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
