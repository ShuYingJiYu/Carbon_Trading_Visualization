import { AdminAuditParams } from '@/types/admin/audit'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const adminAuditAPI = (params: AdminAuditParams): Promise<Data<any>>=>{
  return request({
    url: '/admin/audit',
    method: 'POST',
    data: params
  }).then(res=>res.data as Data<any>)
}