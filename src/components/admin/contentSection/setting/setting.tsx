import {
  Avatar,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { blueGrey, green, red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import axios from "axios";
import { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Settings() {
  const session = useSession();
  const [name, setName] = useState(session.data?.user?.name || "Admin")
  const matches = useMediaQuery("(max-width:768px)");
  const [showAccessToken, setAccessToken] = useState(false);
  const [showGeneratedToken, setGeneratedToken] = useState(false);
  const [token, setToken] = useState("");
  const [newToken, setNewToken] = useState("");
  const getBotInfo = async () => {
    try {
      const bot = await axios.get("/api/bot");
      return bot.data.filterData;
    } catch (error) {
      return null;
    }
  };

  const { data, isLoading, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ["botInfo"],
    queryFn: getBotInfo,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || data === null || isFetching) {
    return (
      <div className=" text-center">
        <CircularProgress />
      </div>
    );
  }

  const getAccessToken = async () => {
    try {
      const sentBody = {
        prop: "gettoken",
      };

      const fetchToken = await axios.post("/api/bot/token", sentBody);
      
      if (fetchToken.status === 200) {
        setAccessToken(true);
        setToken(fetchToken.data.data.token);
        toast.success("Success");
      } else {
        toast.error("Check your connection !!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const generateToken = async () => {
    try {
      const sentBody = {
        prop: "generatetoken",
        name: name
      };

      const generateToken = await axios.post("/api/bot/token", sentBody);

      if (generateToken.status === 200) {
        setGeneratedToken(true);
        setNewToken(generateToken.data.data.token.token);
        toast.success("Success");
      } else {
        toast.error("Check your connection !!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isSuccess && data !== null) {
    return (
      <div>
        <div className=" bg-white rounded-3xl mx-4">
          <div className=" m-4 py-5 px-4 ">
            <div className="flex justify-center">
              <Avatar sx={{ bgcolor: blueGrey[500] }} style={{height:"6rem", width:"6rem", fontSize:"3rem"}}>{data.name[0]}</Avatar>
            </div>
            <div className="py-4 text-center italic text-red-950 text-lg">@{data.username}</div>
            <EditField
              name={"name"}
              value={data.name}
              label={"You can call me !!"}
              matches={matches}
              multiline={false}
              rows={0}
              refetch={refetch}
            />
            <EditField
              name={"bio"}
              value={data.bio}
              label={"Bio"}
              matches={matches}
              multiline={true}
              rows={4}
              refetch={refetch}
            />
            <EditField
              name={"description"}
              value={data.description}
              label={"What can I do ?"}
              matches={matches}
              multiline={true}
              rows={4}
              refetch={refetch}
            />
            <div className="text-center pb-5">
              <Button
                endIcon={<GetAppIcon />}
                style={{ backgroundColor: "aliceblue", fontWeight: "700" }}
                onClick={getAccessToken}
              >
                Get Access token
              </Button>
              {showAccessToken && (
                <div className=" pt-2">
                  <TextField
                    defaultValue={token}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: "50%" }}
                    variant="standard"
                  />
                </div>
              )}
            </div>
            <div className="text-center">
              <Button
                endIcon={<ManageHistoryIcon />}
                style={{ backgroundColor: "aliceblue", fontWeight: "700" }}
                onClick={generateToken}
              >
                Generate Access Token
              </Button>
              {showGeneratedToken && (
                <div className=" pt-2">
                  <TextField
                    defaultValue={newToken}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: "50%" }}
                    variant="standard"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function EditField({
  name,
  value,
  label,
  matches,
  multiline,
  rows,
  refetch,
}: any) {
  const [input, setInput] = useState(value);
  const [processing, setProcessing] = useState(false);
  const [closeEdit, setEdit] = useState(true);

  const update = async () => {
    try {
      setProcessing(true);

      const updateBody = {
        prop: name,
        value: input,
      };

      const updateReq = await axios.put("/api/bot", updateBody);

      if (updateReq.status === 200) {
        toast.success(`Successfully, Updated\n${label}!!`);
        refetch();
      } else {
        toast.error(updateReq.data.message);
      }
    } catch (error: any) {
      let msg = name === "bio" ? "Please provide under 140 charcters" : error.response.data.message
      toast.error(msg);
    } finally {
      setProcessing(false);
      setEdit(true);
    }
  };

  return (
    <div>
    <div className="py-4 text-center flex justify-center gap-3">
      
        <TextField
          name={name}
          value={input}
          label={label}
          style={{ width: ` ${matches ? "100%" : "50%"}` }}
          multiline={multiline}
          InputProps={{
            readOnly: closeEdit,
          }}
          rows={rows}
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
        />
        
      
      {processing ? (
        <CircularProgress />
      ) : (
        <Button
          onClick={() => {
            setEdit(!closeEdit);
            if (!closeEdit) {
              update();
            }
          }}
          endIcon={closeEdit ? <EditIcon /> : <TelegramIcon />}
        >
          {closeEdit ? "Edit" : "Update"}
        </Button>
      )}
    </div>
    {name === "bio" ? <div className=" text-gray-600 flex justify-center">
      <div className="flex justify-end w-1/2">{input.length}/140</div>
      </div> : ""}
    </div>
  );
}
