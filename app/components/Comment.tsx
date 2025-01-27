"use client";

import { useState } from "react";
import { LoaderCircleIcon, LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { addComment } from "@/actions/comment.action";
import GetComments from "./GetComments";

const Comment = ({ id, email }: { id: number; email: string }) => {
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
        className: "bg-red-500 text-white",
      });
      return;
    }

    if (commentData.trim().length < 5) {
      toast({
        title: "Comment is too short",
        description: "Please enter a comment more than 5 characters",
        className: "bg-red-500 text-white",
      });
      return;
    }

    if (commentData.trim().length > 200) {
      toast({
        title: "Comment is too long",
        description: "Please enter a comment less than 200 characters",
        className: "bg-red-500 text-white",
      });
      return;
    }

    if (isPotentialSQLInjection(commentData)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-red-500 text-white",
      });
      return;
    }
    try {
      setLoading(true);

      const res = await addComment(email, id, commentData);

      if (res.statusCode === 400) {
        toast({
          title: "Field(s) missing",
          description: "Please enter your email and password",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      if (res.statusCode === 404) {
        toast({
          title: "User not found",
          description: "An account with this email does not exist",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      if (res.statusCode === 500) {
        toast({
          title: "Internal Server Error",
          description: "Please try again later",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success",
        description: "Comment added successfully",
        className: "bg-green-500 text-white",
      });
      setCommentData("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to add comment",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="flex flex-col gap-20 pb-32 max-w-[1400px] mx-auto text-[#111111] border-b-[0.5px] border-themeGray mb-20">
      <h4 className="text-4xl font-bold">Comments</h4>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-sm relative">
          <textarea
            value={commentData}
            onChange={handleChange}
            placeholder={
              email ? "Share your thoughts..." : "Please login to comment"
            }
            className={`w-full p-4 min-h-[120px] bg-gray-50 border-[0.3px] border-[#111111]/20 focus:outline-none focus:border-[#111111]/40 resize-none transition-colors ${
              !email && "cursor-not-allowed opacity-50"
            }`}
            disabled={!email}
          />
          {!email && (
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <LockIcon className="w-6 h-6 text-gray-500" />
                <p className="text-sm text-gray-600 font-medium">
                  Login to comment
                </p>
              </div>
            </div>
          )}
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

        <GetComments id={id} />
      </div>
    </div>
  );
};

export default Comment;
