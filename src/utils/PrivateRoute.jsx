import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import checkTokenValidity from "./checkTokenValidity";


const useAuth = (redirectTo = '/') => {
    const navigate = useNavigate()

    useEffect(()=> {
        const authenticateUser = async() => {
            const isUserAuthenticated = await checkTokenValidity();
            if (!isUserAuthenticated) {
                navigate(redirectTo); // Redirect to the specified path if not authenticated
            }
        };
        authenticateUser()

    }, [navigate, redirectTo])
}

const PrivateRoute = ({path, element}) => {
    useAuth('/');
    return <>{element}</>;
};

export default PrivateRoute;