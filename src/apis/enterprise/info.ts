import request, { Data } from "@/utils/axios.ts";
import { EnterpriseInfo } from "@/types/general/enterprise";

export const enterpriseInfoAPI = (): Promise<Data<EnterpriseInfo>> => {
  return request({
    url:'/enterprise/info',
    method:'GET'
  }).then((res) => res.data as Data<EnterpriseInfo>)
}