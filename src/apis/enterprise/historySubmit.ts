import type { GenerateElectricityInfo } from "@/types/general/generateElectricityInfo";
import type { ElectricGridInfo } from "@/types/general/electricGridInfo";
import request, { Data } from "@/utils/axios.ts";

export const generateElectricityInfoAPI = (): Promise<
  Data<GenerateElectricityInfo[]>
> => {
  return request({
    url: "/enterprise/history/generateElectricity",
    method: "GET",
  }).then((res) => res.data as Data<GenerateElectricityInfo[]>);
};

export const electricGridInfoAPI = (): Promise<Data<ElectricGridInfo[]>> => {
  return request({
    url: "/enterprise/history/electricGrid",
    method: "GET",
  }).then((res) => res.data as Data<ElectricGridInfo[]>);
};
