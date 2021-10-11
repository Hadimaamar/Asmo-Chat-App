import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center ">
      <div className="w-[70%] h-[70%] flex flex-col lg:flex-row ">
        <div className="flex flex-1 flex-col justify-center ">
          <h3 className="text-6xl font-extrabold text-[#1775ee] mb-2 ">
            Asmosocial
          </h3>
          <span className="text-2xl ">
            Connect with friends and the world around you on Asmosocial.
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center ">
          <form
            className="h-[400px] p-5 bg-white rounded-lg flex flex-col justify-between  flex-grow "
            onSubmit={handleClick}
          >
            <input
              placeholder="Username"
              minLength="3"
              required
              ref={username}
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <input
              placeholder="Email"
              minLength="6"
              type="email"
              required
              ref={email}
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              required
              ref={password}
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <input
              placeholder="Password Again"
              type="password"
              minLength="6"
              required
              ref={passwordAgain}
              className="h-14 rounded-xl border border-solid border-[gray] text-lg pl-5 "
            />
            <button
              type="submit"
              className="focus:outline-none h-12 rounded-xl border-none bg-[#790973] text-white text-xl font-medium cursor-pointer hover:animate-pulse "
            >
              Sign Up
            </button>
            <button className="w-[50%] self-center focus:outline-none h-12 rounded-xl border-none bg-[#42b72a] text-white md:text-xl font-medium cursor-pointer hover:animate-pulse ">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
