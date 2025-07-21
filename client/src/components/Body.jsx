import { useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


const Body = () => {
  const [toggleTheme, setToggleTheme] = useState('dark');

  return (
    <div data-theme={toggleTheme}>
      <Navbar toggleTheme={toggleTheme} setToggleTheme={setToggleTheme}  />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body