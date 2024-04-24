<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { generateElectricityInfoAPI } from "@/apis/enterprise/historySubmit";
import { GenerateElectricityInfo } from "@/types/general/generateElectricityInfo";
import VChart from "vue-echarts";
const historyList = ref<GenerateElectricityInfo[]>();
const getHistory = async () => {
  const res = await generateElectricityInfoAPI();
  historyList.value = res.data;
  option1.value = {
    title: {
      text: "最近七次提交的表单数据",
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
        name: "煤炭消耗量",
        type: "line",
        stack: "Total",
        data: getField("coal_burning"),
      },
      {
        name: "原油消耗量",
        type: "line",
        stack: "Total",
        data: getField("crude_oil"),
      },
      {
        name: "燃料油消耗量",
        type: "line",
        stack: "Total",
        data: getField("fuel_oil"),
      },
      {
        name: "汽油消耗量",
        type: "line",
        stack: "Total",
        data: getField("gasoline"),
      },
      {
        name: "炼厂干气消耗量",
        type: "line",
        stack: "Total",
        data: getField("refinery_gas"),
      },
      {
        name: "其他制品消耗量",
        type: "line",
        stack: "Total",
        data: getField("other_products"),
      },
      {
        name: "天然气消耗量",
        type: "line",
        stack: "Total",
        data: getField("natural_gas"),
      },
      {
        name: "焦炉煤气消耗量",
        type: "line",
        stack: "Total",
        data: getField("coke_oven_gas"),
      },
      {
        name: "其他煤气消耗量",
        type: "line",
        stack: "Total",
        data: getField("other_gas"),
      },
      {
        name: "脱硫剂消耗量",
        type: "line",
        stack: "Total",
        data: getField("desulfurizing_agent"),
      },
      {
        name: "电力购入量",
        type: "line",
        stack: "Total",
        data: getField("electricity"),
      },
    ],
  };
  option2.value = {
  title: {
    text: "最近七次提交的碳消耗量",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: "category",
      data: getField("create_date"),
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: {
      type: "value",
  },
  series: [
    {
      name: "碳消耗量",
      type: "bar",
      tooltip: {
        valueFormatter: function (value: any) {
          return (value as number);
        },
      },
      data: getField("consumption"),
    },
  ],
}
};

onMounted(() => {
  getHistory();
});

const getField = (index: string) => {
  let newArr = historyList.value?.slice(0, 7).map((item) => item[index]);
  if (index === "create_date") {
    while (newArr!.length < 7)
    {
      newArr?.unshift(newArr![0]);
    }
  } else {
    while (newArr!.length < 7) {
      newArr?.unshift(0);
    }
  }

  return newArr;
};

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
          <div>燃煤消耗量</div>
          <div>原油消耗量</div>
          <div>燃料油消耗量</div>
          <div>汽油消耗量</div>
          <div>炼厂干气消耗量</div>
          <div>其他制品消耗量</div>
          <div>天然气消耗量</div>
          <div>焦炉煤气消耗量</div>
          <div>其他煤气消耗量</div>
          <div>脱硫剂消耗量</div>
          <div>电力购入量</div>
          <div>提交时间</div>
          <div>总碳消耗量</div>
          <div>提交状态</div>
        </div>
        <div class="item" v-for="item in historyList?.slice().reverse()" :key="item.id">
          <div>
            {{ item.coal_burning }}
          </div>
          <div>
            {{ item.crude_oil }}
          </div>
          <div>
            {{ item.fuel_oil }}
          </div>
          <div>
            {{ item.gasoline }}
          </div>
          <div>
            {{ item.refinery_gas }}
          </div>
          <div>
            {{ item.other_products }}
          </div>
          <div>
            {{ item.natural_gas }}
          </div>
          <div>
            {{ item.coke_oven_gas }}
          </div>
          <div>
            {{ item.other_gas }}
          </div>
          <div>
            {{ item.desulfurizing_agent }}
          </div>
          <div>
            {{ item.electricity }}
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
      align-items: center;
      justify-items: center;
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
        grid-template-columns: repeat(14, 1fr);
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
