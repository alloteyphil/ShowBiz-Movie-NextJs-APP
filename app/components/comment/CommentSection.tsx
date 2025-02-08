import FetchComments from "./FetchComments";
import PostComment from "./PostComment";

const CommentSection = ({
  id,
  email,
  type,
  photo,
  title,
}: {
  id: number;
  email: string;
  type: string;
  photo: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-20 max-xl:gap-6 pb-32 max-md:pb-10 max-xl:pb-14 max-md:px-4 max-xl:px-8 max-w-[1400px] mx-auto text-[#111111] border-b-[0.5px] border-themeGray max-md:mb-8 max-xl:mb-12 mb-20">
      <h4 className="text-4xl max-xl:text-3xl font-bold">Comments</h4>
      <FetchComments id={id} email={email} />
      <PostComment
        id={id}
        email={email}
        type={type}
        photo={photo}
        title={title}
      />
    </div>
  );
};

export default CommentSection;
