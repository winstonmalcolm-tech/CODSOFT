import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxios from '../utils/useAxios';
import { UserContext } from '../contexts/authContext';
import { jwtDecode } from 'jwt-decode';

const Detail = () => {

    const { jobId } = useParams();
    const [job, setJob] = useState({});
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data } = useContext(UserContext);
    const navigate = useNavigate();
    const api = useAxios();
    

    const apply = async () => {

        try {
            if (data == null) {
                return toast.error("Please sign in");
            }

            if (data.userType == "Recruiter") {
                return toast.error("Recruiters can't apply");
            }

            const applicantId = jwtDecode(data.accessToken).id;


            if (applied) {
                return toast.error("Already applied for job");
            }

            const response = await api.post(`job/apply/${jobId}`, {applicantId: applicantId});

            toast.success(response.data.message);
            setApplied(true);

        } catch (error) {

            if (error.response.data) {
                toast.error(error.response.data.error)
            }
            console.log(error);
        }
    }

    const isApplied = async () => {

        try {

            if (data == null) {
                return setApplied(false);
            }

            const applicantId = jwtDecode(data.accessToken).id;

            const response = await api.post("/job/applied", {jobId: jobId, applicantId: applicantId});
            
            setApplied(response.data.applied);

        } catch (error) {
            console.log(error);
        }
    }

    const getJob = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`http://localhost:3000/job/${jobId}`);
            
            setJob(response.data.job);
            
        } catch (error) {
            
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }

    }

   useEffect(() => {
        getJob();
        isApplied();
   }, [])

    if (loading) {
        return <center>Loading</center>
    }
  return (
    <div className='w-full flex flex-col items-center'>
        <div>
            <h1 className='text-gold cursor-pointer' onClick={() => navigate(-1)}>Return</h1>
        </div>

        <div className='mt-10'>
            
            <div>
                <h1 className='text-5xl text-orange'>{job.job_title}</h1> 
                <h4 className='mt-5'>Company: {job.company_name}</h4>

                <h4 className='mt-2'>Category: {job.category}</h4>
                <h4 className='mt-2'>Location: {job.location}</h4>

                <h4 className='mt-2'>Work modality: {job.job_type}</h4>
            </div>

            <div className='mt-10 mb-10'>
                <h1 className='capitalize text-orange text-xl'>Requirements</h1>
                <p className='mb-5'>
                    {job.requirements}
                </p>

                <h1 className='capitalize text-orange text-xl'>Qualifications</h1>
                <p>
                    {job.qualifications}
                </p>
            </div>

            <button className='bg-gradient-to-r from-gold to-orange p-5 rounded-2xl' onClick={apply} disabled={applied ? true : false}>{ applied ? "Already Applied" : "Easy Apply"}</button>

        </div>

    </div>
  )
}

export default Detail