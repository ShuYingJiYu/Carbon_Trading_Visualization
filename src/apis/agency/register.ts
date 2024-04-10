import { AgencyRegisterParams } from "@/types/agency/register";
import request, { Data } from "@/utils/axios.ts";

export const AgencyRegisterAPI = (
  params: AgencyRegisterParams,
): Promise<Data<any>> => {
  return request({
    url: "/agency/register",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};
