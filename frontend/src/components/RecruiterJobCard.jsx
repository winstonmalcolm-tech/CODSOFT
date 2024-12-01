import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecruiterJobCard = ({job}) => {
    const navigate = useNavigate();

  return (
    <div className="flex h-64 w-[500px] max-sm:w-full bg-gradient-to-r from-orange to-gold rounded-lg cursor-pointer" onClick={() => navigate(`/recruiter/editjob/${job.job_id}`)}>
        <div className="flex-1 w-full h-full flex justify-center items-center pl-2">
            <h1 className="text-3xl">{job.job_title}</h1>
        </div>

        <div className="flex-1 flex flex-col justify-evenly items-center">
            <h3 className="py-2 px-8 bg-white text-orange capitalize rounded-2xl">Technology</h3>
            <h5 className="capitalize">{job.category}</h5>
            <h6 className="text-gray-600 capitalize">6 days ago</h6>
        </div>
    </div>
  )
}

export default RecruiterJobCard