import { ElectricGridSubmitParams } from "@/types/enterprise/submit/electricGrid";
import { GenerateElectricitySubmitParams } from "@/types/enterprise/submit/generateElectricity";
import request, { Data } from "@/utils/axios.ts";

export const generateElectricitySubmitAPI = (
  params: GenerateElectricitySubmitParams,
): Promise<Data<any>> => {
  return request({
    url: "/enterprise/submit/generateElectricity",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};

export const electricGridSubmitAPI = (
  params: ElectricGridSubmitParams,
): Promise<Data<any>> => {
  return request({
    url: "/enterprise/submit/electricGrid",
    method: "POST",
    data: params,
  }).then((res) => res.data as Data<any>);
};
