import TopBar from "../../src/components/TopBar";
import Message from "../../src/components/Message";
import Conversations from "../components/Conversations";
import ChatOnline from "../components/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    try {
      const getMessages = async () => {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      };
      getMessages();
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <TopBar />
      <div className="messenger flex ">
        <div className="flex-[3.5]">
          <div className="p-3 h-full ">
            <input
              placeholder="Search for friends"
              className="w-[90%] py-3 border-t-0 border-r-0 border-l-0 border-b border-solid border-[gray] "
            />
            {conversations.map((conv) => (
              <div onClick={() => setCurrentChat(conv)}>
                <Conversations
                  key={conv._id}
                  conversation={conv}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-[5.5]">
          <div className="p-3 h-full flex flex-col justify-between relative">
            {currentChat ? (
              <>
                <div className="h-full overflow-y-scroll pr-3">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        key={message._id}
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex items-center justify-between  ">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="w-[80%] h-[90px] p-3  "
                    placeholder="write message..."
                  ></textarea>
                  <button
                    onClick={handleSubmit}
                    className="w-[70px] h-10 border-none rounded-md cursor-pointer bg-[teal] text-white  "
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="absolute top-[10%] text-6xl text-[#d1d1d1]  cursor-default   ">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="flex-[3]">
          <div className="p-3 h-full onlineWrap">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
