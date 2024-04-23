<script lang="ts" setup>
import { generateElectricitySubmitAPI } from "@/apis/enterprise/submit";
import type { GenerateElectricitySubmitParams } from "@/types/enterprise/submit/generateElectricity";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
const formData = ref<GenerateElectricitySubmitParams>({
  coal_burning: 0,
  crude_oil: 0,
  fuel_oil: 0,
  gasoline: 0,
  refinery_gas: 0,
  other_products: 0,
  natural_gas: 0,
  coke_oven_gas: 0,
  other_gas: 0,
  desulfurizing_agent: 0,
  electricity: 0,
});
const formRef = ref<FormInstance | null>(null);
const rules = ref<FormRules<GenerateElectricitySubmitParams>>({
  coal_burning: [
    { required: true, message: "请输入燃煤消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  crude_oil: [
    { required: true, message: "请输入原油消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  fuel_oil: [
    { required: true, message: "请输入燃料油消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  gasoline: [
    { required: true, message: "请输入汽油消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  refinery_gas: [
    { required: true, message: "请输入炼厂干气消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  other_products: [
    { required: true, message: "请输入其他制品消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  natural_gas: [
    { required: true, message: "请输入天然气消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  coke_oven_gas: [
    { required: true, message: "请输入焦炉煤气消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  other_gas: [
    { required: true, message: "请输入其他煤气消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  desulfurizing_agent: [
    { required: true, message: "请输入脱硫剂消耗量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
  electricity: [
    { required: true, message: "请输入电力购入量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
      transform: (value) => Number(value),
    },
  ],
});

const submitForm = async (form: FormInstance | null) => {
  await form?.validate();
  await generateElectricitySubmitAPI(formData.value);
  resetForm();
  console.log(formData.value);
};

const resetForm = () => {
  formData.value = {
    coal_burning: 0,
    crude_oil: 0,
    fuel_oil: 0,
    gasoline: 0,
    refinery_gas: 0,
    other_products: 0,
    natural_gas: 0,
    coke_oven_gas: 0,
    other_gas: 0,
    desulfurizing_agent: 0,
    electricity: 0,
  };
};
</script>

<template>
  <div class="main">
    <div class="title">发电企业数据提交表单</div>
    <el-form
      :model="formData"
      label-width="auto"
      class="form"
      :rules="rules"
      ref="formRef"
      style="max-width: 600px"
    >
      <el-form-item label="燃煤消耗量" prop="coal_burning">
        <el-input v-model="formData!.coal_burning" />
      </el-form-item>
      <el-form-item label="原油消耗量" prop="crude_oil">
        <el-input v-model="formData!.crude_oil" />
      </el-form-item>
      <el-form-item label="燃料油消耗量" prop="fuel_oil">
        <el-input v-model="formData!.fuel_oil" />
      </el-form-item>
      <el-form-item label="汽油消耗量" prop="gasoline">
        <el-input v-model="formData!.gasoline" />
      </el-form-item>
      <el-form-item label="炼厂干气消耗量" prop="refinery_gas">
        <el-input v-model="formData!.refinery_gas" />
      </el-form-item>
      <el-form-item label="其他制品消耗量" prop="other_products">
        <el-input v-model="formData!.other_products" />
      </el-form-item>
      <el-form-item label="天然气消耗量" prop="natural_gas">
        <el-input v-model="formData!.natural_gas" />
      </el-form-item>
      <el-form-item label="焦炉煤气消耗量" prop="coke_oven_gas">
        <el-input v-model="formData!.coke_oven_gas" />
      </el-form-item>
      <el-form-item label="其他煤气消耗量" prop="other_products">
        <el-input v-model="formData!.other_gas" />
      </el-form-item>
      <el-form-item label="脱硫剂消耗量" prop="desulfurizing_agent">
        <el-input v-model="formData!.desulfurizing_agent" />
      </el-form-item>
      <el-form-item label="电力购入量" prop="electricity">
        <el-input v-model="formData!.electricity" />
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
