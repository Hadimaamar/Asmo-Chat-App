import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { Rightbar } from "../../components/Rightbar";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <div>
      <TopBar />
      <main className="flex  ">
        <Sidebar />
        <div className="flex-[9]">
          <div className="mt-6">
            <div className="h-[320px] relative ">
              <img
                className="w-full h-[250px] object-cover "
                src={user.coverImg || "/assets/nocover.jpg"}
                alt=""
              />
              <img
                className="w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 top-[150px] m-auto border-[3px] border-solid border-white "
                src={user.profilePicture || "/assets/noavatar.jpg"}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-bold ">{user.username}</h4>
              <span className="font-light">{user.desc}</span>
            </div>
          </div>
          <div className="flex">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
