<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { electricGridListAPI } from "@/apis/general/electricGridList";
import type { ElectricGridInfo } from "@/types/general/electricGridInfo";
import { useClientStore } from "@/stores";
import { adminAuditElectricGridAPI } from '@/apis/admin/audit'
import { ElMessage } from "element-plus";
import VChart from "vue-echarts";
const clientStore = useClientStore();
const electricGridList = ref<ElectricGridInfo[]>();
const dialogVisible = ref(false);
const getElectricGridList = async () => {
  const res = await electricGridListAPI();
  electricGridList.value = res.data;
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
        name: "电厂上网电量",
        type: "line",
        stack: "Total",
        data: getField("PPGCP"),
      },
      {
        name: "自外省输入电量",
        type: "line",
        stack: "Total",
        data: getField("IIE"),
      },
      {
        name: "向外省输出电量",
        type: "line",
        stack: "Total",
        data: getField("IEE"),
      },
      {
        name: "售电量",
        type: "line",
        stack: "Total",
        data: getField("electricity_sales"),
      },
      {
        name: "输配电量",
        type: "line",
        stack: "Total",
        data: getField("transmission_distribution"),
      },
      {
        name: "退休设备总容量",
        type: "line",
        stack: "Total",
        data: getField("retirement_capacity"),
      },
      {
        name: "退休设备总回收量",
        type: "line",
        stack: "Total",
        data: getField("retirement_recovery"),
      },
      {
        name: "修理设备总容量",
        type: "line",
        stack: "Total",
        data: getField("fix_capacity"),
      },
      {
        name: "修理设备总回收量",
        type: "line",
        stack: "Total",
        data: getField("fix_recovery"),
      }
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
  };
};
onMounted(() => {
  getElectricGridList();
});

const nowId = ref<string>()
const accept = async() => {
  await adminAuditElectricGridAPI({
    id: nowId.value || '',
    status: 1
  })
  ElMessage({
    message: '审核通过',
    type: 'success',
  })
  getElectricGridList()
}

const refuse = async () => {
  await adminAuditElectricGridAPI({
    id: nowId.value || '',
    status: 2
  })
  ElMessage({
    message: '审核拒绝',
    type: 'success',
  })
  getElectricGridList()
}

const getField = (index: string) => {
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
          <div>企业名</div>
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
        <div class="item" v-for="item in electricGridList" :key="item.id">
          <div>
            {{ item.name }}
          </div>
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
          <div>
            <el-button
              type="primary"
              style="width: 4.5rem"
              :disabled="
                item.status !== '待审核' || clientStore.identity !== '管理员'
              "
              @click="
                dialogVisible = true;
                nowId = item.id.toString();
              "
            >
              审核提交
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="审核提交" width="500">
    <div class="dialog">
      <el-button
        class="button"
        type="primary"
        @click="
          dialogVisible = false;
          accept();
        "
      >
        审核通过
      </el-button>
      <el-button
        class="button"
        type="danger"
        @click="
          dialogVisible = false;
          refuse();
        "
      >
        审核拒绝
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
  grid-template-rows:  400px auto;
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

.dialog {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  .button {
    width: 6.5rem;
  }
}
</style>
