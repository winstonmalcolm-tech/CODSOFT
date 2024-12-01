import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/authContext";

const CandidateProtectedRoutes = () => {
    const {data} = useContext(UserContext);
    return (data && data.userType == "Applicant") ? <Outlet /> : <Navigate to={"/"} />;
}

export default CandidateProtectedRoutes;