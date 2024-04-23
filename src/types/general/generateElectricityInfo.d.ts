export type GenerateElectricityInfo = GenerateElectricitySubmitParams & {
  id: number;
  account: string;
  name: string;
  create_date: string;
  status: string;
  consumption: number;
};
