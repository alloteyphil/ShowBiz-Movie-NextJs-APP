"use client";

import { getMovieComments } from "@/actions/comment.action";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CommentResponseType } from "@/types/comments";

const GetComments = ({ id }: { id: number }) => {
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentResponseType[]>([]);

  useEffect(() => {
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

    fetchComments();
  }, [id, toast]);

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <div
          key={comment.movieId}
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
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button className="text-sm text-red-500 hover:text-red-600">
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

export default GetComments;
