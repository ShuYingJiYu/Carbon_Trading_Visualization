export type LoginParams = {
  account: string;
  password: string;
};

export type LoginResult = {
  authorization: string;
  type: string;
};
