import {React, useState} from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa'
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };
  const handleHover = () => {
    setDropdownVisible(true);
  };
  const handleLeave = () => {
    setDropdownVisible(false);
  };
  return (
    <>
        <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to="/">
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Libre</span>
            <span className='text-slate-700'>Rooms</span>
          </h1>
          </Link>
          <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
            <FaSearch></FaSearch>
          </form>
          <ul className='flex gap-4 justify-center'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                <Link  aria-current="page" to="/">Explore</Link>
              </li>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                <Link to="/offers">Offers</Link>
              </li>
              
               {
                  !user ?
                <>
                <li className='text-slate-700 hover:underline'>
                  <Link to='/signin' >Login</Link>
                  </li>
                </>
                :
                <>
                  <li
                    className='text-slate-700 relative'
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    onClick={() => navigate('/profile')} 
                  >
                    {
                      user.profileImg.includes('https://lh3.googleusercontent.com') ? (
                        <>
                        <img src={user.profileImg} alt='Google Profile' className='rounded-full object-cover h-8 w-8'/>
                        </>
                      ) : (
                        <img src={`http://localhost:5000/images/${user.profileImg}`} alt='Local Profile' className='rounded-full object-cover h-8 w-8'/>
                      )
                    }
                    {isDropdownVisible && (
                      <ul className="absolute top-full left-0 bg-slate-100 p-2 shadow rounded-md">
                        <li>
                          <Link to="/profile" className="text-slate-700 text-base flex justify-evenly place-items-center p-2 hover:underline"><CgProfile className='mr-2'/><p>Profile</p></Link>
                        </li>
                        <li>
                          <span onClick={handleLogout} className="text-slate-700 flex justify-evenly place-items-center text-base cursor-pointer hover:underline"><CiLogout/><p>Logout</p></span>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
                }
            </ul>
        </div>
        </header>
    </>
  )
}

export default Header
