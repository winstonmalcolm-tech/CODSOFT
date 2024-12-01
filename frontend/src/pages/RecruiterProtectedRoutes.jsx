import {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/authContext';

const RecruiterProtectedRoutes = () => {
    const {data} = useContext(UserContext);

    return (data && data.userType == "Recruiter") ? <Outlet /> : <Navigate to={"/"} /> 
}

export default RecruiterProtectedRoutes;