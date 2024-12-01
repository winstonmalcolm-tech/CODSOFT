import {useState} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EmployerForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profession, setProfession] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("Technology");
    const [companySize, setCompanySize] = useState("Small");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const industries = [
        "Technology",
        "Finance",
        "Agriculture"
    ];
    const sizes = [
        "Small",
        "Medium",
        "Large"
    ];

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            setLoading(true);
            
            const url = "http://localhost:3000/recruiter/new";
            const response = await axios.post(
                url,
                {
                    firstName,
                    lastName,
                    profession,
                    companyName,
                    companyIndustry: industry,
                    companySize,
                    location,
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success("Account created successfully");
            navigate("/");
            
            setFirstName("");
            setLastName("");
            setProfession("");
            setCompanyName("");
            setIndustry(industries[0]);
            setCompanySize(sizes[0]);
            setLocation("");
            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error(error.response.data.error);
            console.log(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

  return (

    <div className='w-2/3 max-md:w-full p-10 bg-gray-200 rounded-lg'>
        <div className=''>
            <h1 className='text-2xl text-gold text-center mb-3'>Register To Start Hiring</h1>
            <p className='text-black'>
                As a recruiter we want to know more about you. Please fill out the form to become apart of our recruiter family.
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
                <label htmlFor="profession" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Profession</label>
                <input type="text" id='profession' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={profession} onChange={(e) => setProfession(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="companyName" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Company name</label>
                <input type="text" id='companyName' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="industry" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Industry</label>
                <select id="industry" className='flex-1 w-full ps-2 outline-none text-black' onChange={(e) => setIndustry(e.target.value)}>
                    {industries.map((industry, i) => <option value={industry} key={i}>{industry}</option>)}
                </select>
            </div>

            <div className="w-full h-10 bg-blue-600 border-orange border-solid border-2 flex rounded-s-full">
                <label htmlFor="size" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Company Size</label>
                <select id="size" className='flex-1 w-full ps-2 outline-none text-black' onChange={(e) => setCompanySize(e.target.value)}>
                    {sizes.map((size, i) => <option value={size} key={i}>{size}</option>)}
                </select>
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

export default EmployerForm