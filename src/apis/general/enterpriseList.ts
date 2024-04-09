import { EnterpriseInfo } from '@/types/general/enterprise'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const EnterpriseListAPI = (): Promise<Data<EnterpriseInfo[]>>=>{
  return request({
    url: '/general/enterprises/list',
    method: 'GET',
  }).then(res=>res.data as Data<EnterpriseInfo[]>)
}