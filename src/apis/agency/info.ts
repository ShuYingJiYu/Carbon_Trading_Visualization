import request, { Data } from "@/utils/axios.ts";
import { AgencyInfo } from "@/types/agency/info";

export const agencyInfoAPI = (): Promise<Data<AgencyInfo>> => {
  return request({
    url: "/agency/info",
    method: "GET",
  }).then((res) => res.data as Data<AgencyInfo>);
};
