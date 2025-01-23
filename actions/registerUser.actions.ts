"use server";

import { encryptPassword } from "@/lib/helpers/encryptPassword";
import { createSession } from "@/lib/helpers/generateSession";
import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User, type IUser } from "@/mongo/models/User.model";
import type { UserInputType, UserResponseType } from "@/types/user";

const registerUser = async (
  fName: string,
  lName: string,
  email: string,
  password: string
): Promise<
  | { statusCode: number; message: string; user: UserResponseType | null }
  | undefined
> => {
  await connectToDatabase();
  try {
    const user: UserInputType = {
      fName,
      lName,
      email,
      password: await encryptPassword(password),
      photo: "",
      watchlist: [],
      favorites: [],
    };

    const existingUser: IUser | null = await User.findOne({
      email: user.email,
    });

    if (existingUser) {
      return {
        statusCode: 409,
        message: "User already exists",
        user: {
          fName: existingUser.fName,
          lName: existingUser.lName,
          email: existingUser.email,
          photo: existingUser.photo,
        },
      };
    }

    const newUser: IUser = await User.create(user);

    const session = await createSession(newUser.email);

    if (!session)
      return {
        statusCode: 500,
        message: "Failed to create session",
        user: null,
      };

    return {
      statusCode: 200,
      message: "User created successfully",
      user: {
        fName: newUser.fName,
        lName: newUser.lName,
        email: newUser.email,
        photo: newUser.photo,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('User registration error:', errorMessage);
    return {
      statusCode: 500,
      message: `Failed to register user: ${errorMessage}`,
      user: null,
    };
  }
};

export default registerUser;
