"use client";

import { useStore } from "@/store";
import gsap from "gsap";
import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import Auth from "./Auth";
import { usePathname, useSearchParams } from "next/navigation";

const AuthDrawer = () => {
  const pathname = usePathname();

  const search = useSearchParams().get("auth-open");

  const storeState = useStore((state) => state);

  const setOpen = useStore((state) => state.setAuthDrawerOpen);

  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current && toggleRef.current) {
      const newTimeline = gsap.timeline();

      if (
        (pathname === "/" && search === "true") ||
        storeState.authDrawerOpen
      ) {
        newTimeline
          .to(drawerRef.current, {
            height: "100vh",
            duration: 0.7,
            ease: "expo.inOut",
            onStart: () => {
              if (drawerRef.current) {
                drawerRef.current.style.display = "grid";
              }
            },
          })
          .to(
            toggleRef.current,
            {
              opacity: 1,
              duration: 0.7,
              ease: "expo.inOut",
            },
            "-=0.7"
          );
      } else {
        newTimeline
          .to(drawerRef.current, {
            height: "0vh",
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
              if (drawerRef.current) {
                drawerRef.current.style.display = "none";
              }
            },
          })
          .to(
            toggleRef.current,
            {
              opacity: 0,
              duration: 0.7,
              ease: "expo.inOut",
            },
            "-=0.7"
          );
      }
    }
  }, [storeState, pathname, search]);

  return (
    <div
      ref={drawerRef}
      className="w-full h-screen z-[100] fixed bg-white hidden"
    >
      <div
        ref={toggleRef}
        className="w-full h-full bg-transparent relative grid place-items-center"
      >
        <XIcon
          className="absolute top-32 right-32 cursor-pointer"
          size={36}
          color="#111111"
          onClick={() => {
            setOpen(storeState);
          }}
        />
        <Auth />
      </div>
    </div>
  );
};

export default AuthDrawer;
