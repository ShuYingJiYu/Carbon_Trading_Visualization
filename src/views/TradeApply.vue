<script lang="ts" setup>
import { enterpriseListAPI } from "@/apis/general/enterpriseList";
import type { EnterpriseInfo } from "@/types/general/enterprise";
import { onMounted } from "vue";
import { ref } from "vue";
import { enterpriseInfoAPI } from "@/apis/enterprise/info";
import { EnterpriseTradeParams } from "@/types/enterprise/trade";
import { enterpriseTradeAPI } from "@/apis/enterprise/trade";
import { ElMessage } from "element-plus";
const enterpriseList = ref<EnterpriseInfo[]>([]);
const nowIndex = ref<number>(0);
const nowId = ref<number>(0);
import VChart from "vue-echarts";
import { TradeInfo } from "@/types/general/tradeInfo";
import { tradeInfoAPI } from "@/apis/enterprise/historyTrade";
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

const getEnterpriseList = async () => {
  const res = await enterpriseListAPI();
  enterpriseList.value = res.data;
};
const clientInfo = ref();
const getInfo = async () => {
  const res = await enterpriseInfoAPI();
  clientInfo.value = res.data;
};
const dialogVisible = ref<boolean>(false);
onMounted(() => {
  getEnterpriseList();
  getInfo();
  getHistory();
});

const tradeForm = ref<EnterpriseTradeParams>({
  receiver_id: "0",
  pay_coin: 0,
  content: "",
});

const apply = async () => {
  tradeForm.value.receiver_id = nowId.value.toString();
  await enterpriseTradeAPI(tradeForm.value);
  ElMessage({
    message: "发起交易成功",
    type: "success",
  });
  getEnterpriseList();
};
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
          <div>企业名称</div>
          <div>企业类型</div>
          <div>碳币数量</div>
          <div>创建时间</div>
          <div>交易次数</div>
          <div>提交次数</div>
        </div>
        <div
          class="item"
          v-for="(item, index) in enterpriseList"
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
          <el-button
            type="primary"
            style="width: 7rem"
            :disabled="item.name === clientInfo?.name"
            @click="
              nowIndex = index;
              dialogVisible = true;
              nowId = item.id;
            "
          >
            发起交易
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="交易详细" width="700">
    <el-form :model="tradeForm" style="width: 650px">
      <el-form-item label="交易发起者">
        <el-input
          v-model="clientInfo.name"
          disabled="true"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="交易接收者">
        <el-input
          v-model="enterpriseList[nowIndex].name"
          disabled="true"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="交易碳币数">
        <el-input v-model="tradeForm.pay_coin" style="width: 50%" />
      </el-form-item>
      <el-form-item label="交易内容">
        <el-input
          v-model="tradeForm.content"
          style="width: 100%"
          rows="7"
          type="textarea"
          size="large"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            apply();
          "
        >
          Confirm
        </el-button>
      </div>
    </template>
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
        grid-template-columns: repeat(7, 1fr);
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
</style>
