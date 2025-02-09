import { MailIcon } from "lucide-react";

const UserContactInfo = ({ email }: { email: string }) => {
  return (
    <div className="flex gap-5 max-md:py-5 items-center border-[0.3px] border-[#111111]/40 rounded-none px-4 py-6 w-full">
      <MailIcon className="text-themeGray" size={30} />
      <div className="flex flex-col">
        <p className="font-medium text-lg text-darkAsh">Email</p>
        <p className="text-sm text-[#111111]/40">{email}</p>
      </div>
    </div>
  );
};

export default UserContactInfo;
