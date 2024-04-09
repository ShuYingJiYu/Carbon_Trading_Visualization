import { ElectricGridInfo } from '@/types/general/electricGridInfo'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const electricGridListAPI = (): Promise<Data<ElectricGridInfo[]>>=>{
  return request({
    url: '/general/electricGrid/list',
    method: 'GET',
  }).then(res=>res.data as Data<ElectricGridInfo[]>)
}