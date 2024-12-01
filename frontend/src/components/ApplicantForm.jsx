import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicantForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState(null);
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setLoading(true);
            const url = "http://localhost:3000/candidate/new";
            const response = await axios.post(
                url,
                {
                    firstName: firstName,
                    lastName: lastName,
                    location: location,
                    dateOfBirth: dob,
                    email: email,
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );


            toast.success("Account created");
            navigate("/login");

            setFirstName("");
            setLastName("");
            setDob("");
            setLocation("");
            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='w-2/3 max-md:w-full p-10 bg-gray-200 rounded-lg'>
        <div className=''>
            <h1 className='text-2xl text-gold text-center mb-3'>Register To Start Your Job Search</h1>
            <p className='text-black'>
                Sign up to allow recruiters to see your applications
            </p>
        </div>

        <form onSubmit={handleSubmit} className='mt-14 flex flex-col gap-5'>
            <div className="w-full max-md:w-30 h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="fname" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>First Name</label>
                <input type="text" id='fname' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="lname" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Last Name</label>
                <input type="text" id='lname' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="dob" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Date of Birth</label>
                <input type="date" id='dob' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' onChange={(e) => setDob(e.target.value)}/>
            </div>

            
            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="location" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Location</label>
                <input type="text" id="location" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="email" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Email</label>
                <input type="text" id="email" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="password" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Password</label>
                <input type="text" id="password" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <center>
                <button type="submit" className='w-40 bg-gradient-to-r from-gold to-orange p-4 rounded-xl' disabled={loading ? true : false}>{loading ? "Loading..." : "Sign up"}</button>
            </center>

        </form>
    </div>
  )
}

export default ApplicantForm