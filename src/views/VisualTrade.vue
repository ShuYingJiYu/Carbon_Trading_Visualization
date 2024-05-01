<script setup lang="ts">
import { electricGridListAPI } from "@/apis/general/electricGridList";
import { enterpriseListAPI } from "@/apis/general/enterpriseList";
import { generateElectricityListAPI } from "@/apis/general/generateElectricityList";
import { enterpriseTradeListAPI } from "@/apis/general/tradeList";
import { ElectricGridInfo } from "@/types/general/electricGridInfo";
import { EnterpriseInfo } from "@/types/general/enterprise";
import { GenerateElectricityInfo } from "@/types/general/generateElectricityInfo";
import { TradeInfo } from "@/types/general/tradeInfo";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import VChart from "vue-echarts";
import type { EnterpriseSum } from "@/types/sum";
const router = useRouter();
const enterpriseList = ref<EnterpriseInfo[]>();
const getEnterpriseList = async () => {
  const res = await enterpriseListAPI();
  enterpriseList.value = res.data;
  optionEnterpriseList.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      height: "60%",
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
        data: [
          "北京市碳排放权电子交易平台",
          "上海环境能源交易所",
          "天津排放权交易所有限公司",
          "广州碳排放权交易所",
          "深圳排放权交易所",
        ],
        axisLine: {
          show: true, //不显示横轴线
        },
        axisTick: {
          alignWithLabel: true, //柱状图中心是否对齐刻度位置
          show: true, //不显示刻度
        },
        axisLabel: {
          interval: 0,
          formatter: function (value:any) {
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 5; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于5,
              for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
        },
      },
    ],
    yAxis: {
      type: "value",
      show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    },
    series: [
      {
        name: "碳币数量",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return value as number;
          },
        },
        data: [2134560000, 1736856400, 1543210000, 1153322000, 765432100],
        barWidth: 25,
      },
    ],
  };
  optionEnterpriseTrade.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      height: "60%",
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
        data: [
          "北京碳排放权交易平台",
          "重庆公共资源交易网",
          "天津排放权交易所",
          "四川联合环境交易所",
          "深圳排放权交易所",
        ],
        axisPointer: {
          type: "shadow",
        },
        axisLine: {
          show: true, //不显示横轴线
        },
        axisTick: {
          alignWithLabel: true, //柱状图中心是否对齐刻度位置
          show: true, //不显示刻度
        },
        axisLabel: {
          interval: 0,
          formatter: function (value:any) {
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 5; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于5,
              for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
        },
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "本月交易数量",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return value as number;
          },
        },
        data: [41,35,34,29,27],
        barWidth: 25,
      },
    ],
  };
};

// const getTop2 = (index: number) => {
//   let newArr = enterpriseList
//     .value!.slice()
//     .sort((a, b) => a.trade_count - b.trade_count);
//   if (index === 1) {
//     let stringArr = newArr.slice(0, 5).map((item) => item.name);
//     while (stringArr.length < 5) {
//       stringArr.unshift("");
//     }
//     return stringArr;
//   } else if (index === 2) {
//     let numberArr = newArr.slice(0, 5).map((item) => item.trade_count);
//     while (numberArr.length < 5) {
//       numberArr.unshift(0);
//     }
//     return numberArr;
//   }
// };

const tradeList = ref<TradeInfo[]>();
const getTradeList = async () => {
  const res = await enterpriseTradeListAPI();
  tradeList.value = res.data;
  optionTradeCoin.value = {
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
      data: getTradeField("create_date"),
      //设置网格线颜色
    },
    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "碳交易",
        type: "line",
        stack: "Total",
        data: getTradeField("pay_coin"),
      },
    ],
  };
  optionTradeRate.value = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 42, name: "待接受" },
          { value: 5405, name: "已接受" },
          { value: 722, name: "已拒绝" },
        ],
      },
    ],
  };
  type1Sum.value = getType(1);
  type2Sum.value = getType(2);
};

const generateElectricityList = ref<GenerateElectricityInfo[]>();
const getGenerateElectricityList = async () => {
  const res = await generateElectricityListAPI();
  generateElectricityList.value = res.data;
  optionGenerateElectricity.value = {
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
      data: getGenerateElectricityField("create_date"),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "煤炭消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("coal_burning"),
      },
      {
        name: "原油消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("crude_oil"),
      },
      {
        name: "燃料油消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("fuel_oil"),
      },
      {
        name: "汽油消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("gasoline"),
      },
      {
        name: "炼厂干气消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("refinery_gas"),
      },
      {
        name: "其他制品消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("other_products"),
      },
      {
        name: "天然气消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("natural_gas"),
      },
      {
        name: "焦炉煤气消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("coke_oven_gas"),
      },
      {
        name: "其他煤气消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("other_gas"),
      },
      {
        name: "脱硫剂消耗量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("desulfurizing_agent"),
      },
      {
        name: "电力购入量",
        type: "line",
        stack: "Total",
        data: getGenerateElectricityField("electricity"),
      },
    ],
  };
};
const getGenerateElectricityField = (index: string) => {
  let newArr = generateElectricityList.value
    ?.slice(0, 7)
    .map((item) => item[index]);
  if (index === "create_date") {
    while (newArr!.length < 7) {
      newArr?.unshift(newArr![0]);
    }
  } else {
    while (newArr!.length < 7) {
      newArr?.unshift(0);
    }
  }

  return newArr;
};

const electricGridList = ref<ElectricGridInfo[]>();
const getElectricGridList = async () => {
  const res = await electricGridListAPI();
  electricGridList.value = res.data;
  optionElectricGrid.value = {
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
      data: getElectricGridField("create_date"),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "电厂上网电量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("PPGCP"),
      },
      {
        name: "自外省输入电量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("IIE"),
      },
      {
        name: "向外省输出电量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("IEE"),
      },
      {
        name: "售电量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("electricity_sales"),
      },
      {
        name: "输配电量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("transmission_distribution"),
      },
      {
        name: "退休设备总容量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("retirement_capacity"),
      },
      {
        name: "退休设备总回收量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("retirement_recovery"),
      },
      {
        name: "修理设备总容量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("fix_capacity"),
      },
      {
        name: "修理设备总回收量",
        type: "line",
        stack: "Total",
        data: getElectricGridField("fix_recovery"),
      },
    ],
  };
};

const getElectricGridField = (index: string) => {
  if (index === "create_date") {
    let newArr = electricGridList.value?.slice(0, 7).map((item) => item[index]);
    while (newArr!.length < 7) {
      newArr?.unshift(newArr![0]);
    }
    return newArr;
  } else {
    let newArr = electricGridList.value
      ?.slice(0, 7)
      .map((item) => (item[index] >= 0 ? item[index] : -1 * item[index]));
    while (newArr!.length < 7) {
      newArr?.unshift(0);
    }
    return newArr;
  }
};

const enterpriseSumList = ref<EnterpriseSum[]>([]);
const getSum = () => {
  generateElectricityList.value?.forEach((item) => {
    enterpriseSumList.value?.push({
      name: item.name,
      type: "发电",
      consumption: item.consumption,
    });
  });
  electricGridList.value?.forEach((item) => {
    enterpriseSumList.value?.push({
      name: item.name,
      type: "电网",
      consumption:
        item.consumption >= 0 ? item.consumption : -1 * item.consumption,
    });
  });
  enterpriseSumList.value?.sort((a, b) => b.consumption - a.consumption);
};

const type1Sum = ref(0);
const type2Sum = ref(0);
onMounted(async () => {
  await getEnterpriseList();
  await getTradeList();
  await getGenerateElectricityList();
  await getElectricGridList();
  await getSum();
});

// const getTop1 = (index: number) => {
//   let newArr = enterpriseList
//     .value!.slice()
//     .sort((a, b) => a.carbon_coin - b.carbon_coin);
//   if (index === 1) {
//     let stringArr = newArr.slice(0, 5).map((item) => item.name);
//     while (stringArr.length < 5) {
//       stringArr.unshift("");
//     }
//     return stringArr;
//   } else if (index === 2) {
//     let numberArr = newArr.slice(0, 5).map((item) => item.carbon_coin);
//     while (numberArr.length < 5) {
//       numberArr.unshift(0);
//     }
//     return numberArr;
//   }
// };

const getTradeField = (index: string) => {
  if (index === "create_date") {
    let newArr = tradeList.value?.slice(0, 7).map((item) => item[index]);
    while (newArr!.length < 7) {
      newArr?.unshift(newArr![0]);
    }
    return newArr;
  } else {
    let newArr = tradeList.value
      ?.slice(0, 7)
      .map((item) => (item.pay_coin >= 0 ? item.pay_coin : -1 * item.pay_coin));
    while (newArr!.length < 7) {
      newArr?.unshift(0);
    }
    return newArr;
  }
};

const getType = (index: number) => {
  let count = 0;
  var i = 0;
  if (index === 0) {
    for (i = 0; i < tradeList.value!.length; i++) {
      if (tradeList.value![i].status === "待接受") {
        count++;
      }
    }
    return count;
  } else if (index === 1) {
    for (i = 0; i < tradeList.value!.length; i++) {
      if (tradeList.value![i].status === "已接受") {
        count++;
      }
    }
    return count;
  } else {
    for (i = 0; i < tradeList.value!.length; i++) {
      if (tradeList.value![i].status === "已拒绝") {
        count++;
      }
    }
    return count;
  }
};
const optionTradeCoin = ref();
const optionTradeRate = ref();
const optionEnterpriseTrade = ref();
const optionEnterpriseList = ref();
const optionGenerateElectricity = ref();
const optionElectricGrid = ref();
</script>

<template>
  <el-button
    style="
      position: absolute;
      top: 20px;
      left: 40px;
      width: 120px;
      color: black;
    "
    type="primary"
    disabled
    >企业数据总览</el-button
  >
  <el-button
    @click="router.push('/view')"
    style="
      position: absolute;
      top: 20px;
      left: 160px;
      width: 120px;
      color: black;
    "
    type="danger"
    >交易数据总览</el-button
  >
  <div class="container-header">
    <ul class="nowTime">
      <li></li>
      <li></li>
    </ul>
    <div class="location">
      <i class="icon iconfont icon-buoumaotubiao23"></i>
      <span class="areaName"></span>
    </div>
    <h3>基于区块链的碳交易可视化</h3>
  </div>
  <div class="container-content">
    <div class="top">
      <div class="count-base">
        <div class="com-count-title">企业总碳币成交额排名</div>
        <div class="com-screen-content">
          <div id="main1" style="width: 100%; height: 300px">
            <v-chart class="chart1" :option="optionEnterpriseList" />
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
      <div class="count-resource q1">
        <div class="com-count-title"></div>
        <div class="com-screen-content2">
          <ul class="use-data">
            <li>
              <p class="data-count"> 6172 </p>
              <span class="data-name">交易总数</span>
            </li>
            <li>
              <p class="data-count"> 5405</p>
              <span class="data-name">成功交易数</span>
            </li>
            <li>
              <p class="data-count"> 722 </p>
              <span class="data-name">失败交易数</span>
            </li>
          </ul>
          <div class="com-screen-content">
            <div
              id="main2"
              style="margin-top: 10px; width: 100%; height: 240px"
            >
              <v-chart class="chart" :option="optionTradeRate" />
            </div>
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
      </div>
      <div class="count-resource q2">
        <div class="com-count-title">企业交易数量排行</div>

        <div class="com-screen-content">
          <div id="main3" style="margin-top: 10px; width: 100%; height: 240px">
            <v-chart class="chart" :option="optionEnterpriseTrade" />
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
    </div>

    <div class="mid">
      <div class="count-share w1">
        <div class="com-count-title">近期交易数额</div>
        <div class="com-screen-content">
          <div class="topRec_List">
            <dl>
              <dd>企业名称</dd>
              <dd>企业类型</dd>
              <dd>交易碳币</dd>
            </dl>
            <div class="maquee">
              <ul>
                <li>
                  <div>北京市碳排放权电子交易平台</div>
                  <div>碳排放权交易</div>
                  <div>257275</div>
                </li>
                <li>
                  <div>上海环境能源交易所</div>
                  <div>环境能源交易</div>
                  <div>12423</div>
                </li>
                <li>
                  <div>天津排放权交易所有限公司</div>
                  <div>碳排放权交易</div>
                  <div>134,648</div>
                </li>
                <li>
                  <div>广州碳排放权交易所</div>
                  <div>碳排放权交易</div>
                  <div>2040373.6</div>
                </li>
                <li>
                  <div>深圳排放权交易所</div>
                  <div>碳排放权交易</div>
                  <div>84768.22</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
      <div class="count-share w2">
        <div class="com-count-title">近期交易碳币数</div>
        <div class="com-screen-content">
          <div id="main5" style="width: 100%; height: 300px">
            <v-chart class="chart" :option="optionTradeCoin" />
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
    </div>

    <div class="bottom">
      <div class="count-topic e1">
        <div class="com-count-title">近期发电企业表单数据</div>
        <div class="com-screen-content">
          <div id="main6" style="width: 100%; height: 300px">
            <v-chart class="chart" :option="optionGenerateElectricity" />
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
      <div class="count-topic e2">
        <div class="com-count-title">近期电网企业表单数据</div>
        <div class="com-screen-content">
          <div id="main7" style="width: 100%; height: 300px">
            <v-chart class="chart1" :option="optionElectricGrid" />
          </div>
        </div>
        <span class="left-top"></span>
        <span class="right-top"></span>
        <span class="left-bottom"></span>
        <span class="right-bottom"></span>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<style>
@font-face {
  font-family: "iconfont";
  src: url("iconfont.eot?t=1516847126977"); /* IE9*/
  src:
    url("iconfont.eot?t=1516847126977#iefix") format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAV0AAsAAAAAB+QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kf/Y21hcAAAAYAAAABeAAABhpmMBr5nbHlmAAAB4AAAAZ8AAAHEm4J/L2hlYWQAAAOAAAAALgAAADYQPgYpaGhlYQAAA7AAAAAcAAAAJAfeA4RobXR4AAADzAAAAAwAAAAMC+kAAGxvY2EAAAPYAAAACAAAAAgAdgDibWF4cAAAA+AAAAAfAAAAIAESAF1uYW1lAAAEAAAAAUUAAAJtPlT+fXBvc3QAAAVIAAAALAAAAD21fvVfeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDwTZW7438AQw9zA0AAUZgTJAQAk6wyBeJzFkMENgDAMAy9t6QPx7Q48GIgXc3TirlFMKA8mqCXHimMpUYAFiOIhJrAL48Ep19yPrO4nz2SpEait9K7+U0U0y65BJTMNNm/1H5vXfXT6CnVQJ7byknADgzcL4wAAeJwtTz1v01AUfee92E5CYpNnx88fTezEbR40YAnjJGpRkoVEATFEysTWLGytxNSFwQsSkRiYUSeExC8oU8dKrF0ZEfyB/oAGHpSrq6Nzde450iEaIb9/sAvmEZvcI4/IU7IkBHofXZO20JF5SvtodrSmcEwmE9kxkm7KxhBd3XGzYd4TuqFbMNHG4042lCmVGOQT+gSZ2wL8MFjxvR3OPqDqyfbb7XP6Cc0o2bEmD7fPHkydLLbLpzXOfc7fl3VNK1NaskwcC7eiVar69rNmBc2L6D6NUPNl8OJlPQ75+l1+0toTFaAoYIex+WXaCBpq3wSuzX3jbr3sBfVk18HprzueXWv1fhI1JdW1YK9ZQRzSIxmZEKIlskdlitEEozaEq8pQg5kwdFe4XAy5EpTMUsjbDxN/VUXUmYLWPENc74cNlK7Ozq5KaIT714JvvjJYfnQ5Gl1GvgV2vlkcUXq0uMV8Tuk8/4dFNcar1XjWV16V0J+NV9uPMfumHPLwYLr9vlxCTg8O5eb85gbr/wGLNXYxzwczSmeDfP4H2qRQkwB4nGNgZGBgAOKN3SqC8fw2Xxm4WRhA4Fp/ohiC/t/AwsDcAORyMDCBRAH/0wjqAAB4nGNgZGBgbvjfwBDDwgACQJKRARUwAwBHCQJsBAAAAAPpAAAEAAAAAAAAAAB2AOJ4nGNgZGBgYGYIZGBlAAEmIOYCQgaG/2A+AwAQ9wFwAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBsYI/qTS/NDcxv6Q0KTMx38iYgQEATDMGhQ==")
      format("woff"),
    url("iconfont.ttf?t=1516847126977") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("iconfont.svg?t=1516847126977#iconfont") format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-buoumaotubiao23:before {
  content: "\e615";
}

/*common.css*/
@font-face {
  font-family: myFirstFont;
  src: url("../font/Fette-Engschrift.ttf");
}

body {
  background: #081325 url(../images/interact.png) center no-repeat;
  background-size: cover;
}
div {
  box-sizing: border-box;
}

.clearfix {
  clear: both;
}
.container-header {
  width: 100%;
  height: 74px;
  text-align: center;
  box-sizing: border-box;
}
.container-header .nowTime {
  position: absolute;
  left: 20px;
  top: 41px;
  font-size: 0;
}
.container-header .nowTime li {
  display: inline-block;
  width: 140px;
  height: 40px;
  font-size: 30px;
  color: #fff;
}
.nowTime li {
  display: inline-block;
  float: left;
  /*font-weight: 800;*/
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(#5ec0d2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nowTime li div {
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(#5ec0d2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  text-align: left;
}
.nowTime li p {
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(#5ec0d2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
}
.container-header .location {
  position: absolute;
  right: 17px;
  top: 46px;
}
.location i {
  font-size: 18px;
  font-weight: 800;
  color: #7e9bc6;
}
.location span {
  font-size: 20px;
  line-height: 30px;
  color: #168fcd;
}

.container-header h3 {
  line-height: 74px;
  font-size: 2.5vw;
  font-weight: 800;
  color: #fff;
}

/* 边角 */
.left-top,
.right-top,
.left-bottom,
.right-bottom {
  position: absolute;
  width: 13px;
  height: 13px;
}
.left-top {
  left: 0;
  top: 0;
  border-left: solid 2px #045291;
  border-top: solid 2px #045291;
}
.right-top {
  right: 0;
  top: 0;
  border-right: solid 2px #045291;
  border-top: solid 2px #045291;
}
.left-bottom {
  left: 0;
  bottom: 0;
  border-left: solid 2px #045291;
  border-bottom: solid 2px #045291;
}
.right-bottom {
  right: 0;
  bottom: 0;
  border-right: solid 2px #045291;
  border-bottom: solid 2px #045291;
}

.resource-right .com-count-title {
  font-size: 16px;
  margin-left: 10px;
}
.com-count-title {
  color: #1bb4f9;
  padding: 20px;
  font-size: 22px;
}
.com-screen-content {
  width: 100%;
  height: auto;
}
.com-screen-content2 {
  width: 100%;
  height: auto;
}
.filter-type {
  font-size: 0;
}
.filter-type li:hover {
  cursor: pointer;
}
.filter-type li {
  display: inline-block;
  width: 120px;
  line-height: 40px;
  font-family: myFirstFont;
  font-size: 20px;
  text-align: center;
  color: #024f9b;
  border: solid 1px #075797;
  background: #0d2343;
}
.filter-type li.active {
  color: white;
  background: #0c182d;
  border: solid 1px #1bb9f9;
}

.container-content {
  padding: 10px 20px;
  box-sizing: border-box;
}
.count-base,
.count-resource,
.count-share,
.count-topic {
  position: relative;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
}
.com-count-title {
  color: #1bb4f9;
  font-size: 18px;
  padding: 0;
}
.count-base {
  margin-left: 10px;
  float: left; /*浮动*/
  width: 32%;
  height: 350px;
  background: url("../images/left-top3.jpg") center no-repeat;
  background-size: cover;
}
.count-resource {
  margin-left: 10px;
  float: left;
  width: 32%;
  height: 350px;
  background: url("../images/left-top3.jpg") center no-repeat;
  background-size: cover;
}
.count-share {
  margin-left: 10px;
  float: left;
  width: 48.4%;
  height: 350px;
  background: url("../images/left-bottom2.jpg") center no-repeat;
  background-size: cover;
}

.count-topic {
  margin-left: 10px;
  float: left;
  width: 48.4%;
  height: 350px;
  background: url("../images/left-bottom2.jpg") center no-repeat;
  background-size: cover;
}
.data-label {
  position: absolute;
  top: 20px;
  right: 10px;
}
.data-label li {
  float: left;
  width: 120px;

  text-align: center;
  font-size: 18px;
  color: #828c9d;
}
.data-label li:hover,
.data-label li.active {
  color: #fff;
  background: url("../images/choose-item.png") center no-repeat;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: "微软雅黑";
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
li {
  list-style: none;
}
img {
  border: none;
}
a {
  text-decoration: none;
}

/* -------------------------摇奖排行榜-----------------------------------  */

.topRec_List dl,
.maquee {
  width: 90%;
  overflow: hidden;
  margin: 0 auto;
  color: #f0ece2;
}
.topRec_List dd {
  float: left;
  text-align: left;
  border-bottom: 1px solid #1b96ee;
  color: #1b96ee;
  font-size: 14px;
}
.topRec_List dl dd:nth-child(1) {
  width: 50%;
  height: 40px;
  line-height: 40px;
}
.topRec_List dl dd:nth-child(2) {
  width: 30%;
  height: 40px;
  line-height: 40px;
}
.topRec_List dl dd:nth-child(3) {
  width: 20%;
  height: 40px;
  line-height: 40px;
}

.maquee {
  height: 195px;
}
.topRec_List ul {
  width: 100%;
  height: 195px;
}
.topRec_List li {
  width: 100%;
  height: 38px;
  line-height: 38px;
  text-align: left;
  font-size: 12px;
  color: #76dbd1;
}
/*.topRec_List li:nth-child(2n){ background:#077cd0}*/
.topRec_List li div {
  float: left;
}
.topRec_List li div:nth-child(1) {
  width: 50%;
}
.topRec_List li div:nth-child(2) {
  width: 30%;
}
.topRec_List li div:nth-child(3) {
  width: 20%;
}

.use-data {
  text-align: center;
  padding: 2px 0;
  margin-top: 3%;
  height: 5%;
  background: url(../images/resource-use-data.jpg) center no-repeat;
  background-size: cover;
  border: solid 1px #093552;
  border-right: 0px;
  border-left: 0;
}
.use-data li {
  width: 30%;
  font-size: 0;
  display: inline-table;
  border-right: solid 1px #1f4191;
}
.use-data li:last-child {
  border-right: 0;
}
.use-data .data-count {
  color: #fff;
  font-family: myFirstFont;
  height: 1%;
  font-size: 16px;
}
.use-data .data-name {
  color: #1bb9f9;
  font-size: 16px;
}
</style>
