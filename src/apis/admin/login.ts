import { LoginParams, LoginResult } from "@/types/login";
import request, { Data } from "@/utils/axios.ts";

export const adminLoginAPI = (
  params: LoginParams,
): Promise<Data<LoginResult>> => {
  return request({
    url: "/admin/login",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<LoginResult>);
};
