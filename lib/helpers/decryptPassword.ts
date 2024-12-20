"use server";

import bcrypt from "bcrypt";

export const decryptPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const passwordMatch = await bcrypt.compare(password, hashPassword);

  return passwordMatch;
};
