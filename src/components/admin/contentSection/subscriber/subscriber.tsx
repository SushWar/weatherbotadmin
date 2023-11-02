import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function Subscribers({}: any) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const subscriberDetails = async () => {
    try {
      const user = await axios.get("/api/subscribers");
      return user.data.filterData;
    } catch (error) {
      return null;
    }
  };

  const { data, isLoading, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ["subscriberDetails"],
    queryFn: subscriberDetails,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || data === null || isFetching) {
    return (
      <div className=" text-center">
        <CircularProgress />
      </div>
    );
  }

  if (isSuccess && data !== null) {
    return (
      <div id="subscriber" className=" px-4">
        <div className=" text-center pb-12">
          <div className=" pb-4 animate-pulse text-[#005d95]"><h2> Send Custom message to all the Subscriber</h2></div>
          <Button variant="outlined" onClick={handleClickOpen}><TelegramIcon/></Button>
          <MessageBox open={open} handleClose={handleClose}/>
        </div>
        <div className=" flex justify-center ">
          <table>
            <thead className=" text-black font-extrabold">
              <tr>
                <th className=" border-solid border-black border tablet:w-[10rem] laptop:w-[12rem] desktop1:w-[13rem]">
                  <span className=" px-5 py-3">Telegram ID</span>
                </th>

                <th className="border-solid border-black border tablet:w-[10rem] laptop:w-[12rem] desktop1:w-[13rem]">
                  <span className=" px-5 py-3">Name</span>
                </th>

                <th className="border-solid border-black border tablet:w-[10rem] laptop:w-[12rem] desktop1:w-[13rem]">
                  <span className=" px-5 py-3">Blocked</span>
                </th>

                <th className="border-solid border-black border tablet:w-[10rem] laptop:w-[12rem] desktop1:w-[13rem]">
                  <span className=" px-5 py-3">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, key: any) => {
                return (
                  <tr key={key}>
                    <UserList item={item} refetch={refetch} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function UserList({ item, refetch }: any) {
  const router = useRouter();
  const [openEdit, setEdit] = useState(false);

  const blockUser = async (name:string) => {
    try {
      const attack = {
        id: item.telegramId,
        value: !item.isBlocked,
      };
      const data = await axios.put("/api/subscribers", attack);

      if (data.status === 200) {
        toast.success(`Successfully, ${name} the user`);
        refetch();
      }
      
    } catch (error) {
      toast.error("Activity failed. Check your connection", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <td className="border-solid border-black border text-center py-2 text-[#4976c7]">
        {item.telegramId}
      </td>
      <td className="border-solid border-black border text-center py-2 text-[#4976c7]">
        {item.firstName} {item.lastName}
      </td>
      <td
        className={`border-solid border-black border text-center py-2 ${
          item.isBlocked ? "bg-red-600 " : "bg-green-600"
        }`}
      >
        {item.isBlocked ? "YES" : "NO"}
      </td>
      <td className="border-solid border-black border text-center py-2">
        {openEdit ? (
          <>
            <Button
              onClick={() => {
                setEdit(false);
                blockUser('Blocked');
              }}
              endIcon={<BlockIcon />}
            >
              Block
            </Button>

            <Button
              onClick={() => {
                setEdit(false);
                blockUser('Unblocked');
              }}
              endIcon={<CheckIcon />}
            >
              Unblock
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setEdit(true);
            }}
            endIcon={<EditIcon />}
          />
        )}
      </td>
    </>
  );
}


function MessageBox({open , handleClose}:any){

  const [message, setMessage] = useState("")

  const sendMessage = async()=>{
    try {
      
      const sendBody = {
        message:message
      };
      const data = await axios.post("/api/subscribers", sendBody);
      
      if (data.status === 200) {
        toast.success(`Messages delivered `);
      }
      
    } catch (error) {
      toast.error("Activity failed. Check your connection", {
        position: "top-center",
      });
    }
  }



  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <DialogContentText style={{paddingBottom:"2rem"}}>
            Reach out to all your Subscribers, with a special message !!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            autoComplete="off"
            multiline
            rows={5}
            onChange={(e:any)=>{setMessage(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={sendMessage} style={{backgroundColor:'darkblue', color:'aliceblue' }} endIcon={<TelegramIcon/>}>Send</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
