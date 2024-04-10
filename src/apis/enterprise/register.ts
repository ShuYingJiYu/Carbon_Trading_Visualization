import { EnterpriseRegisterParams } from "@/types/enterprise/register";
import request, { Data } from "@/utils/axios.ts";

export const EnterpriseRegisterAPI = (
  params: EnterpriseRegisterParams,
): Promise<Data<any>> => {
  return request({
    url: "/enterprise/register",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};
