import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsliked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsliked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isliked ? like - 1 : like + 1);
    setIsliked(!isliked);
  };
  return (
    <div className="w-full rounded-xl shadow-lg my-8 ">
      <div className="p-3 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center ">
            <Link to={`profile/${user.username}`}>
              <img
                className="w-8 h-8 rounded-full object-cover "
                src={user.profilePicture || "/assets/noavatar.jpg"}
                alt=""
              />
            </Link>
            <span className="text-sm font-medium mx-3 ">{user.username}</span>
            <span className="text-xs">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="my-5 ">
          <span className="postText">{post?.desc}</span>
          <img
            className="my-5 rounded-md w-full max-h-[500px] object-contain   "
            src={post?.img}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center ">
            <img
              onClick={likeHandler}
              className="w-8 h-8 mr-1 cursor-pointer hover:animate-bounce"
              src="/assets/like.jpg"
              alt=""
            />
            <img
              onClick={likeHandler}
              className="w-10 h-6 mr-1 cursor-pointer hover:animate-bounce"
              src="/assets/love.png"
              alt=""
            />
            <span className="text-base">{like} people like it</span>
          </div>
          <div className="postBootRight">
            <span className="cursor-pointer border-b-[1px] border-dashed border-[gray]">
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
