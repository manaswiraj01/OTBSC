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
import { useLocation } from "react-router-dom";


const Navbar = ({ toggleTheme, setToggleTheme }) => {

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const user = useSelector((store) => store.user);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
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


    const isActive = (path) => location.pathname === path;


    return (
        <div
            className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out py-4 md:py-6 bg-base-100 border-b-2 border-pink-500 ${scrolled ? 'shadow-md' : ''}`}
        >
            <div className="max-w-7xl w-full mx-auto flex items-center px-2 sm:px-4 md:px-8">
                <div className="flex-shrink-0 mr-6">
                    <img onClick={() => navigate('/')} className="w-[120px] md:w-[180px] lg:w-[220px] cursor-pointer" src="https://obms-tourist.rajasthan.gov.in/_next/static/media/image.891ad7d6.png" alt="logo" />
                </div>
                {/* Navigation Links and Actions - take full remaining width, right align ul */}
                <div className="flex-1 hidden lg:flex justify-end items-center gap-6 md:gap-10 lg:gap-12">
                    <ul className="flex gap-6 md:gap-10 lg:gap-12 items-center justify-end">
                        <li className="text-lg">
                            <Link to="/" className={isActive("/") ? "border-b-2 border-pink-500 font-semibold" : `${toggleTheme === 'dark' ? 'text-white' : ''}`}>Home</Link>
                        </li>
                        <li className="text-lg">
                            <Link to="/about" className={isActive("/about") ? "border-b-2 border-pink-500 font-semibold" : `${toggleTheme === 'dark' ? 'text-white' : ''}`}>About</Link>
                        </li>
                        <li className="text-lg">
                            <Link to="/explore" className={isActive("/explore") ? "border-b-2 border-pink-500 font-semibold" : `${toggleTheme === 'dark' ? 'text-white' : ''}`}>Explore</Link>
                        </li>
                        <li className="text-lg">
                            <Link to="/help" className={isActive("/help") ? "border-b-2 border-pink-500 font-semibold" : `${toggleTheme === 'dark' ? 'text-white' : ''}`}>Help</Link>
                        </li>
                        <li className="text-lg">
                            <Link to="/faqs" className={isActive("/faqs") ? "border-b-2 border-pink-500 font-semibold" : `${toggleTheme === 'dark' ? 'text-white' : ''}`}>FAQ</Link>
                        </li>
                        <li>
                            {toggleTheme === 'dark' ? <FiSun className="size-[23px] cursor-pointer text-white" onClick={() => setToggleTheme('light')} />
                                : <LuSunMoon className="size-[23px] cursor-pointer text-black" onClick={() => setToggleTheme('dark')} />}
                        </li>
                        <li>
                            {!user ?
                                <button onClick={() => navigate('/login')} className="btn btn-secondary cursor-pointer">Login</button>
                                :
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="user image"
                                                src={user?.photoUrl} className="w-full h-full object-cover cursor-pointer" />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className={`menu menu-sm dropdown-content ${toggleTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-base-100'} rounded-box z-1 mt-3 w-52 p-2 shadow`}>
                                        <li>
                                            <Link to='/profile/edit' className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </Link>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><a onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            {/* Hamburger only for small screens */}
            <div className="lg:hidden absolute right-4 top-4">
                <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
                    <RxHamburgerMenu className={`size-8 ${toggleTheme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
            </div>
            {menuOpen && (
                <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black/40 z-40`} onClick={() => setMenuOpen(false)}>
                    <div className={`absolute top-0 right-0 w-72 max-w-[90vw] h-full ${toggleTheme === 'dark' ? 'bg-gray-900' : 'bg-base-100'} shadow-md z-50 p-6 flex flex-col items-center`} onClick={e => e.stopPropagation()}>
                        <ul className="flex flex-col gap-6 text-lg w-full mt-16">
                            <li className="flex gap-3 items-center"><FaHome className="size-[22px]" />
                                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li className="flex gap-3 items-center">
                                <FiInfo className="size-[22px]" />
                                <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                            <li className="flex gap-3 items-center">
                                <MdOutlineExplore className="size-[22px]" />
                                <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link></li>
                            <li className="flex gap-3 items-center">
                                <IoChatbubbleEllipsesOutline className="size-[22px]" />
                                <Link to="/help" onClick={() => setMenuOpen(false)}>Help/FAQ</Link></li>
                            <li className="flex gap-3 items-center">
                                <BsQuestionCircle className="size-[22px]" />
                                <Link to="/faqs" onClick={() => setMenuOpen(false)}>FAQs</Link></li>
                            <li className="flex gap-3 items-center">{toggleTheme === 'dark' ? (
                                <FiSun className="size-[22px]" onClick={() => setToggleTheme('light')} />
                            ) : (
                                <LuSunMoon className="size-[22px]" onClick={() => setToggleTheme('dark')} />
                            )}
                                <span className="text-lg">Theme</span></li>
                            {user && (
                                <li className="flex gap-3 items-center">
                                    <img src={user.photoUrl} alt="user profile image" className="w-8 h-8 rounded-full object-cover" />
                                    <Link to="/profile/edit" onClick={() => setMenuOpen(false)}>Profile</Link>
                                </li>
                            )}
                        </ul>
                        <div className="w-full flex flex-col items-center mt-8">
                            {!user ? (
                                <button onClick={() => { setMenuOpen(false); navigate('/login'); }} className="btn btn-secondary w-full">
                                    Login
                                </button>
                            ) : (
                                <button className="btn btn-secondary w-full" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;