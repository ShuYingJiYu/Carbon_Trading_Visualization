<script setup lang="js">
import { onMounted, ref } from "vue";
import VChart from "vue-echarts";
import "@/js/flexible.js";
import { useRouter } from "vue-router";
import * as echarts from "echarts";

const router = useRouter();

const option3 = ref();
const option4 = ref();
const option5 = ref();
const option6 = ref();

const init3 = () => {
  var yearData = [
    {
      year: "2020", // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 21, 36, 13, 40, 30, 10, 30, 10, 2, 21, 12],
        [10, 32, 19, 32, 20, 33, 31, 13, 10, 20, 10, 9]
      ]
    },
    {
      year: "2021", // 年份
      data: [
        // 两个数组是因为有两条线
        [22, 13, 31, 7, 30, 30, 20, 14, 3, 12, 41, 12],
        [40, 6, 19, 2, 0, 3, 21, 3, 11, 50, 10, 9]
      ]
    }
  ];

  option3.value = {
    // 通过这个color修改两条线的颜色
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: "#4c9bfd"
      },
      // 这个10% 必须加引号
      right: "10%"
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true // 包含刻度文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a" // 分割线颜色
        }
      }
    },
    series: [
      {
        name: "2022年",
        type: "line",
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: yearData[0].data[0]
      },
      {
        name: "2023年",
        type: "line",
        smooth: true,
        data: yearData[0].data[1]
      }
    ]
  };
};

const init4 = () => {
  option4.value = {
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      bottom: "0%",
      itemWidth: 12,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "地区分布",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius",
        // 图形的文字标签
        label: {
              show: true,
              rich: {
                d: {
                  color: '#fff',
                  fontSize: 12,
                  lineHeight: 12,
                  height: 12
                },
                b: {
                  color: "#D3EBFF",
                  fontSize: 12,
                  lineHeight: 12,
                  align: 'left',
                }
              },
              textStyle: {
                color: "#fff",
                align: "right",
                fontSize: 12,
              },
            },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 4,
          // length2 链接文字的线条
          length2: 6
        },
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" }
        ]
      }
    ]
  };
}

const init5 = () => {
  option5.value = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      top: "0%",
      data: ["发电企业", "电网企业", "视频广告", "直接访问", "搜索引擎"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },

    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        // x轴更换数据
        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "26",
          "28",
          "29",
          "30"
        ],
        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "发电企业",
        type: "line",
        smooth: true,
        // 单独修改当前线条的样式
        lineStyle: {
          color: "#0184d5",
          width: "2"
        },
        // 填充颜色设置
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 设置拐点
        symbol: "circle",
        // 拐点大小
        symbolSize: 8,
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        data: [
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          20,
          60,
          50,
          40
        ]
      },
      {
        name: "电网企业",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: [
          130,
          10,
          20,
          40,
          30,
          40,
          80,
          60,
          20,
          40,
          90,
          40,
          20,
          140,
          30,
          40,
          130,
          20,
          20,
          40,
          80,
          70,
          30,
          40,
          30,
          120,
          20,
          99,
          50,
          20
        ]
      }
    ]
  };
}

const init6 = () => {
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  option6.value = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%"
      // containLabel: true
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        data: ["node0", "node1", "node2", "node3", "平均负荷"],
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff"
        }
      },
      {
        data: [70, 34, 69, 78, 61],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff"
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: [70, 34, 60, 78, 61],
        yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function(params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          }
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: false,
          position: "inside",
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: "{c}%",
        }
      },
      {
        name: "框",
        type: "bar",
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15
        }
      }
    ]
  };
}

onMounted(() => {
  init3();
  init4();
  init5();
  init6();
});
</script>

<template>
  <div class="body">
    <header>
      <el-button
        @click="router.push('/')"
        style="
          position: absolute;
          top: 20px;
          left: 40px;
          width: 120px;
          color: black;
        "
        type="primary"
        >企业数据总览</el-button
      >
      <el-button
        style="
          position: absolute;
          top: 20px;
          left: 160px;
          width: 120px;
          color: black;
        "
        type="danger"
        disabled
        >交易数据总览</el-button
      >
      <h1>基于区块链的碳交易可视化</h1>
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel box1">
          <div class="item">
            <div class="title">块高</div>
            <div class="text">142</div>
          </div>
          <div class="item">
            <div class="title">节点数</div>
            <div class="text">4</div>
          </div>
          <div class="item">
            <div class="title">部署合约量</div>
            <div class="text">1</div>
          </div>
          <div class="item">
            <div class="title">账户数</div>
            <div class="text">461</div>
          </div>
        </div>
        <div class="panel">
          <h2>区块列表</h2>
          <div class="box2">
            <div style="padding-left: 15px; font-size: 15px">区块哈希</div>
            <div style="padding-left: 15px; font-size: 15px">交易时间</div>
            <div class="text">0xf69e1e1rfd2c6b23131546hb1b56b217a9b...</div>
            <div class="text">2024-04-11 08:26:28</div>
            <div class="text">0xb0b226cae256c56v5b53fa26f23b2b21556...</div>
            <div class="text">2024-03-22 06:46:15</div>
            <div class="text">0xa1986899da5a31b295ba5daddf88e58272...</div>
            <div class="text">2024-01-19 22:44:25</div>
            <div class="text">0xe3f3524631c7392bc904acea55ccbc7c935...</div>
            <div class="text">2024-01-02 14:52:39</div>
            <div class="text">0xbd8fde84f4fa50f2825fec6bf78c7bd612b2...</div>
            <div class="text">2024-01-01 12:03:07</div>
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>近年交易次数</h2>
          <v-chart class="chart" :option="option3"></v-chart>
          <div class="panel-footer"></div>
        </div>
      </div>

      <div class="column">
        <!-- no模块制作 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>816</li>
              <li>729405</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>年度总交易数</li>
              <li>年度碳币交易数</li>
            </ul>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <v-chart class="chart" :option="option"></v-chart>
        </div>
      </div>

      <div class="column">
        <div class="panel">
          <h2>近期地区交易数排行</h2>
          <v-chart class="chart" :option="option4"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>上月交易碳币数</h2>
          <v-chart class="chart" :option="option5"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>节点负荷</h2>
          <v-chart class="chart" :option="option6"></v-chart>
          <!--  -->
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less">
.box2 {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(6, 1fr);
  color: #ffffffbf;
  align-items: center;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(101, 132, 226, 0.1);
  row-gap: 8px;
  column-gap: 10px;
  .text {
    text-align: center;
  }
}

.box1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px 10px;
  .item {
    padding-top: 20px;
    padding-bottom: 10px;
    margin-top: 20px;
    margin-right: 10px;
    padding: 20px 30px;
    color: white;
    display: grid;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(101, 132, 226, 0.1);
    .title {
      font-size: 18px;
      color: rgb(0, 157, 255);
    }
    .text {
      font-size: 25px;
      font-weight: 600;
    }
    .title {
      font-size: 18px;
      color: rgb(0, 157, 255);
    }
    .text {
      font-size: 25px;
      font-weight: 600;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
@font-face {
  font-family: electronicFont;
  src: url(../font/DS-DIGIT.TTF);
}
.body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: url(../images/bg.jpg) no-repeat top center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  line-height: 1.15;
  height: 100%;
  overflow: hidden;
}
header {
  position: relative;
  height: 1.25rem;
  background: url(../images/head_bg.png) no-repeat;
  background-size: 100% 100%;
  h1 {
    font-size: 0.475rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
}

.mainbox {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
  .column {
    flex: 3;
  }
  .column:nth-child(2) {
    flex: 5;
    margin: 0 0.125rem 0.1875rem;
    overflow: hidden;
  }
  .panel {
    position: relative;
    height: 3.875rem;
    padding: 0 0.1875rem 0.5rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    margin-bottom: 0.1875rem;
    background: url(../images/line.png) rgba(255, 255, 255, 0.03);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
    }
    h2 {
      height: 0.6rem;
      color: rgb(255, 192, 197);
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.25rem;
      font-weight: 400;
      a {
        color: #fff;
        text-decoration: none;
        margin: 0 0.125rem;
      }
    }
    .chart {
      height: 3rem;
    }
  }
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
  .no-hd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      content: "";
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
      content: "";
    }
    ul {
      display: flex;
      li {
        position: relative;
        flex: 1;
        line-height: 1rem;
        font-size: 0.875rem;
        color: #ffeb7b;
        text-align: center;
        font-family: "electronicFont";
        &::after {
          content: "";
          position: absolute;
          top: 25%;
          right: 0;
          height: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
          content: "";
        }
      }
    }
  }
  .no-bd {
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.225rem;
        height: 0.5rem;
        line-height: 0.5rem;
        padding-top: 0.125rem;
      }
    }
  }
}
.map {
  position: relative;
  height: 10.125rem;
  .map1 {
    width: 6.475rem;
    height: 6.475rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../images/map.png);
    background-size: 100% 100%;
    opacity: 0.3;
  }
  .map2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8.0375rem;
    height: 8.0375rem;
    background: url(../images/lbx.png);
    animation: rotate1 15s linear infinite;
    opacity: 0.6;
    background-size: 100% 100%;
  }

  .map3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7.075rem;
    height: 7.075rem;
    background: url(../images/jt.png);
    animation: rotate2 10s linear infinite;
    opacity: 0.6;
    background-size: 100% 100%;
  }
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10.125rem;
  }
  @keyframes rotate1 {
    form {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    form {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}
</style>
