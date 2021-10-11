const Online = ({ user }) => {
  console.log(user);
  return (
    <li className="flex items-center mb-4 ">
      <div className="mr-3 relative">
        <img
          className="w-10 h-10 rounded-full object-cover "
          src={user.profilePicture}
          alt=""
        />
        <span className="w-3 h-3 rounded-full bg-[limegreen] absolute top-[-2px] right-0 border-2 border-solid border-white "></span>
      </div>
      <span className=" hidden lg:inline-block font-medium ">
        {user.username}
      </span>
    </li>
  );
};

export default Online;
