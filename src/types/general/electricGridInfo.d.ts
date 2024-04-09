export type ElectricGridInfo = ElectricGridSubmitParams & {
  id: number,
  account: string,
  name: string,
  LocalDateTime: string,
  status: string,
  consumption: number
}