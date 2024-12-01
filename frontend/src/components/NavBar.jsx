import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState, useContext } from "react";
import { Link, NavLink} from "react-router-dom";
import { UserContext } from "../contexts/authContext";


const NavBar = () => {
    
    const {data, logout} = useContext(UserContext);
    const [open, setOpen] = useState(null);
    const expandNavbarHandler = () => setOpen(!open);


  return (
    <nav className='flex p-5 flex-row w-full'>
        <div className="flex-1 flex justify-start items-center text-2xl">
            <NavLink to={"/"}><h1>Career <span className='text-orange'>expose</span></h1></NavLink>
        </div>

        <div className="flex-1 flex max-md:hidden justify-center items-center">
            <ul className='flex justify-evenly w-full'>
                <NavLink to={"/"} className={({isActive}) => isActive ? "text-gold": "text-white"}>Home</NavLink>
                <NavLink to={"/jobs"} className={({isActive}) => isActive ? "text-gold": "text-white"}>Jobs</NavLink>
            </ul>
        </div>

        {
            !data ? (
            <div className="flex-1 flex max-md:hidden  justify-end items-center gap-10">
                <Link to="/login" className=' w-20 h-10 rounded-lg text-lg bg-gradient-to-r from-[#d6b64f] to-[#d47f46] flex justify-center items-center'>
                    Login
                </Link>

                <Link to="/register" className=''>
                    Register
                </Link>
            </div>
            ) :

            <div className="flex-1 flex max-md:hidden  justify-end items-center gap-10">
                <Link to={data.userType == "Applicant" ? "/candidate" : "/recruiter"} className=' w-36 h-10 rounded-lg text-lg bg-gradient-to-r from-[#d6b64f] to-[#d47f46] flex justify-center items-center'>
                    Dashboard
                </Link>
                <button onClick={() => logout("Logout successfully")} className=' w-36 h-10 rounded-lg text-lg flex justify-center items-center cursor-pointer'>
                    Logout
                </button>
            </div>
        }


        <div className='flex-1 hidden max-md:flex justify-end items-center'>
            { open ? <IoMdClose size={40} onClick={expandNavbarHandler}/> : <RxHamburgerMenu size={40} onClick={expandNavbarHandler}/>}
        </div>

        <div className={`absolute top-20 left-0 right-0 animate-fade ${!open ? "hidden" : "flex"} flex-col items-center bg-black h-screen w-full`}>
            <div className="flex-1 flex flex-col items-center w-full gap-5">
                <ul className='flex w-full flex-col gap-5 items-center'>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/jobs"}>Jobs</NavLink>
                </ul>

                
                {
                    (!data) ? 
                    (   
                        <>
                            <Link to="/login" className=' w-20 h-10 rounded-lg text-lg bg-gradient-to-r from-[#d6b64f] to-[#d47f46] flex justify-center items-center'>
                                Login
                            </Link>

                            <Link to="/register" className=''>
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex-1 flex max-md:hidden  justify-end items-center gap-10">
                            <Link to={data.userType == "Applicant" ? "/candidate" : "/recruiter"} className=' w-32 h-10 rounded-lg text-lg bg-gradient-to-r from-[#d6b64f] to-[#d47f46] flex justify-center items-center'>
                                Dashboard
                            </Link>
                            <button onClick={logout} className=' w-36 h-10 rounded-lg text-lg flex justify-center items-center cursor-pointer'>
                                Logout
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default NavBar