
const JobCard = () => {
  return (
    <div className="flex h-64 w-[500px] max-sm:w-full bg-gradient-to-r from-orange to-gold rounded-lg cursor-pointer hover:scale-105 transition duration-300" >
        <div className="flex-1 w-full h-full flex justify-center items-center">
            <h1 className="text-3xl">Truist Funds</h1>
        </div>

        <div className="flex-1 flex flex-col justify-evenly items-center">
            <h3 className="py-2 px-8 bg-white text-orange capitalize rounded-2xl">Technology</h3>
            <h5 className="capitalize">Cyber Security Analyst</h5>
            <h6 className="text-gray-600 capitalize">6 days ago</h6>
        </div>
    </div>
  )
}

export default JobCard