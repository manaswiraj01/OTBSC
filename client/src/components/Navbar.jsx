import { Link, useNavigate } from "react-router-dom"
import { FiSun } from "react-icons/fi";
import { LuSunMoon } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { FiInfo } from "react-icons/fi";


const Navbar = ({ toggleTheme, setToggleTheme }) => {

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const user = useSelector((store) => store.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/api/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            toast.success("Logout successfully");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        // <div className="navbar bg-base-100 shadow-sm flex justify-between items-center">
        //     <div className="flex-/8 mx-8">
        //         <img src="https://obms-tourist.rajasthan.gov.in/_next/static/media/image.891ad7d6.png" className="w-[270px] "></img>
        //     </div>
        //     <div className="flex-4/6">
        //         <div className="flex justify-evenly items-center">
        //             <ul className="flex justify-evenly w-[70%]">
        //                 <li><Link to="/">Home</Link></li>
        //                 <li><Link to="/api/aboutus">About us</Link></li>
        //                 <li><Link to="/api/explore">Explore</Link></li>
        //                 <li><Link to="/api/help">Help/FAQ</Link></li>
        //             </ul>

        //             <div className="mx-4">
        //                 {toggleTheme === 'dark' ? <FiSun className="size-[23px]" onClick={() => setToggleTheme('light')} />
        //                     : <LuSunMoon className="size-[23px]" onClick={() => setToggleTheme('dark')} />}
        //             </div>
        //             <div className="">
        //                 <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        //             </div>
        //         </div>
        //     </div>
        //     {!user ? (
        //         <div className="flex justify-center mr-8">
        //             <button onClick={() => navigate('/api/login')} className="btn btn-secondary">Login</button>
        //         </div>
        //     ) : (<div className="flex justify-center mr-8">
        //         <div className="">
        //             <div className="dropdown dropdown-end">
        //                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        //                     <div className="w-10 rounded-full">
        //                         <img
        //                             alt="user image"
        //                             src={user.photoUrl} className="w-full h-full object-cover" />
        //                     </div>
        //                 </div>
        //                 <ul
        //                     tabIndex={0}
        //                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        //                     <li>
        //                         <Link to='/api/profile/edit' className="justify-between">
        //                             Profile
        //                             <span className="badge">New</span>
        //                         </Link>
        //                     </li>
        //                     <li><a>Settings</a></li>
        //                     <li><a onClick={handleLogout}>Logout</a></li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>)}
        // </div>

        <div className={`navbar fixed shadow-sm top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-base-200 shadow-md' : 'bg-transparent'}`}>
            <div className="sm:w-1/2 md:w-1/3 mx-4 lg:mx-10 xl:mx-20">
                <img onClick={() => navigate('/')} className="w-[250px] cursor-pointer" src="https://obms-tourist.rajasthan.gov.in/_next/static/media/image.891ad7d6.png" alt="logo" />
            </div>

            {/* Mobile hamburger */}
            <div className="flex-1 flex justify-end lg:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
                    <RxHamburgerMenu className="size-8" />
                </button>
            </div>

            <div className="hidden lg:flex lg:mx-8 justify-end items-center w-2/3 xl:mx-12 ">
                <div className="items-center">
                    <ul className="flex justify-center lg:gap-8 xl:gap-12">
                        <li className="text-lg"><Link to="/">Home</Link></li>
                        <li className="text-lg"><Link to="/api/explore">Explore</Link></li>
                        <li className="text-lg"><Link to="/api/aboutus">About</Link></li>
                        <li className="text-lg"><Link to="/api/help">Help</Link></li>
                        <li className="text-lg"><Link to="/api/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="lg:mx-8 xl:mx-12">
                    {toggleTheme === 'dark' ? <FiSun className="size-[23px] cursor-pointer" onClick={() => setToggleTheme('light')} />
                        : <LuSunMoon className="size-[23px] cursor-pointer" onClick={() => setToggleTheme('dark')} />}
                </div>
                <div className="flex justify-center items-center gap-2">
                    <CiSearch className="size-[25px]" />
                    <span className="text-lg">Search</span>
                </div>
                <div className="lg:mx-8 xl:mx-12">
                    {!user ?
                        <div className="">
                            <button onClick={() => navigate('/api/login')} className="btn btn-secondary cursor-pointer">Login</button>
                        </div> :
                        <div className="">
                            <div className="flex justify-center">
                                <div className="">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    alt="user image"
                                                    src={user.photoUrl} className="w-full h-full object-cover cursor-pointer" />
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                            <li>
                                                <Link to='/api/profile/edit' className="justify-between">
                                                    Profile
                                                    <span className="badge">New</span>
                                                </Link>
                                            </li>
                                            <li><a>Settings</a></li>
                                            <li><a onClick={handleLogout}>Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Mobile Menu dropdown */}
            {/* {menuOpen && (
                <div className="lg:hidden absolute top-16 left-[50%] w-full h-80 bg-base-100 shadow-md z-20 p-4">
                    <div className="">
                        <div>
                            <ul className="flex flex-col">
                                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                <li><Link to="/api/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                                <li><Link to="/api/explore" onClick={() => setMenuOpen(false)}>Explore</Link></li>
                                <li><Link to="/api/help" onClick={() => setMenuOpen(false)}>Help/FAQ</Link></li>
                                <li><Link to="/api/faq" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="flex">
                            {toggleTheme === 'dark' ? (
                                <FiSun className="size-[23px]" onClick={() => setToggleTheme('light')} />
                            ) : (
                                <LuSunMoon className="size-[23px]" onClick={() => setToggleTheme('dark')} />
                            )}
                            <span>Theme</span>
                        </div>
                        <div>

                            {!user ? (
                                <button onClick={() => navigate('/api/login')} className="btn btn-secondary">
                                    Login
                                </button>
                            ) : (
                                <div className="dropdown dropdown-bottom">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user.photoUrl} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to="/api/profile/edit">Profile</Link></li>
                                        <li><a>Settings</a></li>
                                        <li><a onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )} */}

            {menuOpen && (
                <div className="lg:hidden absolute top-17 w-[40%] left-[60%] h-screen bg-base-100 shadow-md z-20 p-4">
                    <div className="flex flex-col items-center h-full gap-10 text-justify">

                        {/* Navigation Links */}
                        <ul className="flex flex-col gap-8 text-lg">
                            <li className="flex gap-2 items-center"><FaHome className="size-[25px]" />
                                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li className="flex gap-2 items-center">
                                <FiInfo className="size-[25px]" />
                                <Link to="/api/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                            <li className="flex gap-2 items-center">
                                <MdOutlineExplore className="size-[25px]" />
                                <Link to="/api/explore" onClick={() => setMenuOpen(false)}>Explore</Link></li>
                            <li className="flex gap-2 items-center">
                                <IoChatbubbleEllipsesOutline className="size-[25px]" />
                                <Link to="/api/help" onClick={() => setMenuOpen(false)}>Help/FAQ</Link></li>
                            <li className="flex gap-2 items-center">
                                <BsQuestionCircle className="size-[25px]" />
                                <Link to="/api/faq" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
                            <li className="flex gap-2 items-center">{toggleTheme === 'dark' ? (
                                <FiSun className="size-[23px]" onClick={() => setToggleTheme('light')} />
                            ) : (
                                <LuSunMoon className="size-[23px]" onClick={() => setToggleTheme('dark')} />
                            )}
                                <span className="text-lg">Theme</span></li>

                            <div className="">
                                {!user ? (
                                    <button onClick={() => navigate('/api/login')} className="btn btn-secondary">
                                        Login
                                    </button>
                                ) : (
                                    <div className="dropdown dropdown-bottom flex text-lg text-justify gap-2">
                                        <div className="w-8">
                                            <img src={user.photoUrl} alt="user profile image" className="w-full h-full rounded-full object-cover"/>
                                        </div>
                                        <li><Link to="/api/profile/edit">Profile</Link></li>
                                    </div>
                                )}
                            </div>
                            {user && <div>
                                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                            </div>}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Navbar