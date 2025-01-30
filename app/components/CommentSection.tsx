import FetchComments from "./FetchComments";
import PostComment from "./PostComment";

const CommentSection = ({ id, email }: { id: number; email: string }) => {
  return (
    <div className="flex flex-col gap-20 pb-32 max-w-[1400px] mx-auto text-[#111111] border-b-[0.5px] border-themeGray mb-20">
      <h4 className="text-4xl font-bold">Comments</h4>
      <FetchComments id={id} email={email} />
      <PostComment id={id} email={email} />
    </div>
  );
};

export default CommentSection;
