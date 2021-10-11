const Friend = ({ user }) => {
  return (
    <li className="flex items-center mb-4 ">
      <img
        className="w-8 h-8 rounded-full object-cover mr-3"
        src={user.profilePicture}
        alt=""
      />
      <span className="sidebarFriendname">{user.username} </span>
    </li>
  );
};

export default Friend;
