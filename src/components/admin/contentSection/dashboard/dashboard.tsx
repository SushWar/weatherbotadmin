import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const subscriberDetails = async () => {
    try {
      const user = await axios.get("/api/subscribers");
      return user.data.filterData;
    } catch (error) {
      return null;
    }
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["totalSubscriber"],
    queryFn: subscriberDetails,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || data === null) {
    return (
      <div className=" text-center">
        <CircularProgress />
      </div>
    );
  }

  if (isSuccess && data !== null) {
    return (
      <div className=" px-4">
        <div className="flex justify-center">
          <div className=" bg-white w-fit rounded-2xl">
            <div className=" p-4 flex gap-4 items-center">
              <div className=" relative">
                <div>
                  <CustomCircularProgress value = {data.length}/>
                </div>
                <div className=" absolute top-0 h-[10rem] w-[10rem] flex justify-center items-center">
                  <PeopleAltIcon style={{ width: "2rem", height: "2rem", color:"darkslateblue" }} />
                </div>
              </div>
              <div className=" text-center">
                <div className="text-[#636977]">Total Subscribers</div>
                <div className=" text-black">{data.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function CustomCircularProgress(props: CircularProgressProps,{value}:any) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        style={{ width: "10rem", height: "10rem" }}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        style={{ width: "10rem", height: "10rem" }}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
