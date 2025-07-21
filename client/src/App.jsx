import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Body from './components/Body';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react';
import { BASE_URL } from './utils/constants';
import { addUser } from './utils/userSlice';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData && userData.name) return;
    try {
      const res = await axios.get(BASE_URL + "/api/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
        return;
      }
      toast.error(err.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/api/login" ||
      location.pathname === "/api/signup" 
    ) return;

    fetchUser();
  }, [location.pathname]);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/api/login' element={<LoginPage />} />
          <Route path='/api/profile/edit' element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
