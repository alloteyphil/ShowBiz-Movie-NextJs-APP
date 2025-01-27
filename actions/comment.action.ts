"use server";

import { connectToDatabase } from "@/mongo/connectToDatabase";
import Comment from "@/mongo/models/Comment.model";
import { User } from "@/mongo/models/User.model";
import type { CommentResponseType } from "@/types/comments";
import type { Types } from "mongoose";

export const addComment = async (
  email: string,
  movieId: number,
  comment: string,
) => {
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

    const serializedComment = {
      id: (newComment._id as Types.ObjectId).toString(),
      movieId: newComment.movieId,
      comment: newComment.comment,
      user: {
        id: existingUser._id.toString(),
        fName: existingUser.fName,
        lName: existingUser.lName,
        photo: existingUser.photo || null,
      },
      createdAt: (newComment._id as Types.ObjectId).getTimestamp(),
    };

    return {
      statusCode: 200,
      message: "Comment added successfully",
      response: serializedComment,
    };
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

export const getMovieComments = async (movieId: number) => {
  if (!movieId)
    return {
      statusCode: 400,
      message: "Movie ID is required",
      response: null,
    };

  await connectToDatabase();

  try {
    const comments = await Comment.find({ movieId }).populate<{
      user: {
        _id: Types.ObjectId;
        fName: string;
        lName: string;
        photo?: string;
      };
    }>("user", "fName lName photo");

    const serializedComments: CommentResponseType[] = comments.map(
      (comment) => ({
        movieId: comment.movieId,
        comment: comment.comment,
        user: {
          id: comment.user._id.toString(),
          fName: comment.user.fName,
          lName: comment.user.lName,
          photo: comment.user.photo || null,
        },
        createdAt: comment.createdAt,
      }),
    );

    return {
      statusCode: 200,
      message: "Comments retrieved successfully",
      response: serializedComments,
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
        statusCode: 404,
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

    if (comment.user.toString() !== existingUser._id.toString())
      return {
        statusCode: 403,
        message: "Unauthorized to delete this comment",
        response: null,
      };

    await Comment.findByIdAndDelete(commentId);

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
