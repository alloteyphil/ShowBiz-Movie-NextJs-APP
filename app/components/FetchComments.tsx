import { getComments } from "@/actions/comment.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userPhoto from "../../public/images/user.png";
import Image from "next/image";
import { formatDate } from "@/lib/helpers/formatDate";
import { HeartIcon, TrashIcon } from "lucide-react";

interface Comment {
  id: string;
  commentText: string;
  commentAuthor: {
    fName: string;
    lName: string;
    photo: string;
    email: string;
  };
  likes: number;
  createdAt: Date;
}

const FetchComments = async ({ id, email }: { id: number; email: string }) => {
  let comments: Comment[] | undefined;

  try {
    const res = await getComments(id);

    if (res.response === null) return <div></div>;

    if (res.statusCode === 200) {
      comments = res.response.comments;
    }
  } catch (error) {
    console.error("Fetch comments error:", error);
    return <div></div>;
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
                    <HeartIcon size={20} />
                    {email === comment.commentAuthor.email && (
                      <>
                        <TrashIcon size={20} />
                      </>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-themeGray uppercase">
                {formatDate(comment.createdAt.toLocaleString())}
              </p>
              <p className="mt-4 max-w-[1000px]">{comment.commentText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FetchComments;
