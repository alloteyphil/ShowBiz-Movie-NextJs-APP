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

const User = ({ isProfilePage }: { isProfilePage: boolean | undefined }) => {
  const [user, setUser] = useState<UserResponseType | null>(null);

  useEffect(() => {
    const user: UserResponseType | null = JSON.parse(
      localStorage.getItem("user") || "null",
    );

    if (user !== null) {
      setUser(user);
    }
  }, []);

  return (
    <>
      {user !== null ? (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`${isProfilePage ? "text-[#111111]" : "text-white"}`}
              >
                {" "}
                Hi, {user.fName}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-3 p-4 w-[200px]">
                  <ListItem href={"/profile"} title={"My Profile"}></ListItem>
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

  const handleLogout = async () => {
    const res = await logout();

    if (res.statusCode === 500) {
      toast({
        title: "Error",
        description: "A problem occurred when logging out. Please try again.",
        className: "bg-red-400 text-white",
      });
      return;
    }

    toast({
      title: "Success",
      description: "You have successfully logged out.",
      className: "bg-green-400 text-white",
    });
    localStorage.removeItem("user");
    window.location.reload();
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
