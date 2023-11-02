"use client";

import React, { useState } from "react";
import SidePanel from "./navSection/navPanel";
import TopBar from "./topSection/topPanel";
import ShowData from "./contentSection/showArea";
import { MobilePanel } from "./navSection/navPanel";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

export default function AdminPanel() {
  const session = useSession();
  const [showContent, setContent] = useState("Dashboard");

  if (session.status === "authenticated") {
    return (
      <div className=" min-h-screen bg-[#E9ECEF] w-full">
        <div className="relative">
          <div>
            <div className="bg-[#363740] min-h-screen absolute w-[25%] mobile:hidden laptop:block">
              <SidePanel setContent={setContent} showContent={showContent} />
            </div>
            <div>
              <MobilePanel setContent={setContent} showContent={showContent} />
            </div>
          </div>
          <div className="">
            <div className=" bg-white">
              <TopBar />
            </div>
            <div>
              <ShowData showContent={showContent} setContent={setContent} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (session.status === "loading") {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex justify-center items-center text-5xl font-extrabold">
      UNAUTHORIZED USER
    </div>
  );
}
