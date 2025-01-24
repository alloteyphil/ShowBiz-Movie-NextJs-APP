"use client";

import type { UserResponseType } from "@/types/user";
import EditUserProfileName from "./EditUserProfileName";
import { useState } from "react";
import EditUserProfileImage from "./EditUserProfileImage";
import EditUserProfilePassword from "./EditUserProfilePassword";
import UserContactInfo from "./UserContactInfo";

const EditUserProfile = ({ userData }: { userData: UserResponseType }) => {
  const [userDetails, setUserDetails] = useState<UserResponseType>(userData);

  return (
    <div className="flex flex-col gap-20">
      <UserContactInfo email={userData.email} />
      <div className="flex flex-col gap-8">
        <h3 className="text-3xl font-semibold">Name Details</h3>
        <div className="flex flex-col gap-6 w-[650px]">
          <EditUserProfileName userData={userDetails} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-3xl font-semibold">Security</h3>
        <div className="flex flex-col gap-6 w-[650px]">
          <EditUserProfilePassword email={userData.email} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-3xl font-semibold">Profile Picture</h3>
        <div className="flex flex-col gap-6 w-[650px]">
          <EditUserProfileImage email={userData.email} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
