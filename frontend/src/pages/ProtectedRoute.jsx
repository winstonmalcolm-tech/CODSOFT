import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/authContext";
import { useContext } from "react";

 const ProtectedRoute = () => {
    const {data} = useContext(UserContext);

    return data ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
