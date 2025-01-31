"use client";

import { likeComment } from "@/actions/comment.action";
import { useToast } from "@/hooks/use-toast";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

const LikeComment = ({
  commentId,
  email,
  likes,
}: {
  commentId: string;
  email: string;
  likes: string[];
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(email));

  const { toast } = useToast();

  const handleLike = async (email: string, commentId: string) => {
    try {
      setIsLiked(!isLiked);

      const res = await likeComment(email, commentId);

      if (res.statusCode !== 200) {
        setIsLiked(!isLiked);
        toast({
          title: "Error",
          description: "Error liking this comment. Please try again",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like comment",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
    }
  };

  return (
    <HeartIcon
      size={20}
      onClick={() => {
        handleLike(email, commentId);
      }}
      fill={isLiked ? "#111111" : "#ffffff"}
      className="cursor-pointer transition-colors duration-200 ease-in-out"
    />
  );
};

export default LikeComment;
