import React, { useEffect, useReducer, useState, useContext } from 'react'
import useAxios from '../utils/useAxios';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/authContext';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { jwtDecode } from 'jwt-decode';
import RecruiterJobCard from '../components/RecruiterJobCard'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  profession: "",
  companyName: "",
  companyIndustry: "",
  companySize: "",
  companyLocation: "",
  email: "",
};

const userReducer = (state, action) => {

  switch(action.types) {
    case "INITIAL_FETCH":
      return action.payload;

    default: return state;
  }
}

const RecruiterDashboard = () => {
  
  const api = useAxios();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {data, logout} = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [graphData, setGraphData] = useState([]);



  const fetchRecruiterJobs = async () => {

    try {
      const recruiterId = jwtDecode(data.accessToken).id;

      const response = await api.get(`job/recruiterjobs/${recruiterId}`);

      setJobs([...response.data.jobs]);

    } catch(error) {
      console.log(error);
    }
  }

  const fetchJobProspects = async () => {

    try {
      const recruiterId = jwtDecode(data.accessToken).id;

      const response = await api.get(`/job/prospectscount/${recruiterId}`);

      setGraphData([...response.data.stats]);

    } catch (error) {
      console.log(error);
    }

  }

  const fetchUserData = async () => {

    try {
      setLoading(true);
      const response = await api.post("/recruiter");

      const data = {
        firstName: response.data.recruiter.first_name,
        lastName: response.data.recruiter.last_name,
        profession: response.data.recruiter.profession,
        companyName: response.data.recruiter.company_name,
        companyIndustry: response.data.recruiter.company_industry,
        companySize: response.data.recruiter.company_size,
        companyLocation: response.data.recruiter.location,
        email: response.data.recruiter.email_address,
      }

      dispatch({types: "INITIAL_FETCH", payload: data});

      await fetchRecruiterJobs();
      await fetchJobProspects();

    } catch (error) {
      if (error.response.status == 403) {
        logout(error.response.data.error);
      }

    } finally {
      setLoading(false);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  

  useEffect(() => {
    fetchUserData();
  }, []);



  if (loading) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div className='w-full h-full flex flex-col gap-10 pt-10'>

      <h1 className='capitalize text-5xl text-orange'>Welcome {state.firstName}, Today's Stats</h1>
      
        <div className='h-96 w-full flex items-center flex-col mt-10'>
          {
            graphData.length < 1 
              ? <h1>Nothing to display</h1> 
              
              : (
                <>
                  <ResponsiveContainer width={"80%"}>
                    <BarChart  data={graphData} dataKey={"job_title"} >
                      <XAxis dataKey={"job_title"} />
                      <YAxis dataKey={"number_of_applicants"} />
                      <Bar dataKey="number_of_applicants" fill="#ad8056" />
                    </BarChart>
                  </ResponsiveContainer>
                  <Link to={"/recruiter/displayapplicants"} className='py-5 w-40 text-center border-2 bg-transparent hover:bg-gold transition duration-300 hover:border-none border-gray-300 rounded-3xl mt-5'>View</Link>
                </>
              )
              
          }
          
          
        </div>

      <div className='w-4/5 m-auto h-80'>
        <div className="mt-10 h-full">
          <Slider {...settings}>
            {jobs.map((job, i) => <RecruiterJobCard job={job} key={i}/>)}
          </Slider>
        </div>
      </div>
      <Link to={"/recruiter/newjob"} className=' w-72 text-center text-xl p-4 rounded-2xl bg-gradient-to-r from-gold to-orange m-auto'>Post Job +</Link>

      
    </div>
  )
}

export default RecruiterDashboard