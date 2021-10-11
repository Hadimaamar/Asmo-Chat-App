import { Person, Search, Chat, Notifications } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const TopBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-14 w-full bg-[#790973] flex items-center sticky top-0 z-50">
      {/* top bar left */}
      <div className=" flex-[3]">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-lg lg:text-xl ml-5 font-bold text-white cursor-pointer whitespace-nowrap">
            Asmo Social
          </span>
        </Link>
      </div>
      {/* top bar center */}
      <div className="flex-[3] lg:flex-[5] mr-2">
        <div className="mx-3 lg:mx-0 w-full h-7 bg-white rounded-full flex items-center  ">
          <Search className="!text-xlg ml-2   " />
          <input
            type="text"
            className=" border-none focus:outline-none w-[70%] "
            placeholder="Search for a friend, post or video"
          />
        </div>
      </div>
      {/* top bar right */}
      <div className="flex-[4] flex items-center justify-around text-white ">
        <div className="topBarLinks">
          <span className="hidden lg:inline-block mr-2 text-[16px] cursor-pointer">
            Homepage
          </span>
          <span className="hidden lg:inline-block mr-2 text-[16px] cursor-pointer">
            Timeline
          </span>
        </div>
        <div className="flex">
          <div className="topbarIconItem">
            <Person />
            <span className="badge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="badge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            className="rounded-full h-8 w-8 cursor-pointer object-cover"
            src={user.profilePicture || "/assets/noavatar.jpg"}
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
