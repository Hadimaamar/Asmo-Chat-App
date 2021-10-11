import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import Share from "./Share";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  console.log(posts);

  return (
    <div className="flex-[5] mr-3 ">
      <div className="wrapper">
        {(!username || username == user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
