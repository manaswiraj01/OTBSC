import { Link, useNavigate } from "react-router-dom"
import { FiSun } from "react-icons/fi";
import { LuSunMoon } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";


const Navbar = ({ toggleTheme, setToggleTheme }) => {
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



    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between items-center">
            <div className="flex-/8 mx-8">
                <img src="https://obms-tourist.rajasthan.gov.in/_next/static/media/image.891ad7d6.png" className="w-[270px] "></img>
            </div>
            <div className="flex-4/6">
                <div className="flex justify-evenly items-center">
                    <ul className="flex justify-evenly w-[70%]">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/api/aboutus">About us</Link></li>
                        <li><Link to="/api/explore">Explore</Link></li>
                        <li><Link to="/api/help">Help/FAQ</Link></li>
                    </ul>

                    <div className="mx-4">
                        {toggleTheme === 'dark' ? <FiSun className="size-[23px]" onClick={() => setToggleTheme('light')} />
                            : <LuSunMoon className="size-[23px]" onClick={() => setToggleTheme('dark')} />}
                    </div>
                    <div className="">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                </div>
            </div>
            {!user ? (
                <div className="flex justify-center mr-8">
                    <button onClick={() => navigate('/api/login')} className="btn btn-secondary">Login</button>
                </div>
            ) : (<div className="flex justify-center mr-8">
                <div className="">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user image"
                                    src={user.photoUrl} className="w-full h-full object-cover" />
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
            </div>)}

        </div>
    )
}

export default Navbar