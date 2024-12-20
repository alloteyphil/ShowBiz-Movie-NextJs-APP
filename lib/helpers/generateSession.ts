"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET_KEY!);

const generateToken = async (email: string) => {
  const token = new SignJWT({ email, timestamp: Date.now() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  return token;
};

export const verifyToken = async (token: string | undefined) => {
  try {
    const { payload } = await jwtVerify(token!, secretKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
};

export const createSession = async (email: string) => {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token = await generateToken(email);

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    expires: expireAt,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return cookieStore.get("session");
};
