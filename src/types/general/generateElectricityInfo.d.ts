export type GenerateElectricityInfo = GenerateElectricitySubmitParams & {
  id: number,
  account: string,
  name: string,
  LocalDateTime: string,
  status: string,
  consumption: number
}