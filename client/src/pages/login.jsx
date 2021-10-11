import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center ">
      <div className="w-[70%] h-[70%] flex flex-col lg:flex-row ">
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-6xl font-extrabold text-[#1775ee] mb-2 ">
            Asmosocial
          </h3>
          <span className="text-2xl ">
            Connect with friends and the world around you on Asmosocial.
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center ">
          <form
            className="h-[350px] p-5 bg-white rounded-lg flex flex-col justify-between"
            onSubmit={handleClick}
          >
            <input
              type="email"
              placeholder="Email"
              ref={email}
              minLength={5}
              required
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <input
              ref={password}
              type="password"
              minLength={6}
              placeholder="Password"
              required
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <button className="focus:outline-none h-12 rounded-xl border-none bg-[#790973] text-white text-xl font-medium cursor-pointer hover:animate-pulse focus:outline-none ">
              {isFetching ? "loading" : "Log In"}
            </button>
            <span className="text-center text-[#790973] cursor-pointer hover:transition-all duration-500 hover:text-lg my-2  ">
              Forgot Password?
            </span>
            <button className="w-[60%] p-2 self-center focus:outline-none h-12 rounded-xl border-none bg-[#42b72a] text-white lg:text-xl font-medium cursor-pointer hover:animate-pulse focus:outline-none ">
              {isFetching ? "loading" : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
