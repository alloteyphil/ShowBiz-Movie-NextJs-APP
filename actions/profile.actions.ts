"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User } from "@/mongo/models/User.model";

export const getUserProfile = async (email: string) => {
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

export const updateUserProfile = async (
  email: string,
  updatedData: Partial<{ fName: string; lName: string; photo: string }>,
) => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
      response: null,
    };

  if (!updatedData || Object.keys(updatedData).length === 0)
    return {
      statusCode: 400,
      message: "No update data provided",
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

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true },
    );

    return {
      statusCode: 200,
      message: "User profile updated successfully",
      response: updatedUser,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Update user profile error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to update user profile: ${errorMessage}`,
      response: null,
    };
  }
};
