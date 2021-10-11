import { format } from "timeago.js";
const Message = ({ message, own }) => {
  return (
    <div className={`flex flex-col mt-5 ${own && "items-end"}`}>
      <div className="flex ">
        <img
          className="w-8 h-8 rounded-full object-cover mr-3"
          src="/assets/person/person1.jpg"
          alt=""
        />
        <p
          className={`p-3 rounded-3xl bg-[#790973] text-white max-w-[300px] ${
            own && "bg-[lightgray] text-black"
          } `}
        >
          {message.text}
        </p>
      </div>
      <div className="text-xs mt-3">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
