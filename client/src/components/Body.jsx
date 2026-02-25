import { useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import FloatingChatbot from "@/components/FloatingChatbot"

// const Body = () => {
//   const [toggleTheme, setToggleTheme] = useState('dark');

//   return (
//     <div data-theme={toggleTheme}>
//       <Navbar toggleTheme={toggleTheme} setToggleTheme={setToggleTheme}  />
//       <Outlet />
//       <Footer />
//     </div>
//   )
// }

const Body = () => {
  const [toggleTheme, setToggleTheme] = useState('dark');
  const location = useLocation();

  const hideChatbotRoutes = [
    "/login",
    "/profile/edit"
  ];


  const shouldShowChatbot = !hideChatbotRoutes.includes(location.pathname);

  return (
    <div data-theme={toggleTheme} className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-500">
      <Navbar toggleTheme={toggleTheme} setToggleTheme={setToggleTheme} />
      <div className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </div>
      <Footer />
      {shouldShowChatbot && <FloatingChatbot />}
    </div>
  );
};

export default Body