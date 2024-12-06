import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../contexts/authContext';
import { toast } from 'react-toastify';

const NewJob = () => {

    const jobtypes = [
        "Remote",
        "Onsite",
        "Hybrid"
    ]

    const categories = [
        "Technology",
        "Finance",
        "Agriculture"
    ]

    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState(jobtypes[0]);
    const [salary, setSalary] = useState(0.00);
    const [requirements, setRequirements] = useState("");
    const [qualifications, setQualification] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [loading, setLoading] = useState(false);

    const {data} = useContext(UserContext);
    const navigate = useNavigate();

    const api = useAxios();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const date = new Date();
            const datePosted = new Intl.DateTimeFormat("en-US").format(date);
            const recruiterId = jwtDecode(data.accessToken).id;
        
            const response = await api.post("/job/post", {
                recruiterId,
                jobTitle,
                jobType,
                requirements,
                qualifications,
                location,
                category,
                salary,
                datePosted
            });

            setJobTitle("");
            setLocation("");
            setJobType(jobtypes[0]);
            setSalary(0);
            setRequirements("");
            setQualification("");
            setCategory(categories[0]);

            toast.success(response.data.message);
            navigate(-1);

        } catch(error) {
            toast.error(error.response.data.error)
        } finally {
            setLoading(false);
        }
        
    }

  return (
    <div className="w-full flex flex-col items-center mt-20">
        <h4 onClick={() => navigate(-1)} className='text-gold text-xl cursor-pointer mb-2'>Return</h4>
        <div className='w-2/3 h-fit max-md:w-full p-10 bg-gray-200 rounded-lg'>
            <div className=''>
                
                <h1 className='text-3xl text-gold  mb-3'>New Job</h1>
                
                <div className='border-2 border-gray-800 w-2/3'></div>
            </div>

            <form onSubmit={handleSubmit} className='mt-14 flex flex-col gap-5'>
                <div className="w-full max-md:w-30 h-10 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="jobtitle" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Job title</label>
                    <input type="text" id='jobtitle' placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
                </div>

                
                <div className="w-full h-10 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="location" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Location</label>
                    <input type="text" id="location" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="w-full h-10 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="jobtype" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Job type</label>
                    <select id="jobtype" className='flex-1 w-full ps-2 outline-none text-black' onChange={(e) => setJobType(e.target.value)} value={jobType}>
                        {jobtypes.map((type, i) => <option value={type} key={i}>{type}</option>)}
                    </select>
                </div>

                <div className="w-full h-10 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="category" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Category</label>
                    <select id="category" className='flex-1 w-full ps-2 outline-none text-black' onChange={(e) => setCategory(e.target.value)} value={category}>
                        {categories.map((category, i) => <option value={category} key={i}>{category}</option>)}
                    </select>
                </div>

                <div className="w-full h-10 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="salary" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Salary</label>
                    <input type="number" id="salary" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black' value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </div>

                <div className="w-full h-32 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="requirements" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Requirements</label>
                    <textarea  id="requirements" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black resize-none' value={requirements} onChange={(e) => setRequirements(e.target.value)}></textarea>
                </div>

                <div className="w-full h-32 border-orange border-solid border-2 flex rounded-s-full">
                    <label htmlFor="qualifications" className='flex-2 p-4 w-36 flex items-center text-black bg-gradient-to-r from-gold to-orange rounded-s-full'>Qualifications</label>
                    <textarea  id="qualifications" placeholder='type here...' className='flex-1 w-full ps-2 outline-none text-black resize-none' value={qualifications} onChange={(e) => setQualification(e.target.value)} ></textarea>
                </div>

                <center>
                    <button type="submit" className='w-40 bg-gradient-to-r from-gold to-orange p-4 rounded-xl' disabled={loading ? true : false}>{loading ? "Loading..." : "Post"}</button>
                </center>

            </form>
        </div>
    </div>
  )
}

export default NewJob