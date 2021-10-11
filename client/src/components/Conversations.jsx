import axios from "axios";
import { useEffect, useState } from "react";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const freindId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + freindId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="flex items-center p-3 mt-5 cursor-pointer hover:bg-[#f0f0f0] ">
      <img
        src={user?.profilePicture || "/assets/noavatar.jpg"}
        alt=""
        className="w-10 h-10 rounded-full object-cover mr-5"
      />
      <span className="font-medium ">{user?.username}</span>
    </div>
  );
};

export default Conversations;
