"use client";

import type { UserResponseType } from "@/types/user";
import EditUserProfileName from "./EditUserProfileName";
import { useState } from "react";
import EditUserProfileImage from "./EditUserProfileImage";
import EditUserProfilePassword from "./EditUserProfilePassword";
import UserContactInfo from "../user/UserContactInfo";

const EditUserProfile = ({
  userData,
}: {
  userData: UserResponseType | undefined | null;
}) => {
  const [userDetails, setUserDetails] = useState<UserResponseType>(userData!);

  return (
    <div className="flex flex-col gap-20 max-md:w-full">
      <UserContactInfo email={userData!.email} />
      <div className="flex flex-col gap-8 max-md:w-full">
        <h3 className="text-3xl font-semibold">Name Details</h3>
        <div className="flex flex-col gap-6 w-[650px] max-md:w-full">
          <EditUserProfileName userData={userDetails} />
        </div>
      </div>
      <div className="flex flex-col gap-8 max-md:w-full">
        <h3 className="text-3xl font-semibold">Security</h3>
        <div className="flex flex-col gap-6 w-[650px] max-md:w-full">
          <EditUserProfilePassword email={userData!.email} />
        </div>
      </div>
      <div className="flex flex-col gap-8 max-md:w-full">
        <h3 className="text-3xl font-semibold">Profile Picture</h3>
        <div className="flex flex-col gap-6 w-[650px] max-md:w-full">
          <EditUserProfileImage email={userData!.email} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
