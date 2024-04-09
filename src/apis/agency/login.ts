import { LoginParams, LoginResult } from '@/types/login'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const AgencyLoginAPI = (params: LoginParams): Promise<Data<LoginResult>>=>{
  return request({
    url: '/agency/login',
    method: 'POST',
    data: params
  }).then(res=>res.data as Data<LoginResult>)
}