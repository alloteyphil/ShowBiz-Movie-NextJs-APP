"use client";

import Image from "next/image";
import noUser from "../../../public/images/user.png";
import { useUserProfileStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserImage = ({ image }: { image: string }) => {
  const { photo } = useUserProfileStore((state) => state);

  return (
    <>
      <Avatar className="w-32 h-32 mb-4">
        <AvatarImage
          src={photo || image}
          className="w-full h-full object-cover object-center"
          alt="User Profile"
        />
        <AvatarFallback>
          <Image
            src={noUser}
            width={300}
            height={300}
            alt="Profile Picture"
            className="w-full h-full object-cover object-center"
          />
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserImage;
