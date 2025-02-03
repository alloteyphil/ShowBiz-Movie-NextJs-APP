"use client";

import { useDrawerStore } from "@/store";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileSideBar = () => {
  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setMobileMenuOpen);

  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current && toggleRef.current) {
      const newTimeline = gsap.timeline();

      if (storeState.mobileMenuOpen) {
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

  const handleClick = (url: string) => {
    setOpen(storeState);
    router.push(url);
  };
  return (
    <div
      ref={drawerRef}
      className="w-screen h-screen z-[100] top-0 left-0 fixed bg-white hidden"
    >
      <div
        ref={toggleRef}
        className="w-full h-full bg-transparent relative flex flex-col gap-10 px-10 py-44"
      >
        <XIcon
          className="absolute top-24 left-10 cursor-pointer"
          size={16}
          color="#111111"
          onClick={() => {
            setOpen(storeState);
          }}
        />
        <p
          className="text-[#111111] text-3xl"
          onClick={() => {
            handleClick("/");
          }}
        >
          Home
        </p>
        <p
          className="text-[#111111] text-3xl"
          onClick={() => {
            handleClick("/genre/movie/28?page=1");
          }}
        >
          Movie
        </p>
        <p
          className="text-[#111111] text-3xl"
          onClick={() => {
            handleClick("/genre/tv/10759?page=1");
          }}
        >
          TV Show
        </p>
      </div>
    </div>
  );
};

export default MobileSideBar;
