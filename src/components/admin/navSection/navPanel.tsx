import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

export default function SidePanel({ setContent, showContent, setPanel }: any) {
  const primary = "text-[#e3e4eb]";
  const secondary = "text-[#A4A6B3]";
  const matches = useMediaQuery('(max-width:1023px)');

  return (
    <div className=" text-center select-none">
      <div className="py-12 ">
        <div className=" text-white text-5xl">Admin</div>
      </div>
      <div className=" cursor-pointer">
        <div
          className=" hover:bg-[#9FA2B4]"
          onClick={() => {
            setContent("Dashboard");
            matches ?  setPanel(false) : "";
          }}
        >
          <div
            className={`py-4 ${
              showContent === "Dashboard" ? primary : secondary
            }  hover:text-[#404458] text-2xl`}
          >
            Dashboard
          </div>
        </div>
      </div>
      <div className=" pt-5 cursor-pointer">
        <div
          className=" hover:bg-[#9FA2B4]"
          onClick={() => {
            setContent("Subscribers");
            matches ? setPanel(false) : "";
          }}
        >
          <div
            className={`py-4 ${
              showContent === "Subscribers" ? primary : secondary
            }  hover:text-[#404458] text-2xl`}
          >
            Subscribers
          </div>
        </div>
      </div>
      <div className=" pt-5 cursor-pointer">
        <div
          className=" hover:bg-[#9FA2B4]"
          onClick={() => {
            setContent("Settings");
            matches ? setPanel(false) : "";
          }}
        >
          <div
            className={`py-4 ${
              showContent === "Settings" ? primary : secondary
            }  hover:text-[#404458] text-2xl`}
          >
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobilePanel({ setContent, showContent }: any) {
  const [showPanel, setPanel] = useState(false);
  return (
    <div>
      <div
        className={`bg-[#363740] min-h-screen absolute w-[60%] z-[1] laptop:hidden duration-[700ms]   ${
          showPanel ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative">
          <div
            className={`absolute top-1 right-1 z-[2] ${
              showPanel ? "" : "hidden"
            }`}
            onClick={() => {
              setPanel(false);
            }}
          >
            <CloseIcon />
          </div>
          <SidePanel
            setContent={setContent}
            showContent={showContent}
            setPanel={setPanel}
          />
        </div>
      </div>

      <div
        className={`laptop:hidden absolute flex justify-center items-center h-[4rem] w-[4rem] ${
          showPanel ? "hidden" : ""
        }`}
      >
        <span
          onClick={() => {
            setPanel(true);
          }}
        >
          <MenuOpenIcon style={{ height: "4rem", width: "2rem" }} />
        </span>
      </div>
    </div>
  );
}
