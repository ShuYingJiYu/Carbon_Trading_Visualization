import { LoginParams, LoginResult } from "@/types/login";
import request, { Data } from "@/utils/axios.ts";

export const agencyLoginAPI = (
  params: LoginParams,
): Promise<Data<LoginResult>> => {
  return request({
    url: "/agency/login",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<LoginResult>);
};
