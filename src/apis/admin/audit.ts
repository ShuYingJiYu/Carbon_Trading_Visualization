import { AdminAuditParams } from "@/types/admin/audit";
import request, { Data } from "@/utils/axios.ts";

export const adminAuditGenerateElectricityAPI = (
  params: AdminAuditParams
): Promise<Data<any>> => {
  return request({
    url: "/admin/audit/generateElectric",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};

export const adminAuditElectricGridAPI = (
  params: AdminAuditParams
): Promise<Data<any>> => {
  return request({
    url: "/admin/audit/electricGrid",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};