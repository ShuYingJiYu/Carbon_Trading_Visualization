import { LoginParams, LoginResult } from '@/types/login'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const EnterpriseLoginAPI = (params: LoginParams): Promise<Data<LoginResult>>=>{
  return request({
    url: '/enterprise/login',
    method: 'POST',
    data: params
  }).then(res=>res.data as Data<LoginResult>)
}