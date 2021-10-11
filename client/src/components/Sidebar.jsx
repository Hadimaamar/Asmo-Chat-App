import {
  RssFeed,
  Chat,
  VideoCall,
  Group,
  Bookmark,
  QuestionAnswerOutlined,
  Event,
  School,
  WorkOutline,
} from "@mui/icons-material";
import { Users } from "../Dummydata";
import Friend from "./Friend";
const Sidebar = () => {
  return (
    <div className=" hidden lg:inline-block flex-[3] h-screen sticky top-[50px] overflow-y-scroll scrollbar-hide ">
      <div className="p-5">
        <ul className=" list-none">
          <li className="sidebaritemlist">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarlistitemtext">Feed</span>
          </li>
          <li className="sidebaritemlist">
            <Chat className="sidebarIcon" />
            <span className="sidebarlistitemtext">Chats</span>
          </li>
          <li className="sidebaritemlist">
            <VideoCall className="sidebarIcon" />
            <span className="sidebarlistitemtext">Videos</span>
          </li>
          <li className="sidebaritemlist">
            <Group className="sidebarIcon" />
            <span className="sidebarlistitemtext">Groups</span>
          </li>
          <li className="sidebaritemlist">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarlistitemtext">Bookmarks</span>
          </li>
          <li className="sidebaritemlist">
            <QuestionAnswerOutlined className="sidebarIcon" />
            <span className="sidebarlistitemtext">Questions</span>
          </li>
          <li className="sidebaritemlist">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarlistitemtext">Jobs</span>
          </li>
          <li className="sidebaritemlist">
            <Event className="sidebarIcon" />
            <span className="sidebarlistitemtext">Events</span>
          </li>
          <li className="sidebaritemlist">
            <School className="sidebarIcon" />
            <span className="sidebarlistitemtext">Courses</span>
          </li>
        </ul>
        <button className="w-40 border-none p-3 rounded-md font-medium bg-gray-200">
          Show More
        </button>
        <hr className="my-5" />
        <ul className="list-none ">
          {Users.map((user) => (
            <Friend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
