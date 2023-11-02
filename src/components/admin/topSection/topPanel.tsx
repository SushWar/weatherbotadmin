import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function TopBar() {
  const session = useSession();
  const [name, setName] = useState(session.data?.user?.name || "Admin")
  const initials = `${name[0].toUpperCase()}${name[1].toUpperCase()}`
    return (
      <div className="pl-[26%] select-none">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold px-3 text-cyan-800">
            Hello {name},{" "}
            <WavingHandIcon fontSize="large" style={{ color: "orange" }} />
          </div>
          <div>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{initials}</Avatar>
          </div>
        </div>
      </div>
    );
  }