import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CHECK_USER_LOGGED } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

function ProtectedArea({ children }: { children: JSX.Element }) {
  const { userInfos } = useAuth();
  const navigate = useNavigate();

  const { loading, refetch } = useQuery(CHECK_USER_LOGGED, {
    onCompleted(data) {
      if (data?.checkUserLogged.msg === false) {
        navigate("/auth");
      }
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  useEffect(() => {
    //rafraichir le checktoken
    refetch();
  }, [userInfos]);
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <div className="w-1/6 m-auto align-middle">
            <img src="/assets/images/loading.gif" alt="loading" />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default ProtectedArea;
