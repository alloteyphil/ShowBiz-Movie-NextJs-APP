"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import Comment from "@/mongo/models/Comment.model";
import { Movie } from "@/mongo/models/Movie.model";
import { User } from "@/mongo/models/User.model";
import type { AddCommentResponseType } from "@/types/comments";
import type { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

interface IUser {
  _id: ObjectId;
  fName: string;
  lName: string;
  email: string;
  password: string;
  photo: string;
  watchlist: string[];
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Comment {
  _id: ObjectId;
  movieId: number;
  comment: string;
  user: IUser;
  likes: string[];
  createdAt: Date;
  __v: number;
}

// Add a comment
export const addComment = async (
  email: string,
  movieId: number,
  comment: string,
): Promise<AddCommentResponseType> => {
  if (!movieId || !email || !comment)
    return {
      statusCode: 400,
      message: "Movie ID, email and comment are required",
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

    const newComment = await Comment.create({
      movieId,
      comment,
      user: existingUser._id,
    });

    const existingMovie = await Movie.findOne({ movieId });

    if (!existingMovie) {
      const newMovie = await Movie.create({
        movieId,
        comments: [newComment._id],
      });

      const createdMovie = await Movie.findOne({ movieId }).populate({
        path: "comments",
        model: "Comment",
      });
      if (!createdMovie)
        return {
          statusCode: 500,
          message: "Failed to create movie",
          response: null,
        };

      return {
        statusCode: 200,
        message: "Comment added successfully",
        response: {
          movieId: createdMovie.movieId,
          comments: createdMovie.comments.map((comment: Comment) => ({
            id: comment._id.toString(),
            commentText: comment.comment,
          })),
        },
      };
    }
    if (!existingMovie.comments.includes(newComment._id)) {
      const updatedMovie = await Movie.updateOne(
        { movieId },
        { $push: { comments: newComment._id } },
      );
      if (updatedMovie.modifiedCount === 0)
        return {
          statusCode: 500,
          message: "Failed to update movie comments",
          response: null,
        };

      const updatedMovieDocument = await Movie.findOne({ movieId }).populate({
        path: "comments",
        model: "Comment",
      });

      revalidatePath("/movie/details/[id]", "page");

      return {
        statusCode: 200,
        message: "Comment added successfully",
        response: {
          movieId: updatedMovieDocument.movieId,
          comments: updatedMovieDocument.comments.map((comment: Comment) => ({
            id: comment._id.toString(),
            commentText: comment.comment,
          })),
        },
      };
    } else {
      return {
        statusCode: 409,
        message: "Comment already exists",
        response: null,
      };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Add comment error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to add comment: ${errorMessage}`,
      response: null,
    };
  }
};

// Get movie comments
export const getComments = async (movieId: number) => {
  if (!movieId)
    return {
      statusCode: 400,
      message: "Movie ID is required",
      response: null,
    };

  await connectToDatabase();

  try {
    const existingMovie = await Movie.findOne({ movieId }).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!existingMovie)
      return {
        statusCode: 404,
        message: "Movie not found",
        response: null,
      };
    return {
      statusCode: 200,
      message: "Comments fetched successfully",
      response: {
        movieId: existingMovie.movieId,
        comments: existingMovie.comments.map((comment: Comment) => ({
          id: comment._id.toString(),
          commentText: comment.comment,
          commentAuthor: {
            fName: comment.user.fName,
            lName: comment.user.lName,
            photo: comment.user.photo,
            email: comment.user.email,
          },
          likes: comment.likes,
          createdAt: comment.createdAt,
        })),
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Get comments error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to get comments: ${errorMessage}`,
      response: null,
    };
  }
};

// Delete a comment
export const deleteComment = async (email: string, commentId: string) => {
  if (!commentId || !email)
    return {
      statusCode: 400,
      message: "Comment ID and email are required",
      response: null,
    };

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return {
        statusCode: 401,
        message: "User not found",
        response: null,
      };

    const comment = await Comment.findById(commentId).populate({
      path: "user",
      model: "User",
    });

    if (!comment)
      return {
        statusCode: 404,
        message: "Comment not found",
        response: null,
      };

    if (comment.user._id.toString() !== existingUser._id.toString())
      return {
        statusCode: 403,
        message: "Unauthorized to delete this comment",
        response: null,
      };

    await Comment.findByIdAndDelete(commentId);

    revalidatePath("/movie/details/[id]", "page");

    return {
      statusCode: 200,
      message: "Comment deleted successfully",
      response: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Delete comment error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to delete comment: ${errorMessage}`,
      response: null,
    };
  }
};

// Like a comment
export const likeComment = async (email: string, commentId: string) => {
  if (!commentId || !email)
    return {
      statusCode: 400,
      message: "Comment ID and email are required",
      response: null,
    };

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return {
        statusCode: 401,
        message: "User not found",
        response: null,
      };

    const comment = await Comment.findById(commentId);

    if (!comment)
      return {
        statusCode: 404,
        message: "Comment not found",
        response: null,
      };

    const userLiked = comment.likes.includes(existingUser.email);

    if (userLiked) {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: existingUser.email } },
        { new: true },
      );

      if (!updatedComment)
        return {
          statusCode: 500,
          message: "Failed to unlike comment",
          response: null,
        };

      revalidatePath("/movie/details/[id]", "page");

      return {
        statusCode: 200,
        message: "Comment unliked successfully",
        response: null,
      };
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { likes: existingUser.email } },
      { new: true },
    );

    if (!updatedComment)
      return {
        statusCode: 500,
        message: "Failed to like comment",
        response: null,
      };

    revalidatePath("/movie/details/[id]", "page");

    return {
      statusCode: 200,
      message: "Comment liked successfully",
      response: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Like comment error:", errorMessage);
    return {
      statusCode: 500,
      message: `Failed to like comment: ${errorMessage}`,
      response: null,
    };
  }
};
