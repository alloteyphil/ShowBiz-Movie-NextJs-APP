"use server";
import { cookies } from "next/headers";

export const logout = async (): Promise<{
  statusCode: number;
  message: string;
}> => {
  const cookieStore = await cookies();

  cookieStore.delete("session");

  return { statusCode: 200, message: "Successfully logged out" };
};
