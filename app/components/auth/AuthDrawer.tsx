"use client";

import { useDrawerStore } from "@/store";
import gsap from "gsap";
import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import Auth from "./Auth";

const AuthDrawer = () => {
  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setAuthDrawerOpen);

  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current && toggleRef.current) {
      const newTimeline = gsap.timeline();

      if (storeState.authDrawerOpen) {
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
            "-=0.7",
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
            "-=0.7",
          );
      }
    }
  }, [storeState]);

  return (
    <div
      ref={drawerRef}
      className="fixed top-0 left-0 w-screen h-screen z-[100] bg-white hidden"
    >
      <div
        ref={toggleRef}
        className="w-full h-full bg-transparent relative grid place-items-center"
      >
        <XIcon
          className="absolute top-8 left-8 cursor-pointer w-5 md:top-8 md:left-8 lg:top-10 lg:left-10 lg:w-6"
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
