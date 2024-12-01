import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const UserContext = createContext();


//Load data from loacal storage
const loadCache = () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
};

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(loadCache());

    const logout = async (message) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/logout", 
                {
                    "refreshToken": data.refreshToken,
                    "userType": data.userType
                }
            );
      
            toast.success(message);
            localStorage.clear();   
            setData(null);
            navigate("/login");
            
        } catch(error) {
            console.log(error);
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(data));
    }, [data]);

    return (
        <UserContext.Provider value={{data, setData, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};

