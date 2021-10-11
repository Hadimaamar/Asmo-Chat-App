import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const share = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full  rounded-xl shadow-xl  ">
      <div className="p-3 ">
        <div className="flex items-center">
          <img
            src={user.profilePicture || "/assets/noavatar.jpg"}
            className="w-[50px] h-[50px] rounded-full object-cover mr-3"
            alt=""
          />
          <input
            className="border-none w-[80%] focus:outline-none"
            placeholder={
              "What's in your mind " + user.username.split(" ", 1) + " ?"
            }
            ref={desc}
          />
        </div>
        <hr className="m-4 lg:m-5 " />
        {file && (
          <div className="pt-0 pr-5 pb-3 pl-5 relative ">
            <img
              className="w-full object-cover "
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className="absolute top-0 right-5  cursor-pointer opacity-70 "
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className=" flex items-center justify-between" onSubmit={share}>
          <div className="flex ml-2 ">
            <label
              htmlFor="file"
              className="flex items-center lg:m-4 cursor-pointer "
            >
              <PermMedia className="shareIcon !text-[tomato]" />
              <span className="sharedOptionText whitespace-nowrap">
                Photo or Video
              </span>
              <input
                type="file"
                id="file"
                hidden
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="flex items-center m-4 cursor-pointer">
              <Label className="shareIcon !text-[blue]" />
              <span className="sharedOptionText">Tag</span>
            </div>
            <div className="flex items-center m-4 cursor-pointer">
              <Room className="shareIcon !text-[green]" />
              <span className="sharedOptionText">Location</span>
            </div>
            <div className="flex items-center m-4 cursor-pointer">
              <EmojiEmotions className="shareIcon !text-[goldenrod]" />
              <span className="sharedOptionText">Feelings</span>
            </div>
          </div>
          <button
            type="submit"
            className="border-none p-2 rounded-md bg-[green] font-medium text-white lg:mr-5 cursor-pointer"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
