"use client";

import { deleteComment } from "@/actions/comment.action";
import { useToast } from "@/hooks/use-toast";
import { Trash2Icon } from "lucide-react";

const DeleteComment = ({
  commentId,
  email,
}: {
  commentId: string;
  email: string;
}) => {
  const { toast } = useToast();

  const handleDelete = async (commentId: string, userEmail: string) => {
    try {
      const res = await deleteComment(userEmail, commentId);

      if (res.statusCode === 200) {
        toast({
          title: "Comment deleted successfully",
          description: "Your comment has been deleted",
          className:
            "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });
      } else {
        toast({
          title: "Failed to delete comment",
          description: "An unexpected error occurred. Please try again.",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to delete comment",
        description: "An unexpected error occurred. Please try again.",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
    }
  };

  return (
    <Trash2Icon
      size={20}
      onClick={() => {
        handleDelete(commentId, email);
      }}
      className="cursor-pointer"
    />
  );
};

export default DeleteComment;
