<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tradeInfoAPI } from "@/apis/enterprise/historyTrade";
import type { TradeInfo } from "@/types/general/tradeInfo";
import { ElMessageBox, ElMessage } from "element-plus";
import { enterpriseInfoAPI } from "@/apis/enterprise/info";
import { enterpriseHandleTradeAPI } from "@/apis/enterprise/handleTrade";
import { EnterpriseHandleTradeParams } from "@/types/enterprise/handleTrade";
const historyList = ref<TradeInfo[]>();
const getHistory = async () => {
  const res = await tradeInfoAPI();
  historyList.value = res.data;
  console.log(historyList.value);
};
onMounted(() => {
  getHistory();
  getInfo();
});

const clientInfo = ref();
const getInfo = async () => {
  const res = await enterpriseInfoAPI();
  clientInfo.value = res.data;
  console.log(clientInfo.value);
};

const detail = (index: number) => {
  ElMessageBox.alert(historyList.value?.at(index)?.content, "内容详细", {
    confirmButtonText: "OK",
  });
};

const dialogVisible = ref<boolean>(false);

const nowId = ref<string>("");

const accept = async () => {
  const params = {
    trade_id: nowId.value,
    status: 1,
  } as EnterpriseHandleTradeParams;
  await enterpriseHandleTradeAPI(params);
  ElMessage({
    message: "已接受交易",
    type: "success",
  });
  getHistory();
};

const refuse = async () => {
  const params = {
    trade_id: nowId.value,
    status: 2,
  } as EnterpriseHandleTradeParams;
  await enterpriseHandleTradeAPI(params);
  ElMessage({
    message: "已拒绝交易",
    type: "success",
  });
  getHistory();
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
          <div></div>
        </div>
        <div class="item" v-for="(item, index) in historyList" :key="item.id">
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
          <div>
            <el-button
              type="primary"
              style="width: 6rem"
              :disabled="
                item.status !== '待接受' ||
                item.receiver_name !== clientInfo?.name
              "
              @click="
                dialogVisible = true;
                nowId = item.id.toString();
              "
            >
              处理交易
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="处理交易" width="500">
    <div class="dialog">
      <el-button
        class="button"
        type="primary"
        @click="
          dialogVisible = false;
          accept();
        "
      >
        接受
      </el-button>
      <el-button
        class="button"
        type="danger"
        @click="
          dialogVisible = false;
          refuse();
        "
      >
        拒绝
      </el-button>
      <el-button class="button" @click="dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>
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
        grid-template-columns: repeat(10, 1fr);
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
.dialog {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  .button {
    width: 6.5rem;
  }
}
</style>
