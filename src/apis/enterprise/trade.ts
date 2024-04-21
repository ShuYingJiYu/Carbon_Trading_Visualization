import { EnterpriseTradeParams } from "@/types/enterprise/trade";
import request, { Data } from "@/utils/axios.ts";

export const enterpriseTradeAPI = (
  params: EnterpriseTradeParams,
): Promise<Data<any>> => {
  return request({
    url: "/enterprise/trade",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};
