"use client";

import { deleteComment } from "@/actions/comment.action";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FetchComments = ({
  id,
  email,
  refresh,
}: {
  id: number;
  email: string;
  refresh: number;
}) => {
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentResponseType[]>([]);

  const fetchComments = async () => {
    try {
      const res = await getMovieComments(id);
      if (res.statusCode === 200) {
        setComments(res.response as CommentResponseType[]);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch comments",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        className: "bg-red-500 text-white",
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id, refresh]);

  const handleDelete = async (commentId: string) => {
    try {
      const res = await deleteComment(email, commentId);

      if (res.statusCode === 200) {
        toast({
          title: "Success",
          description: "Comment deleted successfully",
          className: "bg-green-500 text-white",
        });

        await fetchComments();
      } else {
        if (res.statusCode === 403) {
          toast({
            title: "Error",
            description: "You are not authorized to delete this comment",
            className: "bg-red-500 text-white",
          });
          return;
        }

        if (res.statusCode === 401) {
          toast({
            title: "Error",
            description: "You must be login before you can delete the comment",
            className: "bg-red-500 text-white",
          });
          return;
        }

        if (res.statusCode === 404) {
          toast({
            title: "Error",
            description: "Comment not found",
            className: "bg-red-500 text-white",
          });
          return;
        }

        if (res.statusCode === 500) {
          toast({
            title: "Error",
            description: "Failed to delete comment",
            className: "bg-red-500 text-white",
          });
          return;
        }

        if (res.statusCode === 200) {
          toast({
            title: "Success",
            description: "Comment deleted successfully",
            className: "bg-green-500 text-white",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete comment",
            className: "bg-red-500 text-white",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        className: "bg-red-500 text-white",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Just now";
      }
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Just now";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-4 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
            {comment.user.photo && (
              <Avatar>
                <AvatarImage
                  src={comment.user.photo}
                  className="object-center object-cover"
                />
                <AvatarFallback className="rounded-full w-full h-full bg-darkAsh"></AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {comment.user.fName} {comment.user.lName}
                </span>

                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        </div>
      ))}

      {comments.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default FetchComments;
