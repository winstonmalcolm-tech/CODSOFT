import {useEffect, useState, useContext} from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../contexts/authContext';
import useAxios from '../utils/useAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DisplayApplicants = () => {

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);

    const api = useAxios();
    const {data} = useContext(UserContext);
    const navigate = useNavigate();

    const recruiterId = jwtDecode(data.accessToken).id;

    const acceptHandler = async (applicant) => {

        try {

            const response = await api.post("/job/accept", {
                firstName: applicant.first_name,
                lastName: applicant.last_name,
                companyName: applicant.company_name,
                email: applicant.email,
                jobTitle: applicant.job_title
            });

            
            setApplicants([applicant])

            toast.success(response.data.message);

        }catch(error) {
            toast.error(error.response.data.error);
            console.log(error)
        }
    }

    const rejectHandler = async (applicant) => {
        try {
            const response = await api.post("/job/reject", {
                firstName: applicant.first_name,
                lastName: applicant.last_name,
                companyName: applicant.company_name,
                email: applicant.email,
                jobTitle: applicant.job_title
            });
            

            setApplicants(applicants.filter(a => a.applicant_id != applicant.applicant_id));
            console.log(applicants);

            toast.success(response.data.message);

        }catch(error) {
            toast.error(error.response.data.error);
            console.log(error)
        }
    }


    const fetchApplicantsList = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/job/jobprospects/${recruiterId}`);

            setApplicants([...response.data.applicants])
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplicantsList()

    }, []);

    if (loading) {
        return (
            <center>
                <h1 className='text-5xl'>Loading</h1>
            </center>
        )
    }

    
    
  return (
    <div className='w-full h-full flex flex-col items-center'>
        <h4 onClick={() => navigate(-1)} className='text-gold text-xl cursor-pointer my-5'>Return</h4>

        <div className='w-3/4'>

            {applicants.map((applicant, i) => (
                <div key={i} className='w-full flex justify-between items-center m-10 border-gray-500 border-2 rounded-xl p-2' >
                    <div>
                        <h1 className='text-xl mb-2'>{applicant.first_name} {applicant.last_name}</h1>
                        <h3 className='text-gray-500'>Applied for the role {applicant.job_title}</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <button>Resume</button>
                        <button className='text-green-500' onClick={() => acceptHandler(applicant)}>Accept</button>
                        <button className='text-red-500' onClick={() => rejectHandler(applicant)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default DisplayApplicants