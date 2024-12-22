"use server";

import { decryptPassword } from "@/lib/helpers/decryptPassword";
import { createSession } from "@/lib/helpers/generateSession";
import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User } from "@/mongo/models/User.model";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password)
    return {
      statusCode: 400,
      message: "Email and password are required",
      response: null,
    };

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return {
        statusCode: 404,
        message: "User not found",
        response: null,
      };

    const passwordMatch = await decryptPassword(
      password,
      existingUser.password
    );

    if (!passwordMatch)
      return {
        statusCode: 401,
        message: "Incorrect password",
        response: null,
      };

    const session = await createSession(email);

    if (!session)
      return {
        statusCode: 500,
        message: "Failed to create session",
        response: null,
      };

    return {
      statusCode: 200,
      message: "Successfully logged in",
      response: {
        fName: existingUser.fName,
        lName: existingUser.lName,
        email: existingUser.email,
        photo: existingUser.photo,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal server error",
      response: null,
    };
  }
};
