import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Users } from "../Dummydata";
import Online from "./Online";
import { Add, Remove } from "@mui/icons-material";

export const Rightbar = ({ user }) => {
  const [friends, setFreinds] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFreinds(friendList.data);
      } catch (error) {
        console.log(error);
      }
      setFollowed(!followed);
    };
    getFriends();
  }, [user?._id]);
  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightBar = () => (
    <>
      <div className="flex items-center">
        <img className="w-10 h-10 mr-3 " src="/assets/gift.png" alt="" />
        <span className="font-light text-base ">
          {" "}
          <b>Ali Hijazi</b> and <b>3 other friends</b>
        </span>
      </div>
      <img src="/assets/ad.jpg" alt="" className="w-full rounded-xl my-7 " />
      <h4 className="mb-5 font-bold">Online Friends</h4>
      <ul className="list-none ">
        {Users.map((user) => (
          <Online key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
  const ProfileRightBar = () => (
    <>
      {user.username != currentUser.username && (
        <button
          onClick={followHandler}
          className=" w-[100px] h-[45px] mt-8 mb-3 border-none bg-[#790973] text-white rounded-md py-1 px-3 flex items-center text-lg font-medium cursor-pointer justify-around focus:outline-none "
        >
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="text-lg font-medium mb-3 ">User information </h4>
      <div className="mb-7 ">
        <div className=" mb-3 ">
          <span className="font-medium mr-4 text-[#555]">City:</span>
          <span className="font-light ">{user.city}</span>
        </div>
        <div className=" mb-3 ">
          <span className="font-medium mr-4 text-[#555]">From:</span>
          <span className="font-light ">{user.from}</span>
        </div>
        <div className=" mb-3 ">
          <span className="font-medium mr-4 text-[#555]">Relationship:</span>
          <span className="font-light ">
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>
      <h4 className="title font-bold">User Friends</h4>
      <div className="flex flex-wrap mt-1 justify-between ">
        {friends.map((friend) => (
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
          >
            <div className="flex flex-col mb-5 cursor-pointer">
              <img
                className="w-[100px] h-[100px] object-cover rounded-md "
                src={friend.profilePicture || "/assets/noavatar.jpg"}
                alt=""
              />
              <span className="rightbarFlooing">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
  return (
    <div className="hidden lg:inline-block flex-[3.5]">
      <div className="pt-5 pr-20  ">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
