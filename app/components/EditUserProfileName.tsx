"use client";

import type { UserResponseType } from "@/types/user";

const EditUserProfileName = ({
  userData,
  setUserData,
}: {
  userData: UserResponseType;
  setUserData: React.Dispatch<React.SetStateAction<UserResponseType>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <input
        type="text"
        value={userData.fName}
        onChange={handleChange}
        id="fName"
        className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
      />
      <input
        type="text"
        value={userData.lName}
        onChange={handleChange}
        id="lName"
        className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
      />
    </>
  );
};

export default EditUserProfileName;
