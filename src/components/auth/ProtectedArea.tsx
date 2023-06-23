import { useEffect } from 'react'
import useAuth from "../../hooks/useAuth"
import { useNavigate } from 'react-router-dom';
import { CHECK_USER_LOGGED } from '../../context/AuthContext';
import { useQuery } from '@apollo/client';

function ProtectedArea({ children }: { children: JSX.Element }) {
    const { userInfos } = useAuth();
    const navigate = useNavigate();

    const { loading, refetch } = useQuery(CHECK_USER_LOGGED, {
        onCompleted(data) {
            console.log("DATA", data);
            if (data?.checkUserLogged.msg == "false") {
                console.log("coucou");
                navigate("/auth")
            }
        },
        onError(error){
            console.log("ERROR", error);
        }
    })

    useEffect(() => {
        //rafraichir le checktoken
        refetch();
    }, [userInfos])
    return <>{loading ? "Chargement en cours" : children}</>
}

export default ProtectedArea