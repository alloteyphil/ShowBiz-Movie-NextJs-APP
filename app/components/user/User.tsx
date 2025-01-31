"use client";

import * as React from "react";

import UserButton from "./UserButton";
import type { UserResponseType } from "@/types/user";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/logout.actions";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfileStore } from "@/store";
import Image from "next/image";
import userPhoto from "../../public/images/user.png";

const User = ({
  session,
  userData,
}: {
  session: string | undefined;
  userData: UserResponseType | null | undefined;
}) => {
  const userState = useUserProfileStore((state) => state);

  const { name, photo, setName, setPhoto } = userState;

  const [user, setUser] = useState<UserResponseType | null>(null);

  const pathname = usePathname();

  const isProfilePage = pathname?.includes("/profile");

  useEffect(() => {
    const user: UserResponseType | null = JSON.parse(
      localStorage.getItem("user") || "null",
    );

    if (user !== null) {
      setUser(user);
      setName(user.fName, userState);
      if (user.photo) {
        setPhoto(user.photo, userState);
      }
    }
  }, [name]);

  return (
    <>
      {session && user && userData ? (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`flex gap-2 items-center ${isProfilePage ? "text-[#111111]" : "text-white"}`}
              >
                <Image
                  src={photo || userData.photo || userPhoto}
                  width={40}
                  height={40}
                  alt="Profile picture"
                  className="rounded-full w-5 h-5 object-center object-cover mr-1"
                />
                <p className="text-sm">
                  Hi,{" "}
                  <span className="capitalize">{name || userData.fName}</span>
                </p>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-3 p-4 w-[200px]">
                  <ListItem href={"/profile"} title={"My Profile"}></ListItem>
                  <ListItem
                    href={"/watchlist"}
                    title={"My Watchlist"}
                  ></ListItem>
                  <ListItem title={"Logout"}></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <UserButton isProfilePage={isProfilePage} />
      )}
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  const { toast } = useToast();

  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();

    if (res.statusCode === 500) {
      toast({
        title: "Error",
        description: "A problem occurred when logging out. Please try again.",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    toast({
      title: "Success",
      description: "You have successfully logged out.",
      className:
        "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
    });
    localStorage.removeItem("user");

    router.refresh();

    return;
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div
            onClick={() => {
              title === "Logout" && handleLogout();
            }}
            className="text-sm font-medium leading-none"
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default User;
