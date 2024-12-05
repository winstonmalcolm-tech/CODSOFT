import { Link } from "react-router-dom";
import Work from "../assets/work.jpg";
import JobCard from "../components/JobCard";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/authContext";


const Home = () => {
    
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const {data} = useContext(UserContext);
    const getJobs = async () => {
        try {

            const response = await axios.get(`http://localhost:3000/job/listfeaturedjobs`);
            
            setFeaturedJobs(response.data.jobs);
            
        } catch (error) {
            toast.error(error.response.data.error);
        }

    }

    useEffect(() => {
        getJobs();
    }, []);

  return (
    <>
        <div className="flex max-md:flex-col w-full h-dvh items-center px-10 max-md:px-0">

            <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-8">
                <h1 className="flex gap-5 flex-col justify-center items-center text-6xl max-md:text-3xl text-gold capitalize"><span>Find a job that</span> <span>suits you</span></h1>
                <button className="border-solid border-2 border-gold p-5 w-6/12 rounded-full text-gold hover:text-white hover:bg-gold transition duration-300">Get Started</button>
            </div>

            <div className="flex-1 w-full h-full flex items-center justify-center">
                <img src={Work} alt="" className="w-full  flex justify-center items-center "/>
            </div>


            <div className="h-80 w-80 bg-gold absolute rounded-full blur-xl top-[-20%] left-[-15%] opacity-25 -z-10"></div>
            <div className="h-40 w-40 bg-gold absolute rounded-full blur-xl bottom-[-20%] right-0 opacity-25 -z-10"></div>
        </div>

        <div className="mt-20">
            <div className="w-full flex justify-center items-center mb-10">
                <h1 className="text-gold capitalize text-5xl max-md:text-3xl">Popular Jobs</h1>
            </div>

            <div className="flex max-md:flex-col gap-5 items-center justify-center flex-wrap">
                {
                    featuredJobs.map((job, i) => <JobCard key={i} job={job}/>)
                }
            </div>
        </div>

        <div className="mt-20">
            
            { !data &&
                <div className="w-full flex mb-10">
                    <h1 className="text-gold capitalize text-5xl max-md:text-3xl">Get Started</h1>
                </div>
            }

            <div className="w-full h-fit flex max-md:flex-col justify-evenly items-center gap-10">
                {
                    !data ? 
                    (
                        <>
                            <div className="flex-1 h-full flex flex-col justify-center items-center">
                                <img src={Work} alt="img" className="object-contain"/>
                                <Link to="/register" className="mt-10 px-10 py-4 bg-gradient-to-r from-gold to-orange rounded-3xl">Apply as Employer</Link>
                            </div>

                            <div className="flex-1 h-full flex flex-col justify-center items-center">
                                <img src={Work} alt="img" className="object-contain"/>                    
                                <Link to={"/register"} className="mt-10 px-10 py-4 bg-gradient-to-r from-gold to-orange rounded-3xl">Apply as Job Seeker</Link>             
                            </div>
                        </>
                    ) :

                    <center className="mt-20">
                        <Link to={(data.userType == "Recruiter") ? "/recruiter" : "/candidate"} className="mt-10 px-10 py-4 bg-gradient-to-r from-gold to-orange rounded-3xl">Go to Dashboard</Link>
                    </center>
                }
                
            </div>
        </div>
    </>
  )
}

export default Home