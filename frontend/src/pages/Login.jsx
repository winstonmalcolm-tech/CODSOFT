import React, { useState, useContext } from 'react'
import { BiHide } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setData} = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const url = "http://localhost:3000/auth/login";

            const response = await axios.post(
                url, 
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            //"userID": response.data.result.user_type == "Recruiter" ? response.data.result.recruiter_id : response.data.result.applicant_id,
            const data = {
                "userType": response.data.result.user_type,
                "accessToken": response.data.result.accessToken,
                "refreshToken": response.data.result.refreshToken
            }

            setData(data);

            toast.success("Login successful");
            setEmail("");
            setPassword("");
            data.userType == "Recruiter" ? navigate("/recruiter") : navigate("/candidate");

        } catch(error) {
            toast.error(error.response.data.error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }   

    return (
        <div className="w-full flex justify-center">
            <div className='w-2/3 max-md:w-full p-10 bg-gray-200 rounded-lg mt-10'>

                <div className=''>
                    <h1 className='text-2xl text-gold text-center mb-3'>Login</h1>
                    <p className='text-black'>
                        Welcome Back!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='mt-14 flex flex-col gap-5'>

                    <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                        <label htmlFor="email" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Email</label>
                        <input type="text" id="email" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="w-full h-10 border-orange border-solid border-2 flex rounded-s-full pr-1 bg-white">
                        <label htmlFor="password" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Password</label>
                        <input type={showPassword ? "text" : "password"} id="password" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className='h-full flex items-center'>
                        {showPassword ? <BiHide color='black' onClick={() => setShowPassword(!showPassword)} className='flex items-center justify-center h-full' /> : <FiEye color='black' onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'/>}
                        </div>
                    </div>

                    <center>
                        <button className='w-40 bg-gradient-to-r from-gold to-orange p-4 rounded-xl' disabled={loading ? true : false}>{loading ? "Loading..." : "Login"}</button>
                    </center>

                </form>
            </div>
        </div>
    )
}

export default Login