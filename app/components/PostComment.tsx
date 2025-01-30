"use client";

import { useState } from "react";
import { LoaderCircleIcon, LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addComment } from "@/actions/comment.action";
import { toastVariants } from "@/lib/utils";

const PostComment = ({ id, email }: { id: number; email: string }) => {
  const [commentData, setCommentData] = useState("");

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
  };

  const handleSubmit = async () => {
    if (commentData.trim() === "") {
      toast({
        title: "Comment is empty",
        description: "Please enter a comment",
        className: toastVariants.error,
      });
      return;
    }

    try {
      setLoading(true);

      const res = await addComment(email, id, commentData);

      if (res.statusCode === 200) {
        toast({
          title: "Success",
          description: "Comment added successfully",
          className: toastVariants.success,
        });

        setCommentData("");

        setLoading(false);
        return;
      }
      if (res.statusCode === 400) {
        toast({
          title: "Field(s) missing",
          description: "Please enter your email and password",
          className: toastVariants.error,
        });
        setLoading(false);
        return;
      }

      if (res.statusCode === 404) {
        toast({
          title: "User not found",
          description: "An account with this email does not exist",
          className: toastVariants.error,
        });
        setLoading(false);
        return;
      }

      if (res.statusCode === 500) {
        toast({
          title: "Internal Server Error",
          description: "Please try again later",
          className: toastVariants.error,
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Error",
        description: "Failed to add comment",
        className: toastVariants.error,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to add comment",
        className: toastVariants.error,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white">
      <textarea
        value={commentData}
        onChange={handleChange}
        placeholder={
          email || email !== ""
            ? "Share your thoughts..."
            : "Please login to comment"
        }
        className={`w-full p-4 min-h-[120px] bg-gray-50 border-[0.3px] border-[#111111]/20 focus:outline-none focus:border-[#111111]/40 resize-none transition-colors ${
          !email && "cursor-not-allowed opacity-50"
        }`}
        disabled={!email}
      />
      <button
        onClick={handleSubmit}
        disabled={!email || loading}
        className={`self-end px-8 py-3 bg-[#111111] text-white flex items-center justify-center min-w-[100px] transition-colors ${
          !email || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#111111]/90"
        }`}
      >
        {loading ? (
          <LoaderCircleIcon size={20} className="animate-spin" />
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
};

export default PostComment;
