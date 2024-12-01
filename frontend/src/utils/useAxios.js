import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../contexts/authContext";
import dayjs from "dayjs";

const useAxios = () => {
    const {data, setData, logout} = useContext(UserContext);

    const token = `Bearer ${data.accessToken}`;

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {Authorization: token}
    });

    axiosInstance.interceptors.request.use(async (req) => {

        const decodedToken = jwtDecode(data.accessToken);

        //Check if token expired by comparing the expiration date from the token to current date using dayjs package
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
        
        //If token is not expired continue with the request
        if (!isExpired) return req;

        const response = await axios.post("http://localhost:3000/auth/refreshtoken", {refreshToken: data.refreshToken});
        

        if (response.status == 403) {
            return req;
        }

        setData({...data, accessToken: response.data.accessToken});

        req.headers.Authorization = `Bearer ${response.data.accessToken}`
        return req;
    });

    axiosInstance.interceptors.response.use(async (res) => {

        if (res.status == 403) {
            logout(response.data.error);
            return;
        }

        return res;
    });

    return axiosInstance;
}



export default useAxios;