"use client";

import type { UserResponseType } from "@/types/user";
import EditUserProfileName from "./EditUserProfileName";
import { useState } from "react";

const EditUserProfile = ({ userData }: { userData: UserResponseType }) => {
  const [userDetails, setUserDetails] = useState<UserResponseType>(userData);

  return (
    <div className="flex flex-col gap-2">
      <EditUserProfileName
        userData={userDetails}
        setUserData={setUserDetails}
      />
    </div>
  );
};

export default EditUserProfile;
