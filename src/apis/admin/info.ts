import request, { Data } from "@/utils/axios.ts";
import { AdminInfo } from "@/types/admin/info";

export const adminInfoAPI = (): Promise<Data<AdminInfo>> => {
  return request({
    url: "/admin/info",
    method: "GET",
  }).then((res) => res.data as Data<AdminInfo>);
};
