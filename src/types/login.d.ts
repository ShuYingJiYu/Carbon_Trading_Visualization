export type LoginParams = {
  account: string,
  password: string
}

export type LoginResult = {
  token: string,
  type: string,
}