import { useState }from 'react'
import EmployerForm from '../components/EmployerForm';
import ApplicantForm from '../components/ApplicantForm';

const Register = () => {
  const [applicant, setApplicant] = useState(true);

  return (
    <div className='flex w-full flex-col items-center mt-20'>
        <div className='flex w-full justify-center mb-10'>
          <button className={`p-4 transition-all duration-300 ${applicant ? "bg-gradient-to-r from-gold to-orange" : "bg-gray-400"}`} onClick={() => setApplicant(!applicant)}>As Job seeker</button>
          <button className={`p-4 transition-all duration-300 ${!applicant ? "bg-gradient-to-r from-gold to-orange" : "bg-gray-400"}`} onClick={() => setApplicant(!applicant)}>As Employer</button>
        </div>
        {applicant ? <ApplicantForm /> : <EmployerForm />}
    </div>
  )
}

export default Register