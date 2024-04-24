<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { electricGridListAPI } from "@/apis/general/electricGridList";
import type { ElectricGridInfo } from "@/types/general/electricGridInfo";
import { useClientStore } from "@/stores";
import { adminAuditElectricGridAPI } from '@/apis/admin/audit'
import { ElMessage } from "element-plus";
const clientStore = useClientStore();
const electricGridList = ref<ElectricGridInfo[]>();
const dialogVisible = ref(false);
const getElectricGridList = async () => {
  const res = await electricGridListAPI();
  electricGridList.value = res.data;
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
        grid-template-columns: repeat(14, 1fr);
        grid-auto-rows: minmax(3rem, auto);
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
