import { EnterpriseInfo } from "@/types/general/enterprise";
import request, { Data } from "@/utils/axios.ts";

export const enterpriseListAPI = (): Promise<Data<EnterpriseInfo[]>> => {
  return request({
    url: "/general/enterprises/list",
    method: "GET",
  }).then((res) => res.data as Data<EnterpriseInfo[]>);
};
