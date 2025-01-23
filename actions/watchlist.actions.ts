"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import { User } from "@/mongo/models/User.model";

export const addToWatchlist = async (email: string, movieId: number) => {
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

    if (existingUser.watchlist.includes(movieId))
      return {
        statusCode: 400,
        message: "Movie already in watchlist",
        response: null,
      };

    existingUser.watchlist.push(movieId);

    await existingUser.save();

    return {
      statusCode: 200,
      message: "Movie added to watchlist",
      response: existingUser.watchlist,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Add to watchlist error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to add movie to watchlist: ${errorMessage}`,
      response: null,
    };
  }
};

export const checkWatchlist = async (email: string, movieId: number) => {
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

    if (existingUser.watchlist.includes(movieId))
      return {
        statusCode: 200,
        message: "Movie in watchlist",
        response: true,
      };

    return {
      statusCode: 200,
      message: "Movie not in watchlist",
      response: false,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Check watchlist error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to check watchlist: ${errorMessage}`,
      response: null,
    };
  }
};

export const removeFromWatchlist = async (email: string, movieId: number) => {
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

    if (!existingUser.watchlist.includes(movieId))
      return {
        statusCode: 400,
        message: "Movie not in watchlist",
        response: null,
      };

    existingUser.watchlist = existingUser.watchlist.filter(
      (id: number) => id !== movieId,
    );

    await existingUser.save();

    return {
      statusCode: 200,
      message: "Movie removed from watchlist",
      response: existingUser.watchlist,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Remove from watchlist error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to remove movie from watchlist: ${errorMessage}`,
      response: null,
    };
  }
};
