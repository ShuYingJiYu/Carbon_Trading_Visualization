<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { tradeInfoAPI } from "@/apis/enterprise/historyTrade";
import type { TradeInfo } from "@/types/general/tradeInfo";
import { ElMessageBox, ElMessage } from "element-plus";
import { enterpriseInfoAPI } from "@/apis/enterprise/info";
import VChart from "vue-echarts";
import { enterpriseHandleTradeAPI } from "@/apis/enterprise/handleTrade";
import { EnterpriseHandleTradeParams } from "@/types/enterprise/handleTrade";
const historyList = ref<TradeInfo[]>();
const getHistory = async () => {
  const res = await tradeInfoAPI();
  historyList.value = res.data;
  option1.value = {
    title: {
      text: "最近七次交易的碳币数",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: getField("create_date"),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "碳交易",
        type: "line",
        stack: "Total",
        data: getField("pay_coin"),
      },
    ],
  };
  option2.value = {
    tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: getType(0), name: '待接受' },
        { value: getType(1), name: '已接受' },
        { value: getType(2), name: '已拒绝' },
      ]
    }
  ]
  };
};
onMounted(() => {
  getHistory();
  getInfo();
});

const clientInfo = ref();
const getInfo = async () => {
  const res = await enterpriseInfoAPI();
  clientInfo.value = res.data;
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

const getField = (index: string) => {
  if (index === "create_date") {
    let newArr = historyList.value?.slice(0, 7).map((item) => item[index]);
    while (newArr!.length < 7) {
      newArr?.unshift(newArr![0]);
    }
    return newArr;
  } else {
    let newArr = historyList.value
      ?.slice(0, 7)
      .map((item) => (item.pay_coin >= 0 ? item.pay_coin  : -1 * item.pay_coin));
    while (newArr!.length < 7) {
      newArr?.unshift(0);
    }
    return newArr;
  }
};

const getType = (index:number) => {
  let count = 0;
  var i = 0;
  if (index === 0) {
    for (i = 0; i < historyList.value!.length; i++){
      if (historyList.value![i].status === "待接受") {
        count++;
      }
    }
    return count;
  }else if(index === 1){
    for (i = 0; i < historyList.value!.length; i++){
      if (historyList.value![i].status === "已接受") {
        count++;
      }
    }
    return count;
  }else{
    for (i = 0; i < historyList.value!.length; i++){
      if (historyList.value![i].status === "已拒绝") {
        count++;
      }
    }
    return count;
  }
}
const option1 = ref();
const option2 = ref();
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="contain">
        <v-chart class="chart" :option="option1" />
      </div>
      <div class="contain">
        <v-chart class="chart" style="margin-top: 3.125rem;" :option="option2" />
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
  grid-template-rows: 400px auto;
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
      .chart {
        width: 600px;
        height: 350px;
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
        grid-auto-rows: minmax(4rem, auto);
        align-items: center;
        background-color: white;
        border-radius: 0.3125rem;
        div {
          text-align: center;
          padding: 0 0.125rem;
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
