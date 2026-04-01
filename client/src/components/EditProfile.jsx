import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar";

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhoneNo(user.phoneNo || "");
            setPhotoUrl(user.photoUrl || "");
        }
    }, [user]);

    const handleImageUpload = (event, setImageState) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Only PNG, JPG, and JPEG files are allowed');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            setImageState(reader.result);
        };
    };


    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { name, email, phoneNo, photoUrl },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            toast.success(res?.data?.message);
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-5 md:px-6 py-20 sm:py-28 md:py-20">

            {/* Container */}
            <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-3xl border border-gray-400 rounded-2xl p-4 sm:p-6 md:p-8">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                    Edit Profile
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 items-center">

                    {/* LEFT SIDE (Form) */}
                    <div>
                        <div>
                            <label className="block text-sm py-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full mb-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm py-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full mb-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm py-2">Phone Number</label>
                            <input
                                type="text"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                className="input input-bordered w-full mb-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm py-2">Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setPhotoUrl)}
                                className="file-input file-input-bordered w-full mb-2"
                            />
                        </div>

                        <button
                            onClick={saveProfile}
                            className="btn btn-secondary w-full mt-4 text-base sm:text-lg"
                        >
                            Save Profile
                        </button>
                    </div>

                    {/* RIGHT SIDE (Avatar) */}
                    <div className="flex items-center justify-center">
                        <div className="flex justify-center items-center w-full">
                            <UserAvatar
                                user={{ name, photoUrl }}
                                size="w-40 h-40 sm:w-54 sm:h-54 md:w-60 md:h-60 lg:w-70 lg:h-70 text-4xl sm:text-5xl md:text-6xl"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditProfile;