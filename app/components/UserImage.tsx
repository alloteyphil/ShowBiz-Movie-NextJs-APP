"use client";

import Image from "next/image";
import noUser from "../../public/images/user.png";
import { useUserProfileStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserImage = ({ image }: { image: string }) => {
  const { photo } = useUserProfileStore((state) => state);

  return (
    <>
      <Avatar className="w-52 h-52 mb-4">
        <AvatarImage
          src={photo || image}
          className="object-cover object-center"
        />
        <AvatarFallback>
          <Image
            src={noUser}
            width={400}
            height={400}
            alt="Profile Picture"
            className="object-cover object-center"
          />
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserImage;
