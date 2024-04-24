<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { enterpriseListAPI } from "../apis/general/enterpriseList";
import { EnterpriseInfo } from "../types/general/enterprise";
import VChart from "vue-echarts";
const enterpriseList = ref<EnterpriseInfo[]>();
const getList = async () => {
  const res = await enterpriseListAPI();
  enterpriseList.value = res.data;
  option1.value = {
    title: {
      text: "企业碳币数量排行",
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
        data: getTop1(1),
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: {
      type: "value",
      show:false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    },
    series: [
      {
        name: "碳币数量",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return (value as number);
          },
        },
        data: getTop1(2),
        barWidth: 25,
      },
    ],
  };
  option2.value = {
    title: {
      text: "企业交易数量排行",
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
        data: getTop2(1),
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
        name: "交易数量",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return (value as number);
          },
        },
        data: getTop2(2),
        barWidth: 25,
      },
    ],
  };
  option3.value = {
    title: {
      text: "企业数据提交数量排行",
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
        data: getTop3(1),
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
        name: "提交数量",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return (value as number);
          },
        },
        data: getTop3(2),
        barWidth: 25,
      },
    ],
  };
};
onMounted(() => {
  getList();
});

const getTop1 = (index: number) => {
  console.log(enterpriseList.value)
  let newArr = enterpriseList.value!.slice().sort((a, b) => a.carbon_coin - b.carbon_coin)
  console.log(newArr)
  if (index === 1) {
    let stringArr = newArr.slice(0, 5).map((item) => item.name);
    while (stringArr.length < 5) {
      stringArr.unshift("");
    }
    return stringArr;
  }else if(index === 2){
    let numberArr = newArr.slice(0, 5).map((item) => item.carbon_coin);
    while (numberArr.length < 5) {
      numberArr.unshift(0)
    }
    return numberArr;
  }
};

const getTop2 = (index: number) => {
  console.log(enterpriseList.value)
  let newArr = enterpriseList.value!.slice().sort((a, b) => a.trade_count - b.trade_count)
  console.log(newArr)
  if (index === 1) {
    let stringArr = newArr.slice(0, 5).map((item) => item.name);
    while (stringArr.length < 5) {
      stringArr.unshift("");
    }
    return stringArr;
  }else if(index === 2){
    let numberArr = newArr.slice(0, 5).map((item) => item.trade_count);
    while (numberArr.length < 5) {
      numberArr.unshift(0)
    }
    return numberArr;
  }
};

const getTop3 = (index: number) => {
  console.log(enterpriseList.value)
  let newArr = enterpriseList.value!.slice().sort((a, b) => a.submit_count - b.submit_count )
  console.log(newArr)
  if (index === 1) {
    let stringArr = newArr.slice(0, 5).map((item) => item.name);
    while (stringArr.length < 5) {
      stringArr.unshift("");
    }
    return stringArr;
  }else if(index === 2){
    let numberArr = newArr.slice(0, 5).map((item) => item.submit_count );
    while (numberArr.length < 5) {
      numberArr.unshift(0)
    }
    return numberArr;
  }
};


const option1 = ref();
const option2 = ref();
const option3 = ref();
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="contain">
        <v-chart class="chart" :option="option1" />
      </div>
      <div class="contain">
        <v-chart class="chart" :option="option2" />
      </div>
      <div class="contain">
        <v-chart class="chart" :option="option3" />
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
  grid-template-rows: 300px auto;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  padding: 0.7rem 5rem;
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
        width: 300px;
        height: 200px;
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
