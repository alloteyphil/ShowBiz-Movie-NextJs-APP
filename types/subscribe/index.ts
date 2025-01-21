export type UserSubscribeDetailsType = {
  email: string;
  fName: string;
  lName: string;
};

export type UserSubscribeResponseType = {
  statusCode: number;
  message: string;
  subscriber: UserSubscribeDetailsType | null;
};
