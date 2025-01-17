"use server";
import { cookies } from "next/headers";

export const logout = async (): Promise<{
  statusCode: number;
  message: string;
}> => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("session");

    return { statusCode: 200, message: "Successfully logged out" };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Failed to log out" };
  }
};
