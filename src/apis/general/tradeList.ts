import { TradeInfo } from "@/types/general/tradeInfo";
import request, { Data } from "@/utils/axios.ts";

export const enterpriseTradeListAPI = (): Promise<Data<TradeInfo[]>> => {
  return request({
    url: "/general/trade/list",
    method: "GET",
  }).then((res) => res.data as Data<TradeInfo[]>);
};
