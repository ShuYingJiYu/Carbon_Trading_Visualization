import type { TradeInfo } from "@/types/general/tradeInfo";
import request, { Data } from "@/utils/axios.ts";

export const tradeInfoAPI = (): Promise<Data<TradeInfo[]>> => {
  return request({
    url: "/enterprise/history/trade",
    method: "GET",
  }).then((res) => res.data as Data<TradeInfo[]>);
};
