"use server";

import { decryptPassword } from "@/lib/helpers/decryptPassword";
import { encryptPassword } from "@/lib/helpers/encryptPassword";
import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User } from "@/mongo/models/User.model";
import type { UserResponseType } from "@/types/user";

export const getUserProfile = async (
  email: string,
): Promise<{
  statusCode: number;
  message: string;
  response: UserResponseType | null;
}> => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
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

    return {
      statusCode: 200,
      message: "Successfully found user",
      response: {
        fName: existingUser.fName,
        lName: existingUser.lName,
        email: existingUser.email,
        photo: existingUser.photo,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Get user profile error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to fetch user profile: ${errorMessage}`,
      response: null,
    };
  }
};

export const checkUserPassword = async (
  email: string,
  password: string,
): Promise<
  { statusCode: number; message: string; response: boolean | null } | undefined
> => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
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
      existingUser.password,
    );

    if (!passwordMatch)
      return {
        statusCode: 401,
        message: "Incorrect password",
        response: false,
      };

    return {
      statusCode: 200,
      message: "Successfully logged in",
      response: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Get user password:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to fetch user password: ${errorMessage}`,
      response: null,
    };
  }
};

export const updateUserPassword = async (
  email: string,
  inputPassword: string,
): Promise<{
  statusCode: number;
  message: string;
  response: string | null;
}> => {
  await connectToDatabase();
  try {
    const user = await User.findOne({ email });

    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
        response: null,
      };

    const updatedPassword = await encryptPassword(inputPassword);

    await User.findOneAndUpdate(
      { email },
      { $set: { password: updatedPassword } },
      { new: true },
    );

    return {
      statusCode: 200,
      message: "Password updated successfully",
      response: "Password updated successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Update user password error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to update user password: ${errorMessage}`,
      response: null,
    };
  }
};

export const updateUserName = async (
  email: string,
  fName: string,
  lName: string,
): Promise<{
  statusCode: number;
  message: string;
  response: { fName: string; lName: string } | null;
}> => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
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

    if (existingUser.fName === fName && existingUser.lName === lName) {
      return {
        statusCode: 409,
        message: "First name and last name are the same as previous",
        response: null,
      };
    }
    const updatedUser = await existingUser.updateOne(
      {
        $set: { fName, lName },
      },
      {
        new: true,
      },
    );
    return {
      statusCode: 200,
      message: "Name updated successfully",
      response: { fName: updatedUser.fName, lName: updatedUser.lName },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Check user name error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to check user name: ${errorMessage}`,
      response: null,
    };
  }
};

export const updateUserImage = async (
  email: string,
  url: string,
): Promise<{
  statusCode: number;
  message: string;
  response: string | null;
}> => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
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
    const updatedUser = await existingUser.updateOne(
      {
        $set: { photo: url },
      },
      {
        new: true,
      },
    );
    return {
      statusCode: 200,
      message: "Image updated successfully",
      response: updatedUser.photo,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Update user image error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to update user image: ${errorMessage}`,
      response: null,
    };
  }
};
