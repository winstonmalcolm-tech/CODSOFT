import { useEffect, useState, useContext }from 'react';
import useAxios from '../utils/useAxios';
import { UserContext } from '../contexts/authContext';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


const CandidateDashboard = () => {
  const {data, logout} = useContext(UserContext);
  const applicantId = jwtDecode(data.accessToken).id;
  const api = useAxios();

  const [firstName, setFirstName] = useState();
  const [resume, setResume] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [pendingResume, setPendingResume] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitResumeHandler = async () => {
    try {

      if (!resume) {
        toast.error("Select a file first");
        return;
      }

      const formData = new FormData();
      formData.append("resume", pendingResume);
      formData.append("applicantId", applicantId);


      const response = await api.post(`candidate/resumeupload/${applicantId}`, formData, {headers: {"Content-Type": 'Multipart/Form-data'}});
      setFileSelected(false);
      setPendingResume(null);
      toast.success(response.data.message);
    }catch(error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }


  const getApplicant = async () => {
    try {
      setLoading(true);
      const response = await api.get(`candidate/${applicantId}`);

      await fetchJobs();

      console.log(response.data)

      setFirstName(response.data.applicant.first_name);
      setResume(response.data.applicant.resume_url);
    } catch(error) {
      console.log(error)
      if (error.response.status == 403) {
        logout(error.response.data.error);
      } else {
        toast.error(error.response.data.error);
      }

    } finally {
      setLoading(false);
    }
  }

  const fetchJobs = async () => {

    try {
      setLoading(true);
      
      const response = await api.get(`job/jobsappliedfor/${applicantId}`);

      setJobs(response.data.jobs);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const fileSelectHandler = (e) => {
    setPendingResume(e.target.files[0]);
    setFileSelected(true);
  }
  
  useEffect(() => {
    getApplicant();
  
  }, []);

  if (loading) {
    return <center>Loading</center>
  }

  return (
    <div className='h-full w-full mt-20'>

      <div className=' flex justify-between'>
        <div className='flex-1 flex items-center flex-col gap-5'>
            <h1 className='text-gold text-4xl'>Hi {firstName}</h1>
        </div>

        <div className='flex-1 flex items-center gap-2 flex-col'>
          {resume ? <h1 className='text-green-500'>Resume Stored</h1> : <h1 className='text-red-500'>Please upload a resume*</h1>}
          <div className='flex justify-center items-center gap-5'>
            {fileSelected ? <h1 className='text-green-500'>File selected</h1> : <h1 className='text-red-500'>No file selected</h1> }
            <label htmlFor="resume" className='bg-gradient-to-r from-gold to-orange p-5 rounded-xl cursor-pointer'>Choose file</label>
            <input type="file" id='resume' hidden={true} onChange={fileSelectHandler}/>
            <button onClick={submitResumeHandler} className='p-5 border-none'>Submit</button>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center mt-20'>

      <h1 className='text-4xl mb-10 text-orange'>Applications Sent</h1>
        <div className='h-96 w-3/4 flex flex-col gap-5'>
          
          {
            jobs.map((job, i) => {
              return (
                <div key={i} className='border-2 border-gray-500 rounded-xl p-5 flex justify-between items-center'>
                 <div>
                  <h1>{job.job_title}</h1>
                  <h4>{job.company_name}</h4>
                 </div>
                
                <h1>Pending</h1>
                </div>
              )
            })
          }

        </div>

      </div>
      
    </div>
  )
}

export default CandidateDashboard