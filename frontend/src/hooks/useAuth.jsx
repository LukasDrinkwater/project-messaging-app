import { useContext } from "react";
import LoginContext from "../components/context/LoginContext";

const useAuth = () => {
  return useContext(LoginContext);
};

export default useAuth;
