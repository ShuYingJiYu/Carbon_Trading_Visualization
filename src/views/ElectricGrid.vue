<script lang="ts" setup>
import { electricGridSubmitAPI } from "@/apis/enterprise/submit";
import type { ElectricGridSubmitParams } from "@/types/enterprise/submit/electricGrid";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
const formData = ref<ElectricGridSubmitParams>({
  PPGCP: 0,
  IIE: 0,
  IEE: 0,
  electricity_sales: 0,
  transmission_distribution: 0,
  retirement_capacity: 0,
  retirement_recovery: 0,
  fix_capacity: 0,
  fix_recovery: 0,
});
const formRef = ref<FormInstance | null>(null);
const rules = ref<FormRules<ElectricGridSubmitParams>>({
  PPGCP: [
    { required: true, message: "请输入电厂上网电量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  IIE: [
    { required: true, message: "请输入自外省输入电量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  IEE: [
    { required: true, message: "请输入向外省输出电量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  electricity_sales: [
    { required: true, message: "请输入售电量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  transmission_distribution: [
    { required: true, message: "请输入输配电量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  retirement_capacity: [
    { required: true, message: "请输入退休设备总容量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  retirement_recovery: [
    { required: true, message: "请输入退休设备总回收量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  fix_capacity: [
    { required: true, message: "请输入修理设备总容量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  fix_recovery: [
    { required: true, message: "请输入修理设备总回收量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
});

const submitForm = async (form: FormInstance | null) => {
  console.log(formData.value);
  await form?.validate();
  await electricGridSubmitAPI(formData.value);
  resetForm();
  console.log(formData.value);
};

const resetForm = () => {
  formData.value = {
    PPGCP: 0,
    IIE: 0,
    IEE: 0,
    electricity_sales: 0,
    transmission_distribution: 0,
    retirement_capacity: 0,
    retirement_recovery: 0,
    fix_capacity: 0,
    fix_recovery: 0,
  };
};
</script>

<template>
  <div class="main">
    <div class="title">电网企业数据提交表单</div>
    <el-form
      :model="formData"
      label-width="auto"
      class="form"
      :rules="rules"
      ref="formRef"
      style="max-width: 600px"
    >
      <el-form-item label="电厂上网电量" prop="PPGCP">
        <el-input v-model="formData!.PPGCP" />
      </el-form-item>
      <el-form-item label="自外省输入电量" prop="IIE">
        <el-input v-model="formData!.IIE" />
      </el-form-item>
      <el-form-item label="向外省输出电量" prop="IEE">
        <el-input v-model="formData!.IEE" />
      </el-form-item>
      <el-form-item label="售电量" prop="electricity_sales">
        <el-input v-model="formData!.electricity_sales" />
      </el-form-item>
      <el-form-item label="输配电量" prop="transmission_distribution">
        <el-input v-model="formData!.transmission_distribution" />
      </el-form-item>
      <el-form-item label="退休设备总容量" prop="retirement_capacity">
        <el-input v-model="formData!.retirement_capacity" />
      </el-form-item>
      <el-form-item label="退休设备总回收量" prop="retirement_recovery">
        <el-input v-model="formData!.retirement_recovery" />
      </el-form-item>
      <el-form-item label="修理设备总容量" prop="fix_capacity">
        <el-input v-model="formData!.fix_capacity" />
      </el-form-item>
      <el-form-item label="修理设备总回收量" prop="fix_recovery">
        <el-input v-model="formData!.fix_recovery" />
      </el-form-item>
      <div class="button">
        <el-button
          type="primary"
          style="margin: 0 0.75rem"
          @click="submitForm(formRef)"
        >
          Submit
        </el-button>
        <el-button type="danger" style="margin: 0 0.75rem" @click="resetForm">
          Reset
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.main {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 6rem;
    font-size: 30px;
    font-weight: bold;
    color: #333;
    line-height: 5rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .form {
    margin: 0 auto;
    padding-top: 20px;
    .button {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
