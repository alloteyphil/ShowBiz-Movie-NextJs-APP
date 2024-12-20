"use server";

import { encryptPassword } from "@/lib/helpers/encryptPassword";
import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User, type IUser } from "@/mongo/models/User.model";
import type { UserInputType, UserResponseType } from "@/types/user";

const registerUser = async (
  fName: string,
  lName: string,
  email: string,
  password: string
): Promise<
  | { statusCode: number; message: string; response: UserResponseType }
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
    };

    const existingUser: IUser | null = await User.findOne({
      email: user.email,
    });

    if (existingUser) {
      return {
        statusCode: 409,
        message: "User already exists",
        response: {
          fName: existingUser.fName,
          lName: existingUser.lName,
          email: existingUser.email,
          photo: existingUser.photo,
        },
      };
    }

    const newUser: IUser = await User.create(user);

    return {
      statusCode: 200,
      message: "User created successfully",
      response: {
        fName: newUser.fName,
        lName: newUser.lName,
        email: newUser.email,
        photo: newUser.photo,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
