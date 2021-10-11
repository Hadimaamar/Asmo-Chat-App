import axios from "axios";
import { useEffect, useState } from "react";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((fr) => onlineUsers.includes(fr._id)));
  }, [friends, onlineUsers]);
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((fr) => (
        <div
          className="flex items-center font-medium cursor-pointer mt-3 "
          onClick={() => handleClick(fr)}
        >
          <div className="relative mr-3  ">
            <img
              className="w-8 h-8 rounded-full object-cover border border-solid border-white "
              src={fr?.profilePicture || "assets/noavatar.jpg"}
              alt=""
            />
            <div className="w-3 h-3 rounded-full bg-[limegreen] top-[2px] right-0 absolute "></div>
          </div>
          <div className="chatOnlineName">{fr?.username}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
