import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

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
            setName(user.name);
            setEmail(user.email);
            setPhoneNo(user.phoneNo);
            setPhotoUrl(user.photoUrl);
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
        <div className="min-h-screen   flex items-center justify-center ">
            <div className="w-1/2 border border-gray-400 rounded-2xl p-8">

                {/* Centered Heading */}
                <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

                <div className="flex">
                    <div className="w-1/2 pr-4">
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
                        <div>
                            <button onClick={saveProfile} className="btn btn-secondary w-full my-4 text-lg">
                                Save Profile
                            </button>
                        </div>
                    </div>

                    <div className="w-1/2 flex items-center justify-center">
                        {user?.photoUrl && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={photoUrl}
                                    alt="Profile Preview"
                                    className="rounded-full border w-60 h-60 object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;