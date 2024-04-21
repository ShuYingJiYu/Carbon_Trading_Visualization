<script lang="ts" setup>
import type { RegisterParams } from "@/types/register";
import { ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { agencyLoginAPI } from "@/apis/agency/login";
import { adminLoginAPI } from "@/apis/admin/login";
import { enterpriseLoginAPI } from "@/apis/enterprise/login";
import { useClientStore } from "@/stores";
import { LoginParams } from "@/types/login";
import { agencyRegisterAPI } from "@/apis/agency/register";
import { enterpriseRegisterAPI } from "@/apis/enterprise/register";
import {useRouter} from 'vue-router'
const router = useRouter()
const clientStore = useClientStore();
const formData = ref<RegisterParams>({
  account: "",
  password: "",
  name: "",
  identity: "",
  type: "",
});
const rules = ref<FormRules<RegisterParams>>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  identity: [
    { required: true, message: "请选择身份", trigger: "blur" },
  ],
  type:[
    { validator: (rule, value, callback) => {
      if(formData.value.identity === '企业' && value === ''){
        rule
        callback(new Error('请选择类别'));
      }else{
        callback();
      }
    }, trigger: 'blur' }
  ]
});

const formRef = ref<FormInstance | null>(null);

const login=async (formRef:FormInstance | null)=>{
  await formRef?.validate()
  const loginData = {
    account: formData.value.account,
    password: formData.value.password,
  } as LoginParams;
  const res = ref()
  if(formData.value.identity === '管理员'){
    res.value = await adminLoginAPI(loginData)
  }
  else if(formData.value.identity === '政府'){
    res.value = await agencyLoginAPI(loginData)
  }
  else if(formData.value.identity === '企业'){
    res.value = await enterpriseLoginAPI(loginData)
  }
  clientStore.setToken(res.value.data.authorization);
  clientStore.setIdentity(formData.value.identity);
  clientStore.setType(formData.value.type)
  console.log(res.value)
  router.back()
}

const register=async (formRef:FormInstance | null)=>{
  await formRef?.validate()
  const registerData = {
    account: formData.value.account,
    password: formData.value.password,
    name:formData.value.name,
    identity:formData.value.identity,
    type:formData.value.type
  } as RegisterParams;
  const res = ref()
  if(formData.value.identity === '管理员'){
    console.log('管理员无法注册')
  }
  else if(formData.value.identity === '政府'){
    res.value = await agencyRegisterAPI(registerData)
  }
  else if(formData.value.identity === '企业'){
    res.value = await enterpriseRegisterAPI(registerData)
  }
  console.log(res.value)
}
</script>

<template>
  <div class="main">
    <div class="box">
      <div class="title">碳交易平台</div>
      <el-form
        :model="formData"
        label-width="auto"
        class="form"
        :rules="rules"
        ref="formRef"
        style="max-width: 400px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData!.account" style="width: 230px;margin-left: 20px;"/>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="formData!.password" style="width: 230px;margin-left: 20px;" />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData!.name"  style="width: 230px;margin-left: 20px;"/>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-radio-group v-model="formData!.identity" class="ml-2">
            <el-radio value="企业" size="medium">企业</el-radio>
            <el-radio value="政府" size="medium" @click="formData!.type = ''">政府</el-radio>
            <el-radio value="管理员" size="medium" @click="formData!.type = ''">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-radio-group v-model="formData!.type" :disabled="formData!.identity !== '企业'" class="ml-2">
            <el-radio value="发电" size="medium">发电</el-radio>
            <el-radio value="电网" size="medium">电网</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="button">
          <el-button type="primary" style="margin: 0 1rem;" @click="login(formRef)">
            登录
          </el-button>
          <el-button type="danger" style="margin: 0 1rem;" @click="register(formRef)">
            注册
          </el-button>
      </div>
      </el-form>
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
  background: url("@/static/login-background.jpg") center center no-repeat;
  background-size: cover;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 500px;
    width: 400px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 30px 30px;

    .title {
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .button{
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
