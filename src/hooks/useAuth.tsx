import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function useAuth() {
  const context = useContext(AuthContext);
  return {
    ...context,
  };
}

export default useAuth;
