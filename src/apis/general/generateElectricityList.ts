import { GenerateElectricityInfo } from '@/types/general/generateElectricityInfo'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const generateElectricityListAPI = (): Promise<Data<GenerateElectricityInfo[]>>=>{
  return request({
    url: '/general/generateElectricity/list',
    method: 'GET',
  }).then(res=>res.data as Data<GenerateElectricityInfo[]>)
}