"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import { Movie } from "@/mongo/models/Movie.model";
import { User } from "@/mongo/models/User.model";
import type { ObjectId } from "mongoose";

interface IMovie {
  _id: ObjectId;
  movieId: number;
  title: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  photo: string;
  comments: ObjectId[];
  type: string;
}

// Add movie to watchlist
export const addToWatchlist = async (
  email: string,
  movieId: number,
  title: string,
  genres: { id: number; name: string }[],
  photo: string,
  type: string,
) => {
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

    const existingMovie = await Movie.findOne({ movieId });

    if (existingMovie) {
      if (existingUser.watchlist.includes(existingMovie._id))
        return {
          statusCode: 400,
          message: "Movie already in watchlist",
          response: null,
        };

      const updatedUser = await User.updateOne(
        { email },
        { $push: { watchlist: existingMovie._id } },
      );

      if (updatedUser.modifiedCount === 0)
        return {
          statusCode: 500,
          message: "Failed to update movie comments",
          response: null,
        };

      const updatedUserDocument = await User.findOne({
        email: existingUser.email,
      });

      return {
        statusCode: 200,
        message: "Movie added to watchlist",
        response: null,
      };
    }

    const movie = await Movie.create({
      movieId,
      title,
      genres,
      photo,
      type,
    });

    const updatedUser = await User.updateOne(
      { email },
      { $push: { watchlist: movie._id } },
    );

    if (updatedUser.modifiedCount === 0)
      return {
        statusCode: 500,
        message: "Failed to update movie comments",
        response: null,
      };

    await User.findOne({
      email: existingUser.email,
    });

    return {
      statusCode: 200,
      message: "Movie added to watchlist",
      response: null,
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

// Check if movie is in watchlist
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

    const movie = await Movie.findOne({ movieId });

    if (existingUser.watchlist.includes(movie._id))
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

// Remove movie from watchlist
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

    const existingMovie = await Movie.findOne({ movieId });

    if (existingMovie) {
      if (!existingUser.watchlist.includes(existingMovie._id))
        return {
          statusCode: 400,
          message: "Movie is not in watchlist",
          response: null,
        };

      const updatedUser = await User.updateOne(
        { email: existingUser.email },
        { $pull: { watchlist: existingMovie._id } },
      );

      if (updatedUser.modifiedCount === 0)
        return {
          statusCode: 500,
          message: "Failed to update movie comments",
          response: null,
        };

      await User.findOne({
        email: existingUser.email,
      });

      return {
        statusCode: 200,
        message: "Movie removed from watchlist",
        response: null,
      };
    }

    return {
      statusCode: 404,
      message: "Movie not found",
      response: null,
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

// Get watchlist
export const getWatchlist = async (email: string) => {
  if (!email)
    return {
      statusCode: 400,
      message: "Email is required",
      response: null,
    };

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email }).populate({
      path: "watchlist",
      model: "Movie",
    });

    if (!existingUser)
      return {
        statusCode: 404,
        message: "User not found",
        response: null,
      };

    return {
      statusCode: 200,
      message: "Watchlist fetched successfully",
      response: existingUser.watchlist.map((movie: IMovie) => ({
        id: movie._id.toString(),
        movieId: movie.movieId,
        title: movie.title,
        genres: movie.genres,
        photo: movie.photo,
        comments: movie.comments.map((comment) => comment.toString()),
        type: movie.type,
      })),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Get watchlist error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to get watchlist: ${errorMessage}`,
      response: null,
    };
  }
};
