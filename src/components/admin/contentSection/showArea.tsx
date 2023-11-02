
import Dashboard from "./dashboard/dashboard";
import Subscribers from "./subscriber/subscriber";
import Settings from "./setting/setting";

export default function ShowData({ showContent,setContent }: any) {
    return (
      <div className=" laptop:pl-[26%] mt-9">
        {showContent === "Dashboard" ? <Dashboard /> : ""}
        {showContent === "Subscribers" ? <Subscribers/> : ""}
        {showContent === "Settings" ? <Settings /> : ""}
      </div>
    );
  }