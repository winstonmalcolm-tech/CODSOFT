import { useState, useEffect} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobsTemp, setJobsTemp] = useState([]);

  const fetchJobs = async () => {

    try { 
      setLoading(true);

      const response = await axios.get("http://localhost:3000/job/listjobs");

      setJobsTemp(response.data.jobs);
      setJobs(response.data.jobs);

    } catch(error) {
      
      toast.error(error.response.data.error);
      console.log(error);

    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const search = (e) => {

    setJobs(jobs.filter(job => job.job_title.includes(query)));

    if (e.target.value == '') {
      setJobs(jobsTemp);
    }
  }

  if (loading) {
    return <center>Loading</center>
  }

  return (
    <div className="mt-10">
      <div className="w-full flex justify-center">
        <input className="w-3/4 bg-transparent border-2 border-gray-400 outline-none ps-2 focus:border-gold rounded-2xl h-16" type="text"  placeholder={"Search..."} value={query} onChange={(e) =>  setQuery(e.target.value)} onKeyUp={search}/>
      </div>

      <div className="mt-10 flex gap-5 flex-wrap">
        {
          jobs.map((job, i) => <JobCard key={i} job={job}/>)
        }
      </div>

    </div>
  )
}

export default Jobs