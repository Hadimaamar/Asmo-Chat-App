import axios from "axios";

export const loginCall = async (userCred, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post("auth/login", userCred);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
