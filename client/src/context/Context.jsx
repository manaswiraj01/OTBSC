import axios from "axios";
import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const userData = useSelector((store) => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        if (userData && userData.name) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/');
                return;
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const value = {
        loading,
        setLoading,
        fetchUser, 
        userData,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;