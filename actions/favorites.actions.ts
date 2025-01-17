"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User } from "@/mongo/models/User.model";

export const addToFavorites = async (email: string, movieId: number) => {
  if (!movieId || !email)
    return {
      statusCode: 400,
      message: "Movie ID and email are required",
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

    if (existingUser.favorites.includes(movieId))
      return {
        statusCode: 400,
        message: "Movie already in favorites",
        response: null,
      };

    existingUser.favorites.push(movieId);

    await existingUser.save();

    return {
      statusCode: 200,
      message: "Movie added to favorites",
      response: existingUser.favorites,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Failed to add movie to favorites",
      response: null,
    };
  }
};

export const checkFavorites = async (email: string, movieId: number) => {
  if (!movieId || !email)
    return {
      statusCode: 400,
      message: "Movie ID and email are required",
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

    if (existingUser.favorites.includes(movieId))
      return {
        statusCode: 200,
        message: "Movie in favorites",
        response: true,
      };

    return {
      statusCode: 200,
      message: "Movie not in favorites",
      response: false,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Failed to check movie in favorites",
      response: null,
    };
  }
};

export const removeFromFavorites = async (email: string, movieId: number) => {
  if (!movieId || !email)
    return {
      statusCode: 400,
      message: "Movie ID and email are required",
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

    if (!existingUser.favorites.includes(movieId))
      return {
        statusCode: 400,
        message: "Movie not in favorites",
        response: null,
      };

    existingUser.favorites = existingUser.favorites.filter(
      (id: number) => id !== movieId
    );

    await existingUser.save();

    return {
      statusCode: 200,
      message: "Movie removed from favorites",
      response: existingUser.favorites,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Failed to remove movie from favorites",
      response: null,
    };
  }
};
