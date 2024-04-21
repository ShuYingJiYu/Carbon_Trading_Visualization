import { EnterpriseHandleTradeParams } from "@/types/enterprise/handleTrade";
import request, { Data } from "@/utils/axios.ts";

export const enterpriseHandleTradeAPI = (
  params: EnterpriseHandleTradeParams,
): Promise<Data<any>> => {
  return request({
    url: "/enterprise/handle/trade",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};
