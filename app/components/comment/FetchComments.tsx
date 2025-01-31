import { deleteComment, getComments } from "@/actions/comment.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userPhoto from "../../../public/images/user.png";
import Image from "next/image";
import { timeAgo } from "@/lib/helpers/timeAgo";
import LikeComment from "./LikeComment";
import DeleteComment from "./DeleteComment";

interface Comment {
  id: string;
  commentText: string;
  commentAuthor: {
    fName: string;
    lName: string;
    photo: string;
    email: string;
  };
  likes: string[];
  createdAt: Date;
}

const FetchComments = async ({ id, email }: { id: number; email: string }) => {
  let comments: Comment[] | undefined;

  try {
    const res = await getComments(id);

    if (res.response === null)
      return (
        <p className="text-lg font-semibold text-darkAsh">No comments yet</p>
      );

    if (res.statusCode === 200) {
      comments = res.response.comments;
    }

    if (comments?.length === 0)
      return (
        <p className="text-lg font-semibold text-darkAsh">No comments yet</p>
      );
  } catch (error) {
    console.error("Fetch comments error:", error);
    return (
      <p className="text-lg font-semibold text-darkAsh">No comments yet</p>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <p className="text-lg font-semibold text-darkAsh">
        {comments && comments.length} Comment{comments?.length === 1 ? "" : "s"}
      </p>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 w-full items-start">
            <Avatar className="w-24 h-24">
              <AvatarImage
                className="object-center object-cover"
                src={comment.commentAuthor.photo || ""}
              />
              <AvatarFallback className="rounded-full w-full h-full bg-darkAsh">
                <Image
                  src={userPhoto}
                  width={400}
                  height={400}
                  alt="Profile Picture"
                  className="object-cover object-center w-full h-full"
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full text-[#111111]">
              <div className="flex w-full justify-between">
                <p className="text-lg font-semibold capitalize">
                  {comment.commentAuthor.fName} {comment.commentAuthor.lName}
                </p>
                {email && (
                  <div className="flex gap-4">
                    <LikeComment
                      commentId={comment.id}
                      likes={comment.likes}
                      email={email}
                    />
                    {email === comment.commentAuthor.email && (
                      <>
                        <DeleteComment commentId={comment.id} email={email} />
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-4 items-center uppercase mt-1">
                <p className="text-xs text-themeGray pr-4 border-r-[0.5px] border-themeGray">
                  {timeAgo(comment.createdAt)}
                </p>
                <p className="text-xs text-themeGray">
                  {comment.likes.length} like
                  {comment.likes.length === 1 ? "" : "s"}
                </p>
              </div>

              <p className="mt-4 max-w-[1000px]">{comment.commentText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FetchComments;
