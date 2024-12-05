import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { Home, Register, Jobs, Login, ProtectRoute, CandidateDashboard, RecruiterDashboard, CandidateProtectedRoutes, RecruiterProtectedRoutes, NewJob, EditJob, DisplayApplicants, Detail } from "./pages";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='text-white'>
     <NavBar />
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/detail/:jobId' element={<Detail />} />
        <Route element={<ProtectRoute />}>

            <Route element={<CandidateProtectedRoutes />} >
              <Route path="/candidate" element={<CandidateDashboard />} />
            </Route>
            
            <Route element={<RecruiterProtectedRoutes />}>
              <Route path="/recruiter" element={<RecruiterDashboard />} />
              <Route path='/recruiter/newjob' element={<NewJob />} />
              <Route path='/recruiter/editjob/:jobid' element={<EditJob />}/>
              <Route path='/recruiter/displayapplicants' element={<DisplayApplicants />}/>
            </Route>
            
        </Route>
     </Routes>
     <ToastContainer />
    </div>
  )
}

export default App
